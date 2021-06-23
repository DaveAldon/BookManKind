import * as React from "react";
import { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { Authentication } from "../managers/Authentication";
import * as GlobalStyles from "../styles";
import { BlueButton, DeactivatedButton } from "../Components/Buttons";
import { BasicInput } from "../Components/Inputs";

interface IProp {
  navigation: any;
  route: any;
}

export const Login = (props: IProp) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={{ justifyContent: "center", alignItems: "center", backgroundColor: GlobalStyles.Colors.backgrounds.LIGHTEST, flex: 1 }}>
      <View style={{ justifyContent: "center", width: "100%", alignItems: "center", height: "25%" }}>
        <View style={styles.inputGroup}>
          <BasicInput {...{ value: email, placeholder: "Tap to enter email...", updateFunction: setEmail }} />
          <BasicInput {...{ value: password, placeholder: "Tap to enter password...", updateFunction: setPassword }} />
        </View>
        <View style={styles.inputGroup}>
          <BlueButton
            style={styles.button}
            onPress={() => {
              Authentication.login(email, password);
            }}>
            <Text style={[styles.buttonText, GlobalStyles.default.primaryButtonText]}>Login</Text>
          </BlueButton>
          <BlueButton
            style={styles.button}
            onPress={() => {
              props.navigation.navigate("Signup");
            }}>
            <Text style={[styles.buttonText, GlobalStyles.default.primaryButtonText]}>Sign Up</Text>
          </BlueButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputGroup: {
    backgroundColor: GlobalStyles.Colors.backgrounds.MEDIUMDARK,
    alignItems: "center",
    width: "80%",
    borderRadius: 10,
    margin: 10,
    padding: 20,
  },
  input: {
    fontSize: 20,
    borderRadius: 10,
    height: 60,
    backgroundColor: GlobalStyles.Colors.backgrounds.DARKEST,
    color: GlobalStyles.Colors.defaultText.color,
    width: "100%",
    marginVertical: 5,
  },
  button: {
    height: 60,
    width: "100%",
    marginVertical: 5,
  },
  buttonText: {
    fontSize: 20,
  },
});
