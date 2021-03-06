import React, { useEffect, useMemo, useRef, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert } from "react-native";
import database from "@react-native-firebase/database";
import { Authentication } from "../../managers/Authentication";
import * as GlobalStyles from "../../styles";
import { LibraryCard } from "./LibraryCard";
import Swipeable from "../../libraryOverrides/Swipeable";
import * as Icons from "../../styles/icons";
import GUID from "../../managers/GUIDGenerator";
import BottomSheet, { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { getStatusBarHeight } from "react-native-status-bar-height";
import NewLibrary from "./NewLibrary";
import RenderHeader from "../BottomSheet/BottomSheetHeader";
import { BlueButton } from "../Buttons";
import { DeleteLibrary } from "../../managers/LibraryManager";
import { AddSharedLibrary } from "../../managers/SharedLibraries";
import ShareLibrary from "./ShareLibrary";

interface IProp {
  navigation: any;
  route: any;
}

export default function Library(props: IProp) {
  const { navigation } = props;
  const [libraries, setLibraries] = useState([]);
  const [shareContext, setShareContext] = useState<string>("");

  const bottomSheetRef = useRef<BottomSheet>(null);
  const bottomSheetRefNew = useRef<BottomSheetModal>(null);
  const bottomSheetRefShare = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => [0, "100%"], []);
  const snapPointsShare = useMemo(() => [0, "100%"], []);
  const snapPointsNew = useMemo(() => [getStatusBarHeight() >= 44 ? "10%" : "12%", "100%"], []);

  useEffect(() => {
    const onValueChange = database()
      .ref(`/libraries/${Authentication.getUID()}/`)
      .on("value", (snapshot) => {
        const data = snapshot;
        const tempLib = [];

        data.forEach(item => {
          tempLib.push(item);
          //console.log(item)
        });
        setLibraries(tempLib);
      });

    // Stop listening for updates when no longer required
    return () => database().ref(`/users/${Authentication.getUID()}`).off("value", onValueChange);
  }, [Authentication.getUID()]);

  const renderLibrary = ( {item} ) => {
    const rightButtonsProps: IRightButtons = {
      libraryName: item.toJSON().metaData.libraryGUID,
      bottomSheetRefShare,
      setShareContext
    }
    return (
      <View style={{ height: 335 }}>
        <Swipeable rightButtons={RightButtons (rightButtonsProps)}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Books", { libraryName: `${item.key}` });
            }}>
            <LibraryCard {...item} />
          </TouchableOpacity>
        </Swipeable>
      </View>
    );
  };

  return (
    <View style={{}}>
      <FlatList
        style={{ height: "100%" }}
        contentContainerStyle={{ paddingBottom: "30%" }}
        data={libraries}
        renderItem={renderLibrary}
        keyExtractor={(item, index) => {
          return item.key;
        }}
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{
                height: 20,
                width: "100%",
              }}
            />
          );
        }}
      />
      <BottomSheet
        backgroundComponent={() => <View></View>}
        style={{ backgroundColor: GlobalStyles.Colors.backgrounds.LIGHTEST }}
        ref={bottomSheetRefNew}
        index={0}
        snapPoints={snapPointsNew}
        handleComponent={() => <RenderHeader />}>
        <View style={{ paddingHorizontal: 16, backgroundColor: GlobalStyles.Colors.backgrounds.LIGHTEST, flex: 1 }}>
          <View style={{ marginBottom: 30 }}>
            <BlueButton
              style={{ height: 60 }}
              onPress={() => {
                bottomSheetRef.current.expand();
              }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Icons.Library />
                <Text style={[{ fontSize: 18, marginLeft: 20, fontWeight: "200" }, GlobalStyles.Colors.defaultText]}>Add New Library</Text>
              </View>
            </BlueButton>
          </View>
        </View>
      </BottomSheet>
      <BottomSheet
        backgroundComponent={() => <View></View>}
        style={{ backgroundColor: GlobalStyles.Colors.backgrounds.LIGHTEST }}
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        handleComponent={() => <RenderHeader />}>
        <View style={{ paddingHorizontal: 16, backgroundColor: GlobalStyles.Colors.backgrounds.LIGHTEST, flex: 1 }}>
          <NewLibrary {...{ bottomSheetRef }} />
        </View>
      </BottomSheet>
      <BottomSheet
        backgroundComponent={() => <View></View>}
        style={{ backgroundColor: GlobalStyles.Colors.backgrounds.LIGHTEST }}
        ref={bottomSheetRefShare}
        index={0}
        snapPoints={snapPointsShare}
        handleComponent={() => <RenderHeader />}>
        <View style={{ paddingHorizontal: 16, backgroundColor: GlobalStyles.Colors.backgrounds.LIGHTEST, flex: 1 }}>
          <View style={{ marginBottom: 30 }}>
            <ShareLibrary {...{ bottomSheetRef: bottomSheetRefShare, libraryGUID: shareContext}}/>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
}

interface IRightButtons {
  libraryName: string;
  bottomSheetRefShare: any;
  setShareContext(arg0: string): void;
}
  const RightButtons = (props: IRightButtons) => {
    const { libraryName, bottomSheetRefShare, setShareContext } = props;
    return [
      <TouchableOpacity
        onPress={() => {
          Alert.alert("Confirm Delete", "Are you sure you want to delete this entire library?", [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "Yes",
              onPress: () => {
                const libraryManagerProp = { libraryName };
                DeleteLibrary(libraryManagerProp);
              },
            },
          ]);
        }}
        style={[{ backgroundColor: GlobalStyles.Colors.buttons.RED }, styles.swipeButtons]}>
        <Icons.Delete />
      </TouchableOpacity>,
      <TouchableOpacity onPress={() => {
        setShareContext(libraryName)
        setTimeout(() => {
              bottomSheetRefShare.current.expand()
        }, 200);
      }} style={[{ backgroundColor: GlobalStyles.Colors.buttons.BLUE }, styles.swipeButtons]}>
        <Icons.Share />
      </TouchableOpacity>,
    ];
  }

const styles = StyleSheet.create({
  swipeButtons: {
    height: "100%",
    borderRadius: 10,
    width: "18%",
    justifyContent: "center",
    alignItems: "center",
  },
});
