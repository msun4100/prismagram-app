import React from "react";
import styled from "styled-components";
import styles from "../../styles";
import SearchBar from "../../components/SearchBar";

const View = styled.View`
  background-color: ${styles.screenBackgroundColor};
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

class Search extends React.Component {
  static options = ({ route, navigation }) => ({
    headerStyle: { backgroundColor: "#FAFAFA" },
    headerTitleAlign: "center",
    headerTitle: () => {
      console.log("Search.route", route);
      console.log("Search.navigation", navigation);
      return (
        <SearchBar
          value={this.state.term}
          onChange={this.onChange}
          onSubmit={() => {}}
        />
      );
    },
  });

  state = {
    term: "",
  };
  onChange = (text) => {
    this.setState({ text });
  };
  render() {
    return (
      <View>
        <Text>Search</Text>
      </View>
    );
  }
}

export default Search;
