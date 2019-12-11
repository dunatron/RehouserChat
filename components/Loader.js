import React from "react";
import { View } from "react-native";
import { Bubbles, DoubleBounce, Bars, Pulse } from "react-native-loader";

const Loader = () => {
  return (
    <View>
      <Bubbles size={10} color="#FFF" />
      <Bars size={10} color="#FDAAFF" />
      <Pulse size={10} color="#52AB42" />
      <DoubleBounce size={10} color="#1CAFF6" />
    </View>
  );
};

export default Loader;
