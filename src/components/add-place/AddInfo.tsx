import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { addInfoContent } from "../../constants/addPlaceFields";
import ActionButton from "../shared/ActionButton";

interface Item {
  id: number;
  title: string;
  description: string;
  icon: JSX.Element;
}

interface InfoProp {
  onClose: () => void;
}

const AddInfo = ({ onClose }: InfoProp) => {
  const [showPrompt, setShowPrompt] = useState(true);

  const renderItem = ({ item }: { item: Item }) => (
    <View style={styles.items}>
      <View style={styles.iconColumn}>{item.icon}</View>
      <View style={styles.textColumn}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );

  const handleContinue = () => {
    console.log("Continue pressed.");
    onClose();
  };

  const handleDontShow = async () => {
    try {
      await AsyncStorage.setItem("hideInfoPrompt", "true");
      setShowPrompt(false);
      onClose();
    } catch (e) {
      // saving error
      console.log(e);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={{ padding: 20, backgroundColor: "#FAFAFA" }}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            Share your favorite places and contribute to Treko's curated catalog
          </Text>
          <FlatList
            data={addInfoContent}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={1}
          />
        </View>
      </View>
      <View style={{ margin: 20 }}>
        <ActionButton text="Continue" action={handleContinue} />
        <Pressable onPress={handleDontShow}>
          <Text style={{ padding: 20, textAlign: "center", color: "#EA580C" }}>
            Don't show this again
          </Text>
        </Pressable>
      </View>
    </>
  );
};

export default AddInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 30,
    marginHorizontal: 20,
  },
  items: {
    flex: 1,
    flexDirection: "row",
    marginTop: 30,
    padding: 10,
    borderRadius: 8,
    elevation: 3,
  },
  iconColumn: {
    marginRight: 20,
  },
  textColumn: {
    flex: 1,
    paddingTop: 2,
  },
  title: {
    fontWeight: "bold",
  },
  description: {
    marginTop: 5,
    fontSize: 12,
  },
});
