import React from "react";
import { View } from "react-native";
import { Thumbnail, Text } from "native-base";
import { isEmpty } from "ramda";
import { TouchableHighlight } from "react-native";

const ChatImageBubble = ({
  chat,
  me,
  onPress,
  positionStyle,
  width,
  height
}) => {
  if (!chat) return null;
  if (!me) return null;
  const findImageUri = () => {
    if (chat.type === "PEER") {
      return chat.participants.reduce((acc, p) => {
        if (p.id === me.id) return acc;
        if (p.profilePhoto) {
          return p.profilePhoto.url;
        }
        // they have no profile photo,
        return "";
      }, "");
    }
    // is a group chat, so need to get an appropriate image for the group chat.
    // perhaps we can try find an image
    return "";
  };
  const imageUri = findImageUri();
  const noProfileImage = isEmpty(imageUri);
  return (
    <TouchableHighlight
      onPress={onPress}
      activeOpacity={0.85}
      underlayColor="blue"
      style={{
        flex: 1,
        borderRadius: 100,
        ...positionStyle
      }}
    >
      {noProfileImage ? (
        <View>
          <Text>HD</Text>
        </View>
      ) : (
        <Thumbnail
          //   large
          source={{ uri: imageUri }}
          style={{
            width: width,
            height: height,
            borderRadius: width / 2
          }}
        />
      )}
    </TouchableHighlight>
  );
};

export default ChatImageBubble;
