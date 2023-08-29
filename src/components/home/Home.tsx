import { View, Text } from "react-native";
import React from "react";
import ActionButton from "../shared/ActionButton";
import ScreenTitle from "../shared/ScreenTitle";
import { HomeScreenProp } from "../../types";

const Home = ({ navigation }: HomeScreenProp) => {
  const handlePress = () => {
    navigation.navigate("AddPlace");
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
