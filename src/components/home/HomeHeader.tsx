import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomTabBar from "../custom/TabBar";
import Home from "./Home";
import Leaderboard from "./Leaderboard";

interface Tab {
  id: number;
  title: string;
}

const tabs: Tab[] = [
  { id: 1, title: "Home" },
  { id: 2, title: "Leaderboard" },
];

const HomeHeader = () => {
  const [activeTab, setActiveTab] = useState(1);

  const renderScreen = () => {
    switch (activeTab) {
      case 1:
        return <Home />;
      case 2:
        return <Leaderboard />;
      default:
        return null;
    }
  };
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.leftContainer}>
          <Text>Logo</Text>
        </View>
        <View style={styles.rightContainer}>
          <Text>Logout</Text>
        </View>
      </SafeAreaView>
      <View>
        <CustomTabBar
          tabs={tabs}
          activeTab={activeTab}
          onPressTab={(tabId) => setActiveTab(tabId)}
        />
        {renderScreen()}
      </View>
    </>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: "auto",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: -10,
    borderBottomColor: "#D9D9D9",
    // paddingTop: 50,
  },
  leftContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  rightContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
