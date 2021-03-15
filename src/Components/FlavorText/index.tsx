import React from "react";
import { Text } from "react-native";
import * as GlobalStyles from "../../styles";

interface IFlavorProps {
  text: string;
  name: string;
  style?: any;
}

export default function FlavorText(props: IFlavorProps) {
  const { text, name, style } = props;
  return <Text style={[style, { color: text ? GlobalStyles.Colors.defaultText.color : GlobalStyles.Colors.text.yellow }]}>{text || name || ""}</Text>;
}
