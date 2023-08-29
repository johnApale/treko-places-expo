import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Text as textStyle } from "../../styles";

interface Tab {
  id: number;
  title: string;
  icon?: any;
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
          {tab.icon}
          <Text style={styles.tabText as any}>{tab.title}</Text>
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  activeTab: {
    backgroundColor: "#FE53031F",
    borderRadius: 4,
  },
  // @ts-ignore
  tabText: {
    ...textStyle.link,
    marginLeft: 5,
    // fontWeight: "bold",
  },
});

export default CustomTabBar;
