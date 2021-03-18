import React from "react";
import { StyleSheet, View, Text } from "react-native";
import * as GlobalStyles from "../../styles";
import * as Icons from "../../styles/icons";
import Pie from "./PieChart";
import FlavorText from "../FlavorText";

interface IDemo {
  children: Array<React.ReactNode>;
}

const baseFontSize = 20;

export function Book(props: any) {
  const library = props;
  const { title, author, publicationYear, pages, genre } = library._snapshot.value;

  const pieProp = {
    percentComplete: 0,
  };

  const demos = library._snapshot.value;
  const demosIncrememt = Math.round(100 / Object.keys(demos).length + 3);

  for (let key in demos) {
    if (demos[key] !== "" && key !== "id" && key !== "index") pieProp.percentComplete += demosIncrememt;
  }

  return (
    <View style={{ backgroundColor: GlobalStyles.Colors.backgrounds.MEDIUMDARK, borderRadius: 10, flexDirection: "row", height: 130 }}>
      <View style={{ width: "33.333%", backgroundColor: GlobalStyles.Colors.backgrounds.LIGHTEST, borderRadius: 10, alignItems: "center", justifyContent: "center" }}>
        <FlavorText {...{ text: title, name: "Title", style: [{ fontSize: baseFontSize - 2, fontWeight: "700" }, GlobalStyles.Colors.defaultText], numberOfLines: 3 }} />
        <FlavorText {...{ text: author, name: "Author", style: [{ fontSize: baseFontSize - 4, fontWeight: "300" }, GlobalStyles.Colors.defaultText], numberOfLines: 2 }} />
      </View>
      <View style={{ width: "33.333%", alignItems: "center", justifyContent: "center" }}>
        <Pie {...pieProp} />
      </View>
      <View style={{ flexDirection: "column", backgroundColor: GlobalStyles.Colors.backgrounds.LIGHTEST, borderRadius: 10, width: "33.333%", justifyContent: "center" }}>
        <DemographicBlock>
          <Icons.Calendar size={baseFontSize} />
          <FlavorText {...{ text: publicationYear, name: "Publ. Year", style: styles.metaText, textAlign: "right" }} />
        </DemographicBlock>
        <DemographicBlock>
          <Icons.Pages size={baseFontSize} />
          <FlavorText {...{ text: pages, name: "Pages", style: styles.metaText, textAlign: "right" }} />
        </DemographicBlock>
        <DemographicBlock>
          <Icons.Genre size={baseFontSize - 2} />
          <FlavorText {...{ text: genre, name: "Genre", style: styles.metaText, numberOfLines: 1, textAlign: "right" }} />
        </DemographicBlock>
      </View>
    </View>
  );
}

const DemographicBlock = (props: IDemo) => {
  const { children } = props;
  return (
    <View style={styles.metaView}>
      <View style={{ width: "20%", justifyContent: "center" }}>{children[0]}</View>
      <View style={{ width: "80%", justifyContent: "center" }}>{children[1]}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: GlobalStyles.Colors.backgrounds.LIGHTEST,
    borderRadius: 20,
    padding: 10,
  },
  metaView: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  metaText: {
    fontSize: baseFontSize - 2,
    marginLeft: 10,
    fontWeight: "300",
  },
});
