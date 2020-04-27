import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Messages from "../screens/Messages/Messages";
import Message from "../screens/Messages/Message";
import { stackStyles } from "./config";

const Tab = createStackNavigator();

export default () => (
  <Tab.Navigator
    screenOptions={{
      headerStyle: { ...stackStyles },
    }}
  >
    <Tab.Screen name="Messages" component={Messages} />
    <Tab.Screen name="Message" component={Message} />
  </Tab.Navigator>
);
