import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { Container, Text, Button, Content } from "native-base";
import { logoutUser } from "../utils/userAuth";
import { SIGN_OUT_MUTATION } from "../graphql/mutations";

const ProfileScreen = props => {
  const [signout, { data, loading, error }] = useMutation(SIGN_OUT_MUTATION);

  const handleLogout = async () => {
    const res = await signout();
    // some quality checking on errors etc needs to be done here
    if (res.data) {
      if (res.data.signout.__typename === "SuccessMessage") {
        await logoutUser();
        props.navigation.navigate("AuthLoading");
      }
    }
  };

  return (
    <Container>
      <Content>
        <Button full onPress={handleLogout}>
          <Text>Log Out</Text>
        </Button>
      </Content>
    </Container>
  );
};

export default ProfileScreen;
