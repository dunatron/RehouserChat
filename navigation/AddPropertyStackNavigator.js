import { createStackNavigator } from "react-navigation-stack";

// screens
import Step1 from "../screens/AddProperty/Step1";
import Step2 from "../screens/AddProperty/Step2";
import Step3 from "../screens/AddProperty/Step3";
import FinalStep from "../screens/AddProperty/FinalStep";

const AddPropertyStackNavigator = createStackNavigator({
  AddPropertyStep1: {
    path: "add-property-step-1",
    screen: Step1
  },
  AddPropertyStep2: {
    path: "add-property-step-2",
    screen: Step2
  },
  AddPropertyStep3: {
    path: "add-property-step-3",
    screen: Step3
  },
  AddPropertyFinalStep: {
    path: "add-property-final-step",
    screen: FinalStep
  }
});

export default AddPropertyStackNavigator;
