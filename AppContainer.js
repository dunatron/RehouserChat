import React, { useState } from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { container, Container } from "native-base";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import { ApolloProvider } from "react-apollo";
import { CookiesProvider } from "react-cookie";
import AppNavigatorContainer from "./navigation/AppNavigator";
import SubscriptionsProvider from "./subscriptions";
import client from "./apollo/client";
import { genericToast } from "./utils/genericToast";
import { phonePermissions } from "./utils/phonePermissions";

import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

// import OpenChats from "./components/OpenChats";
import OpenChats from "./components/OpenChats/index";
import NavigationService from "./services/navigationService";
import { useCurrentUser } from "./components/User";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1
  }
});

const App = props => {
  const currRoute = NavigationService.getCurrentRoute();
  const [activeRouteName, setActiveRouteName] = useState(currRoute);
  const { skipLoadingScreen } = props;
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  const currentUser = useCurrentUser();
  const loadResourcesAsync = async () => {
    await Promise.all([
      Asset.loadAsync([
        // ...
      ]),
      Font.loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
      })
    ]);
  };

  const handleLoadingError = () => {
    // ...
  };

  const handleFinishLoading = () => {
    setIsLoadingComplete(true);
    phonePermissions(); // could also go in loadResourcesAsync, but i like to ask permissions once app is finished loading resources
  };

  const showAppLoader = () => {
    if (!isLoadingComplete) return true;
    if (currentUser.loading) return true;
    return false;
  };

  // gets the current screen from navigation state
  function getActiveRouteName(navigationState) {
    if (!navigationState) {
      return null;
    }
    const route = navigationState.routes[navigationState.index];
    // dive into nested navigators
    if (route.routes) {
      return getActiveRouteName(route);
    }
    return route.routeName;
  }
  // getPermissionAsync();

  console.log("O dear => A memory leak");

  if (showAppLoader()) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={handleFinishLoading}
      />
    );
  }

  const shareableRootProps = {
    me: currentUser.data ? currentUser.data.me : null,
    activeRouteName: activeRouteName
  };

  return (
    <Container style={styles.container}>
      {/* https://docs.nativebase.io/docs/GetStarted.html */}
      {/* <View style={styles.container}> */}
      {Platform.OS === "ios" && <StatusBar barStyle="default" />}
      <SubscriptionsProvider {...shareableRootProps} />
      <OpenChats {...shareableRootProps} />
      <AppNavigatorContainer
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
        screenProps={{
          ...shareableRootProps
        }}
        onNavigationStateChange={(prevState, currentState, action) => {
          const currentRouteName = getActiveRouteName(currentState);
          setActiveRouteName(currentRouteName);
        }}
      />
    </Container>
  );
};

export default App;
