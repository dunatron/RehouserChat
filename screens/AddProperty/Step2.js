import React, { useRef, useEffect, createRef } from "react";

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
  Form
} from "native-base";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_PROPERTY_FORM } from "../../apollo/local-state";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import { Formik, FieldArray } from "formik";
import { compose } from "recompose";
import {
  handleTextInput,
  withNextInputAutoFocusForm,
  withNextInputAutoFocusInput
} from "react-native-formik";
import * as Yup from "yup";
import { TextField } from "react-native-material-textfield";
import { SET_PROPERTY_FORM_FIELDS_LOCAL_MUTATION } from "../../apollo/resolvers";
import AccommodationCreator from "./AccommodationCreator";

const ADD_PROPERTY_STEP_1_CONF = {
  validationSchema: Yup.object().shape({
    accommodation: Yup.array()
      .of(
        Yup.object().shape({
          roomSize: Yup.string().required("roomSize is required"),
          rent: Yup.string().required("rent is required"),
          expenses: Yup.string().required("expenses is required"),
          description: Yup.string().required("description is required")
        })
      )
      .required("Must have accommodation") // these constraints are shown if and only if inner constraints are satisfied
      .min(1, "Minimum of 1 accommodation must be setup")
  }),
  // initialValues: {
  //   accommodation: [
  //     {
  //       ...defaultAccomodation
  //     }
  //   ]
  // },
  fields: {
    rent: {
      label: "accommodation",
      name: "accommodation",
      placeholder: "e.g 5 Monowai road, Ravensbourne, Dunedin",
      keyboardType: "default"
    }
  }
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

const Step2 = props => {
  // wont submit if Yup does not pass
  const { data, error, loading } = useQuery(GET_PROPERTY_FORM);
  const [setPropertyFields] = useMutation(
    SET_PROPERTY_FORM_FIELDS_LOCAL_MUTATION
  );
  const submitStep = fieldValues => {
    console.log("Step 2 field values => ", fieldValues);
    //ToDo submit values to local apollo store
    setPropertyFields({
      variables: {
        fields: {
          ...fieldValues
        }
      }
    });
    props.navigation.navigate("AddPropertyStep3");
  };

  const previousStep = () => {
    // maybe do a local-state save on back
    props.navigation.goBack(null);
  };
  if (loading) return <Loader />;
  if (error) return <Error error={error} />;
  console.log("values data initial => ", data);
  if (!data)
    return (
      <View>
        <Text>Well we broked something</Text>
      </View>
    );
  const initialValues = {
    // accommodation: [
    //   // {
    //   //   ...defaultAccomodation
    //   // }
    // ]
    accommodation: data.addPropertyForm.accommodation
    // ...data.addPropertyForm.accommodation
  };
  // ToDo: initial values will actually come from the local query and get the specific info that we have
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={submitStep}
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
          submitCount
        } = formikProps;
        return (
          <Container>
            <Header>
              <Text>Add Accommodation For Property</Text>
            </Header>
            <Content>
              <FormikForm style={styles.form}>
                <FieldArray name="accommodation">
                  {({
                    move,
                    swap,
                    push,
                    insert,
                    unshift,
                    pop,
                    form,
                    remove,
                    replace
                  }) => {
                    console.log("keystroke values => ", values);
                    return (
                      <Form>
                        <AccommodationCreator
                          items={values.accommodation}
                          replace={replace}
                          push={push}
                          remove={remove}
                        />
                      </Form>
                    );
                  }}
                </FieldArray>
              </FormikForm>
            </Content>
            <Footer style={styles.footer}>
              <Button onPress={previousStep} style={styles.action}>
                <Text style={styles.btnText}>Back</Text>
              </Button>
              <Button onPress={handleSubmit} style={styles.action}>
                <Text style={styles.btnText}>Next</Text>
              </Button>
            </Footer>
          </Container>
        );
      }}
    </Formik>
  );
};

Step2.navigationOptions = {
  title: "Add Property 2/3",
  navigationOptions: {
    tabBarLabel: "Adding Properties"
  }
};

export default Step2;

// push: (obj: any) => void: Add a value to the end of an array
// swap: (indexA: number, indexB: number) => void: Swap two values in an array
// move: (from: number, to: number) => void: Move an element in an array to another index
// insert: (index: number, value: any) => void: Insert an element at a given index into the array
// unshift: (value: any) => number: Add an element to the beginning of an array and return its length
// remove<T>(index: number): T | undefined: Remove an element at an index of an array and return it
// pop<T>(): T | undefined: Remove and return value from the end of the array
// replace: (index: number, value: any) => void: Replace a value at the given index into the array
