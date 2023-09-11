import { View, StyleSheet } from "react-native";
import React from "react";
import ActionButton from "../shared/ActionButton";
import ScreenTitle from "../shared/ScreenTitle";
import { MainNavigationProp } from "../../types";
import { useAuth } from "../../contexts/AuthProvider";
import LoadingOverlay from "../shared/LoadingOverlay";

const Home = ({ navigation }: MainNavigationProp) => {
  const { user, isLoading } = useAuth();
  const handlePress = () => {
    navigation.navigate("AddPlace");
  };
  return (
    <>
      {isLoading && <LoadingOverlay />}
      <View style={styles.container}>
        <ScreenTitle
          title={`Hey there, ${user?.user_metadata.first_name || "explorer"}!`}
          textAlign="center"
          description="Hit the button below to start your journey and unlock a world of possibilities."
        />
        <ActionButton text={"Add New Location"} action={handlePress} />
      </View>
    </>
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
