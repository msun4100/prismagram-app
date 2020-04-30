import React, { useEffect, useLayoutEffect } from "react";
import styled from "styled-components";
import styles from "../../styles";
import { gql } from "apollo-boost";
import { USER_FRAGMENT } from "../../fragments";
import { useQuery } from "react-apollo-hooks";
import { ScrollView } from "react-native";
import Loader from "../../components/Loader";
import UserProfile from "../../components/UserProfile";

export const ME = gql`
  {
    me {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;

const View = styled.View`
  background-color: ${styles.screenBackgroundColor};
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

export default ({ navigation, route }) => {
  const { loading, data } = useQuery(ME);

  useLayoutEffect(() => {
    if (data.me) {
      navigation.setOptions({
        headerTitle: data.me.username,
      });
    }
  }, [navigation, data]);

  return (
    <ScrollView>
      {loading ? <Loader /> : data?.me && <Text>{data.me.username}</Text>}
    </ScrollView>
  );
};
