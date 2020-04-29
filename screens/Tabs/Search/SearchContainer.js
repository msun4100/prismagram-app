import React, { useLayoutEffect, useState } from "react";
import SearchBar from "../../../components/SearchBar";
import SearchPresenter from "./SearchPresenter";

export default ({ route, navigation }) => {
  const [term, setTerm] = useState("");
  const [shouldFetch, setShouldFetch] = useState(false);

  const onChange = (text) => {
    setTerm(text);
    setShouldFetch(false);
  };
  const onSubmit = () => {
    setShouldFetch(true);
    console.log("Submit");
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <SearchBar value={term} onChange={onChange} onSubmit={onSubmit} />
      ),
    });
  }, [navigation, term]);

  return <SearchPresenter term={term} shouldFetch={shouldFetch} />;
};
