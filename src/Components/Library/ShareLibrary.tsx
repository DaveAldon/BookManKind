import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as GlobalStyles from "../../styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import InputBlock, { IInputProp } from "./Input";
import { GreenButton, DeactivatedButton } from "../Buttons";
import * as Icons from "../../styles/icons";
import { CreateLibrary } from "../../managers/CreateLibrary";
import { AddSharedLibrary } from "../../managers/SharedLibraries";

interface IProp {
  bottomSheetRef: any;
  libraryGUID: string;
}

export default function renderContent(props: IProp) {
  const { bottomSheetRef, libraryGUID } = props;
  const [canSubmit, setCanSubmit] = useState(false);
  const [email, setEmail] = useState<string>("");

  const updateForm = (value) => {
    setEmail(value);
  };

  useEffect(() => {
    setCanSubmit(email.length === 28);
  }, [email]);

  function ResetForm() {
    setEmail("");
  }

  const inputProp: IInputProp = {
    name: email,
    updateForm,
    inputTitle: "Share Id"
  };

  return (
    <View>
      <View style={{ backgroundColor: GlobalStyles.Colors.backgrounds.LIGHTEST, paddingVertical: 5, paddingBottom: 20 }}>
        <InputBlock {...inputProp} />
      </View>
      {canSubmit ? (
        <GreenButton
          style={{ height: 60 }}
          onPress={() => {
            bottomSheetRef.current.snapTo(0);
            setTimeout(() => {
              AddSharedLibrary(libraryGUID)
              ResetForm();
            }, 1000);
          }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icons.Done />
            <Text style={[{ fontSize: 18, marginLeft: 20, fontWeight: "200" }, GlobalStyles.Colors.defaultText]}>Share!</Text>
          </View>
        </GreenButton>
      ) : (
        <DeactivatedButton style={{ height: 60 }} onPress={() => {}}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icons.Thinking />
            <Text style={[{ fontSize: 18, marginLeft: 20, fontWeight: "200" }, GlobalStyles.Colors.defaultText]}>Enter a Share Id to share your library</Text>
          </View>
        </DeactivatedButton>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
