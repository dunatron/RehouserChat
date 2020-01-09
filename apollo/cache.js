import { InMemoryCache } from "@apollo/client";
import { getAuthToken } from "../utils/userAuth";

const cache = new InMemoryCache({});

const ADD_PROPERTY_FORM = {
  __typename: "Property",
  type: "",
  rent: "",
  location: "",
  locationLat: "",
  locationLng: "state.locationLng",
  rooms: "parseInt(state.rooms)",
  moveInDate: "state.moveInDate",
  expiryDate: "state.expiryDate",
  carportSpaces: "parseInt(state.carportSpaces)",
  garageSpaces: "parseInt(state.garageSpaces)",
  offStreetSpaces: "parseInt(state.offStreetSpaces)",
  accommodation: [
    {
      __typename: "Accommodation",
      roomSize: "",
      rent: "",
      expenses: "",
      description: ""
    }
  ],
  // outdoorFeatures: {
  //   set: []
  // },
  // indoorFeatures: {
  //   set: []
  // },
  // owners: {
  //   connect: {
  //     id: "sdfsdfsf"
  //   }
  // },
  // onTheMarket: false,
  // creator: {
  //   connect: {
  //     id: "asdasdad"
  //   }
  // },
  // images: {
  //   create: [
  //     {
  //       filename: "",
  //       mimetype: "MIMETYPE",
  //       encoding: "encoding",
  //       url: "img.data"
  //     }
  //   ]
  // },
  // accommodation: {
  //   create: []
  // },
  files: []
};

// lets write some logic for isLoggedIn
cache.writeData({
  data: {
    isLoggedIn: !!getAuthToken(),
    openChats: [],
    addPropertyForm: ADD_PROPERTY_FORM
    // addPropertyForm: []
  }
});

export default cache;
