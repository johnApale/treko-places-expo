import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AddPlaceHeader from "../components/add-place/AddPlaceHeader";
import AddInfo from "../components/add-place/AddInfo";
import AddForm from "../components/add-place/AddForm";

const AddPlaceScreen = () => {
  const [showInfoPrompt, setShowInfoPrompt] = useState(true);
  const [hideInfoPrompt, setHideInfoPrompt] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("hideInfoPrompt");
      if (value === "true") {
        setHideInfoPrompt(true);
      }
    } catch (e) {
      console.log("Error fetching from async storage", e);
    }
  };
  const handleCloseInfoPrompt = () => {
    setShowInfoPrompt(false);
  };

  return (
    <>
      <AddPlaceHeader />
      {showInfoPrompt && !hideInfoPrompt ? (
        <AddInfo onClose={handleCloseInfoPrompt} />
      ) : (
        <AddForm />
      )}
    </>
  );
};

export default AddPlaceScreen;

const styles = StyleSheet.create({});
