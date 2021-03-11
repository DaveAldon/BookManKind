import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TouchableHighlight, FlatList } from "react-native";
import { StyleSheet } from "react-native";
import * as GlobalStyles from "../../styles";
import Swipeable from "../../libraryOverrides/Swipeable";
import * as Icons from "../../styles/icons";
import { GetBooks } from "../../hooks/GetBooks";
import { metadata } from "core-js/fn/reflect";

interface IBook {
  title?: string;
  author?: string;
  publicationYear?: string;
  pages?: number;
}

export function Book(props: any) {
  const library = props;

  const { title, author, publicationYear, pages } = library._snapshot.value;
  return (
    <View style={{ backgroundColor: GlobalStyles.Colors.backgrounds.MEDIUMDARK, borderRadius: 10, margin: 5, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
      <View>
        <Text style={[{ fontSize: 20, fontWeight: "700" }, GlobalStyles.Colors.defaultText]}>{title}</Text>
        <Text style={[{ fontSize: 18 }, GlobalStyles.Colors.defaultText]}>{author}</Text>
      </View>
      <View style={{ flexDirection: "column", backgroundColor: GlobalStyles.Colors.backgrounds.LIGHTEST, borderRadius: 10 }}>
        <View style={styles.metaView}>
          <Icons.Calendar size={20} />
          <Text style={[styles.metaText, GlobalStyles.Colors.defaultText]}>{publicationYear}</Text>
        </View>
        <View style={styles.metaView}>
          <Icons.Pages size={20} />
          <Text style={[styles.metaText, GlobalStyles.Colors.defaultText]}>{pages}</Text>
        </View>
      </View>
    </View>
  );
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
  metaView: {
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 10,
  },
  metaText: {
    fontSize: 18,
    marginLeft: 10,
  },
});
