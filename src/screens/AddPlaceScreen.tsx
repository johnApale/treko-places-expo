import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AddPlaceHeader from "../components/add-place/AddPlaceHeader";
import AddInfo from "../components/add-place/AddInfo";

const AddPlaceScreen = () => {
  return (
    <>
      <AddPlaceHeader />
      <AddInfo />
    </>
  );
};

export default AddPlaceScreen;

const styles = StyleSheet.create({});
