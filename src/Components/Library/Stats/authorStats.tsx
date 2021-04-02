import React from "react";
import { View, StyleSheet, Text } from "react-native";
import * as GlobalStyles from "../../../styles";

function getFavoriteAuthor(author: any) {
  let fav = {
    count: 0,
    name: "",
  };
  for (let x in author) {
    if (author[x] > fav.count) {
      fav.count = author[x];
      fav.name = x;
    }
  }
  return fav;
}

export function FavoriteAuthor(author: any) {
  const favoriteAuthor = getFavoriteAuthor(author);

  return (
    <View style={styles.demographicsCard}>
      <Text style={styles.demographicsText}>Favorite author:</Text>
      <Text style={[styles.demographicsText, { fontWeight: "700" }]}>{favoriteAuthor.name || "Untitled"}</Text>
      <Text style={[styles.demographicsText, { fontWeight: "700" }]}>
        {favoriteAuthor.count} book{favoriteAuthor.count > 1 ? "s" : ""}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { justifyContent: "space-between", flexDirection: "column", width: "100%", height: "100%", padding: 0 },
  demographicsCard: { justifyContent: "center", alignItems: "center", height: "100%", width: "45%", marginHorizontal: 0, backgroundColor: GlobalStyles.Colors.backgrounds.LIGHTEST, borderRadius: 10 },
  demographicsText: { color: "white", fontSize: 14 },
});
