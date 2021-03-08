import * as React from "react";
import { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import styles from "../styles";
import { Authentication } from "../hooks/Authentication";
interface IProp {
  navigation: any;
  route: any;
}

export const Signup = (props: IProp) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View>
      <TextInput placeholder={"Email"} onChangeText={(text: string) => setEmail(text)} value={email}></TextInput>
      <TextInput placeholder={"Password"} onChangeText={(text: string) => setPassword(text)} value={password}></TextInput>
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => {
          Authentication.signUp(email, password);
        }}>
        <Text style={styles.primaryButtonText}>Signup</Text>
      </TouchableOpacity>
    </View>
  );
};
