import { AuthSession } from "expo";
import React, { useState, useRef } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Mutation } from "react-apollo";
import { SIGNIN_MUTATION } from "../graphql/mutations";
import { setAuthToken } from "../utils/userAuth";
import graphqlTag from "graphql-tag";
import { WebView } from "react-native-webview";
import {
  Container,
  Text,
  Button,
  Content,
  Form,
  Item,
  Input
} from "native-base";

import { View, StyleSheet } from "react-native";
import Modal from "react-native-modal";

import GoogleRecaptca from "../webviews/GoogleReCaptcha";

const siteKey = "6Lc9N8MUAAAAAIJ6Q5SJ7pyZ4AX46ogbSuOyRbKU";
// const baseUrl = "http://10.110.6.22";
const baseUrl = "127.0.0.1";

const CREATE_CHAT_MUTATION = graphqlTag`
mutation CREATE_CHAT_MUTATION(
  $data: ChatCreateInput!
) {
  createChat(data: $data) {
    id
    name
    lastMessage {
      id
      isMine
    }
    participants {
      id
    }
  }
}
`;

const QUERY_CHATS = graphqlTag`
query queryChats {
  chats {
    id
    name
    participants {
      id
      firstName
    }
  }
}
`;

const TEST_LOGIN_MUTATION = graphqlTag`
mutation login(
  $email: String!
  $password: String!
  $captchaToken: String!) {
  signin(email:$email, password:$password, captchaToken:$captchaToken) {
    email
    token
  }
}
`;

const Login = props => {
  const [captchaModalIsVisible, setCaptchaModalIsVisible] = useState(false);
  const [signIn, { loading, error, data }] = useMutation(TEST_LOGIN_MUTATION);

  const [state, setState] = useState({
    email: "",
    emailError: false,
    password: "",
    passwordError: false,
    captchaToken: ""
  });

  const handleInputChange = (field, value) => {
    const newState = {
      ...state,
      [field]: value
    };
    setState(newState);
  };

  /**
   * 1.
   * handle submit will check entered data and if valid will launch the recaptcha modal
   */
  const handleSubmit = () => {
    if (state.email.length === 0) {
      return setState({ ...state, emailError: true });
    }
    setState({ ...state, emailError: false });

    if (state.password.length === 0) {
      return setState({ ...state, passwordError: true });
    }
    setState({ ...state, passwordError: false });
    // handleLogin();
    if (state.captchaToken.length === 0) {
      setCaptchaModalIsVisible(true);
    }
  };

  /**
   * 2.
   * is called on successful recaptcha token and will close the modal and
   * start performing the login mutation
   */
  const onMessage = token => {
    setState({
      ...state,
      captchaToken: token
    });
    setCaptchaModalIsVisible(false);
    handleLogin(token);
  };

  /**
   * 3.
   * do a query/mutation to login and recieve a login token to store
   */
  const handleLogin = async token => {
    const res = await signIn({
      variables: {
        email: state.email,
        password: state.password,
        captchaToken: token ? String(token) : String(state.captchaToken)
      }
      // refetchQueries: [{ query: CURRENT_USER_QUERY }]
    });
    if (res.data.signin.email === state.email) {
      const token = res.data.signin.token;
      handleLoginSuccess(token);
    }
  };

  /**
   * 4.
   * If our login was a success we will store this token
   */
  const handleLoginSuccess = token => {
    setAuthToken(token);
    // return props.screenProps.changeLoginState(true);
    props.navigation.navigate("App");
  };

  return (
    <Container>
      <Modal isVisible={captchaModalIsVisible}>
        <GoogleRecaptca onMessage={onMessage} />
      </Modal>
      <Form>
        <Item error={state.emailError}>
          <Input
            placeholder="Email"
            onChangeText={value => handleInputChange("email", value)}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </Item>
        <Item error={state.passwordError}>
          <Input
            placeholder="Password"
            onChangeText={value => handleInputChange("password", value)}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
          />
        </Item>
      </Form>
      {loading && <Text>Doing stuff, please wait...</Text>}
      <Content>
        <Button full onPress={() => handleSubmit()} disabled={loading}>
          <Text>Sign In</Text>
        </Button>
      </Content>

      {/* <Button
          full
          onPress={() => {
            const res = props.client.mutation({
              mutation: SIGNIN_MUTATION,
              variables: {
                email: "test@test.com",
                password: "test",
                captchaToken: ""
              }
            });
            console.log("Client res => ", res);
          }}
        >
          <Text>Sign In</Text>
        </Button> */}
      {/* <Mutation mutation={SIGNIN_MUTATION}>
          {(signin, { data }) => (
            <Button full onPress={() => handleSubmit(signin)}>
              <Text>Sign In</Text>
            </Button>
          )}
        </Mutation> */}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    flex: 1
  }
});

export default Login;
