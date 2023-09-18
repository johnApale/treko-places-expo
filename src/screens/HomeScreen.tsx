import { StyleSheet, View } from "react-native";
import React from "react";
import HomeHeader from "../components/home/HomeHeader";
import { MainNavigationProp } from "../types";

const HomeScreen = ({ navigation }: MainNavigationProp) => {
  return (
    <View style={styles.container}>
      <HomeHeader navigation={navigation} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
