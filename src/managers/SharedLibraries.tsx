import database from "@react-native-firebase/database";
import { Authentication } from "./Authentication";
import GUID from "./GUIDGenerator";

export function RegisterUserSharedLibrary() {
  const path = `/usersShare/${Authentication.getUID()}`;
  database()
    .ref(path)
    .update({
      sharedLibraries: [],
      metaData: {
        createdOn: new Date().getTime(),
      },
    })
    .then(() => {});
}

export function AddSharedLibrary(name: string) {
  const path = `/usersShare/${Authentication.getUID()}/sharedLibraries`;
  database()
    .ref(path)
    .update({
      sharedLibraries: [],
      metaData: {
        createdOn: new Date().getTime(),
      },
    })
    .then(() => {});
}
