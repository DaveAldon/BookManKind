import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import * as GlobalStyles from "../../styles";
import StackBarChart from "./StackBarChartStat";

interface IProp {
  _snapshot: {
    value: {
      admins: {
        email: string;
      };
      books: [{}];
    };
    key: string;
  };
}

export function LibraryCard(props: IProp) {
  const { value, key } = props._snapshot;
  const { admins, books } = value;
  const { email } = admins[0];
  const [bookCount, setBookCount] = useState(0);
  const [stats, setStats] = useState();

  useEffect(() => {
    let count = 0;
    books &&
      Object.keys(books).forEach((book) => {
        if (JSON.stringify(book) !== "null") count++;
      });
    setBookCount(count);
  }, [books]);

  useEffect(() => {
    const localStats = {
      genre: {},
      pages: {},
      year: {},
      author: {},
    };

    Object.values(books).forEach((book: any) => {
      if (book.genre) {
        if (!localStats.genre[book.genre]) {
          localStats.genre[book.genre] = 1;
        } else localStats.genre[book.genre] = localStats.genre[book.genre] + 1;
      }
    });
    setStats({ ...localStats });
  }, [books]);

  return (
    <View style={styles.card}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "baseline" }}>
        <Text style={[{ fontSize: 20 }, GlobalStyles.Colors.defaultText]}>{key}</Text>
        <Text style={[{ fontSize: 20 }, GlobalStyles.Colors.defaultText]}>{bookCount} Books</Text>
      </View>

      <Text style={GlobalStyles.Colors.defaultText}>Created by {email}</Text>
      {stats && (
        <View style={{ width: "100%" }}>
          <StackBarChart values={stats} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: GlobalStyles.Colors.backgrounds.LIGHTEST,
    borderRadius: 20,
    padding: 10,
  },
});
