import * as React from "react";
import { View, Text, Button } from "react-native";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SimpleLineIcons } from "@expo/vector-icons";
import CallButton from "../components/ButtonBasic";

import HomeScreen from "./HomeScreen";
import ChatScreen from "./ChatScreen";
import IncidentScreen from "./IncidentScreen";
import ProfileScreen from "./Profile";

//landing
import CreateChatScreen from "./CreateChatScreen";
import { TouchableOpacity } from "react-native";
import { Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeStack = createStackNavigator();
const IncidentStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const ChatStack = createStackNavigator();

const Tab = createBottomTabNavigator();

const MainTabScreen = () => (
  <Tab.Navigator initialRouteName="Incident" options={{}}>
    <Tab.Screen
      name="Chat"
      component={ChatStackScreen}
      options={{
        tabBarLabel: "Chat",
        tabBarIcon: () => (
          <SimpleLineIcons name="speech" size={24} color="black" />
        ),
      }}
    />
    <Tab.Screen
      name="Incident"
      component={IncidentStackScreen}
      options={{
        tabBarLabel: "Incident",
        tabBarIcon: () => (
          <SimpleLineIcons name="list" size={24} color="black" />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileStackScreen}
      options={{
        tabBarLabel: "Profile",
        tabBarIcon: () => (
          <SimpleLineIcons name="user" size={24} color="black" />
        ),
      }}
    />
  </Tab.Navigator>
);

export default MainTabScreen;

const IncidentStackScreen = ({ navigation }) => (
  <IncidentStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#FF8000",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <IncidentStack.Screen
      name="Incident"
      component={IncidentScreen}
      options={{
        title: "Incident List",
        headerTitleAlign: "center",
        headerLeft: () => (
          <CallButton
            onPress={() => {
              Alert.alert("Log Out?", "Are you sure you want to Log Out?", [
                { text: "Cancel", style: "cancel" },
                {
                  text: "Log Out",
                  onPress: () => {
                    {
                      AsyncStorage.clear();
                      navigation.popToTop();
                    }
                  },
                },
              ]);
            }}
          >
            <SimpleLineIcons name="logout" size={24} color="black"></SimpleLineIcons>
          </CallButton>
        ),
      }}
    />
  </IncidentStack.Navigator>
);

const ProfileStackScreen = ({ navigation }) => (
  <ProfileStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#FF8000",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <ProfileStack.Screen
      name="Map"
      component={ProfileScreen}
      options={{
        title: "Profile Screen",
        headerTitleAlign: "center",
        headerLeft: () => (
          <CallButton
            onPress={() => {
              Alert.alert("Log Out?", "Are you sure you want to Log Out?", [
                { text: "Cancel", style: "cancel" },
                {
                  text: "Log Out",
                  onPress: () => {
                    {
                      AsyncStorage.clear();
                      navigation.popToTop();
                    }
                  },
                },
              ]);
            }}
          >
            <SimpleLineIcons name="logout" size={24} color="black"></SimpleLineIcons>
          </CallButton>
        ),
      }}
    />
  </ProfileStack.Navigator>
);

const ChatStackScreen = ({ navigation }) => (
  <ChatStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#FF8000",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <ChatStack.Screen
      name="ChatScreen"
      component={ChatScreen}
      options={{
        title: "User Chatlist",
        headerTitleAlign: "center",
        headerLeft: () => (
          <CallButton
            onPress={() => {
              Alert.alert("Log Out?", "Are you sure you want to Log Out?", [
                { text: "Cancel", style: "cancel" },
                {
                  text: "Log Out",
                  onPress: () => {
                    {
                      AsyncStorage.clear();
                      navigation.popToTop();
                    }
                  },
                },
              ]);
            }}
          >
            <SimpleLineIcons name="logout" size={24} color="black"></SimpleLineIcons>
          </CallButton>
        ),
      }}
    />
    <ChatStack.Screen
      name="CreateChat"
      component={CreateChatScreen}
      options={{
        title: "User Chat",
        headerTitleAlign: "center",
        headerLeft: () => (
          <CallButton
            onPress={() => {
              Alert.alert("Log Out?", "Are you sure you want to Log Out?", [
                { text: "Cancel", style: "cancel" },
                {
                  text: "Log Out",
                  onPress: () => {
                    {
                      AsyncStorage.clear();
                      navigation.popToTop();
                    }
                  },
                },
              ]);
            }}
          >
            <SimpleLineIcons name="logout" size={24} color="black"></SimpleLineIcons>
          </CallButton>
        ),
      }}
    />
  </ChatStack.Navigator>
);
