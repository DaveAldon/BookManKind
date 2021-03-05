import React, { useEffect } from "react";
import { View, Text } from "react-native";
import database from "@react-native-firebase/database";

const reference = database().ref("/users/123");

interface IProp {
  navigation: any;
  route: any;
}

database()
  .ref("/users/123")
  .on("value", (snapshot) => {
    console.log("User data: ", snapshot.val());
  });

function User({ userId }) {
  useEffect(() => {
    const onChildAdd = database()
      .ref("/users")
      .on("child_added", (snapshot) => {
        console.log("A new node has been added", snapshot.val());
      });

    // Stop listening for updates when no longer required
    return () => database().ref("/users").off("child_added", onChildAdd);
  }, [userId]);
}

export default function Library(props: IProp) {
  return (
    <View>
      <Text>Library</Text>
    </View>
  );
}
