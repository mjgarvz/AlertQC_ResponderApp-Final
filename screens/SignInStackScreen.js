import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import SignInScreen from "./SignInScreen";
import MainTabScreen from "./MainTabScreen";
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
    <SignInStack.Screen name="MainTab" component={MainTabScreen} />
  </SignInStack.Navigator>
);
export default SignInStackScreen;
