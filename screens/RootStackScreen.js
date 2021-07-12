import React from "react";

import {
  createStackNavigator,
} from "@react-navigation/stack";


const RootStack = createStackNavigator();
import SignInStackScreen from "./SignInStackScreen";

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
