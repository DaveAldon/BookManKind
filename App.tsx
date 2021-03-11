import "react-native-gesture-handler";
import * as React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { Login } from "./src/screens/Login";
import { Signup } from "./src/screens/Signup";
import { Home } from "./src/screens/Home";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import { useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";
import { Authentication } from "./src/hooks/Authentication";
import * as GlobalStyles from "./src/styles";
import { Books } from "./src/Components/Books";

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
      initialRouteName="Home"
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
                  Authentication.logout();
                }}
                icon={() => <AntDesign name="logout" size={30} />}
              />
            </View>
          </DrawerContentScrollView>
        );
      }}>
      <Drawer.Screen name="Home" component={LibraryStack} />
    </Drawer.Navigator>
  );
}

export default function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      <SafeAreaView style={{ height: "100%", backgroundColor: GlobalStyles.Colors.backgrounds.DARKEST }}>
        {user ? (
          <Stack.Navigator initialRouteName="Drawer">
            <Stack.Screen name="Drawer" component={DrawerContainer} options={{ headerShown: false }} />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} options={{ headerShown: true }} />
            <Stack.Screen name="Signup" component={Signup} options={{ headerShown: true }} />
          </Stack.Navigator>
        )}
      </SafeAreaView>
    </NavigationContainer>
  );
}

const LibraryStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Library" component={Home} options={{ headerShown: false }} />
      <Stack.Screen
        name="Books"
        component={Books}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: GlobalStyles.Colors.backgrounds.DARKEST,
          },
          headerTitleStyle: {
            color: GlobalStyles.Colors.defaultText.color,
          },
        }}
      />
    </Stack.Navigator>
  );
};
