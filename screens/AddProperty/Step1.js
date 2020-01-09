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
  Text
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
import FormikInputField from "../../components/Inputs/FormikInputField";

const ADD_PROPERTY_STEP_1_CONF = {
  validationSchema: Yup.object().shape({
    location: Yup.string()
      .required("location is required")
      .min(2, "pretty sure this isnt a location"),
    locationLat: Yup.string()
      .required("latitude of the property is required")
      .min(2, "pretty sure this isnt a latitude coordinate")
  }),
  initialValues: {
    // location: "Dunedin",
    // locationLat: "1787.9029408"
  },
  fields: [
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
      keyboardType: "default"
    },
    {
      label: "rooms",
      name: "rooms",
      keyboardType: "numeric"
    },
    {
      label: "bathrooms",
      name: "bathrooms",
      keyboardType: "numeric"
    },
    {
      label: "garageSpaces",
      name: "garageSpaces",
      keyboardType: "numeric"
    },
    {
      label: "carportSpaces",
      name: "carportSpaces",
      keyboardType: "numeric"
    },
    {
      label: "offStreetSpaces",
      name: "offStreetSpaces",
      keyboardType: "numeric"
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
  const submitStep = fieldValues => {
    //ToDo submit values to local apollo store
    console.log("The values => ", fieldValues);
    setPropertyFields({
      variables: {
        fields: {
          ...fieldValues
        }
      }
    });
    props.navigation.navigate("AddPropertyStep2");
    //setPropertyFields
    // openChat
    //variables: { chat: node.chat }
    // openChat({
    //   variables: {
    //     // __typename: "ADD_PROPERTY_FORM",
    //     // rent: "9000"
    //     chat: {
    //       __typename: "Chat",
    //       id: "ck47myuslpyop0b09hj01miiw",
    //       name: "CHat room 0",
    //       participants: [
    //         {
    //           __typename: "User",
    //           firstName: "Heath",
    //           id: "ck2k0095umh5l0b099487efci",
    //           lastName: "Dunlop",
    //           profilePhoto: {
    //             __typename: "File",
    //             filename: "12421.jpg",
    //             url:
    //               "https://res.cloudinary.com/dkhe0hx1r/image/upload/v1572848115/goi8er8r9lep8ej3ilcf.jpg"
    //           }
    //         },
    //         {
    //           __typename: "User",
    //           firstName: "Cunt",
    //           id: "ck47mygbypynz0b0935rz9gcu",
    //           lastName: "Face",
    //           profilePhoto: {
    //             __typename: "File",
    //             filename: "1920x1080-studentProfile.jpg",
    //             url:
    //               "https://res.cloudinary.com/dkhe0hx1r/image/upload/v1576461678/q35s5qeszsd6elsffwnf.jpg"
    //           }
    //         }
    //       ],
    //       type: "PEER"
    //     }
    //   }
    // });
    // props.navigation.navigate("AddPropertyStep2");
  };
  const exitAddingProperty = () => {
    props.navigation.goBack(null);
  };
  return (
    <Formik
      initialValues={ADD_PROPERTY_STEP_1_CONF.initialValues}
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
              <Text>Property Location & details</Text>
            </Header>

            <Content>
              <FormikForm style={styles.form}>
                <List
                  dataArray={ADD_PROPERTY_STEP_1_CONF.fields}
                  keyExtractor={item => String(item.name)}
                  itemDivider={false}
                  renderRow={item => (
                    <FieldByType
                      key={item.name}
                      config={item}
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
              <Button onPress={handleSubmit} title="Next" style={styles.action}>
                <Text style={styles.btnText}>Next</Text>
              </Button>
            </Footer>
          </Container>
        );
      }}
    </Formik>
  );
};

// Material implementstion
const FieldByType = ({ config, error, touched, submitCount }) => {
  const generateError = () => {
    if (error && touched) return error;
    if (error && submitCount > 0) return error;
    return undefined;
  };
  const errorText = generateError();
  return <FormikInputField {...config} error={errorText} />;
};

Step1.navigationOptions = {
  title: "Add Property 1/3",
  navigationOptions: {
    tabBarLabel: "Adding Properties"
  }
};

export default Step1;
