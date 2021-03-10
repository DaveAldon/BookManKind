import * as React from "react";
import { View, Text } from "react-native";
import Library from "../Components/Library";
import * as GlobalStyles from "../styles";

interface IProp {
  navigation: any;
  route: any;
}

export const Home = (props: IProp) => {
  return (
    <View style={{ backgroundColor: GlobalStyles.Colors.backgrounds.DARKEST, flex: 1 }}>
      <Text style={GlobalStyles.Colors.defaultText}>Home Page</Text>
      <Library {...props} />
    </View>
  );
};
