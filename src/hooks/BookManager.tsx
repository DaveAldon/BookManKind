import database from "@react-native-firebase/database";
import { Authentication } from "./Authentication";
import GUID from "../hooks/GUIDGenerator";

interface IBookApiProp {
  libraryName: string;
  bookID?: string;
  bookData?: IForm;
}

interface IForm {
  author: string;
  genre: string;
  pages: string;
  publicationYear: string;
  title: string;
}

export default function UpdateBook(props: IBookApiProp) {
  const { libraryName, bookID, bookData } = props;
  const { author, genre, pages, publicationYear, title } = bookData;
  const index = bookID;
  const dateAdded = Date.now();
  console.log(dateAdded);
  const reference = `/libraries/${Authentication.getUID()}/${libraryName}/books/${bookID}/`;
  database().ref(reference).update({ author, genre, pages, publicationYear, title, index, dateAdded });
}

export function DeleteBook(props: IBookApiProp) {
  const { libraryName, bookID } = props;
  const reference = `/libraries/${Authentication.getUID()}/${libraryName}/books/${bookID}/`;
  database().ref(reference).remove();

  const countReference = `/libraries/${Authentication.getUID()}/${libraryName}/metaData`;
  database()
    .ref(countReference)
    .once("value", (snapshotSize) => {
      const size = snapshotSize.toJSON()["size"] - 1;
      database().ref(countReference).update({ size });
    });
}

export function NewBook(props: IBookApiProp) {
  const { libraryName } = props;
  const countReference = `/libraries/${Authentication.getUID()}/${libraryName}/metaData`;
  database()
    .ref(countReference)
    .once("value", (snapshotSize) => {
      const size = snapshotSize.toJSON()["size"] + 1;
      database().ref(countReference).update({ size });

      const updateProp: IBookApiProp = {
        ...props,
        bookID: GUID(),
      };
      UpdateBook(updateProp);
    });

  /* const newBookProp = {
    ...props,
    bookID
  }
  UpdateBook(props); */
}
