import React from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as GlobalStyles from "../styles";

function Delete({ color = GlobalStyles.Colors.defaultText.color, size = 30 }) {
  return <AntDesign name="delete" size={size} color={color} />;
}
function Share({ color = GlobalStyles.Colors.defaultText.color, size = 30 }) {
  return <Feather name="share" size={size} color={color} />;
}
function Calendar({ color = GlobalStyles.Colors.defaultText.color, size = 30 }) {
  return <FontAwesome name="calendar" size={size} color={color} />;
}
function Pages({ color = GlobalStyles.Colors.defaultText.color, size = 30 }) {
  return <MaterialCommunityIcons name="book-open-page-variant" size={size} color={color} />;
}

export { Delete, Share, Calendar, Pages };
