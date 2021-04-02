import React from "react";
import { StyleSheet, View } from "react-native";
import * as GlobalStyles from "../../../styles";
import { FavoriteAuthor } from "./authorStats";
import { BiggestBook } from "./pagesStats";
import { GenreBreakdown } from "./genreStats";
import { YearLineChart } from "./yearStats";

interface IStatsProp {
  values: {
    genre: any;
    year: any;
    pages: any;
    author: any;
  };
}

export default function Stats(props: IStatsProp) {
  const { values } = props;
  const { genre, year, pages, author } = values;

  if (Object.keys(genre).length === 0 && Object.keys(year).length === 0 && Object.keys(pages).length === 0 && Object.keys(author).length === 0) return <View></View>;

  return (
    <View style={styles.container}>
      <GenreBreakdown {...genre} />
      <YearLineChart {...year} />
      <View style={{ flexDirection: "row", height: "20%", justifyContent: "space-between", alignItems: "center" }}>
        <BiggestBook {...pages} />
        <FavoriteAuthor {...author} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { justifyContent: "space-between", flexDirection: "column", width: "100%", height: "100%", padding: 0 },
  demographicsCard: { justifyContent: "center", alignItems: "center", height: "100%", width: "45%", marginHorizontal: 0, backgroundColor: GlobalStyles.Colors.backgrounds.LIGHTEST, borderRadius: 10 },
  demographicsText: { color: "white", fontSize: 14 },
});
