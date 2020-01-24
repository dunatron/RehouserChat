import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
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
import { GET_PROPERTY_FORM } from "../../apollo/local-state";
import { SET_PROPERTY_FORM_FIELDS_LOCAL_MUTATION } from "../../apollo/resolvers";
import Loader from "../../components/Loader";
import Error from "../../components/Error";

const RehouserImagePicker = () => {
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
    props.navigation.navigate("AddPropertyStep3");
  };

  const getPermissionAsync = async () => {
    console.group("DEEBUG ALL PERMISSIONS");
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const notificationPermissions = await Permissions.askAsync(
      Permissions.NOTIFICATIONS
    );
    console.log("getPermissionAsync status => ", status);
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }
    console.log("notificationPermissions => ", notificationPermissions);
    console.log("notificationPermissions => ", notificationPermissions);
    console.log("Constants.platform => ", Constants.platform);
    console.log("Camera Permissions => ", Permissions.CAMERA_ROLL);

    console.groupEnd();
  };

  getPermissionAsync();

  const _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Images, Videos, All
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    console.log(result);

    if (!result.cancelled) {
      //   this.setState({ image: result.uri });
      setImage(result);
    }
  };

  if (loading) return <Loader />;
  if (error) return <Error error={error} />;

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

export default RehouserImagePicker;
