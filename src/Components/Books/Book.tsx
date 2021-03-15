import React from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import * as GlobalStyles from "../../styles";
import * as Icons from "../../styles/icons";
import Pie from "./PieChart";
import FlavorText from "../FlavorText";

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
  const demosIncrememt = Math.round(100 / Object.keys(demos).length);

  for (let key in demos) {
    if (demos[key] !== "" && key !== "id") pieProp.percentComplete += demosIncrememt;
  }

  return (
    <View
      style={{ height: 150, backgroundColor: GlobalStyles.Colors.backgrounds.MEDIUMDARK, borderRadius: 10, margin: 0, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
      <View style={{ width: "33%", backgroundColor: GlobalStyles.Colors.backgrounds.LIGHTEST, borderRadius: 10, alignItems: "center", justifyContent: "center", height: "100%" }}>
        <FlavorText {...{ text: title, name: "Title", style: [{ fontSize: baseFontSize, fontWeight: "700" }, GlobalStyles.Colors.defaultText] }} />
        <FlavorText {...{ text: author, name: "Author", style: [{ fontSize: baseFontSize - 2 }, GlobalStyles.Colors.defaultText] }} />
      </View>
      <View style={{ width: "33%", alignItems: "center", justifyContent: "center", height: "100%" }}>
        <Pie {...pieProp} />
      </View>
      <View style={{ flexDirection: "column", backgroundColor: GlobalStyles.Colors.backgrounds.LIGHTEST, borderRadius: 10, width: "33%", height: "100%", justifyContent: "center" }}>
        <View style={styles.metaView}>
          <Icons.Calendar size={baseFontSize} />
          <FlavorText {...{ text: publicationYear, name: "Publ. Year", style: styles.metaText }} />
        </View>
        <View style={styles.metaView}>
          <Icons.Pages size={baseFontSize} />
          <FlavorText {...{ text: pages, name: "Pages", style: styles.metaText }} />
        </View>
        <View style={styles.metaView}>
          <Icons.Genre size={baseFontSize - 2} />
          <FlavorText {...{ text: genre, name: "Genre", style: styles.metaText }} />
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
