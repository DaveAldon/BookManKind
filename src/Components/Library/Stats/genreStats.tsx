import React from "react";
import { View, StyleSheet, Text } from "react-native";
import * as GlobalStyles from "../../../styles";
import { colors } from "./statColors";

export function GenreBreakdown(genre: any) {
  if (Object.keys(genre).length === 0) {
    genre = {
      "No books with genre information yet": 1,
    };
  }

  let total = 0;
  Object.keys(genre).forEach((item) => {
    total += genre[item];
  });

  return (
    <View style={{ height: "20%" }}>
      <View style={{ height: "50%", flexDirection: "row", width: "100%", borderRadius: 10, overflow: "hidden", borderWidth: 5, borderColor: GlobalStyles.Colors.backgrounds.MEDIUMDARK }}>
        {Object.keys(genre).map((element, index) => {
          const width = `${(100 / total) * genre[element]}%`;
          return (
            <View key={index} style={{ width: width, height: "100%" }}>
              <View
                style={{
                  backgroundColor: colors[index],
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}></View>
            </View>
          );
        })}
      </View>
      <View style={{ width: "100%", height: "50%", alignItems: "center", flexDirection: "row", flexWrap: "wrap", paddingHorizontal: 5 }}>
        {Object.keys(genre).map((element, index) => {
          return (
            <View key={index} style={{ backgroundColor: colors[index], borderRadius: 10, paddingHorizontal: 5, margin: 2 }}>
              <Text style={{}}>
                {genre[element]} {element}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
