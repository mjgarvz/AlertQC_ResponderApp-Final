import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SimpleLineIcons } from "@expo/vector-icons";

import SignInScreen from "./SignInScreen";
import MainTabScreen from "./MainTabScreen";
import HomeScreen from "./HomeScreen";
const SignInStack = createStackNavigator();

const SignInStackScreen = ({ navigation }) => (
  <SignInStack.Navigator
    screenOptions={{
      headerShown: false,
      headerStyle: {
        backgroundColor: "#FF8000",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <SignInStack.Screen
      name="SignIn"
      component={SignInScreen}
      options={{
        title: "Sign In",
        headerTitleAlign: "center",
      }}
    />
    <SignInStack.Screen name="MainTab" component={HomeScreen} />
  </SignInStack.Navigator>
);
export default SignInStackScreen;
