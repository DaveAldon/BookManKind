import database from "@react-native-firebase/database";
import { Authentication } from "./Authentication";

interface IBookApiProp {
  libraryName: string;
  bookID: string;
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
  const reference = `/libraries/${Authentication.getUID()}/${libraryName}/books/${bookID}/`;

  database().ref(reference).update({ author, genre, pages, publicationYear, title });
}

export function DeleteBook(props: IBookApiProp) {
  const { libraryName, bookID } = props;
  const reference = `/libraries/${Authentication.getUID()}/${libraryName}/books/${bookID}/`;

  database().ref(reference).remove();
}
