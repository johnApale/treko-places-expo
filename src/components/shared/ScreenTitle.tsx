import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Text as textStyle } from "../../styles";

type TitleType = {
  title: string;
  description?: string;
  notice?: string;
  textAlign?: string;
  titleSize?: number;
};

const ScreenTitle = ({
  title,
  description,
  notice,
  textAlign,
  titleSize,
}: TitleType) => {
  return (
    <View>
      <Text
        style={{
          ...(textStyle.screenTitle as any),
          fontSize: titleSize ?? 24,
          textAlign: textAlign,
        }}
      >
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
