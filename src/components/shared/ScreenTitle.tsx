import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Text as textStyle } from "../../styles";

type TitleType = {
  title: string;
  description?: string;
  notice?: string;
  textAlign?: string;
};

const ScreenTitle = ({ title, description, notice, textAlign }: TitleType) => {
  return (
    <View>
      <Text style={{ ...(textStyle.screenTitle as any), textAlign: textAlign }}>
        {title}
      </Text>
      {description && (
        <Text
          style={{
            ...(textStyle.titleDescription as any),
            textAlign: textAlign,
          }}
        >
          {description}
        </Text>
      )}
      {notice && <Text>{notice}</Text>}
    </View>
  );
};

export default ScreenTitle;

const styles = StyleSheet.create({});
