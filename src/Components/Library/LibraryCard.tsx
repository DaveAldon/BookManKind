import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TouchableHighlight } from "react-native";
import { StyleSheet } from "react-native";
import * as GlobalStyles from "../../styles";

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

  useEffect(() => {
    let count = 0;
    books &&
      Object.keys(books).forEach((book) => {
        if (JSON.stringify(book) !== "null") count++;
      });
    setBookCount(count);
  }, [books]);

  return (
    <View style={styles.card}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "baseline" }}>
        <Text style={[{ fontSize: 20 }, GlobalStyles.Colors.defaultText]}>{key}</Text>
        <Text style={[{ fontSize: 20 }, GlobalStyles.Colors.defaultText]}>{bookCount} Books</Text>
      </View>
      <Text style={GlobalStyles.Colors.defaultText}>Created by {email}</Text>
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
