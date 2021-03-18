import React from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import * as GlobalStyles from "../../styles";

interface IButton {
  onPress: any;
  style?: any;
  children: React.ReactNode;
}

export function BlueButton(props: IButton) {
  const { onPress, style } = props;
  return (
    <TouchableOpacity onPress={onPress} style={[{ backgroundColor: GlobalStyles.Colors.buttons.BLUE, height: 50, borderRadius: 10 }, style]}>
      <View style={{ justifyContent: "center", alignItems: "center", height: "100%" }}>{props.children}</View>
    </TouchableOpacity>
  );
}

export function GreenButton(props: IButton) {
  const { onPress, style } = props;
  return (
    <TouchableOpacity onPress={onPress} style={[{ backgroundColor: GlobalStyles.Colors.buttons.GREEN, height: 50, borderRadius: 10 }, style]}>
      <View style={{ justifyContent: "center", alignItems: "center", height: "100%" }}>{props.children}</View>
    </TouchableOpacity>
  );
}
