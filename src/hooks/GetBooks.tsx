import { useEffect } from "react";
import database from "@react-native-firebase/database";
import { Authentication } from "../hooks/Authentication";

interface IBookApiProp {
  libraryName: string;
  setBooks?: any;
  setBook?: any;
  bookID?: any;
}

export function GetBooks(props: IBookApiProp) {
  const { libraryName, setBooks } = props;
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
}
