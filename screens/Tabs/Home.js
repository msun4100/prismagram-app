import React, { useState } from "react";
import { ScrollView, RefreshControl, Text, View } from "react-native";
import styled from "styled-components";
import styles from "../../styles";
import Loader from "../../components/Loader";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import { POST_FRAGMENT } from "../../fragments";
import Post from "../../components/Post";

export const FEED_QUERY = gql`
  {
    seeFeed {
      ...PostParts
    }
  }
  ${POST_FRAGMENT}
`;

export default ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const { loading, data, refetch } = useQuery(FEED_QUERY, {
    fetchPolicy: "network-only",
  });

  console.log(loading, data);
  const refresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <ScrollView
      style={{ backgroundColor: "white" }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refresh} />
      }
    >
      {loading ? (
        <Loader />
      ) : data && data.seeFeed && data.seeFeed.length > 0 ? (
        data.seeFeed.map((post) => (
          <Post key={post.id} navigation={navigation} {...post} />
        ))
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>내가쓴글 or 팔로우한 유저 글이 없음</Text>
        </View>
      )}
    </ScrollView>
  );
};
