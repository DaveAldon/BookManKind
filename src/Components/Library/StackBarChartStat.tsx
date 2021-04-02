import React from "react";
import { StyleSheet, Text, View } from "react-native";
import * as GlobalStyles from "../../styles";
import { Chart, Line, Area, HorizontalAxis, VerticalAxis } from "react-native-responsive-linechart";

interface IPieProp {
  values: {
    genre: any;
    year: any;
    pages: any;
    author: any;
  };
}

const colors = ["#24F0AB", "#A9F748", "#E0B94C", "#F77048", "#E366F0", "#A4ED45", "#F7EB48", "#E0B94C", "#F7A248", "#F05526"];

export default function StackBarChart(props: IPieProp) {
  const { values } = props;
  const { genre, year, pages, author } = values;

  let total = 0;
  Object.keys(genre).forEach((item) => {
    total += genre[item];
  });

  const oldestBookFloor = Math.floor((Math.min(...Object.keys(year)) - 10) / 10) * 10 - 10;
  const newestBookFloor = Math.max(...Object.keys(year)) + 10;
  const biggestBook = pages[Math.max(...Object.keys(pages))];

  function getFavoriteAuthor() {
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

  const favoriteAuthor = getFavoriteAuthor();

  const yearGroups = {};
  for (let i = oldestBookFloor; i < newestBookFloor; i++) {
    if (year[i]) {
      const floor = Math.floor(i / 10) * 10;
      if (yearGroups[floor]) {
        yearGroups[floor] = yearGroups[floor] + year[i];
      } else yearGroups[floor] = 1;
    }
  }

  // Fill the empty decades with zero
  for (let i = oldestBookFloor; i < newestBookFloor; i += 10) {
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

      <Chart
        style={{ height: "60%", width: "100%" }}
        data={yearsLineData}
        padding={{ left: 20, bottom: 20, right: 0, top: 30 }}
        xDomain={{ min: oldestBookFloor, max: newestBookFloor }}
        yDomain={{ min: 0, max: totalYear }}>
        <VerticalAxis
          tickCount={totalYear + 1}
          theme={{
            axis: {
              visible: false,
            },
            grid: {
              visible: false,
            },
            ticks: {
              visible: false,
            },
            labels: { label: { color: "white", fontSize: 16 }, formatter: (v) => (v !== 0 ? v.toFixed(0) : "") },
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
        <Area theme={{ gradient: { from: { color: GlobalStyles.Colors.backgrounds.DARKEST }, to: { color: GlobalStyles.Colors.backgrounds.BRIGHT, opacity: 0.4 } } }} />
        <Line smoothing="cubic-spline" theme={{ stroke: { color: "#ffa502", width: 8 }, scatter: { default: { width: 4, height: 4, rx: 2 } } }} />
      </Chart>

      <View style={{ flexDirection: "row", height: "20%", justifyContent: "space-between", alignItems: "center" }}>
        <View style={styles.demographicsCard}>
          <Text style={styles.demographicsText}>Biggest book:</Text>
          <Text style={[styles.demographicsText, { fontWeight: "700" }]}>{biggestBook.title || "Untitled"}</Text>
          <Text style={[styles.demographicsText, { fontWeight: "700" }]}>
            {biggestBook.count} page{biggestBook.count > 1 ? "s" : ""}
          </Text>
        </View>
        <View style={styles.demographicsCard}>
          <Text style={styles.demographicsText}>Favorite author:</Text>
          <Text style={[styles.demographicsText, { fontWeight: "700" }]}>{favoriteAuthor.name || "Untitled"}</Text>
          <Text style={[styles.demographicsText, { fontWeight: "700" }]}>
            {favoriteAuthor.count} book{favoriteAuthor.count > 1 ? "s" : ""}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { justifyContent: "space-between", flexDirection: "column", width: "100%", height: "100%", padding: 0 },
  demographicsCard: { justifyContent: "center", alignItems: "center", height: "100%", width: "45%", marginHorizontal: 0, backgroundColor: GlobalStyles.Colors.backgrounds.LIGHTEST, borderRadius: 10 },
  demographicsText: { color: "white", fontSize: 14 },
});
