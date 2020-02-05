import React, { useRef, useEffect, createRef } from "react";
import { isEmpty } from "ramda";
import { Toast } from "native-base";

const genericToast = (
  message,
  config = {
    type: "warning",
    position: "top"
  }
) => {
  const combinedConf = {
    type: "warning",
    duration: 5000,
    style: {},
    textStyle: {},
    buttonTextStyle: {},
    buttonStyle: {},
    ...config
  };
  Toast.show({
    // text: JSON.stringify(errors),
    text: message,
    buttonText: "Okay",
    position: combinedConf.position,
    type: combinedConf.type,
    duration: combinedConf.duration,
    // textStyle: { color: "white" },
    style: {},
    buttonTextStyle: {},
    buttonStyle: {}
  });
};

export { genericToast };
export default genericToast;
