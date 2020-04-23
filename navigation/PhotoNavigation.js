import * as React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import SelectPhoto from "../screens/Photo/SelectPhoto";
import TakePhoto from "../screens/Photo/TakePhoto";
import UploadPhoto from "../screens/Photo/UploadPhoto";

const Tab = createMaterialTopTabNavigator();
function PhotoTabs() {
  return (
    <Tab.Navigator tabBarPosition="bottom">
      <Tab.Screen name="SelectPhoto" component={SelectPhoto} />
      <Tab.Screen name="TakePhoto" component={TakePhoto} />
    </Tab.Navigator>
  );
}

const PhotoNavigation = createStackNavigator();

export default () => {
  return (
    <PhotoNavigation.Navigator headerMode="none">
      <PhotoNavigation.Screen name="PhotoTabs" component={PhotoTabs} />
      <PhotoNavigation.Screen name="UploadPhoto" component={UploadPhoto} />
    </PhotoNavigation.Navigator>
  );
};
