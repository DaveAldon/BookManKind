import React from "react";
import { View, Text, TextInput } from "react-native";
import * as GlobalStyles from "../../styles";

export interface IInputProp {
  name: string;
  updateForm: any;
  inputTitle: string;
}

export default function InputBlock(inputProps: IInputProp) {
  const { name, updateForm, inputTitle } = inputProps;

  return (
    <View style={{ flexDirection: "row", marginBottom: 5 }}>
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
        <Text style={[{ fontSize: 16, fontWeight: "200", textTransform: "capitalize" }, GlobalStyles.Colors.defaultText]}>{inputTitle}</Text>
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
          updateForm(text);
        }}
        value={name}
        placeholder={`Tap to enter ${inputTitle}...`}
        placeholderTextColor={GlobalStyles.Colors.text.light}></TextInput>
    </View>
  );
}
