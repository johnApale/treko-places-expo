import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface Tab {
  id: number;
  title: string;
}

interface CustomTabBarProps {
  tabs: Tab[];
  activeTab: number;
  onPressTab: (tabId: number) => void;
}

const CustomTabBar: React.FC<CustomTabBarProps> = ({
  tabs,
  activeTab,
  onPressTab,
}) => {
  return (
    <View style={styles.tabContainer}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={[
            styles.tabItem,
            tab.id === activeTab ? styles.activeTab : null,
          ]}
          onPress={() => onPressTab(tab.id)}
        >
          <Text style={styles.tabText}>{tab.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 60,
    borderBottomWidth: 1,
    paddingHorizontal: 15,
    paddingBottom: 10,
    borderColor: "#D9D9D9",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
  },
  activeTab: {
    backgroundColor: "#ddd",
    borderRadius: 4,
  },
  tabText: {
    // fontWeight: "bold",
  },
});

export default CustomTabBar;
