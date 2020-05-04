import React, { useLayoutEffect } from "react";
import { useQuery } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import { USER_FRAGMENT } from "../fragments";
import Loader from "../components/Loader";
import { ScrollView } from "react-native";
import UserProfile from "../components/UserProfile";

const GET_USER = gql`
  query seeUser($username: String!) {
    seeUser(username: $username) {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;

export default ({ navigation, route }) => {
  console.log("UserDetail.route", route);

  const { loading, data } = useQuery(GET_USER, {
    variables: { username: route.params.username },
  });
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: route.params.username || "User",
    });
  }, [navigation]);
  return (
    <ScrollView>
      {loading ? (
        <Loader />
      ) : (
        // data && data.seeUser && <UserProfile {...data.seeUser} />
        data?.seeUser && <UserProfile {...data.seeUser} />
      )}
    </ScrollView>
  );
};
