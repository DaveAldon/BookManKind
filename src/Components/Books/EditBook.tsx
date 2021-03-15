import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import * as GlobalStyles from "../../styles";
import * as Buttons from "../Buttons";
interface IForm {
  author: string;
  genre: string;
  pages: string;
  publicationYear: string;
  title: string;
}

interface IInputProp {
  value: string;
  title: string;
  index: number;
}

export default function renderContent(props: any) {
  const { bookContext, setBookContext } = props;
  const { author, genre, pages, publicationYear, title } = bookContext._snapshot.value;

  const defaultForm: IForm = {
    author,
    genre,
    pages,
    publicationYear,
    title,
  };

  const [form, setForm] = useState<IForm>(defaultForm);
  const [formPage, setFormPage] = useState("");

  const updateForm = (key, value) => {
    console.log(key, value);
    setForm({ ...form, [key]: value });
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
          value={form[title].toString()}
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
        {Object.keys(form).map((keyName, i) => {
          return InputBlock({ value: form[keyName], title: keyName, index: i });
        })}
      </View>
      <View>
        <Buttons.BlueButton
          event={() => {
            console.log(form);
          }}
        />
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
