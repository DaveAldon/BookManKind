import React from "react";
import { View, StyleSheet } from "react-native";
import * as GlobalStyles from "../../styles";

export default function RenderHeader() {
  return (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: GlobalStyles.Colors.backgrounds.LIGHTEST,
    paddingVertical: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: 30,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 5,
    borderRadius: 4,
    backgroundColor: GlobalStyles.Colors.backgrounds.DARKEST,
    marginBottom: 10,
  },
});
