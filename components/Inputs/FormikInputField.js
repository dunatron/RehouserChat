import { compose } from "recompose";
import { TextField } from "react-native-material-textfield";

import {
  handleTextInput,
  withNextInputAutoFocusInput
} from "react-native-formik";

const FormikInputField = compose(
  handleTextInput,
  withNextInputAutoFocusInput
)(TextField);

export default FormikInputField;
