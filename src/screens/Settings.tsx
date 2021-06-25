import * as React from "react";
import { View, Text, TextInput } from "react-native";
import { DeactivatedButton } from "../Components/Buttons";
import * as GlobalStyles from "../styles";
import {Tap} from "../styles/icons";
import {Authentication} from "../managers/Authentication";
import Clipboard from '@react-native-clipboard/clipboard';

export const Settings = () => {
  return (
    <View style={{ backgroundColor: GlobalStyles.Colors.backgrounds.MEDIUMDARK, flex: 1, justifyContent: "center", alignItems: "center" }}>
        <TextInput
        multiline={false}
        textAlign={"center"}
        style={{
          fontSize: 18,
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
          height: 50,
          backgroundColor: GlobalStyles.Colors.backgrounds.MEDIUMDARK,
          color: GlobalStyles.Colors.defaultText.color,
          width: "100%",
        }}
        value={Authentication.getUID()}/>
              <DeactivatedButton style={{ height: 60, width: "80%" }} onPress={() => {
                Clipboard.setString(Authentication.getUID())
              }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Tap />
            <Text style={[{ fontSize: 18, marginLeft: 20, fontWeight: "200" }, GlobalStyles.Colors.defaultText]}>Tap to copy your Share Id</Text>
          </View>
        </DeactivatedButton>
    </View>
  );
};
