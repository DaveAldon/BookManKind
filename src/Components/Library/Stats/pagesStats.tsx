import React from "react";
import { View, StyleSheet, Text } from "react-native";
import * as GlobalStyles from "../../../styles";

const EmptyBlock = () => {
  return (
    <View style={styles.demographicsCard}>
      <Text style={[styles.demographicsText, { textAlign: "center" }]}>Add page info to see your biggest book</Text>
    </View>
  );
};

export function BiggestBook(pages: any) {
  if (Object.keys(pages).length === 0) {
    return <EmptyBlock />;
  }

  const biggestBook = pages[Math.max(...Object.keys(pages))];

  return (
    <View style={styles.demographicsCard}>
      <Text style={styles.demographicsText}>Biggest book:</Text>
      <Text style={[styles.demographicsText, { fontWeight: "700" }]}>{biggestBook.title || "Untitled"}</Text>
      <Text style={[styles.demographicsText, { fontWeight: "700" }]}>
        {biggestBook.count} page{biggestBook.count > 1 ? "s" : ""}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { justifyContent: "space-between", flexDirection: "column", width: "100%", height: "100%", padding: 0 },
  demographicsCard: { justifyContent: "center", alignItems: "center", height: "100%", width: "45%", marginHorizontal: 0, backgroundColor: GlobalStyles.Colors.backgrounds.LIGHTEST, borderRadius: 10 },
  demographicsText: { color: "white", fontSize: 14 },
});
