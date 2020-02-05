import { InMemoryCache } from "@apollo/client";
import { getAuthToken } from "../utils/userAuth";

const cache = new InMemoryCache({});

const ADD_PROPERTY_FORM = {
  __typename: "Property",
  type: "",
  rent: "",
  location: "",
  locationLat: "",
  locationLng: "",
  rooms: "",
  moveInDate: "",
  expiryDate: "",
  carportSpaces: "",
  garageSpaces: "",
  offStreetSpaces: "",
  files: [],
  accommodation: [
    {
      __typename: "Accommodation",
      roomSize: "",
      rent: "",
      expenses: "",
      description: ""
    }
  ],
  outdoorFeatures: [],
  indoorFeatures: []
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
  // files: []
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
