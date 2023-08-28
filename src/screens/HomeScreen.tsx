import { StyleSheet, Text, View } from "react-native";
import React from "react";
import HomeHeader from "../components/home/HomeHeader";
import Home from "../components/home/Home";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <HomeHeader />
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
