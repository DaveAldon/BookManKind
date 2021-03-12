import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TouchableHighlight, FlatList } from "react-native";
import { StyleSheet } from "react-native";
import * as GlobalStyles from "../../styles";
import Swipeable from "../../libraryOverrides/Swipeable";
import * as Icons from "../../styles/icons";
import Pie from "./PieChart";

interface IBook {
  title?: string;
  author?: string;
  publicationYear?: string;
  pages?: number;
}

const baseFontSize = 20;

export function Book(props: any) {
  const library = props;
  const { title, author, publicationYear, pages, genre } = library._snapshot.value;

  const pieProp = {
    percentComplete: 0,
  };

  const demos = library._snapshot.value;
  const demosIncrememt = Math.round(100 / (Object.keys(demos).length - 1));

  for (let key in demos) {
    if (demos[key] !== "" && key !== "id") pieProp.percentComplete += demosIncrememt;
  }

  return (
    <View
      style={{ height: 150, backgroundColor: GlobalStyles.Colors.backgrounds.MEDIUMDARK, borderRadius: 10, margin: 0, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
      <View style={{ width: "33%", backgroundColor: GlobalStyles.Colors.backgrounds.LIGHTEST, borderRadius: 10, alignItems: "center", justifyContent: "center", height: "100%" }}>
        <Text style={[{ fontSize: baseFontSize, fontWeight: "700" }, GlobalStyles.Colors.defaultText]}>{title}</Text>
        <Text style={[{ fontSize: baseFontSize - 2 }, GlobalStyles.Colors.defaultText]}>{author}</Text>
      </View>
      <View style={{ width: "33%", alignItems: "center", justifyContent: "center", height: "100%" }}>
        <Pie {...pieProp} />
      </View>
      <View style={{ flexDirection: "column", backgroundColor: GlobalStyles.Colors.backgrounds.LIGHTEST, borderRadius: 10, width: "33%", height: "100%", justifyContent: "center" }}>
        <View style={styles.metaView}>
          <Icons.Calendar size={baseFontSize} />
          <Text style={[styles.metaText, GlobalStyles.Colors.defaultText]}>{publicationYear}</Text>
        </View>
        <View style={styles.metaView}>
          <Icons.Pages size={baseFontSize} />
          <Text style={[styles.metaText, GlobalStyles.Colors.defaultText]}>{pages}</Text>
        </View>
        <View style={styles.metaView}>
          <Icons.Genre size={baseFontSize - 2} />
          <Text style={[styles.metaText, GlobalStyles.Colors.defaultText]}>{genre}</Text>
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
    fontSize: baseFontSize - 2,
    marginLeft: 10,
  },
});
