import React, { useState } from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import { ApolloProvider } from "react-apollo";
import { CookiesProvider } from "react-cookie";
import AppNavigatorContainer from "./navigation/AppNavigator";
import SubscriptionsProvider from "./subscriptions";
import client from "./apollo/client";

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

  const getPermissionAsync = async () => {
    console.group("DEEBUG ALL PERMISSIONS");
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const notificationPermissions = await Permissions.askAsync(
      Permissions.NOTIFICATIONS
    );
    console.log("getPermissionAsync status => ", status);
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }
    console.log("notificationPermissions => ", notificationPermissions);
    console.log("notificationPermissions => ", notificationPermissions);
    console.log("Constants.platform => ", Constants.platform);
    console.log("Camera Permissions => ", Permissions.CAMERA_ROLL);

    console.groupEnd();
  };

  const handleLoadingError = () => {
    // ...
  };

  const handleFinishLoading = () => {
    setIsLoadingComplete(true);
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
  getPermissionAsync();

  if (showAppLoader()) {
    return (
      <AppLoading
        // startAsync={loadResourcesAsync}
        startAsync={() => {
          loadResourcesAsync();
          getPermissionAsync();
        }}
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
    <CookiesProvider>
      <View style={styles.container}>
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
      </View>
    </CookiesProvider>
  );
};

export default App;

// export default class App extends React.Component {
//   state = {
//     isLoadingComplete: false
//   };

//   loadResourcesAsync = async () => {
//     await Promise.all([
//       Asset.loadAsync([
//         // ...
//       ]),
//       Font.loadAsync({
//         Roboto: require("native-base/Fonts/Roboto.ttf"),
//         Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
//       })
//     ]);
//   };

//   handleLoadingError = () => {
//     // ...
//   };

//   handleFinishLoading = () => {
//     this.setState({ isLoadingComplete: true });
//   };

//   render() {
//     const { isLoadingComplete } = this.state;
//     const { skipLoadingScreen } = this.props;
//     if (!isLoadingComplete && !skipLoadingScreen) {
//       return (
//         <AppLoading
//           startAsync={this.loadResourcesAsync}
//           onError={this.handleLoadingError}
//           onFinish={this.handleFinishLoading}
//         />
//       );
//     }
//     return (
//       <ApolloProvider client={client}>
//         <CookiesProvider>
//           <View style={styles.container}>
//             {Platform.OS === "ios" && <StatusBar barStyle="default" />}
//             <SubscriptionsProvider />
//             <OpenChats />
//             <AppNavigator
//               ref={navigatorRef => {
//                 NavigationService.setTopLevelNavigator(navigatorRef);
//               }}
//             />
//           </View>
//         </CookiesProvider>
//       </ApolloProvider>
//     );
//   }
// }
