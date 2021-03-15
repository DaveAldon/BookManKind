import React from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import * as GlobalStyles from "../../styles";

interface IButton {
  event: any;
  textStyle?: any;
}

export function BlueButton(props: any) {
  const { textStyle, event } = props;
  return (
    <TouchableOpacity onPress={event} style={{ backgroundColor: GlobalStyles.Colors.buttons.BLUE, height: 50, borderRadius: 10 }}>
      <View style={{ justifyContent: "center", alignItems: "center", height: "100%" }}>
        <Text style={[textStyle, GlobalStyles.Colors.defaultText]}>what's the buzz</Text>
      </View>
    </TouchableOpacity>
  );
}
