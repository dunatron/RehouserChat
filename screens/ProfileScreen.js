import React from "react";
import { Container, Text, Button, Content } from "native-base";
import { logoutUser } from "../utils/userAuth";

const ProfileScreen = props => {
  const handleLogout = async () => {
    await logoutUser();
    props.navigation.navigate("AuthLoading");
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
