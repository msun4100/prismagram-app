import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { gql } from "apollo-boost";
import useInput from "../../hooks/useInput";
import { Alert, Image, ActivityIndicator } from "react-native";
import styles from "../../styles";
import constants from "../../constants";
import { useMutation } from "react-apollo-hooks";
import { FEED_QUERY } from "../Tabs/Home";

const UPLOAD = gql`
  mutation upload($caption: String!, $files: [String!]!, $location: String) {
    upload(caption: $caption, files: $files, location: $location) {
      id
      caption
      location
    }
  }
`;

const View = styled.View`
  background-color: ${styles.screenBackgroundColor};
  flex: 1;
`;

const Container = styled.View`
  padding: 20px;
  flex-direction: row;
`;

const Form = styled.View`
  justify-content: flex-start;
`;

const STextInput = styled.TextInput`
  margin-bottom: 10px;
  border: 0px solid ${styles.lightGreyColor};
  border-bottom-width: 1px;
  padding-bottom: 10px;
  width: ${constants.width - 180}px;
`;

const Button = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.blueColor};
  padding: 10px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;

const Text = styled.Text`
  color: white;
  font-weight: 600;
`;

export default ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const photo = route?.params?.photo;
  const captionInput = useInput("upload test");
  const locationInput = useInput("Seoul");

  const [uploadMutation] = useMutation(UPLOAD, {
    refetchQueries: () => [
      {
        query: FEED_QUERY,
      },
    ],
  });

  const handleSubmit = async () => {
    if (captionInput.value === "" || locationInput.value === "") {
      Alert.alert("All fields are required");
    }
    const formData = new FormData();
    const name = photo.filename;
    const [, type] = name.split(".");
    formData.append("file", {
      name,
      type: `image/${
        type.toLowerCase() === "jpg" ? "jpeg" : type.toLowerCase()
      }`,
      uri: photo.uri,
    });
    try {
      setLoading(true);
      const {
        data: { location },
      } = await axios.post("http://localhost:4000/api/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      console.log(location);

      const {
        data: { upload },
      } = await uploadMutation({
        variables: {
          files: [location],
          caption: captionInput.value,
          location: locationInput.value,
        },
      });
      if (upload.id) {
        navigation.navigate("TabNavigation");
      }
    } catch (error) {
      console.log("UploadPhoto Error", error);
      Alert.alert("Cant upload", "Try later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <Container>
        <Image
          source={{ uri: photo.uri }}
          style={{ height: 80, width: 80, marginRight: 30 }}
        />
        <Form>
          <STextInput
            onChangeText={captionInput.onChange}
            value={captionInput.value}
            placeholder="Caption"
            multiline={true}
            placeholderTextColor={styles.lightGreyColor}
          />
          <STextInput
            onChangeText={locationInput.onChange}
            value={locationInput.value}
            placeholder="Location"
            multiline={true}
            placeholderTextColor={styles.lightGreyColor}
          />
          <Button onPress={handleSubmit}>
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text>Upload</Text>
            )}
          </Button>
        </Form>
      </Container>
    </View>
  );
};
