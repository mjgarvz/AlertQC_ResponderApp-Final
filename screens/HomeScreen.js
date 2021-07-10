import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  StyleSheet,
  TextInput,
  View,
  Alert,
  TouchableOpacity,
  Text,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import MainTabScreen from "./MainTabScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";

const SlideDrawer = createDrawerNavigator();
const Drawer = createDrawerNavigator();

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <SlideDrawer.Navigator initialRouteName="SignIn">
        <SlideDrawer.Screen
          name="MainTab"
          component={MainTabScreen}
          options={{ swipeEnabled: false }}
        />
      </SlideDrawer.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    margin: 10,
  },

  TextInputStyleClass: {
    textAlign: "center",
    marginBottom: 7,
    height: 40,
    width: "80%",
    borderWidth: 1,
    borderColor: "#DD2C00",
    borderRadius: 5,
  },

  button: {
    width: "80%",
    paddingTop: 2,
    paddingBottom: 2,
    backgroundColor: "#DD2C00",
    borderRadius: 3,
    marginTop: 20,
  },

  text: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    padding: 5,
  },
});
