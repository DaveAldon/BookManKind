import React from "react";
import { StyleSheet, Text, View } from "react-native";
import * as GlobalStyles from "../../styles";
import { Chart, Line, Area, HorizontalAxis, VerticalAxis } from "react-native-responsive-linechart";

interface IPieProp {
  values: {
    genre: any;
    year: any;
  };
}

const colors = ["#24F0AB", "#A9F748", "#E0B94C", "#F77048", "#E366F0", "#A4ED45", "#F7EB48", "#E0B94C", "#F7A248", "#F05526"];

export default function StackBarChart(props: IPieProp) {
  const { values } = props;
  const { genre, year } = values;

  let total = 0;
  Object.keys(genre).forEach((item) => {
    total += genre[item];
  });

  const oldestBookFloor = Math.floor((Math.min(...Object.keys(year)) - 10) / 10) * 10 - 10;
  const newestBookFloor = Math.max(...Object.keys(year)) + 10;

  const yearGroups = {};
  for (let i = oldestBookFloor; i < 2021; i++) {
    if (year[i]) {
      const floor = Math.floor(i / 10) * 10;
      if (yearGroups[floor]) {
        yearGroups[floor] = yearGroups[floor] + year[i];
      } else yearGroups[floor] = 1;
    }
  }

  // Fill the empty decades with zero
  for (let i = oldestBookFloor; i < 2021; i += 10) {
    if (!year[i]) {
      yearGroups[i] = 0;
    }
  }

  const yearsLineData = [];
  Object.keys(yearGroups).forEach((element) => {
    yearsLineData.push({
      x: parseInt(element),
      y: yearGroups[element],
    });
  });

  let totalYear = 0;
  yearsLineData.forEach((item) => {
    totalYear += item.y;
  });

  return (
    <View style={styles.container}>
      <View style={{ height: "50%", flexDirection: "row", width: "100%", borderRadius: 10, overflow: "hidden", borderWidth: 5, borderColor: GlobalStyles.Colors.backgrounds.MEDIUMDARK }}>
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

      <Chart
        style={{ height: 200, width: 400 }}
        data={yearsLineData}
        padding={{ left: 40, bottom: 20, right: 20, top: 20 }}
        xDomain={{ min: oldestBookFloor, max: newestBookFloor }}
        yDomain={{ min: 0, max: totalYear }}>
        <VerticalAxis
          tickCount={totalYear + 1}
          theme={{
            grid: {
              visible: false,
            },
            labels: { label: { color: "white" }, formatter: (v) => v.toFixed(0) },
          }}
        />
        <HorizontalAxis
          tickCount={10}
          theme={{
            grid: {
              visible: false,
            },
            labels: { label: { color: "white" }, formatter: (v) => v.toFixed(0) },
          }}
        />
        <Area theme={{ gradient: { from: { color: "#ffa502" }, to: { color: "#ffa502", opacity: 0.4 } } }} />
        <Line smoothing="cubic-spline" theme={{ stroke: { color: "#ffa502", width: 5 }, scatter: { default: { width: 4, height: 4, rx: 2 } } }} />
      </Chart>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { justifyContent: "space-between", flexDirection: "column", width: "100%", height: 100, padding: 0 },
});
