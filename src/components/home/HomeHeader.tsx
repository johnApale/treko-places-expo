import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, Feather, AntDesign } from "@expo/vector-icons";

import CustomTabBar from "../custom/TabBar";
import Home from "./Home";
import Leaderboard from "./Leaderboard";
import { Text as textStyle } from "../../styles";
import { MainNavigationProp } from "../../types";
import { useAuth } from "../../contexts/AuthProvider";

interface Tab {
  id: number;
  title: string;
  icon?: any;
}

const tabs: Tab[] = [
  {
    id: 1,
    title: "Home",
    icon: <Feather name="home" size={16} color="#E17858" />,
  },
  {
    id: 2,
    title: "Leaderboard",
    icon: <AntDesign name="Trophy" size={16} color="#E17858" />,
  },
];

const HomeHeader = ({ navigation }: MainNavigationProp) => {
  const { signOut } = useAuth();
  const [activeTab, setActiveTab] = useState(1);

  const renderScreen = () => {
    switch (activeTab) {
      case 1:
        return <Home navigation={navigation} />;
      case 2:
        return <Leaderboard />;
      default:
        return null;
    }
  };

  const handleLogout = () => {
    signOut();
  };
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.leftContainer}>
          <Image
            style={{ height: 26, width: 26 }}
            source={require("../../../assets/TREKO-logo.png")}
          />
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
