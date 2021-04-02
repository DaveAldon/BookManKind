import React from "react";
import { StyleSheet } from "react-native";
import * as GlobalStyles from "../../../styles";
import { Chart, Line, Area, HorizontalAxis, VerticalAxis } from "react-native-responsive-linechart";

export function YearLineChart(year: any) {
  const oldestBookFloor = Math.floor((Math.min(...Object.keys(year)) - 10) / 10) * 10 - 10;
  const newestBookFloor = Math.max(...Object.keys(year)) + 10;

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
  );
}

const styles = StyleSheet.create({});
