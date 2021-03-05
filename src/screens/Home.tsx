import * as React from "react";
import { View, Text, SafeAreaView } from "react-native";

interface IProp {
  navigation: any;
  route: any;
}

export const Home = (props: IProp) => {
  return (
    <View>
      <Text>Home Page</Text>
    </View>
  );
};
