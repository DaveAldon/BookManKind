import * as React from "react";
import { StyleSheet, TextInput } from "react-native";
import * as GlobalStyles from "../../styles";

interface IProp {
  updateFunction: any;
  value: string;
  placeholder: string;
  style?: any;
}

export const BasicInput = (props: IProp) => {
  const { updateFunction, value, placeholder, style } = props;

  return (
    <TextInput
      returnKeyType={"done"}
      textAlign={"center"}
      style={[styles.input, style]}
      onChangeText={(text: string) => updateFunction(text)}
      value={value}
      placeholder={placeholder}
      placeholderTextColor={GlobalStyles.Colors.text.light}></TextInput>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 20,
    borderRadius: 10,
    height: 60,
    backgroundColor: GlobalStyles.Colors.backgrounds.DARKEST,
    color: GlobalStyles.Colors.defaultText.color,
    width: "100%",
    marginVertical: 5,
  },
});
