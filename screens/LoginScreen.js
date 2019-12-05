import { AuthSession } from "expo";
import React, { useState } from "react";
// import { useMutation } from "@apollo/react-hooks";
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

const Login = props => {
  // const [signIn, { loading, error, data }] = useMutation(SIGNIN_MUTATION);
  console.log("Here is login screen");
  console.log("What about me loginSCreen Props => ", props);
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

  const handleSubmit = signin => {
    if (state.email.length === 0) {
      return setState({ ...state, emailError: true });
    }
    setState({ ...state, emailError: false });

    if (state.password.length === 0) {
      return setState({ ...state, passwordError: true });
    }
    setState({ ...state, passwordError: false });
    handleLogin(signin);
  };

  const myFakeData = () => {
    fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then(response => response.json())
      .then(json => console.log(json));
  };

  /**
   * do a query/mutation to login
   */
  const handleLogin = async signin => {
    myFakeData();
    const res = await signin({
      variables: {
        email: "test@test.com",
        password: "test",
        captchaToken: ""
      }
    });
    console.log(res);
    signIn({
      variables: {
        email: "test@test.com",
        password: "test",
        captchaToken: ""
      }
      // refetchQueries: [{ query: CURRENT_USER_QUERY }]
    });

    const token = "abc";
    handleLoginSuccess(token);
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
        <Button
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
        </Button>
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
