import React, { useEffect, useLayoutEffect } from "react";
import styled from "styled-components";
import styles from "../../styles";
import { gql } from "apollo-boost";
import { USER_FRAGMENT } from "../../fragments";
import { useQuery } from "react-apollo-hooks";
import { ScrollView } from "react-native";
import Loader from "../../components/Loader";
import UserProfile from "../../components/UserProfile";
import UserDetail from "../UserDetail";

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

  useLayoutEffect(() => {
    if (data?.me) {
      navigation.setOptions({
        headerTitle: data.me.username,
      });
    }
  }, [navigation, data]);

  return (
    <ScrollView>
      {loading ? <Loader /> : data?.me && <UserProfile {...data.me} />}
    </ScrollView>
  );
};
