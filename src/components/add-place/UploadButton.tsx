import { View, GestureResponderEvent } from "react-native";
import React from "react";
import { Button, ButtonText } from "@gluestack-ui/themed";
import { Feather } from "@expo/vector-icons";

type UploadButtonProps = {
  action: (event: GestureResponderEvent) => void;
};

const UploadButton = ({ action }: UploadButtonProps) => {
  return (
    <View>
      <Button
        bg="white"
        size="xs"
        borderColor="lightgray"
        variant="outline"
        onPress={action}
      >
        <Feather name="upload-cloud" size={16} color="#E17858" />
        <ButtonText color="#E17858" style={{ fontSize: 12, marginLeft: 5 }}>
          Click to upload
        </ButtonText>
      </Button>
    </View>
  );
};

export default UploadButton;
