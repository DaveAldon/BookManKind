import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as GlobalStyles from "../../styles";
import { NewBook } from "../../hooks/BookManager";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import InputBlock from "./InputBlock";
import { GreenButton, DeactivatedButton } from "../Buttons";
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
  bookId?: string;
  bookData: {
    author: string;
    genre: string;
    pages: string;
    publicationYear: string;
    title: string;
  };
}

interface IProp {
  bottomSheetRefNew: any;
  libraryName: any;
}

const demoOrder = {
  title: null,
  author: null,
  publicationYear: null,
  pages: null,
  genre: null,
};

const defaultForm = {
  author: "",
  genre: "",
  pages: "",
  publicationYear: "",
  title: "",
};

export default function renderContent(props: IProp) {
  const { bottomSheetRefNew, libraryName } = props;
  const [canSubmit, setCanSubmit] = useState(false);
  const [book, setBook] = useState({ ...defaultForm });

  const updateForm = (key, value) => {
    setBook({ ...book, [key]: value });
  };

  useEffect(() => {
    let found = false;
    Object.keys(book).some((key) => {
      if (book[key] !== "") found = true;
    });
    setCanSubmit(found);
  }, [book]);

  function SubmitBook() {
    const newBookProp: IBookApiProp = {
      libraryName,
      bookData: book,
    };
    NewBook(newBookProp);
    ResetForm();
  }

  function ResetForm() {
    setBook({ ...defaultForm });
  }

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
      {canSubmit ? (
        <GreenButton
          style={{ height: 60 }}
          onPress={() => {
            bottomSheetRefNew.current.snapTo(0);
            setTimeout(() => {
              SubmitBook();
            }, 1000);
          }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icons.Done />
            <Text style={[{ fontSize: 18, marginLeft: 20, fontWeight: "200" }, GlobalStyles.Colors.defaultText]}>Done!</Text>
          </View>
        </GreenButton>
      ) : (
        <DeactivatedButton style={{ height: 60 }} onPress={() => {}}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icons.Thinking />
            <Text style={[{ fontSize: 18, marginLeft: 20, fontWeight: "200" }, GlobalStyles.Colors.defaultText]}>Add at least one piece of information</Text>
          </View>
        </DeactivatedButton>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
