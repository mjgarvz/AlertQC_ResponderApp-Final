import React from "react";

import {
  createStackNavigator,
  createDrawerNavigator,
} from "@react-navigation/stack";

import CallButton from "../components/ButtonBasic";
import { SimpleLineIcons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from "react-native";

import SignInScreen from "./SignInScreen";
import MainTabScreen from "./MainTabScreen";
const IncidentStack = createStackNavigator();
const MapStack = createStackNavigator();
const ChatStack = createStackNavigator();
const SignInStack = createStackNavigator();

const RootStack = createStackNavigator();
import SignInStackScreen from "./SignInStackScreen";
import IncidentScreen from "./IncidentScreen";

const RootStackScreen = ({ navigation }) => (
  <RootStack.Navigator screenOptions={{ headerShown: false }}>
    <RootStack.Screen
      name="Responder App"
      component={SignInStackScreen}
      options={{}}
    ></RootStack.Screen>
  </RootStack.Navigator>
);

export default RootStackScreen;
