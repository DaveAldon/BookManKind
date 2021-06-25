import auth from "@react-native-firebase/auth";
import {RegisterUserSharedLibrary} from "./SharedLibraries";

function getUID() {
  return Authentication.getUser().user.uid;
}

function signUp(username: string, password: string) {
  auth()
    .createUserWithEmailAndPassword(username, password)
    .then(() => {
      RegisterUserSharedLibrary()
      console.log("User account created & signed in!");
    })
    .catch((error) => {
      if (error.code === "auth/email-already-in-use") {
        console.log("That email address is already in use!");
      }

      if (error.code === "auth/invalid-email") {
        console.log("That email address is invalid!");
      }

      console.error(error);
    });
}

function login(username: string, password: string) {
  auth()
    .signInWithEmailAndPassword(username, password)
    .then(() => {
      RegisterUserSharedLibrary()
      console.log("User account signed in!");
    })
    .catch((error) => {
      if (error.code === "auth/user-not-found") {
        console.log("Invalid credentials");
      } else if (error.code === "auth/invalid-email") {
        console.log("That email address is invalid!");
      } else console.error(error);
    });
}

function logout() {
  auth()
    .signOut()
    .then(() => console.log("User signed out!"));
}

function getUser() {
  return {
    user: auth().currentUser || "",
  };
}

export const Authentication = { login, signUp, logout, getUser, getUID };
