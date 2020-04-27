import React, { useState } from "react";
import styled from "styled-components";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { Alert } from "react-native";
import { useMutation } from "react-apollo-hooks";
import { CREATE_ACCOUNT } from "./AuthQueries";
import * as Facebook from "expo-facebook";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const FBContainer = styled.View`
  margin-top: 25px;
  padding-top: 25px;
  border-top-width: 1px;
  border-color: ${(props) => props.theme.lightGreyColor};
  border-style: solid;
`;

export default ({ navigation, route }) => {
  const fNameInput = useInput("");
  const lNameInput = useInput("");
  const emailInput = useInput(route.params?.email || "");
  const usernameInput = useInput("");
  const [loading, setLoading] = useState(false);

  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      username: usernameInput.value,
      email: emailInput.value,
      firstName: fNameInput.value,
      lastName: lNameInput.value,
    },
  });

  const handleSignup = async () => {
    const { value: email } = emailInput;
    const { value: fName } = fNameInput;
    const { value: lName } = lNameInput;
    const { value: username } = usernameInput;

    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
      return Alert.alert("That email is invalid");
    }
    if (fName === "") {
      return Alert.alert("I need your name");
    }
    if (username === "") {
      return Alert.alert("Invalid username");
    }
    try {
      setLoading(true);
      const {
        data: { createAccount },
      } = await createAccountMutation();
      if (createAccount) {
        Alert.alert("Account created", "Log in now!");
        navigation.navigate("Login", { email: email });
        return;
      }
    } catch (e) {
      console.log(e);
      // 서버에서 throw Error("This username / email is already taken"); 리턴
      Alert.alert("Username taken", "Log In instead");
      navigation.navigate("Login", { email: email });
    } finally {
      setLoading(false);
    }
  };

  const fbLogin = async () => {
    try {
      setLoading(true);
      await Facebook.initializeAsync();
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(
        "692699008214970",
        {
          permissions: ["public_profile", "email"],
        }
      );
      if (type === "success") {
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=id,last_name,first_name,email`
        );
        const { email, first_name, last_name } = await response.json();
        emailInput.setValue(email);
        fNameInput.setValue(first_name);
        lNameInput.setValue(last_name);
        const [username] = email.split("@"); // 배열의 첫번째
        usernameInput.setValue(username);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput
          {...fNameInput}
          placeholder="First Name"
          autoCapitalize="words"
        />
        <AuthInput
          {...lNameInput}
          placeholder="Last Name"
          autoCapitalize="words"
        />
        <AuthInput
          {...emailInput}
          placeholder="Email"
          keyboardType="email-address"
          returnKeyType="send"
          autoCorrect={false}
        />
        <AuthInput
          {...usernameInput}
          placeholder="Username"
          returnKeyType="send"
          autoCorrect={false}
        />
        <AuthButton loading={loading} onPress={handleSignup} text="Sign Up" />
        <FBContainer>
          <AuthButton
            bgColor={"#2D4DA7"}
            loading={false}
            onPress={fbLogin}
            text="Connect Facebook"
          />
        </FBContainer>
      </View>
    </TouchableWithoutFeedback>
  );
};
