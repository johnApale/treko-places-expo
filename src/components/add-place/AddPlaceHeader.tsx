import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Text as textStyle } from "../../styles";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const AddPlaceHeader = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
          }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <AntDesign name="arrowleft" size={16} color="#EA580C" />
          <Text style={{ ...(textStyle.link as any), marginLeft: 5 }}>
            Back
          </Text>
        </Pressable>
        <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 20 }}>
          Add Location
        </Text>
      </SafeAreaView>
    </View>
  );
};

export default AddPlaceHeader;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: "#D9D9D9",
    padding: 20,
  },
});
