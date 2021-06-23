import database from "@react-native-firebase/database";
import { Authentication } from "./Authentication";

interface IBookApiProp {
  libraryName: string;
}

export function DeleteLibrary(props: IBookApiProp) {
                  console.log("asdasd")

  const { libraryName } = props;
  const reference = `/libraries/${Authentication.getUID()}/${libraryName}`;
  database().ref(reference).remove();
}
