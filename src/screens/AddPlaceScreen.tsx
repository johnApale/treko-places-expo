import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AddPlaceHeader from "../components/add-place/AddPlaceHeader";
import AddInfo from "../components/add-place/AddInfo";
import AddForm from "../components/add-place/AddForm";
import { MainNavigationProp } from "../types";
import LoadingOverlay from "../components/shared/LoadingOverlay";

const AddPlaceScreen = ({ navigation }: MainNavigationProp) => {
  const [showInfoPrompt, setShowInfoPrompt] = useState(true);
  const [hideInfoPrompt, setHideInfoPrompt] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData();
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
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
      <View style={{ flex: 1 }}>
        {isLoading && <LoadingOverlay solidBackground />}
        {showInfoPrompt && !hideInfoPrompt ? (
          <AddInfo onClose={handleCloseInfoPrompt} />
        ) : (
          <AddForm navigation={navigation} />
        )}
      </View>
    </>
  );
};

export default AddPlaceScreen;

const styles = StyleSheet.create({});
