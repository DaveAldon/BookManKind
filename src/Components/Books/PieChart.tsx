import React from "react";
import { StyleSheet, ScrollView, StatusBar, Text, View } from "react-native";
import * as GlobalStyles from "../../styles";
import { PieChart } from "react-native-svg-charts";

interface IPieProp {
  percentComplete: number;
}

export default function Pie(props: IPieProp) {
  const { percentComplete } = props;
  const data = [
    {
      key: 1,
      amount: percentComplete,
      svg: { fill: GlobalStyles.Colors.text.green },
    },
    {
      key: 2,
      amount: 100 - percentComplete,
      svg: { fill: GlobalStyles.Colors.text.red },
    },
  ];

  return (
    <View style={styles.container}>
      <PieChart valueAccessor={({ item }) => item.amount} spacing={0} outerRadius={"60%"} style={{ height: 170, width: 170 }} data={data} />
      <View style={{ position: "absolute", alignItems: "center" }}>
        <Text style={{ fontWeight: "800", color: percentComplete === 100 ? GlobalStyles.Colors.text.green : GlobalStyles.Colors.text.yellow }}>{percentComplete}%</Text>
        <Text style={{ fontWeight: "300", color: percentComplete === 100 ? GlobalStyles.Colors.text.green : GlobalStyles.Colors.text.yellow }}>Completed</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", justifyContent: "center" },
});
