import React from "react";
import { Container, Header, Content, Footer, Text, Button } from "native-base";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_PROPERTY_FORM, GET_OPEN_CHATS } from "../../apollo/local-state";
import { CREATE_PROPERTY_MUTATION } from "../../graphql/mutations";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import styles from "./Styles";

const FinalStep = ({ navigation }) => {
  const { data, error, loading } = useQuery(GET_PROPERTY_FORM);
  const [createPropertyMutation] = useMutation(CREATE_PROPERTY_MUTATION);

  const previousStep = () => {
    navigation.goBack(null);
  };

  // const { data, loading, error } = useQuery(GET_OPEN_CHATS);
  if (loading) return <Loader />;
  if (error) return <Error error={error} />;
  // form variables mapped for mutation
  const { addPropertyForm } = data;
  const _propertyVariables = () => {
    // const theFiles = state.images
    //   .filter(f => f.type === "rawImage")
    //   .map(file => file.data.raw);
    const data = {
      data: {
        type: addPropertyForm.type,
        // rent: parseFloat(state.rent)
        location: addPropertyForm.location,
        locationLat: addPropertyForm.locationLat,
        locationLng: addPropertyForm.locationLng,
        rooms: parseInt(addPropertyForm.rooms),
        moveInDate: addPropertyForm.moveInDate,
        expiryDate: addPropertyForm.expiryDate,
        carportSpaces: parseInt(addPropertyForm.carportSpaces),
        garageSpaces: parseInt(addPropertyForm.garageSpaces),
        offStreetSpaces: parseInt(addPropertyForm.offStreetSpaces),
        outdoorFeatures: {
          set: addPropertyForm.outdoorFeatures
        },
        indoorFeatures: {
          set: addPropertyForm.indoorFeatures
        },
        owners: {
          connect: {
            id: me.id
          }
        },
        onTheMarket: false,
        creator: {
          connect: {
            id: me.id
          }
        }
        // images: {
        //   create: [
        //     ...state.images
        //       .filter(img => img.type !== "rawImage")
        //       .map((img, i) => {
        //         return {
        //           filename: `${state.location}_${i}`,
        //           mimetype: "MIMETYPE",
        //           encoding: "encoding",
        //           url: img.data
        //         };
        //       })
        //   ]
        // },
        // accommodation: {
        //   create: [...state.accommodation]
        // }
      }
      // files: theFiles
    };
    return data;
  };
  // Now we need to craft a big muattion/map for all this shit and do a mutation
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
        <Button
          onPress={() => {
            createPropertyMutation({
              variables: _propertyVariables(),
              update: (proxy, payload) => {
                // Once application is accepted we can create a newLease
                // if (payload.data.acceptRentalApplication.message) {
                //   toast(
                //     <div>
                //       <h1>Application Accepted</h1>
                //     </div>
                //   );
                // }
              },
              refetchQueries: [
                // { query: PROPERTIES_QUERY },
                // { query: OWNER_PROPERTIES_QUERY }
              ]
            });
          }}
          // onPress={createPropertyMutation({
          //   variables: _propertyVariables(),
          //   update: (proxy, payload) => {
          //     // Once application is accepted we can create a newLease
          //     // if (payload.data.acceptRentalApplication.message) {
          //     //   toast(
          //     //     <div>
          //     //       <h1>Application Accepted</h1>
          //     //     </div>
          //     //   );
          //     // }
          //   },
          //   refetchQueries: [
          //     // { query: PROPERTIES_QUERY },
          //     // { query: OWNER_PROPERTIES_QUERY }
          //   ]
          // })}
          title="Next"
          style={styles.action}
        >
          <Text style={styles.btnText}>Next</Text>
        </Button>
      </Footer>
    </Container>
  );
};

export default FinalStep;
