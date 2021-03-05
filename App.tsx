import "react-native-gesture-handler";
import * as React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { Login } from "./src/screens/Login";
import { Home } from "./src/screens/Home";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";

interface IProp {
  navigation: any;
  route: any;
}

let initialRender = true;
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerContainer() {
  return (
    <Drawer.Navigator
      initialRouteName="Login"
      drawerType="slide"
      drawerContent={(props) => {
        // If you don't cancel the initial render, the drawer will flash on the screen
        if (initialRender) {
          initialRender = false;
          return null;
        }
        return (
          <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1, flexDirection: "column", justifyContent: "space-between", paddingTop: 50 }}>
            <View style={{ flex: 1, flexDirection: "column", justifyContent: "flex-start" }}>
              <DrawerItem labelStyle={[{}]} label="Home" onPress={() => props.navigation.navigate("Home")} icon={() => <Feather name="monitor" size={30} color="black" />} />
              <DrawerItem
                labelStyle={[{}]}
                label="Logout"
                onPress={() => {
                  props.navigation.closeDrawer();
                  props.navigation.navigate("Login");
                }}
                icon={() => <AntDesign name="logout" size={30} />}
              />
            </View>
          </DrawerContentScrollView>
        );
      }}>
      <Drawer.Screen name="Login">{(props: IProp) => <Login {...props} />}</Drawer.Screen>
      <Drawer.Screen name="Home">{(props: IProp) => <Home {...props} />}</Drawer.Screen>
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={{ height: "100%" }}>
        <Stack.Navigator initialRouteName="Drawer">
          <Stack.Screen name="Login" component={Login} options={{ headerShown: true }} />
          <Stack.Screen name="Drawer" component={DrawerContainer} options={{ headerShown: false }} />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}
