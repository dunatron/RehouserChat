import React from "react";
import { Container, Text, Button, Content } from "native-base";
import { AsyncStorage } from "react-native";

const ProfileScreen = props => {
  const handleLogout = async () => {
    // return props.screenProps.changeLoginState(false);
    await AsyncStorage.clear();
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
