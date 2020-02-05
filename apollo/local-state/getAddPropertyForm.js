import gql from "graphql-tag";

const GET_PROPERTY_FORM = gql`
  {
    addPropertyForm @client {
      type
      rent
      location
      locationLat
      locationLng
      files
      rooms
      moveInDate
      expiryDate
      carportSpaces
      garageSpaces
      offStreetSpaces
      accommodation {
        roomSize
        rent
        expenses
        description
      }
      outdoorFeatures
      indoorFeatures
    }
  }
`;

export { GET_PROPERTY_FORM };
export default GET_PROPERTY_FORM;
