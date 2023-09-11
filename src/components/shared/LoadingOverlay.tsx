import React from "react";
import { View, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";

type LoadingProps = {
  solidBackground?: boolean;
};
const LoadingOverlay = ({ solidBackground }: LoadingProps) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: solidBackground ? "#F2EBE3" : "rgba(0,0,0, .4)",
      position: "absolute",
      width: "100%",
      height: "100%",
      zIndex: 10,
      paddingBottom: 60,
      alignItems: "center",
      justifyContent: "center",
    },
  });
  return (
    <View style={styles.container}>
      <Animatable.View
        animation="rotate"
        iterationCount="infinite"
        duration={1000}
      >
        <AntDesign name="loading1" size={24} color="black" />
      </Animatable.View>
    </View>
  );
};

export default LoadingOverlay;
