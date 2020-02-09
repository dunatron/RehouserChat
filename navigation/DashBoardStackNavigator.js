import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "../screens/HomeScreen";

const DashBoardStackNavigator = createStackNavigator({
  Home: {
    path: "home",
    screen: HomeScreen
  }
});

export default DashBoardStackNavigator;
