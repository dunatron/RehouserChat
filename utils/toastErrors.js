import React, { useRef, useEffect, createRef } from "react";
import FormikErrors from "../components/FormikErrors";
import { isEmpty } from "ramda";
import { Toast } from "native-base";

const toastErrors = errors => {
  !isEmpty(errors) &&
    Toast.show({
      // text: JSON.stringify(errors),
      text: <FormikErrors errors={errors} />,
      textStyle: { color: "yellow" },
      buttonText: "Okay",
      position: "top",
      type: "warning",
      duration: 8000,
      style: {},
      textStyle: {},
      buttonTextStyle: {},
      buttonStyle: {}
    });
};

export { toastErrors };
export default toastErrors;
