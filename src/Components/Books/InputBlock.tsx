import React from "react";
import { View, Text, TextInput } from "react-native";
import * as GlobalStyles from "../../styles";

interface IInputProp {
  value: string;
  title: string;
  index: number;
  updateForm: any;
  book: any;
}

const inputHeight = 55;

export default function InputBlock(inputProps: IInputProp) {
  const { value, title, index, updateForm, book } = inputProps;
  const visibleTitle = title === "publicationYear" ? "Year Publ." : title;
  const isNumeric = title === "publicationYear" || title === "pages";
  return (
    <View key={index} style={{ flexDirection: "row", marginBottom: 5 }}>
      <View
        style={{
          borderBottomLeftRadius: 10,
          borderTopLeftRadius: 10,
          justifyContent: "center",
          alignItems: "center",
          width: "20%",
          height: inputHeight,
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
          height: inputHeight,
          backgroundColor: GlobalStyles.Colors.backgrounds.DARKEST,
          color: GlobalStyles.Colors.defaultText.color,
          width: "80%",
        }}
        onChangeText={(text) => {
          if (isNumeric) text = text.replace(/[^0-9]/g, "");
          updateForm(title, text);
        }}
        value={book[title].toString()}
        placeholder={"Tap to enter info..."}
        placeholderTextColor={GlobalStyles.Colors.text.light}/>
    </View>
  );
}
