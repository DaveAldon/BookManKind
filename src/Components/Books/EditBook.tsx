import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, KeyboardAvoidingView, ScrollView } from "react-native";
import * as GlobalStyles from "../../styles";
import UpdateBook from "../../hooks/BookManager";
import { Authentication } from "../../hooks/Authentication";
import database from "@react-native-firebase/database";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import InputBlock from "./InputBlock";
import { BlueButton, GreenButton } from "../Buttons";
import * as Icons from "../../styles/icons";

interface IInputProp {
  value: string;
  title: string;
  index: number;
  updateForm: any;
  book: any;
}

interface IBookApiProp {
  libraryName: string;
  bookID: string;
  bookData: {
    author: string;
    genre: string;
    pages: string;
    publicationYear: string;
    title: string;
  };
}

interface IProp {
  bookContext: any;
  setBookContext: any;
  bottomSheetRef: any;
  libraryName: any;
}

const demoOrder = {
  title: null,
  author: null,
  publicationYear: null,
  pages: null,
  genre: null,
};

export default function renderContent(props: IProp) {
  const { bookContext, setBookContext, bottomSheetRef, libraryName } = props;
  const { key } = bookContext._snapshot;
  const bookID = key;

  const [book, setBook] = useState(null);

  useEffect(() => {
    const reference = `/libraries/${Authentication.getUID()}/${libraryName}/books/${bookID}/`;
    const onValueChange = database()
      .ref(reference)
      .on("value", (snapshot) => {
        // This lets us re-order the object key/values
        const orderedDemographics = Object.assign(demoOrder, snapshot.toJSON());
        setBook({ ...orderedDemographics });
      });
    // Stop listening for updates when no longer required
    return () => database().ref(`/users/${Authentication.getUID()}`).off("value", onValueChange);
  }, [Authentication.getUID(), bookID]);

  const updateForm = (key, value) => {
    const updateBookProp: IBookApiProp = {
      libraryName,
      bookID,
      bookData: { ...book, [key]: value },
    };
    UpdateBook(updateBookProp);
  };

  return (
    <View>
      <View style={{ backgroundColor: GlobalStyles.Colors.backgrounds.LIGHTEST, paddingVertical: 5, paddingBottom: 20 }}>
        {book &&
          Object.keys(book).map((keyName, index) => {
            if (keyName !== "index" && keyName !== "dateAdded") {
              const inputProp: IInputProp = {
                value: book[keyName],
                title: keyName,
                index,
                updateForm,
                book,
              };
              return <InputBlock key={index} {...inputProp} />;
            }
          })}
      </View>
      <GreenButton
        style={{ height: 60 }}
        onPress={() => {
          bottomSheetRef.current.collapse();
        }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icons.Done />
          <Text style={[{ fontSize: 18, marginLeft: 20, fontWeight: "200" }, GlobalStyles.Colors.defaultText]}>Done!</Text>
        </View>
      </GreenButton>
    </View>
  );
}

const styles = StyleSheet.create({});
