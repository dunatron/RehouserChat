import React, { useRef, useEffect, createRef, useState } from "react";

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
import FormikErrors from "../../components/FormikErrors";
import IndoorFeatureDropDown from "../../components/Dropdowns/IndoorFeatures";
import OutdoorFeatureDropDown from "../../components/Dropdowns/OutdoorFeatures";
import EnumMultiSelect from "../../components/Dropdowns/EnumMultiSelect";

const ADD_PROPERTY_STEP_3_CONF = {
  validationSchema: Yup.object().shape({
    indoorFeatures: Yup.array()
      .required("Must have accommodation") // these constraints are shown if and only if inner constraints are satisfied
      .min(1, "Minimum of 1 accommodation must be setup")
  })
};

const FormikForm = withNextInputAutoFocusForm(View);

const Step3 = props => {
  const [selectedIndoorFeatures, setSelectedIndoorFeatures] = useState([]);
  const [selectedOutdoorFeatures, setSelectedOutdoorFeatures] = useState([]);
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
    props.navigation.navigate("AddPropertyFinalStep");
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
    outdoorFeatures: data.addPropertyForm.outdoorFeatures,
    indoorFeatures: data.addPropertyForm.indoorFeatures
  };
  // ToDo: initial values will actually come from the local query and get the specific info that we have
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={submitStep}
      validationSchema={ADD_PROPERTY_STEP_3_CONF.validationSchema}
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
                    console.log(" values => ", values);
                    console.log(" errors => ", errors);
                    console.log(" touched => ", touched);
                    return (
                      <Form>
                        <EnumMultiSelect
                          __type="IndoorFeature"
                          selectText="select indoor feature"
                          selected={selectedIndoorFeatures}
                          setSelected={items =>
                            setSelectedIndoorFeatures(items)
                          }
                        />
                        <EnumMultiSelect
                          __type="OutdoorFeature"
                          selectText="select outdoor features"
                          selected={selectedOutdoorFeatures}
                          setSelected={items =>
                            setSelectedOutdoorFeatures(items)
                          }
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

Step3.navigationOptions = {
  title: "Add Property 2/3",
  navigationOptions: {
    tabBarLabel: "Adding Properties"
  }
};

export default Step3;
