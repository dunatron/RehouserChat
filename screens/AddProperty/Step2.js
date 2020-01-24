import React, { useRef, useEffect, createRef } from "react";
import { isEmpty } from "ramda";
import { toastErrors } from "../../utils/toastErrors";
import styles from "./Styles";
import {
  Root,
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

const ADD_PROPERTY_STEP_2_CONF = {
  validationSchema: Yup.object().shape({
    // accommodation: Yup.array()
    //   .of(
    //     Yup.object().shape({
    //       roomSize: Yup.string().required("roomSize is required"),
    //       rent: Yup.string().required("rent is required"),
    //       expenses: Yup.string().required("expenses is required"),
    //       description: Yup.string().required("description is required")
    //     })
    //   )
    //   // .required("Must have 1 accommodation set") // these constraints are shown if and only if inner constraints are satisfied
    //   .min(1, "Minimum of 1 accommodation must be setup")
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
  "onTheMarket",
  "owners", // needs to be done automagically
  "creator", // needs to be done automagically
  "images" // own step to add images at the end
];

const FormikForm = withNextInputAutoFocusForm(View);

const Step2 = props => {
  const { data, error, loading } = useQuery(GET_PROPERTY_FORM);
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
    props.navigation.navigate("AddPropertyStep3");
  };

  const previousStep = () => {
    // maybe do a local-state save on back
    props.navigation.goBack(null);
  };

  if (loading) return <Loader />;
  if (error) return <Error error={error} />;
  if (!data)
    return (
      <View>
        <Text>Well we broked something</Text>
      </View>
    );
  const initialValues = {
    accommodation: data.addPropertyForm.accommodation
  };
  return (
    <Formik
      initialValues={initialValues}
      validateOnMount={true}
      onSubmit={submitStep}
      validationSchema={ADD_PROPERTY_STEP_2_CONF.validationSchema}
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
          validateForm
        } = formikProps;
        return (
          <Root>
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
                      console.log(" values => ", values);
                      console.log(" errors => ", errors);
                      console.log(" touched => ", touched);
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
