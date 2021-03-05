import * as React from "react";
import { View, Text } from "react-native";
import Library from "../Components/Library";

interface IProp {
  navigation: any;
  route: any;
}

export const Home = (props: IProp) => {
  return (
    <View>
      <Text>Home Page</Text>
      <Library {...props} />
    </View>
  );
};
