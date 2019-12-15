import { InMemoryCache } from "@apollo/client";
import { getAuthToken } from "../utils/userAuth";

const cache = new InMemoryCache({});

// lets write some logic for isLoggedIn
cache.writeData({
  data: {
    isLoggedIn: !!getAuthToken(),
    openChats: []
  }
});

export default cache;
