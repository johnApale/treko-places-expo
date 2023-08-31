import { View, GestureResponderEvent } from "react-native";
import React from "react";
import { Button, ButtonText } from "@gluestack-ui/themed";
import { Feather } from "@expo/vector-icons";

type PhotoButtonProps = {
  action: (event: GestureResponderEvent) => void;
  buttonType: "upload" | "camera";
};

const UploadButton = ({ action, buttonType }: PhotoButtonProps) => {
  return (
    <View>
      <Button
        bg="white"
        size="xs"
        borderColor="lightgray"
        variant="outline"
        onPress={action}
        borderRadius={15}
      >
        {}
        <Feather
          name={buttonType === "upload" ? "upload-cloud" : "camera"}
          size={16}
          color="#E17858"
        />
        <ButtonText color="#E17858" style={{ fontSize: 12, marginLeft: 5 }}>
          {buttonType === "upload" ? "Upload photo" : "Take photo"}
        </ButtonText>
      </Button>
    </View>
  );
};

export default UploadButton;
