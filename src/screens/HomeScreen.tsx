import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import HomeHeader from "../components/home/HomeHeader";
import { MainNavigationProp } from "../types";
import LoadingOverlay from "../components/shared/LoadingOverlay";
import { useAuth } from "../contexts/AuthProvider";

const HomeScreen = ({ navigation }: MainNavigationProp) => {
  const { isLoading } = useAuth();

  return (
    <View style={styles.container}>
      {isLoading ? <LoadingOverlay /> : <HomeHeader navigation={navigation} />}
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
