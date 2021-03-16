import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import * as GlobalStyles from "../../styles";
import * as Buttons from "../Buttons";
import UpdateBook from "../../hooks/BookManager";
import { Authentication } from "../../hooks/Authentication";
import database from "@react-native-firebase/database";

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
      <View key={index} style={{ flexDirection: "row" }}>
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
    <View
      style={{
        backgroundColor: GlobalStyles.Colors.backgrounds.LIGHTEST,
        padding: 16,
        height: 450,
      }}>
      <View style={{ height: "100%", justifyContent: "space-between" }}>
        {book &&
          Object.keys(book).map((keyName, i) => {
            return InputBlock({ value: book[keyName], title: keyName, index: i });
          })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: GlobalStyles.Colors.backgrounds.LIGHTEST,
    borderRadius: 20,
    padding: 10,
  },
  swipeButtons: {
    height: "100%",
    borderRadius: 10,
    width: "18%",
    justifyContent: "center",
    alignItems: "center",
  },
});
