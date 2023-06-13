import React from "react";
import { ActivityIndicator, View } from "react-native";
import { appColor } from '../../global';
const MyLoader = () => (
  <View style={{ position: "absolute", top: "45%", left: "50%" }}>
    <ActivityIndicator
      size="large" color={appColor.black}
    />
  </View>
)

export { MyLoader }; 