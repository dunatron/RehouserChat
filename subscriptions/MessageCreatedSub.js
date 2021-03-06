import { useState } from "react";
import { useQuery, useMutation, useSubscription } from "@apollo/react-hooks";
import { MESSAGE_CREATED_SUBSCRIPTION } from "../graphql/subscriptions/MessageCreatedSub";
import { OPEN_CHAT_LOCAL_MUTATION } from "../apollo/local-state";

import { writeMessage } from "../services/writeMessage";

const MessageCreatedSub = ({ me }) => {
  console.log("Message created sub is here");
  const [openChat] = useMutation(OPEN_CHAT_LOCAL_MUTATION);
  // Subscribe to al new messages where user is a participant
  useSubscription(MESSAGE_CREATED_SUBSCRIPTION, {
    variables: {
      where: {
        // mutation_in: 'CREATED', // listen for CREATED, UPDATED, DELETED
        node: {
          chat: {
            participants_some: {
              id: me.id
            }
          }
        }
      }
    },
    onSubscriptionData: ({ client, subscriptionData }) => {
      console.log("A message has been recieved via subscription");
      // for whatever reason after visiting the chats route it no longer works
      // solved, its because it queried Message and Message fields where diffenet on connection and sub
      // open this chat in the local ApolloState
      const {
        data: {
          messageSub: { mutation, node, updatedFields, previousValues }
        }
      } = subscriptionData;

      // we were the sender do nothing with this sub
      if (me.id === node.sender.id) {
        return;
      }
      // write message to cache service
      // if previouseValues and updatedFields are null this is a new message
      if (previousValues === null && updatedFields === null) {
        // this is a brand new message
      }
      if (mutation === "CREATED") {
        // this is a brand new message
        writeMessage(client, node);
      }
      if (mutation === "UPDATED") {
        // a message was updated
      }
      if (mutation === "DELETE") {
        // message was deleted
      }
      console.log("Calling open chat lad => ", node.chat);
      openChat({
        // variables: { id: node.chat.id, participants: node.chat.participants },
        variables: { chat: node.chat }
      });
      //   // update Messages not seen
      //   toast(
      //     <div>
      //       <h4>
      //         Message: {node.sender.firstName} {node.sender.lastName}
      //       </h4>
      //       <p>{node.content}</p>
      //     </div>
      //   );
    }
  });
  return null;
};

export default MessageCreatedSub;
