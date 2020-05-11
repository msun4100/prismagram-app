import React, { useState } from "react";
import { ScrollView, RefreshControl, Text, View } from "react-native";
import styled from "styled-components";
import PropTypes from "prop-types";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Loader from "../../../components/Loader";
import SquarePhoto from "../../../components/SquarePhoto";
import styles from "../../../styles";

export const SEARCH = gql`
  query search($term: String!) {
    searchPost(term: $term) {
      id
      files {
        id
        url
      }
      likeCount
      commentCount
    }
  }
`;

const Container = styled.View`
  background-color: ${(props) => props.theme.screenBackgroundColor};
  flex: 1;
  justify-content: center;
`;

const SquarePhotos = styled.View`
  flex-direction: row;
`;

const SearchPresenter = ({ term, shouldFetch }) => {
  const [refreshing, setRefreshing] = useState(false);
  const { data, loading, refetch } = useQuery(SEARCH, {
    variables: {
      term,
    },
    skip: term === "" || !shouldFetch,
    fetchPolicy: "network-only",
  });
  console.log(data, "term", term || `""`, "loading", loading);
  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await refetch({ variables: { term } });
    } catch (e) {
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <Container>
      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
      >
        {loading ? (
          <Loader />
        ) : (
          <SquarePhotos>
            {data?.searchPost?.map((post) => (
              <SquarePhoto key={post.id} {...post} />
            ))}
          </SquarePhotos>
        )}
      </ScrollView>
    </Container>
  );
};

SearchPresenter.propTypes = {
  term: PropTypes.string.isRequired,
  shouldFetch: PropTypes.bool.isRequired,
};

export default SearchPresenter;
