import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert, FlatList, StyleSheet } from "react-native";
import * as GlobalStyles from "../../styles";
import Swipeable from "../../libraryOverrides/Swipeable";
import * as Icons from "../../styles/icons";
import { Book } from "./Book";
import database from "@react-native-firebase/database";
import { Authentication } from "../../hooks/Authentication";
import { SearchBar } from "react-native-elements";
import BottomSheet from "reanimated-bottom-sheet";
import EditBook from "./EditBook";
import { DeleteBook } from "../../hooks/BookManager";

interface IBookApiProp {
  libraryName: string;
  bookID: string;
}

export function Books(props: any) {
  const { libraryName } = props.route.params;
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const bottomSheetRef = React.useRef(null);
  const [bookContext, setBookContext] = useState(null);

  const rightButtons = ({ item }) => {
    return [
      <TouchableOpacity
        style={[{ backgroundColor: GlobalStyles.Colors.buttons.RED }, styles.swipeButtons]}
        onPress={() => {
          Alert.alert("Confirm Delete", "Are you sure you want to delete this book?", [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "Yes",
              onPress: () => {
                const deleteBookProp: IBookApiProp = {
                  libraryName,
                  bookID: item._snapshot.value.index.toString(),
                };
                DeleteBook(deleteBookProp);
              },
            },
          ]);
        }}>
        <Icons.Delete />
      </TouchableOpacity>,
      <TouchableOpacity
        style={[{ backgroundColor: GlobalStyles.Colors.buttons.BLUE }, styles.swipeButtons]}
        onPress={() => {
          bottomSheetRef.current.snapTo(1);
          setBookContext({ ...item });
          setTimeout(() => {
            bottomSheetRef.current.snapTo(0);
          }, 100);
        }}>
        <Icons.Edit />
      </TouchableOpacity>,
    ];
  };

  const renderBooks = ({ item, index }) => {
    return (
      <Swipeable rightButtons={rightButtons({ ...{ item, index } })}>
        <Book key={index} {...item} />
      </Swipeable>
    );
  };

  useEffect(() => {
    const onValueChange = database()
      .ref(`/libraries/${Authentication.getUID()}/${libraryName}/books/`)
      .on("value", (snapshot) => {
        const data = snapshot;
        const tempLib = [];

        data.forEach(function (item) {
          tempLib.push(item);
          return undefined;
        });
        setBooks(tempLib);
      });
    // Stop listening for updates when no longer required
    return () => database().ref(`/users/${Authentication.getUID()}`).off("value", onValueChange);
  }, [Authentication.getUID()]);

  const filterItems = (items, filter) => {
    const result = items.filter((item) => {
      if (JSON.stringify(item) === "null") return false;
      item = item.toJSON();
      const itemData = `${item.title.toLowerCase()} ${item.author.toLowerCase()} ${item.pages} ${item.publicationYear}`;
      return itemData.includes(filter.toLowerCase());
    });

    return result;
  };

  const editBookProp = {
    bookContext,
    setBookContext,
    bottomSheetRef,
    libraryName,
  };

  return (
    <View style={{ backgroundColor: GlobalStyles.Colors.backgrounds.DARKEST, flex: 1 }}>
      <FlatList
        data={filterItems(books, search)}
        renderItem={renderBooks}
        keyExtractor={(item, index) => {
          return `${index}`;
        }}
        ListHeaderComponent={<SearchBar placeholder="Search here..." value={search} darkTheme round onChangeText={setSearch} autoCorrect={false} />}
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{
                height: 10,
                width: "100%",
              }}
            />
          );
        }}
      />
      <BottomSheet ref={bottomSheetRef} snapPoints={[500, 0]} borderRadius={10} renderContent={() => bookContext && <EditBook {...editBookProp} />} />
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
