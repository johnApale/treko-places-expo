import { View, StyleSheet } from "react-native";
import React from "react";
import ActionButton from "../shared/ActionButton";
import ScreenTitle from "../shared/ScreenTitle";
import { MainNavigationProp } from "../../types";

const Home = ({ navigation }: MainNavigationProp) => {
  const handlePress = () => {
    navigation.navigate("AddPlace");
  };
  return (
    <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingBottom: 100,
    width: "100%",
    height: "90%",
    justifyContent: "center",
    backgroundColor: "#F2EBE3",
  },
});
