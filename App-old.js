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
import OpenChats from "./components/OpenChats";
import NavigationService from "./services/navigationService";
import { useCurrentUser } from "./components/User";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1
  }
});

const App = props => {
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
    if (!currentUser.loading) {
      setIsLoadingComplete(true);
    }
  };

  if (!isLoadingComplete && !skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={handleFinishLoading}
      />
    );
  }

  return (
    <ApolloProvider client={client}>
      <CookiesProvider>
        <View style={styles.container}>
          {Platform.OS === "ios" && <StatusBar barStyle="default" />}
          <SubscriptionsProvider />
          <OpenChats />
          <AppNavigatorContainer
            ref={navigatorRef => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}
            screenProps={{
              me: currentUser.data.me
            }}
          />
        </View>
      </CookiesProvider>
    </ApolloProvider>
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
