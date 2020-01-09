import gql from "graphql-tag";
import { GET_OPEN_CHATS, GET_PROPERTY_FORM } from "./local-state";

export const OPEN_CHAT_LOCAL_MUTATION = gql`
  mutation OPEN_CHAT_LOCAL_MUTATION($chat: Chat) {
    openChat(chat: $chat) @client
  }
`;

export const CLOSE_CHAT_LOCAL_MUTATION = gql`
  mutation OPEN_CHAT_LOCAL_MUTATION($id: Int!) {
    closeChat(id: $id) @client
  }
`;

// export const SET_PROPERTY_FORM_FIELDS_LOCAL_MUTATION = gql`
//   mutation SET_PROPERTY_FORM_FIELDS_LOCAL_MUTATION($fields: Property) {
//     setPropertyFormFields(fields: $fields) @client
//   }
// `;

// export const SET_PROPERTY_FORM_FIELDS_LOCAL_MUTATION = gql`
//   mutation SET_PROPERTY_FORM_FIELDS_LOCAL_MUTATION($id: Int!) {
//     setPropertyFormFields(id: $id) @client
//   }
// `;

export const SET_PROPERTY_FORM_FIELDS_LOCAL_MUTATION = gql`
  mutation SET_PROPERTY_FORM_FIELDS_LOCAL_MUTATION($fields: Property_Fields) {
    setPropertyFormFields(fields: $fields) @client
  }
`;

const resolvers = () => {
  return {
    Mutation: {
      openChat(_, variables, { cache }) {
        const { openChats } = cache.readQuery({
          query: GET_OPEN_CHATS
        });
        const foundChat = openChats.find(c => c.id === variables.chat.id);

        if (foundChat) {
          // alert("its cool already in bar, return  early")
          return;
        }
        const data = {
          data: {
            openChats: [
              ...openChats,
              {
                id: variables.chat.id,
                type: variables.chat.type,
                participants: variables.chat.participants,
                __typename: "OpenChat"
              }
            ]
          }
        };
        cache.writeData(data);
      },
      closeChat(_, variables, { cache }) {
        const { openChats } = cache.readQuery({
          query: GET_OPEN_CHATS
        });
        const filteredChats = openChats.filter(c => c.id !== variables.id);
        const data = {
          data: {
            openChats: [...filteredChats]
          }
        };
        cache.writeData(data);
      },
      setPropertyFormFields(_, variables, { cache }) {
        console.log("cool setting property fields => ", variables);
        const { fields } = variables;
        const { addPropertyForm } = cache.readQuery({
          query: GET_PROPERTY_FORM
        });
        console.log("Current form values => ", addPropertyForm);
        // const filteredChats = openChats.filter(c => c.id !== variables.id);
        const data = {
          data: {
            addPropertyForm: {
              ...addPropertyForm,
              ...fields
            }
          }
        };
        console.log(" and the data now => ", data);
        cache.writeData(data);
      }
    }
  };
};

export default resolvers;
