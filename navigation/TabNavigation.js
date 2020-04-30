import "react-native-gesture-handler";
import * as React from "react";
import { View, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../screens/Tabs/Home";
import Search from "../screens/Tabs/Search";
import Notifications from "../screens/Tabs/Notifications";
import Profile from "../screens/Tabs/Profile";
import Detail from "../screens/Detail";
import UserDetail from "../screens/UserDetail";
import MessagesLink from "../components/MessagesLink";
import NavIcon from "../components/NavIcon";
import styles from "../styles";

const defaultScreenOptions = {
  headerStyle: { backgroundColor: "#FAFAFA" },
  headerTitleAlign: "center",
};

const HomeStackScreen = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        ...defaultScreenOptions,
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerRight: () => <MessagesLink />,
          headerTitle: () => <NavIcon name="logo-instagram" size={36} />,
        }}
      />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="UserDetail" component={UserDetail} />
    </Stack.Navigator>
  );
};

// Docs의 useLayoutEffect Hooks 사용 navigation.setOption 으로 대체.
const SearchStackScreen = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        ...defaultScreenOptions,
      }}
    >
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="UserDetail" component={UserDetail} />
    </Stack.Navigator>
  );
};

// 각각을 function 으로 선언해서 리턴하면 잘되는데 팩토리로 하면 Detail과 UserDetail의 route.params 로그는 찍히는데 액티비티가 열리지 않는다. 뭐가 문제지..
// <NavigationContainer independent={true}>...</> 으로 감싸면 되긴 하는데.. 이 문제가 있음 -> Note that this will make the child navigators disconnected from the parent and you won't be able to navigate between them
// HomeScreenStack, SearchScreenStack 각각을 Docs 처럼 선언해서 사용하면 또 잘됨..
const stackFactory = ({ name, component, customConfig = {} }) => {
  const StackF = new createStackNavigator();
  return () => (
    <StackF.Navigator
      screenOptions={({ route }) => ({
        defaultScreenOptions,
      })}
    >
      <StackF.Screen
        name={name || "Please Enter screen name"}
        component={component}
        options={{
          ...customConfig,
        }}
      />
      <StackF.Screen name="Detail" component={Detail} />
      <StackF.Screen name="UserDetail" component={UserDetail} />
    </StackF.Navigator>
  );
};

const Tab = createBottomTabNavigator();

export default () => (
  <Tab.Navigator
    initialRouteName="Home"
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
            iconName =
              Platform.OS === "ios"
                ? "ios-add-circle-outline"
                : "md-add-circle-outline";
            size = 25;
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
    <Tab.Screen name="Home" component={HomeStackScreen} />
    {/* <Tab.Screen
      name="Home"
      component={stackFactory({
        name: "Home",
        component: Home,
      })}
    /> */}
    <Tab.Screen name="Search" component={SearchStackScreen} />
    <Tab.Screen
      name="Add"
      component={View}
      listeners={({ navigation, route }) => ({
        tabPress: (e) => {
          e.preventDefault();
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
