import * as React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../styles";

interface IProp {
  navigation: any;
  route: any;
}

export const Login = (props: IProp) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => {
          props.navigation.navigate("Home");
        }}>
        <Text style={styles.primaryButtonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};
