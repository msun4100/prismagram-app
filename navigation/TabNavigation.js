import "react-native-gesture-handler";
import * as React from "react";
import { View, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../screens/Tabs/Home";
import Search from "../screens/Tabs/Search";
import Notifications from "../screens/Tabs/Notifications";
import Profile from "../screens/Tabs/Profile";
import MessagesLink from "../components/MessagesLink";
import NavIcon from "../components/NavIcon";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles";

// 기본 탭 네이게이션에 헤더 등 효과를 주기 위해
const stackFactory = ({ name, component, customConfig }) => {
  const NewStack = createStackNavigator();
  return () => (
    <NewStack.Navigator>
      <NewStack.Screen
        name={name || "Must exists name or options.title"}
        component={component}
        options={{
          ...customConfig,
          headerStyle: { backgroundColor: "#FAFAFA" },
        }}
      />
    </NewStack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

export default () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        // tabBarOptions의 in/active color가 focused 여부에 따라 props의 color로
        let iconName;
        switch (route.name) {
          case "Home":
            iconName = Platform.OS === "ios" ? "ios-home" : "md-home";
            break;
          case "Search":
            iconName = Platform.OS === "ios" ? "ios-search" : "md-search";
            break;
          case "Add":
            iconName = Platform.OS === "ios" ? "ios-add" : "md-add";
            size = 26;
            break;
          case "Notifications":
            iconName =
              Platform.OS === "ios"
                ? focused
                  ? "ios-heart"
                  : "ios-heart-empty"
                : focused
                ? "md-heart"
                : "md-heart-empty";
            break;
          case "Profile":
            iconName = Platform.OS === "ios" ? "ios-person" : "md-person";
            break;
        }

        return (
          <NavIcon
            focused={focused}
            name={iconName}
            color={color}
            size={size}
          />
        );
      },
    })}
    tabBarOptions={{
      style: {
        backgroundColor: "#FAFAFA",
      },
      activeTintColor: `${styles.blackColor}`,
      inactiveTintColor: `${styles.darkGreyColor}`,
      showLabel: false,
    }}
  >
    <Tab.Screen
      name="Home"
      component={stackFactory({
        component: Home,
        customConfig: {
          // title: "title here",
          headerRight: () => <MessagesLink />,
          headerTitle: () => <NavIcon name="logo-instagram" size={36} />,
          headerTitleAlign: "center",
        },
      })}
    />
    <Tab.Screen
      name="Search"
      component={stackFactory({
        name: "Search",
        component: Search,
        customConfig: {
          headerTitleAlign: "center",
        },
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
