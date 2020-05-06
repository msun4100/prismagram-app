import React from "react";
import styled from "styled-components";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

export default ({ navigation, route }) => (
  <View>
    <Text>I should upload {route?.params?.photo?.uri}</Text>
  </View>
);
