import React, { useRef, useEffect, createRef } from "react";
import { toastErrors } from "../../utils/toastErrors";
import styles from "./Styles";
import {
  Container,
  Header,
  Content,
  Footer,
  View,
  Button,
  List,
  Text,
  Root,
  DatePicker
} from "native-base";
import { Formik } from "formik";
import { compose } from "recompose";
import {
  handleTextInput,
  withNextInputAutoFocusForm,
  withNextInputAutoFocusInput
} from "react-native-formik";
import * as Yup from "yup";
import { TextField } from "react-native-material-textfield";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_PROPERTY_FORM } from "../../apollo/local-state";
import { SET_PROPERTY_FORM_FIELDS_LOCAL_MUTATION } from "../../apollo/resolvers";
import FormikFieldByType from "../../components/Inputs/FormikFieldByType";

const ADD_PROPERTY_STEP_1_CONF = {
  validationSchema: Yup.object().shape({
    // location: Yup.string()
    //   .required("location is required")
    //   .min(2, "pretty sure this isnt a location"),
    // locationLat: Yup.string()
    //   .required("latitude of the property is required")
    //   .min(2, "pretty sure this isnt a latitude coordinate"),
    // moveInDate: Yup.date().required("move in date must be specified"),
    // expiryDate: Yup.date().required("move out date must be spcified")
  }),
  initialValues: {
    // location: "Dunedin",
    // locationLat: "1787.9029408"
  },
  fields: [
    {
      label: "Move in date",
      name: "moveInDate",
      placeholder: "2018-05-09T12:00:00.000Z",
      keyboardType: "date",
      defaultDate: new Date(), // todays date
      minimumDate: new Date() // todays date
      // maximumDate: new Date()// no need for a maximum date
    },
    {
      label: "Move out date",
      name: "expiryDate",
      placeholder: "2018-05-09T12:00:00.000Z",
      keyboardType: "date",
      defaultDate: new Date(), // todays date
      minimumDate: new Date() // todays date
      // maximumDate: new Date()// no need for a maximum date
    },
    {
      label: "Location",
      name: "location",
      placeholder: "e.g 5 Monowai road, Ravensbourne, Dunedin",
      keyboardType: "default"
    },
    {
      label: "Latitude",
      name: "locationLat",
      placeholder: "e.g -45.8624413",
      keyboardType: "numeric"
    },
    {
      label: "Longitude",
      name: "locationLng",
      placeholder: "e.g 170.5090949",
      keyboardType: "numeric"
    },
    {
      label: "headline",
      name: "headline",
      keyboardType: "default",
      placeholder: "Headline for advertisement"
    },
    {
      label: "rooms",
      name: "rooms",
      keyboardType: "numeric",
      placeholder: "3"
    },
    {
      label: "bathrooms",
      name: "bathrooms",
      keyboardType: "numeric",
      placeholder: "1"
    },
    {
      label: "garageSpaces",
      name: "garageSpaces",
      keyboardType: "numeric",
      placeholder: "1"
    },
    {
      label: "carportSpaces",
      name: "carportSpaces",
      keyboardType: "numeric",
      placeholder: "2"
    },
    {
      label: "offStreetSpaces",
      name: "offStreetSpaces",
      keyboardType: "numeric",
      placeholder: "2"
    }
  ]
};

const FieldsToImplement = [
  "type", // need a dropdown selector
  "accommodation", // this can be own step where we do a different approach
  "offStreetSpaces",
  "indoorFeatures", // need a dropdown selector
  "outdoorFeatures", // need a dropdown selector
  "rent",
  "moveInDate",
  "expiryDate",
  "onTheMarket",
  "owners", // needs to be done automagically
  "creator", // needs to be done automagically
  "images" // own step to add images at the end
];

const MyInput = compose(
  handleTextInput,
  withNextInputAutoFocusInput
)(TextField);
const FormikForm = withNextInputAutoFocusForm(View);

const Step1 = props => {
  // wont submit if Yup does not pass
  const [setPropertyFields] = useMutation(
    SET_PROPERTY_FORM_FIELDS_LOCAL_MUTATION
  );

  const handleNextBtnClick = async (validateForm, errors, handleSubmit) => {
    await validateForm();
    toastErrors(errors);
    handleSubmit(); // fires Formik onSubmit on success
  };
  const submitStep = fieldValues => {
    setPropertyFields({
      variables: {
        fields: {
          ...fieldValues
        }
      }
    });
    props.navigation.navigate("AddPropertyStep2");
  };
  const exitAddingProperty = () => {
    props.navigation.goBack(null);
  };
  return (
    <Formik
      initialValues={ADD_PROPERTY_STEP_1_CONF.initialValues}
      onSubmit={submitStep}
      validateOnMount={true}
      validationSchema={ADD_PROPERTY_STEP_1_CONF.validationSchema}
    >
      {formikProps => {
        const {
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          submitCount,
          validateForm,
          setFieldValue
        } = formikProps;
        return (
          <Root>
            <Container>
              <Header>
                <Text>Property Location & details</Text>
              </Header>
              <Content>
                <FormikForm style={styles.form}>
                  <List
                    dataArray={ADD_PROPERTY_STEP_1_CONF.fields}
                    keyExtractor={item => String(item.name)}
                    itemDivider={false}
                    renderRow={item => (
                      <FormikFieldByType
                        setFieldValue={setFieldValue}
                        key={item.name}
                        config={item}
                        value={values[item.name]}
                        error={errors[item.name]}
                        touched={touched[item.name]}
                        submitCount={submitCount}
                      />
                    )}
                  />
                </FormikForm>
              </Content>

              <Footer style={styles.footer}>
                <Button
                  onPress={exitAddingProperty}
                  title="Next"
                  style={styles.action}
                >
                  <Text style={styles.btnText}>Exit</Text>
                </Button>
                <Button
                  onPress={() =>
                    handleNextBtnClick(validateForm, errors, handleSubmit)
                  }
                  style={styles.action}
                >
                  <Text style={styles.btnText}>Next</Text>
                </Button>
              </Footer>
            </Container>
          </Root>
        );
      }}
    </Formik>
  );
};

Step1.navigationOptions = {
  title: "Add Property 1/3",
  navigationOptions: {
    tabBarLabel: "Adding Properties"
  }
};

export default Step1;
