import { View, Text } from "react-native";
import React from "react";
import ActionButton from "../shared/ActionButton";
import ScreenTitle from "../shared/ScreenTitle";

const Home = () => {
  const handlePress = () => {
    console.log("Button Pressed");
  };
  return (
    <View
      style={{
        paddingHorizontal: 15,
        width: "100%",
        height: "80%",
        justifyContent: "center",
      }}
    >
      <ScreenTitle
        title="Hey there, explorer!"
        textAlign="center"
        description="Hit the button below to start your journey and unlock a world of possibilities."
      />
      <ActionButton text={"Add New Location"} action={handlePress} />
    </View>
  );
};

export default Home;
