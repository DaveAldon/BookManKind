import database from "@react-native-firebase/database";
import { Authentication } from "./Authentication";

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

export function AddSharedLibrary(libraryGUID: string) {
  console.log("poop",libraryGUID)

  
  return
  const userListReference = `/usersShare/${Authentication.getUID()}`;

  database()
    .ref(userListReference)
    .once("value", (snapshotSize) => {
      
      const sharedLibrariesSnapshot = snapshotSize.toJSON()["sharedLibraries"];

      const sharedLibraries: Array<string> = []
      for(let key in sharedLibrariesSnapshot) {
        sharedLibraries.push(sharedLibrariesSnapshot[key])
      }
      sharedLibraries.push(libraryGUID)
      
      database().ref(userListReference).update({ sharedLibraries: [...sharedLibraries] });
 });
}
