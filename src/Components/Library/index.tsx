import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import database from "@react-native-firebase/database";
import { Authentication } from "../../hooks/Authentication";
import * as GlobalStyles from "../../styles";
import { LibraryCard } from "./LibraryCard";
import Swipeable from "../../libraryOverrides/Swipeable";
import * as Icons from "../../styles/icons";
import GUID from "../../hooks/GUIDGenerator";

interface IProp {
  navigation: any;
  route: any;
}

function createLibrary(name: string) {
  const username = Authentication.getUID();
  const path = `/libraries/${username}/${name}`;
  const sampleGUIDs = {
    one: GUID(),
    two: GUID(),
    three: GUID(),
  };
  database()
    .ref(path)
    .update({
      admins: [{ uid: Authentication.getUID(), email: Authentication.getUser().user.email }],
      metaData: {
        createdOn: new Date().getTime(),
        size: 3,
      },
      books: {
        [sampleGUIDs.one]: {
          title: "Ben Hur",
          author: "Lewis Wallace",
          publicationYear: "1880",
          pages: 342,
          genre: "Historical Fiction",
          index: sampleGUIDs.one,
          dateAdded: Date.now(),
        },
        [sampleGUIDs.two]: {
          title: "Owd Bob: the grey dog of Kenmuir",
          author: "Alfred Ollivant",
          publicationYear: "1898",
          pages: 320,
          genre: "Fiction",
          index: sampleGUIDs.two,
          dateAdded: Date.now(),
        },
        [sampleGUIDs.three]: {
          title: "Dulce Domum",
          author: "John Francis O'Donnell",
          publicationYear: "1861",
          pages: "",
          genre: "",
          index: sampleGUIDs.three,
          dateAdded: Date.now(),
        },
      },
    })
    .then(() => console.log("Data updated."));
}

interface ILibrary {
  name: string;
  admins: Array<any>;
}

export default function Library(props: IProp) {
  const { navigation } = props;
  const [libraries, setLibraries] = useState([]);

  useEffect(() => {
    const onValueChange = database()
      .ref(`/libraries/${Authentication.getUID()}/`)
      .on("value", (snapshot) => {
        const data = snapshot;
        const tempLib = [];

        data.forEach(function (item) {
          tempLib.push(item);
        });
        setLibraries(tempLib);
      });
    // Stop listening for updates when no longer required
    return () => database().ref(`/users/${Authentication.getUID()}`).off("value", onValueChange);
  }, [Authentication.getUID()]);

  const rightButtons = [
    <TouchableOpacity style={[{ backgroundColor: GlobalStyles.Colors.buttons.RED }, styles.swipeButtons]}>
      <Icons.Delete />
    </TouchableOpacity>,
    <TouchableOpacity style={[{ backgroundColor: GlobalStyles.Colors.buttons.BLUE }, styles.swipeButtons]}>
      <Icons.Share />
    </TouchableOpacity>,
  ];

  const renderLibrary = ({ item }) => (
    <Swipeable rightButtons={rightButtons}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Books", { libraryName: `${item.key}` });
        }}>
        <LibraryCard {...item} />
      </TouchableOpacity>
    </Swipeable>
  );

  return (
    <View>
      <Text style={GlobalStyles.Colors.defaultText}>Library</Text>
      <TouchableOpacity
        style={GlobalStyles.default.primaryButton}
        onPress={() => {
          createLibrary("myLibrary");
        }}>
        <Text style={GlobalStyles.Colors.defaultText}>Create Library</Text>
      </TouchableOpacity>
      <FlatList
        data={libraries}
        renderItem={renderLibrary}
        keyExtractor={(item, index) => {
          return item.key;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  swipeButtons: {
    height: "100%",
    borderRadius: 10,
    width: "18%",
    justifyContent: "center",
    alignItems: "center",
  },
});
