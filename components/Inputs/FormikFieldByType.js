import React, { useRef, useEffect, createRef } from "react";
import PropTypes from "prop-types";
import { DatePicker } from "native-base";
import FormikInputField from "./FormikInputField";

const FormikFieldByType = ({
  form,
  config,
  error,
  touched,
  submitCount,
  value,
  setFieldValue
}) => {
  const generateError = () => {
    if (error && touched) return error;
    if (error && submitCount > 0) return error;
    return undefined;
  };
  if (config.keyboardType === "date")
    return (
      <DatePicker
        name={config.name}
        defaultDate={config.defaultDate ? config.defaultDate : undefined} //todays date
        minimumDate={config.minimumDate ? config.minimumDate : undefined} //todays date
        maximumDate={config.maximumDate ? config.maximumDate : undefined} //todays date
        locale={"en"}
        timeZoneOffsetInMinutes={undefined}
        modalTransparent={false}
        animationType={"fade"}
        androidMode={"default"} // 'default','calendar','spinner'
        placeHolderText={config.label}
        textStyle={{ color: "green" }}
        placeHolderTextStyle={{ color: "#d3d3d3" }}
        // onDateChange={this.setDate}
        onDateChange={date => {
          setFieldValue(config.name, date);
        }}
        disabled={false}
      />
    );
  const errorText = generateError();
  return <FormikInputField {...config} error={errorText} />;
};

FormikFieldByType.propTypes = {
  setFieldValue: PropTypes.func,
  config: PropTypes.shape({
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    keyboardType: PropTypes.string.isRequired
  })
};

export default FormikFieldByType;
