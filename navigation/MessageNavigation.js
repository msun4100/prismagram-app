import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Messages from "../screens/Messages/Messages";
import Message from "../screens/Messages/Message";

const Tab = createStackNavigator();

export default () => (
  <Tab.Navigator>
    <Tab.Screen name="Messages" component={Messages} />
    <Tab.Screen name="Message" component={Message} />
  </Tab.Navigator>
);
