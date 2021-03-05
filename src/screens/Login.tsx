import * as React from "react";
import { View, Text, SafeAreaView } from "react-native";

interface IProp {
  navigation: any;
  route: any;
}

export const Login = (props: IProp) => {
  return (
    <View>
      <Text>Login Page</Text>
    </View>
  );
};
