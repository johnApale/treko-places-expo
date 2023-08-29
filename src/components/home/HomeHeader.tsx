import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomTabBar from "../custom/TabBar";
import Home from "./Home";
import Leaderboard from "./Leaderboard";
import { Ionicons, Feather, AntDesign } from "@expo/vector-icons";
import { Text as textStyle } from "../../styles";

interface Tab {
  id: number;
  title: string;
  icon?: any;
}

const tabs: Tab[] = [
  {
    id: 1,
    title: "Home",
    icon: <Feather name="home" size={16} color="#EA580C" />,
  },
  {
    id: 2,
    title: "Leaderboard",
    icon: <AntDesign name="Trophy" size={16} color="#EA580C" />,
  },
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

  const handleLogout = () => {
    console.log("Logout pressed.");
  };
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.leftContainer}>
          <Image source={require("../../../assets/TREKO-logo.png")} />
        </View>
        <View style={styles.rightContainer}>
          <Pressable
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={handleLogout}
          >
            <Text style={{ ...(textStyle.link as any), marginRight: 5 }}>
              Logout
            </Text>
            <Ionicons name="log-out-outline" size={20} color="#EA580C" />
          </Pressable>
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
