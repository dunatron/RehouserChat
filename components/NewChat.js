import * as React from "react";
import { TextInput } from "react-native";
import { FlatList, Text, Button, View } from "react-native";

import graphqlTag from "graphql-tag";
import { Mutation, useMutation } from "react-apollo";

class MyTextInput extends React.Component {
  state = {
    text: ""
  };

  onSubmit = () => {
    const { onSubmit } = this.props;
    const { text } = this.state;
    onSubmit(text);
    this.setState({ text: "" });
  };

  onChange = text => {
    this.setState({ text });
  };

  render() {
    const { text } = this.state;
    return (
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        placeholder="Enter text..."
        onSubmitEditing={this.onSubmit}
        onChangeText={this.onChange}
        value={text}
      />
    );
  }
}

const CREATE_CHAT_MUTATION = graphqlTag`
mutation CREATE_CHAT_MUTATION(
  $data: ChatCreateInput!
) {
  createChat(data: $data) {
    id
    name
    lastMessage {
      id
      isMine
    }
    participants {
      id
    }
  }
}
`;

const QUERY_CHATS = graphqlTag`
query queryChats {
  chats {
    id
    name
    participants {
      id
      firstName
    }
  }
}
`;

const NewChat = () => {
  const [addChat, { data, loading, error }] = useMutation(CREATE_CHAT_MUTATION);
  return (
    <View>
      <Button
        title="create a new chat"
        onPress={() => {
          addChat({
            variables: {
              data: {
                name: "Heath & Jon Chat 2",
                participants: {
                  connect: [
                    {
                      id: "ck2k0095umh5l0b099487efci"
                    },
                    {
                      id: "ck2k1obb418ua0b00jlbzqpy8"
                    }
                  ]
                }
              }
            },
            refetchQueries: [{ query: QUERY_CHATS }]
          });
        }}
      />
    </View>
  );
};
export default NewChat;
