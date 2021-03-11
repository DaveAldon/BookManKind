import { useEffect } from "react";
import database from "@react-native-firebase/database";
import { Authentication } from "../hooks/Authentication";

interface IBookApiProp {
  libraryName: string;
  setBooks: any;
}

export function GetBooks(props: IBookApiProp) {
  const { libraryName, setBooks } = props;
  useEffect(() => {
    const onValueChange = database()
      .ref(`/libraries/${Authentication.getUID()}/${libraryName}/books/`)
      .on("value", (snapshot) => {
        console.log(snapshot);
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

  return [
    { id: "1", name: "book1" },
    { id: "2", name: "book2" },
  ];
}
