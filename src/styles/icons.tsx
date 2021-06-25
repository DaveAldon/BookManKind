import React from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as GlobalStyles from "../styles";
import useRotation from '../Components/hooks/useRotation';

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
function Genre({ color = GlobalStyles.Colors.defaultText.color, size = 30 }) {
  return <FontAwesome5 name="theater-masks" size={size} color={color} />;
}
function Edit({ color = GlobalStyles.Colors.defaultText.color, size = 30 }) {
  return <Feather name="edit" size={size} color={color} />;
}
function Book({ color = GlobalStyles.Colors.defaultText.color, size = 30 }) {
  return <Entypo name="open-book" size={size} color={color} />;
}
function Done({ color = GlobalStyles.Colors.defaultText.color, size = 30 }) {
  return <AntDesign name="checkcircle" size={size} color={color} />;
}
function Thinking({ color = GlobalStyles.Colors.defaultText.color, size = 30 }) {
  return <MaterialCommunityIcons name="thought-bubble" size={size} color={color} />;
}
function Library({ color = GlobalStyles.Colors.defaultText.color, size = 30 }) {
  return <Ionicons name="library" size={size} color={color} />;
}
function Logout({ color = GlobalStyles.Colors.defaultText.color, size = 30 }) {
  return <AntDesign name="logout" size={size} color={color} />;
}
function Settings({ color = GlobalStyles.Colors.defaultText.color, size = 30, animated = false }) {
  return <Ionicons name="ios-settings" size={size} color={color}/>
}
function Tap({ color = GlobalStyles.Colors.defaultText.color, size = 30, animated = false }) {
  return <MaterialCommunityIcons name="gesture-tap" size={size} color={color}/>
}

export { Tap,Delete, Share, Calendar, Pages, Genre, Edit, Book, Done, Thinking, Library, Logout, Settings };
