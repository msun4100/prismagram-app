import React, { useEffect, useLayoutEffect } from "react";
import styled from "styled-components";
import styles from "../../styles";
import { gql } from "apollo-boost";
import { USER_FRAGMENT } from "../../fragments";
import { useQuery } from "react-apollo-hooks";
import { ScrollView, TouchableOpacity, Text } from "react-native";
import Loader from "../../components/Loader";
import UserProfile from "../../components/UserProfile";
import { useLogOut } from "../../AuthContext";

export const ME = gql`
  {
    me {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;

export default ({ navigation, route }) => {
  const { loading, data } = useQuery(ME);
  const logout = useLogOut();

  useLayoutEffect(() => {
    if (data?.me) {
      navigation.setOptions({
        headerTitle: data.me.username,
        headerRight: () => (
          <TouchableOpacity onPress={logout} style={{ padding: 10 }}>
            <Text>Log Out</Text>
          </TouchableOpacity>
        ),
      });
    }
  }, [navigation, data]);

  return (
    <ScrollView>
      {loading ? <Loader /> : data?.me && <UserProfile {...data.me} />}
    </ScrollView>
  );
};
