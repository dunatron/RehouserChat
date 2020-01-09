import React from "react";

import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_OPEN_CHATS } from "../../apollo/local-state";
import { CLOSE_CHAT_LOCAL_MUTATION } from "../../apollo/resolvers";
import OpenChatsMover from "./OpenChatsMover";
import NavigationService from "../../services/navigationService";

/**
 * If we visit the chats navigation before we get a message then ythe whole thibg does not work...
 */
const OpenChats = ({ me, activeRouteName }) => {
  const { data, error, loading } = useQuery(GET_OPEN_CHATS);
  const [closeChat] = useMutation(CLOSE_CHAT_LOCAL_MUTATION);

  const doNotRenderOnTheseRoutes = ["Chats", "Chat"];

  console.log("Our current route  activeRouteName=> ", activeRouteName);

  if (doNotRenderOnTheseRoutes.includes(activeRouteName)) return null;

  if (loading) return null;
  if (error) return null;
  const { openChats } = data;

  if (openChats.length === 0) return null;
  const handleCloseChats = () => {
    openChats.map(c => {
      closeChat({
        variables: {
          id: c.id
        }
      });
    });
  };
  const openTopChat = () => {
    NavigationService.navigate("Chat", {
      chat: openChats[0]
    });
  };
  return (
    <OpenChatsMover
      chats={openChats}
      me={me}
      closeAll={handleCloseChats}
      openTopChat={openTopChat}
    />
  );
};

export default OpenChats;
