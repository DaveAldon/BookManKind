import React from "react";
import { Text } from "react-native";
import * as GlobalStyles from "../../styles";

interface IFlavorProps {
  text: string;
  name: string;
  style?: any;
  numberOfLines?: number;
  textAlign?: string;
}

export default function FlavorText(props: IFlavorProps) {
  const { text, name, style, numberOfLines, textAlign } = props;
  return (
    <Text
      adjustsFontSizeToFit
      numberOfLines={numberOfLines || null}
      style={[style, { color: text ? GlobalStyles.Colors.defaultText.color : GlobalStyles.Colors.text.yellow, textAlign: textAlign || "center" }]}>
      {text || name || ""}
    </Text>
  );
}
