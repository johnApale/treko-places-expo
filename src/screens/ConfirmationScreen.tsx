import { View, StyleSheet, Pressable, Text } from "react-native";
import React from "react";
import { MainNavigationProp } from "../types";
import ScreenTitle from "../components/shared/ScreenTitle";
import ActionButton from "../components/shared/ActionButton";
import AddPlaceHeader from "../components/add-place/AddPlaceHeader";

const ConfirmationScreen = ({ navigation }: MainNavigationProp) => {
  const handlePress = () => {
    navigation.navigate("AddPlace");
  };
  const handleHome = () => {
    navigation.navigate("Home");
  };
  return (
    <>
      <AddPlaceHeader />
      <View style={styles.container}>
        <ScreenTitle
          title="Thanks for your contribution!"
          textAlign="center"
          description="Your place has been added to our growing list of locations. Add another place of interest or go back home to view the leaderboard."
        />
        <ActionButton text={"Add Another Location"} action={handlePress} />
        <Pressable onPress={handleHome}>
          <Text style={{ padding: 20, textAlign: "center", color: "#E17858" }}>
            Back to Homepage
          </Text>
        </Pressable>
      </View>
    </>
  );
};

export default ConfirmationScreen;

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
