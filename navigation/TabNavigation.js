import "react-native-gesture-handler";
import * as React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "../screens/Home";
import Search from "../screens/Search";
import Notifications from "../screens/Notifications";
import Profile from "../screens/Profile";

const Tab = createBottomTabNavigator();

export default () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="Search" component={Search} />
    <Tab.Screen
      name="Add"
      component={View}
      listeners={({ navigation, route }) => ({
        tabPress: (e) => {
          e.preventDefault();
          console.log("route", route);
          console.log("navigation", navigation);
          navigation.navigate("PhotoNavigation");
        },
      })}
    />
    <Tab.Screen name="Notifications" component={Notifications} />
    <Tab.Screen name="Profile" component={Profile} />
  </Tab.Navigator>
);
