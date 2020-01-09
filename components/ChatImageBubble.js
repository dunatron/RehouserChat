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
  console.log("AM i getting to this image bubble?");
  return noProfileImage ? (
    <View>
      <Text>HD</Text>
    </View>
  ) : (
    <Thumbnail
      //   large
      pointerEvents="none"
      source={{ uri: imageUri }}
      style={{
        width: width,
        height: height,
        borderRadius: width / 2
      }}
    />
  );
  return (
    <TouchableHighlight
      // onPress={onPress}
      pointerEvents="none"
      activeOpacity={0.85}
      underlayColor="blue"
      style={{
        flex: 1,
        borderRadius: 100,
        pointerEvents: "none",
        ...positionStyle
      }}
    >
      <View>
        <Text>HD</Text>
      </View>
      {/* {noProfileImage ? (
        <View>
          <Text>HD</Text>
        </View>
      ) : (
        <Thumbnail
          //   large
          pointerEvents="none"
          source={{ uri: imageUri }}
          style={{
            width: width,
            pointerEvents: "none",
            height: height,
            borderRadius: width / 2
          }}
        />
      )} */}
    </TouchableHighlight>
  );
};

export default ChatImageBubble;
