import "react-native-gesture-handler";
import * as React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "../screens/Tabs/Home";
import Search from "../screens/Tabs/Search";
import Notifications from "../screens/Tabs/Notifications";
import Profile from "../screens/Tabs/Profile";

import { createStackNavigator } from "@react-navigation/stack";

const stackFactory = ({ name, component, customConfig }) => {
  const NewStack = createStackNavigator();
  return () => (
    <NewStack.Navigator>
      <NewStack.Screen
        name={name || "Must exists name or options.title"}
        component={component}
        options={{ ...customConfig }}
      />
    </NewStack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

export default () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Home"
      component={stackFactory({
        component: Home,
        customConfig: {
          title: "title here",
          headerRight: () => (
            <TouchableOpacity>
              <Text>headerRight</Text>
            </TouchableOpacity>
          ),
        },
      })}
    />
    <Tab.Screen
      name="Search"
      component={stackFactory({
        name: "Search",
        component: Search,
      })}
    />
    <Tab.Screen
      name="Add"
      component={View}
      listeners={({ navigation, route }) => ({
        tabPress: (e) => {
          e.preventDefault();
          // console.log(navigation, route);
          navigation.navigate("PhotoNavigation");
        },
      })}
    />
    <Tab.Screen
      name="Notifications"
      component={stackFactory({
        name: "Notifications",
        component: Notifications,
      })}
    />
    <Tab.Screen
      name="Profile"
      component={stackFactory({
        name: "Profile",
        component: Profile,
      })}
    />
  </Tab.Navigator>
);
