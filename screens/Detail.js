import React, { useLayoutEffect } from "react";
import styled from "styled-components";
import styles from "../styles";
import { useQuery } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import { POST_FRAGMENT } from "../fragments";
import Loader from "../components/Loader";
import Post from "../components/Post";

const FEED_QUERY = gql`
  query seeFullPost($id: String!) {
    seeFullPost(id: $id) {
      ...PostParts
    }
  }
  ${POST_FRAGMENT}
`;

const View = styled.View`
  background-color: ${styles.screenBackgroundColor};
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Text = styled.Text``;

export default ({ navigation, route }) => {
  const { loading, data } = useQuery(FEED_QUERY, {
    variables: {
      id: route.params.id,
    },
  });

  console.log(data, loading);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Photo in Detail.js",
      headerStyle: { backgroundColor: "#FAFAFA" },
      headerTitleAlign: "center",
      headerTintColor: styles.blackColor,
    });
  }, [navigation]);
  return (
    <View>
      {loading ? (
        <Loader />
      ) : (
        data?.seeFullPost && <Post {...data.seeFullPost} />
      )}
    </View>
  );
};
