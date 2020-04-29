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
          value={route.params?.term || ""}
          onChange={route.params?.onChange || (() => null)}
          onSubmit={route.params?.onSubmit || (() => null)}
        />
      );
    },
  });
  // Screen 이기 때문에 props에 navigation이 전달됨
  constructor(props) {
    super(props);
    const { navigation } = props;
    this.state = {
      term: "",
    };
    navigation.setParams({
      term: this.state.term,
      onChange: this.onChange,
      onSubmit: this.onSubmit,
    });
  }

  onChange = (text) => {
    const { navigation } = this.props;
    this.setState({ term: text });
    navigation.setParams({
      term: text,
    });
  };

  onSubmit = () => {
    console.log("submit");
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
