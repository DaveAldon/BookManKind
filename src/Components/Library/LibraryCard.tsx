import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import * as GlobalStyles from "../../styles";
import Stats from "./Stats";

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

    books &&
      Object.values(books).forEach((book: any) => {
        if (book.genre) {
          if (!localStats.genre[book.genre]) {
            localStats.genre[book.genre] = 1;
          } else localStats.genre[book.genre] = localStats.genre[book.genre] + 1;
        }
        if (book.publicationYear) {
          if (!localStats.year[book.publicationYear]) {
            localStats.year[book.publicationYear] = 1;
          } else localStats.year[book.publicationYear] = localStats.year[book.publicationYear] + 1;
        }
        if (book.pages) {
          localStats.pages[book.pages] = {
            count: book.pages,
            title: book.title,
          };
        }
        if (book.author) {
          if (!localStats.author[book.author]) {
            localStats.author[book.author] = 1;
          } else localStats.author[book.author] = localStats.author[book.author] + 1;
        }
      });
    setStats({ ...localStats });
  }, [books]);

  return (
    <View style={styles.card}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "baseline", backgroundColor: GlobalStyles.Colors.backgrounds.LIGHTEST, borderRadius: 10, padding: 10 }}>
        <View>
          <Text style={[{ fontSize: 20, fontWeight: "700" }, GlobalStyles.Colors.defaultText]}>{key}</Text>
          <Text style={GlobalStyles.Colors.defaultText}>Created by {email}</Text>
        </View>
        <Text style={[{ fontSize: 20 }, GlobalStyles.Colors.defaultText]}>
          {bookCount} Book{bookCount !== 1 ? "s" : ""}
        </Text>
      </View>

      {stats && (
        <View style={{ width: "100%", height: 300, padding: 0 }}>
          <Stats values={stats} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: GlobalStyles.Colors.backgrounds.MEDIUMDARK,
    borderRadius: 20,
    padding: 10,
  },
});
