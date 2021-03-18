import database from "@react-native-firebase/database";
import { Authentication } from "./Authentication";
import GUID from "../hooks/GUIDGenerator";

interface IBookApiProp {
  libraryName: string;
  bookID?: string;
  bookData?: IForm;
  dateAdded?: any;
}

interface IForm {
  author: string;
  genre: string;
  pages: string;
  publicationYear: string;
  title: string;
}

export default function UpdateBook(props: IBookApiProp) {
  const { libraryName, bookID, bookData, dateAdded } = props;
  const { author, genre, pages, publicationYear, title } = bookData;
  const index = bookID;
  const reference = `/libraries/${Authentication.getUID()}/${libraryName}/books/${bookID}/`;
  database().ref(reference).update({ author, genre, pages, publicationYear, title, index });
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
  const { libraryName, bookData } = props;
  const { author, genre, pages, publicationYear, title } = bookData;
  const dateAdded = Date.now();
  const index = GUID();
  const countReference = `/libraries/${Authentication.getUID()}/${libraryName}/metaData`;

  database()
    .ref(countReference)
    .once("value", (snapshotSize) => {
      const size = snapshotSize.toJSON()["size"] + 1;
      database().ref(countReference).update({ size });

      const reference = `/libraries/${Authentication.getUID()}/${libraryName}/books/${index}/`;
      database().ref(reference).update({ author, genre, pages, publicationYear, title, dateAdded, index });
    });
}
