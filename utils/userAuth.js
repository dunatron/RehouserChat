import { AsyncStorage } from "react-native";

const setAuthToken = async token => {
  await AsyncStorage.setItem("userToken", token);
};

const getAuthToken = async () => {
  try {
    const token = await AsyncStorage.getItem("userToken");
    if (token !== null) {
      return token;
    }
  } catch (error) {
    // Error retrieving data
  }
};

const logoutUser = async () => {
  await AsyncStorage.clear();
};

export { setAuthToken, getAuthToken, logoutUser };
