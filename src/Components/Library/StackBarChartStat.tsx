import React from "react";
import { StyleSheet, Text, View } from "react-native";
import * as GlobalStyles from "../../styles";

interface IPieProp {
  values: {
    genre: any;
  };
}

export default function StackBarChart(props: IPieProp) {
  const { values } = props;
  const { genre } = values;
  const colors = ["#24F0AB", "#A9F748", "#E0B94C", "#F77048", "#E366F0", "#A4ED45", "#F7EB48", "#E0B94C", "#F7A248", "#F05526"];

  let total = 0;
  const length = Object.keys(genre).length;
  Object.keys(genre).forEach((item) => {
    total += genre[item];
  });

  return (
    <View style={styles.container}>
      <View style={{ height: "50%", flexDirection: "row", width: "100%" }}>
        {Object.keys(genre).map((element, index) => {
          const width = `${(100 / total) * genre[element]}%`;
          return (
            <View style={{ width: width, height: "100%" }}>
              <View
                style={{
                  backgroundColor: colors[index],
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  borderTopLeftRadius: index === 0 ? 10 : 0,
                  borderBottomLeftRadius: index === 0 ? 10 : 0,
                  borderTopRightRadius: index === length - 1 ? 10 : 0,
                  borderBottomRightRadius: index === length - 1 ? 10 : 0,
                }}></View>
            </View>
          );
        })}
      </View>
      <View style={{ width: "100%", height: "50%", alignItems: "center", flexDirection: "row", flexWrap: "wrap", padding: 5 }}>
        {Object.keys(genre).map((element, index) => {
          return (
            <View style={{ backgroundColor: colors[index], borderRadius: 10, paddingHorizontal: 5, margin: 2 }}>
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

const styles = StyleSheet.create({
  container: { justifyContent: "space-between", flexDirection: "column", width: "100%", borderRadius: 20, height: 100, padding: 0 },
});
