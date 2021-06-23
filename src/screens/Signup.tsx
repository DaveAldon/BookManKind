import * as React from "react";
import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Authentication } from "../managers/Authentication";
import { BasicInput } from "../Components/Inputs";
import { BlueButton, GreenButton, DeactivatedButton } from "../Components/Buttons";
import * as GlobalStyles from "../styles";

interface IProp {
  navigation: any;
  route: any;
}

export const Signup = (props: IProp) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View style={{ justifyContent: "center", alignItems: "center", backgroundColor: GlobalStyles.Colors.backgrounds.LIGHTEST, flex: 1 }}>
      <View style={styles.inputGroup}>
        <BasicInput {...{ value: email, placeholder: "Tap to enter email...", updateFunction: setEmail }} />
        <BasicInput {...{ value: password, placeholder: "Tap to enter password...", updateFunction: setPassword }} />
      </View>
      <View style={styles.inputGroup}>
        <GreenButton
          style={styles.button}
          onPress={() => {
            Authentication.signUp(email, password);
          }}>
          <Text style={[styles.buttonText, GlobalStyles.default.primaryButtonText]}>Sign Up</Text>
        </GreenButton>
        <BlueButton
          style={styles.button}
          onPress={() => {
            props.navigation.navigate("Login");
          }}>
          <Text style={[styles.buttonText, GlobalStyles.default.primaryButtonText]}>Cancel</Text>
        </BlueButton>
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
  button: {
    height: 60,
    width: "100%",
    marginVertical: 5,
  },
  buttonText: {
    fontSize: 20,
  },
});
