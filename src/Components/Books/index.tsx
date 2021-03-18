import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View, Text, TouchableOpacity, Alert, FlatList, StyleSheet } from "react-native";
import * as GlobalStyles from "../../styles";
import Swipeable from "../../libraryOverrides/Swipeable";
import * as Icons from "../../styles/icons";
import { Book } from "./Book";
import database from "@react-native-firebase/database";
import { Authentication } from "../../hooks/Authentication";
import { SearchBar } from "react-native-elements";
import EditBook from "./EditBook";
import { DeleteBook } from "../../hooks/BookManager";
import BottomSheet from "@gorhom/bottom-sheet";
import RenderHeader from "./BottomSheetHeader";
import { BlueButton } from "../Buttons";
import NewBook from "./NewBook";
import { getStatusBarHeight } from "react-native-status-bar-height";

interface IBookApiProp {
  libraryName: string;
  bookID: string;
}

export function Books(props: any) {
  const { libraryName } = props.route.params;
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [bookContext, setBookContext] = useState(null);

  // Bottomsheet state/hooks
  const bottomSheetRef = useRef<BottomSheet>(null);
  const bottomSheetRefNew = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => [getStatusBarHeight() >= 44 ? "10%" : "12%", "100%"], []);
  const snapPointsNew = useMemo(() => [0, "100%"], []);
  const snapTo = (index: number) => bottomSheetRef.current.snapTo(index);

  const handleSheetChanges = useCallback((index: number) => {
    if (index === 0) setBookContext(null);
  }, []);

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
          updateBottomSheetMode(item);
        }}>
        <Icons.Edit />
      </TouchableOpacity>,
    ];
  };

  const updateBottomSheetMode = (item: any) => {
    snapTo(0);
    setBookContext({ ...item });
    setTimeout(() => {
      snapTo(1);
    }, 200);
  };

  const renderBooks = ({ item, index }) => {
    const updateBottomSheetModeInternal = () => {
      updateBottomSheetMode(item);
    };
    const bookProp = {
      updateBottomSheetModeInternal,
      item,
    };
    return (
      <Swipeable rightButtons={rightButtons({ ...{ item, index } })}>
        <Book key={index} {...bookProp} />
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

    const sortedResult = result.sort((a, b) => {
      console.log("ass", a.toJSON().dateAdded);
      return a.toJSON().dateAdded < b.toJSON().dateAdded;
    });

    return sortedResult;
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
          return item.key;
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

      <BottomSheet
        backgroundComponent={() => <View></View>}
        style={{ backgroundColor: GlobalStyles.Colors.backgrounds.LIGHTEST }}
        ref={bottomSheetRef}
        index={0}
        onChange={handleSheetChanges}
        snapPoints={snapPoints}
        handleComponent={() => <RenderHeader />}>
        <View style={{ paddingHorizontal: 16, backgroundColor: GlobalStyles.Colors.backgrounds.LIGHTEST, flex: 1 }}>
          {!bookContext && (
            <View style={{ marginBottom: 30 }}>
              <BlueButton
                style={{ height: 60 }}
                onPress={() => {
                  bottomSheetRefNew.current.expand();
                }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Icons.Book />
                  <Text style={[{ fontSize: 18, marginLeft: 20, fontWeight: "200" }, GlobalStyles.Colors.defaultText]}>Add New Book</Text>
                </View>
              </BlueButton>
            </View>
          )}
          {bookContext && <EditBook {...editBookProp} />}
        </View>
      </BottomSheet>
      <BottomSheet
        backgroundComponent={() => <View></View>}
        style={{ backgroundColor: GlobalStyles.Colors.backgrounds.LIGHTEST }}
        ref={bottomSheetRefNew}
        index={0}
        snapPoints={snapPointsNew}
        handleComponent={() => <RenderHeader />}>
        <View style={{ paddingHorizontal: 16, backgroundColor: GlobalStyles.Colors.backgrounds.LIGHTEST, flex: 1 }}>
          <NewBook {...{ bottomSheetRefNew, libraryName }} />
        </View>
      </BottomSheet>
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
