import { StyleSheet, Text, View } from "react-native";
import React from "react";
import HomeHeader from "../components/home/HomeHeader";
import { HomeScreenProp } from "../types";

const HomeScreen = ({ navigation }: HomeScreenProp) => {
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
