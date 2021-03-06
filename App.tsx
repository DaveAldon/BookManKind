import "react-native-gesture-handler";
import * as React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { Login } from "./src/screens/Login";
import { Signup } from "./src/screens/Signup";
import { Home } from "./src/screens/Home";
import { useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";
import { Authentication } from "./src/managers/Authentication";
import * as GlobalStyles from "./src/styles";
import { Books } from "./src/Components/Books";
import { Logout, Library, Settings as SettingsIcon } from "./src/styles/icons";
import { Settings } from "./src/screens/Settings";
import useRotation from "./src/Components/hooks/useRotation";
import Animated from "react-native-reanimated";

let initialRender = true;
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerContainer() {
  const rotate = useRotation();
    const animatedStyle = { transform: [ { rotate } ] };
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
          <DrawerContentScrollView
            {...props}
            contentContainerStyle={{ flex: 1, flexDirection: "column", justifyContent: "space-between", paddingTop: 50, backgroundColor: GlobalStyles.Colors.backgrounds.DARKEST }}>
            <View style={{ flex: 1, flexDirection: "column", justifyContent: "flex-start" }}>
              <DrawerItem labelStyle={styles.text} label="Home" onPress={() => props.navigation.navigate("Home")} icon={() => <Library />} />
              <DrawerItem
                labelStyle={styles.text}
                label="Settings"
                onPress={() => {
                  props.navigation.navigate("Settings")
                }}
                icon={() => <SettingsIcon animated={true} />}
              />
              <DrawerItem
                labelStyle={styles.text}
                label="Logout"
                onPress={() => {
                  props.navigation.closeDrawer();
                  Authentication.logout();
                }}
                icon={() => <Logout />}
              />
            </View>
          </DrawerContentScrollView>
        );
      }}>
      <Drawer.Screen name="Home" component={LibraryStack} />
      <Drawer.Screen name="Settings" component={Settings} />
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
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
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

const styles = StyleSheet.create({
  text: { color: GlobalStyles.Colors.defaultText.color, fontSize: 16 },
});
