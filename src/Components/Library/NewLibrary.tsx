import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as GlobalStyles from "../../styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import InputBlock from "./NewLibraryInput";
import { GreenButton, DeactivatedButton } from "../Buttons";
import * as Icons from "../../styles/icons";
import { CreateLibrary } from "../../managers/CreateLibrary";

interface IInputProp {
  name: string;
  updateForm: any;
}

interface IProp {
  bottomSheetRef: any;
}

export default function renderContent(props: IProp) {
  const { bottomSheetRef } = props;
  const [canSubmit, setCanSubmit] = useState(false);
  const [name, setName] = useState<string>("");

  const updateForm = (value) => {
    setName(value);
  };

  useEffect(() => {
    setCanSubmit(name.length > 0);
  }, [name]);

  function ResetForm() {
    setName("");
  }

  const inputProp: IInputProp = {
    name,
    updateForm,
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
              CreateLibrary(name);
              //console.log(name);
              ResetForm();
            }, 1000);
          }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icons.Done />
            <Text style={[{ fontSize: 18, marginLeft: 20, fontWeight: "200" }, GlobalStyles.Colors.defaultText]}>Done!</Text>
          </View>
        </GreenButton>
      ) : (
        <DeactivatedButton style={{ height: 60 }} onPress={() => {}}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icons.Thinking />
            <Text style={[{ fontSize: 18, marginLeft: 20, fontWeight: "200" }, GlobalStyles.Colors.defaultText]}>Your library needs a name</Text>
          </View>
        </DeactivatedButton>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
