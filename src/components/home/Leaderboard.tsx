import { View, Text } from "react-native";
import React from "react";
import ScreenTitle from "../shared/ScreenTitle";

const Leaderboard = () => {
  return (
    <View
      style={{
        paddingHorizontal: 15,
        width: "100%",
        height: "80%",
        justifyContent: "center",
      }}
    >
      <ScreenTitle title="Coming soon..." textAlign="center" />
    </View>
  );
};

export default Leaderboard;
