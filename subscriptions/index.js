import React from "react";
import { useSubscription } from "@apollo/react-hooks";
import MessageCreatedSub from "./MessageCreatedSub";
import { useCurrentUser } from "../components/User";
/**
 * SHould probably hoist useCurrentUser to app.js and pass me to screens and ionto here etc
 */
const SubscriptionsProvider = () => {
  const { data, error, loading } = useCurrentUser();
  if (loading) return null;
  if (error) return null;
  const { me } = data;
  if (!me) return null;
  return <MessageCreatedSub me={me} />;
};

export default SubscriptionsProvider;
