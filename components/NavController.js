import React from "react";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useIsLoggedIn, useLogIn, useLogOut } from "../AuthContext";
import AuthNavigation from "../navigation/AuthNavigation";
import TabNavigation from "../navigation/TabNavigation";

export default () => {
  const isLoggedIn = true;
  return (
    <View style={{ flex: 1 }}>
      {isLoggedIn ? <TabNavigation /> : <AuthNavigation />}
    </View>
  );
};
