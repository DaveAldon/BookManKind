import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TouchableHighlight, FlatList } from "react-native";
import { StyleSheet } from "react-native";
import * as GlobalStyles from "../../styles";
import Swipeable from "../../libraryOverrides/Swipeable";
import * as Icons from "../../styles/icons";
import { Book } from "./Book";
import database from "@react-native-firebase/database";
import { Authentication } from "../../hooks/Authentication";
import { SearchBar } from "react-native-elements";

export function Books(props: any) {
  const { libraryName } = props.route.params;
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  const renderBooks = ({ item }) => {
    if (item._snapshot.value) return <Book {...item} />;
  };

  const bookApiProp = {
    libraryName,
    setBooks,
  };

  useEffect(() => {
    const onValueChange = database()
      .ref(`/libraries/${Authentication.getUID()}/${libraryName}/books/`)
      .on("value", (snapshot) => {
        const data = snapshot;
        const tempLib = [];

        data.forEach(function (item) {
          tempLib.push(item);
        });
        setBooks(tempLib);
      });
    // Stop listening for updates when no longer required
    return () => database().ref(`/users/${Authentication.getUID()}`).off("value", onValueChange);
  }, [Authentication.getUID()]);

  const filterItems = (items, filter) => {
    return items.filter((item) => {
      item = item.toJSON();
      const itemData = `${item.title.toLowerCase()} ${item.author.toLowerCase()} ${item.pages} ${item.publicationYear}`;
      return itemData.includes(filter.toLowerCase());
    });
  };

  return (
    <View style={{ backgroundColor: GlobalStyles.Colors.backgrounds.DARKEST, flex: 1 }}>
      <FlatList
        data={filterItems(books, search)}
        renderItem={renderBooks}
        keyExtractor={(item) => {
          return item.id;
        }}
        ListHeaderComponent={<SearchBar placeholder="Search here..." value={search} darkTheme round onChangeText={setSearch} autoCorrect={false} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: GlobalStyles.Colors.backgrounds.LIGHTEST,
    borderRadius: 20,
    padding: 10,
  },
  swipeButtons: {
    height: "100%",
    borderRadius: 10,
    width: "18%",
    justifyContent: "center",
    alignItems: "center",
  },
});
