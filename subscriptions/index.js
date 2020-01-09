import React from "react";
import { useSubscription } from "@apollo/react-hooks";
import MessageCreatedSub from "./MessageCreatedSub";
import { useCurrentUser } from "../components/User";

/**
 * SHould probably hoist useCurrentUser to app.js and pass me to screens and ionto here etc
 */
const SubscriptionsProvider = ({ me }) => {
  // console.log();
  // const { data, error, loading } = useCurrentUser();
  // if (loading) return null;
  // if (error) return null;
  // const { me } = data;
  console.log("SubscriptionsProvider");
  if (!me) return null;
  console.log("SubscriptionsProvider is connected");
  return <MessageCreatedSub me={me} />;
};

export default SubscriptionsProvider;
