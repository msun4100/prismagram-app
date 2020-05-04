import * as React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import SelectPhoto from "../screens/Photo/SelectPhoto";
import TakePhoto from "../screens/Photo/TakePhoto";
import UploadPhoto from "../screens/Photo/UploadPhoto";
import { stackStyles } from "./config";
import styles from "../styles";

const Tab = createMaterialTopTabNavigator();
function PhotoTabs() {
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      tabBarOptions={{
        indicatorStyle: {
          backgroundColor: styles.blackColor,
          marginBottom: 0,
        },
        labelStyle: {
          color: styles.blackColor,
          fontWeight: "600",
        },
        style: {
          paddingBottom: 0,
          ...stackStyles,
        },
      }}
      screenOptions={{
        headerStyle: { ...stackStyles },
      }}
    >
      <Tab.Screen
        name="SelectPhoto"
        component={SelectPhoto}
        options={{
          tabBarLabel: "Select",
        }}
      />
      <Tab.Screen
        name="TakePhoto"
        component={TakePhoto}
        options={{
          tabBarLabel: "Take",
        }}
      />
    </Tab.Navigator>
  );
}

const PhotoNavigation = createStackNavigator();

export default () => {
  return (
    <PhotoNavigation.Navigator>
      <PhotoNavigation.Screen
        name="PhotoTabs"
        component={PhotoTabs}
        options={{
          headerShown: false,
        }}
      />
      <PhotoNavigation.Screen
        headerMode="screen"
        name="UploadPhoto"
        component={UploadPhoto}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
        }}
      />
    </PhotoNavigation.Navigator>
  );
};
