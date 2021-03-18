import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, KeyboardAvoidingView, ScrollView } from "react-native";
import * as GlobalStyles from "../../styles";
import UpdateBook from "../../hooks/BookManager";
import { Authentication } from "../../hooks/Authentication";
import database from "@react-native-firebase/database";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface IInputProp {
  value: string;
  title: string;
  index: number;
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

  function InputBlock(inputProps: IInputProp) {
    const { value, title, index } = inputProps;
    const visibleTitle = title === "publicationYear" ? "Year Publ." : title;
    if (title === "index") return;
    return (
      <View key={index} style={{ flexDirection: "row", marginBottom: 5 }}>
        <View
          style={{
            borderBottomLeftRadius: 10,
            borderTopLeftRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            width: "20%",
            height: 60,
            backgroundColor: GlobalStyles.Colors.backgrounds.MEDIUMDARK,
          }}>
          <Text style={[{ fontSize: 16, fontWeight: "200", textTransform: "capitalize" }, GlobalStyles.Colors.defaultText]}>{visibleTitle}</Text>
        </View>
        <TextInput
          multiline={false}
          returnKeyType={"done"}
          textAlign={"center"}
          style={{
            fontSize: 20,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            height: 60,
            backgroundColor: GlobalStyles.Colors.backgrounds.DARKEST,
            color: GlobalStyles.Colors.defaultText.color,
            width: "80%",
          }}
          onChangeText={(text) => {
            updateForm(title, text);
          }}
          value={book[title].toString()}
          placeholder={"Tap to enter info..."}
          placeholderTextColor={GlobalStyles.Colors.text.light}></TextInput>
      </View>
    );
  }

  return (
    <KeyboardAwareScrollView>
      <View style={{ backgroundColor: GlobalStyles.Colors.backgrounds.LIGHTEST, paddingVertical: 5, paddingBottom: 30 }}>
        {book &&
          Object.keys(book).map((keyName, i) => {
            return InputBlock({ value: book[keyName], title: keyName, index: i });
          })}
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({});
