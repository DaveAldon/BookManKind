import database from "@react-native-firebase/database";
import { Authentication } from "../hooks/Authentication";

export function CreateLibrary(name: string) {
  const username = Authentication.getUID();
  const path = `/libraries/${username}/${name}`;
  database()
    .ref(path)
    .update({
      admins: [{ uid: Authentication.getUID(), email: Authentication.getUser().user.email }],
      metaData: {
        createdOn: new Date().getTime(),
        size: 0,
        name,
      },
      books: {},
    })
    .then(() => {});
}
