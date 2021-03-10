import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TouchableHighlight, FlatList } from "react-native";
import { StyleSheet } from "react-native";
import * as GlobalStyles from "../../styles";
import Swipeable from "../../libraryOverrides/Swipeable";
import * as Icons from "../../styles/icons";
import { GetBooks } from "../../hooks/GetBooks";

export function Book(props: any) {
  return <Text>book</Text>;
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
