import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import database from "@react-native-firebase/database";
import { Authentication } from "../hooks/Authentication";
import styles from "../styles";

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
        console.log(snapshot.val());
      });

    // Stop listening for updates when no longer required
    return () => database().ref(`/users/${Authentication.getUID()}`).off("value", onValueChange);
  }, [Authentication.getUID()]);
  return (
    <View>
      <Text>Library</Text>
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => {
          createLibrary("myLibrary");
        }}>
        <Text style={styles.primaryButtonText}>Create Library</Text>
      </TouchableOpacity>
    </View>
  );
}
