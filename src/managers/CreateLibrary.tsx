import database from "@react-native-firebase/database";
import { Authentication } from "./Authentication";
import GUID from "./GUIDGenerator";

export function CreateLibrary(name: string) {
  const libraryGUID = GUID();

  const path = `/libraries/${Authentication.getUID()}/${libraryGUID}`;
  database()
    .ref(path)
    .update({
      admins: [{ uid: Authentication.getUID(), email: Authentication.getUser().user.email }],
      metaData: {
        createdOn: new Date().getTime(),
        size: 0,
        libraryGUID
      },
      name,
      books: {},
    })
    .then(() => {});
}
