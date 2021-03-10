import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import database from "@react-native-firebase/database";
import { Authentication } from "../../hooks/Authentication";
import * as GlobalStyles from "../../styles";
import { LibraryCard } from "./LibraryCard";

interface IProp {
  navigation: any;
  route: any;
}

function createLibrary(name: string) {
  const username = Authentication.getUID();
  const path = `/libraries/${username}/${name}`;
  database()
    .ref(path)
    .update({
      admins: [{ uid: Authentication.getUID(), email: Authentication.getUser().user.email }],
      books: [{}],
    })
    .then(() => console.log("Data updated."));
}

interface ILibrary {
  name: string;
  admins: Array<any>;
}

export default function Library(props: IProp) {
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
      <View>
        {libraries.map((library) => {
          console.log(library);
          //return <Text>{library.key}</Text>;
          return <LibraryCard {...library} />;
        })}
      </View>
    </View>
  );
}
