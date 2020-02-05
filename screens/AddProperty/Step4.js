import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { useQuery, useMutation } from "@apollo/react-hooks";
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
import { Image } from "react-native";
import { GET_PROPERTY_FORM } from "../../apollo/local-state";
import { SET_PROPERTY_FORM_FIELDS_LOCAL_MUTATION } from "../../apollo/resolvers";
import { cameraPermissions } from "../../utils/phonePermissions";
import styles from "./Styles";
import Loader from "../../components/Loader";
import Error from "../../components/Error";

const Step4 = props => {
  const [image, setImage] = useState();

  const { data, error, loading } = useQuery(GET_PROPERTY_FORM);
  const [setPropertyFields] = useMutation(
    SET_PROPERTY_FORM_FIELDS_LOCAL_MUTATION
  );

  const submitStep = () => {
    // ToDo change to multiple image picker
    // send array of image objects up
    // not even sure what it is currently, perhaps a local file location.
    // we will need to get access to the image in its entirety to send to the server via a mutation.
    // we sned file accross server then the server will store it in cloudinary
    // setPropertyFields({
    //   variables: {
    //     fields: {
    //       ...fieldValues
    //     }
    //   }
    // });
    console.log("Submitting image step => ", image);
    props.navigation.navigate("AddPropertyFinalStep");
  };

  const previousStep = () => {
    // maybe do a local-state save on back
    props.navigation.goBack(null);
  };

  const _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Images, Videos, All
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    // Image has been picked, save it to the apollo cache

    // console.log(result);

    if (!result.cancelled) {
      setPropertyFields({
        variables: {
          fields: {
            files: [result]
          }
        }
      });
      //   this.setState({ image: result.uri });
      setImage(result);
    }
  };

  if (loading) return <Loader />;
  if (error) return <Error error={error} />;

  cameraPermissions();

  // add image to form in cache and query call. Make it an array
  // no need to use formik and its ugly render props
  // just have it hold images localyy here
  console.log("data.addPropertyForm => ", data.addPropertyForm);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Container>
        <Header>
          <Text>Add Accommodation For Property</Text>
        </Header>
        <Content>
          <Button onPress={_pickImage} style={styles.action}>
            <Text>Pick an image from camera roll</Text>
          </Button>
          {image && (
            <Image
              source={{ uri: image.uri }}
              style={{ width: 200, height: 200 }}
            />
          )}
        </Content>
        <Footer>
          <Button onPress={previousStep} style={styles.action}>
            <Text style={styles.btnText}>Back</Text>
          </Button>
          <Button onPress={() => submitStep()} style={styles.action}>
            <Text style={styles.btnText}>Next</Text>
          </Button>
        </Footer>
      </Container>
    </View>
  );
};

Step4.navigationOptions = {
  title: "Add Property 2/3",
  navigationOptions: {
    tabBarLabel: "Adding Properties"
  }
};

export default Step4;
