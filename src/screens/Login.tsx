import * as React from "react";
import { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { Authentication } from "../hooks/Authentication";
import styles from "../styles";

interface IProp {
  navigation: any;
  route: any;
}

export const Login = (props: IProp) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View>
      <TextInput placeholder={"Email"} onChangeText={(text: string) => setEmail(text)} value={email}></TextInput>
      <TextInput placeholder={"Password"} onChangeText={(text: string) => setPassword(text)} value={password}></TextInput>
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => {
          Authentication.login(email, password);
        }}>
        <Text style={styles.primaryButtonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => {
          props.navigation.navigate("Signup");
        }}>
        <Text style={styles.primaryButtonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};
