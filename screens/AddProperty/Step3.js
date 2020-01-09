import React from "react";
import { Container, Header, Content, Footer, Text, Button } from "native-base";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_PROPERTY_FORM, GET_OPEN_CHATS } from "../../apollo/local-state";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import styles from "./Styles";

const Step3 = ({ navigation }) => {
  const { data, error, loading } = useQuery(GET_PROPERTY_FORM);

  const submitProperty = () => {
    // 1. take the data from addPropertyForm and put it into the correct shape for creating a new property
    // 2. perform the mutation as per usual
  };
  const previousStep = () => {
    navigation.goBack(null);
  };
  // const { data, loading, error } = useQuery(GET_OPEN_CHATS);
  if (loading) return <Loader />;
  if (error) return <Error error={error} />;
  // console.group("Step 3 data");
  // console.log("loading => ", loading);
  // console.log("error => ", error);
  // console.log("data => ", data);
  // console.groupEnd();
  return (
    <Container>
      <Header>
        <Text>Check Details</Text>
      </Header>
      <Content>
        <Text>
          Here we check if all the details are correct then we hit the submit
          buttton
        </Text>
        {/* <Text>{JSON.stringify(data, null, 2)}</Text> */}
        <Text>{JSON.stringify(data.addPropertyForm, null, 2)}</Text>
      </Content>
      <Footer style={styles.footer}>
        <Button onPress={previousStep} title="Next" style={styles.action}>
          <Text style={styles.btnText}>Back</Text>
        </Button>
        <Button onPress={submitProperty} title="Next" style={styles.action}>
          <Text style={styles.btnText}>Next</Text>
        </Button>
      </Footer>
    </Container>
  );
};

export default Step3;
