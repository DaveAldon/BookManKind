import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import * as GlobalStyles from "../../styles";
import * as Buttons from "../Buttons";
import UpdateBook from "../../hooks/UpdateBook";
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
        setBook({ ...snapshot.toJSON() });
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
    return (
      <View key={index} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={{ textTransform: "capitalize", color: GlobalStyles.Colors.defaultText.color }}>{title}</Text>
        <TextInput
          style={{ backgroundColor: GlobalStyles.Colors.backgrounds.MEDIUMDARK, color: GlobalStyles.Colors.defaultText.color, height: 30 }}
          onChangeText={(text) => {
            updateForm(title, text);
          }}
          value={book[title].toString()}
          placeholder={"Enter information here..."}></TextInput>
      </View>
    );
  }

  return (
    <View
      style={{
        backgroundColor: GlobalStyles.Colors.backgrounds.DARKEST,
        padding: 16,
        height: 450,
      }}>
      <View>
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
