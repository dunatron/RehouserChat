import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  Text
} from "react-native";

const setAuthToken = async token => {
  await AsyncStorage.setItem("userToken", token);
};

export { setAuthToken };
export default setAuthToken;
