import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,

} from "@react-navigation/drawer";

//landing
import RootStackScreen from "./screens/RootStackScreen";

const Drawer = createDrawerNavigator();

const SlideDrawer = createDrawerNavigator();


const App = () => {
  return (
    <NavigationContainer>

      <SlideDrawer.Navigator initialRouteName="SignIn">
        <Drawer.Screen
          name="SignIn"
          component={RootStackScreen}
          options={{ swipeEnabled: false }}
        />
      </SlideDrawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
