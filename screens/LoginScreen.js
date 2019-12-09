import { AuthSession } from "expo";
import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Mutation } from "react-apollo";
import { SIGNIN_MUTATION } from "../graphql/mutations";
import {
  Container,
  Button,
  Content,
  Form,
  Item,
  Input,
  Text,
  AsyncStorage
} from "native-base";
import { setAuthToken } from "../utils/setAuthToken";
import graphqlTag from "graphql-tag";

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
mutation login {
  signin(email:"heath.dunlop.hd@gmail.com", password:"test", captchaToken:"test") {
    email
  }
}
`;

const Login = props => {
  const [signIn, { loading, error, data }] = useMutation(TEST_LOGIN_MUTATION);
  const [addChat, addChatProps] = useMutation(CREATE_CHAT_MUTATION);

  console.log("Signin loading => ", loading);
  console.log("Signin error => ", error);
  console.log("Signin data => ", data);

  const [state, setState] = useState({
    email: "",
    emailError: false,
    password: "",
    passwordError: false
  });

  const handleInputChange = (field, value) => {
    const newState = {
      ...state,
      [field]: value
    };
    setState(newState);
  };

  const handleSubmit = () => {
    if (state.email.length === 0) {
      return setState({ ...state, emailError: true });
    }
    setState({ ...state, emailError: false });

    if (state.password.length === 0) {
      return setState({ ...state, passwordError: true });
    }
    setState({ ...state, passwordError: false });
    handleLogin();
  };

  /**
   * do a query/mutation to login
   */
  const handleLogin = async () => {
    const res = await signIn({
      variables: {
        email: "test@test.com",
        password: "test",
        captchaToken: ""
      }
      // refetchQueries: [{ query: CURRENT_USER_QUERY }]
    });
    console.log("res => ", res);
    if (res.data.signin.email === state.email) {
      const token = "abc";
      handleLoginSuccess(token);
    }
    // addChat({
    //   variables: {
    //     data: {
    //       name: "Heath & Jon Chat 2",
    //       participants: {
    //         connect: [
    //           {
    //             id: "ck2k0095umh5l0b099487efci"
    //           },
    //           {
    //             id: "ck2k1obb418ua0b00jlbzqpy8"
    //           }
    //         ]
    //       }
    //     }
    //   },
    //   refetchQueries: [{ query: QUERY_CHATS }]
    // });

    // const token = "abc";
    // handleLoginSuccess(token);
  };

  const handleLoginSuccess = token => {
    setAuthToken(token);
    // return props.screenProps.changeLoginState(true);
    props.navigation.navigate("App");
  };

  return (
    <Container>
      <Content>
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
        <Button full onPress={() => handleSubmit()}>
          <Text>Sign In</Text>
        </Button>
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
      </Content>
    </Container>
  );
};

export default Login;
