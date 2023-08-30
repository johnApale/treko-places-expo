import { GestureResponderEvent, StyleSheet, Text, View } from "react-native";
import { AddIcon, Button, ButtonIcon, ButtonText } from "@gluestack-ui/themed";

import React from "react";

type ButtonType = {
  text: string;
  icon?: any;
  action: (event: GestureResponderEvent) => void;
};
const ActionButton = ({ text, icon, action }: ButtonType) => {
  return (
    <Button
      size="md"
      variant="solid"
      action="primary"
      isDisabled={false}
      isFocusVisible={false}
      style={styles.button}
      onPress={action}
    >
      <ButtonText>{text}</ButtonText>
      {icon && <ButtonIcon as={icon} />}
    </Button>
  );
};

export default ActionButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#E17858",
  },
});
