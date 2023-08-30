import { View, Text } from "react-native";
import React from "react";
import ScreenTitle from "../shared/ScreenTitle";

const Leaderboard = () => {
  return (
    <View
      style={{
        paddingHorizontal: 15,
        paddingBottom: 100,
        width: "100%",
        height: "90%",
        justifyContent: "center",
        backgroundColor: "#F2EBE3",
      }}
    >
      <ScreenTitle title="Coming soon..." textAlign="center" />
    </View>
  );
};

export default Leaderboard;
