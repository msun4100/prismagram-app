import React from "react";
import styled from "styled-components";
import styles from "../../styles";

const View = styled.View`
  background-color: ${styles.screenBackgroundColor};
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

export default () => (
  <View>
    <Text>Profile</Text>
  </View>
);
