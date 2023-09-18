import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

import {
  AlertCircleIcon,
  EyeIcon,
  EyeOffIcon,
  FormControl,
  FormControlErrorIcon,
  FormControlErrorText,
  Icon,
  Input,
  InputField,
  InputIcon,
} from "@gluestack-ui/themed";
import ActionButton from "../shared/ActionButton";

type UpdatePasswordProps = {
  password: string;
  confirmPassword: string;
  setPassword: (text: string) => void;
  setConfirmPassword: (text: string) => void;
  errorMessage: string;
  setErrorMessage: (message: string) => void;
};

const UpdatePasswordForm = ({
  password,
  confirmPassword,
  setConfirmPassword,
  setPassword,
  errorMessage,
  setErrorMessage,
}: UpdatePasswordProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  return (
    <View>
      <FormControl>
        <View>
          <Input backgroundColor="white" marginBottom={20}>
            <InputField
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChangeText={(text: string) => {
                setErrorMessage("");
                setPassword(text);
              }}
              value={password}
            />
            <Pressable
              onPress={handleState}
              style={{ alignSelf: "center", padding: 10 }}
            >
              <Icon
                as={showPassword ? EyeIcon : EyeOffIcon}
                color="$darkBlue500"
              />
            </Pressable>
          </Input>
          <Input backgroundColor="white">
            <InputField
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              onChangeText={(text: string) => {
                setErrorMessage("");
                setConfirmPassword(text);
              }}
              value={confirmPassword}
            />
            <Pressable
              onPress={handleState}
              style={{ alignSelf: "center", padding: 10 }}
            >
              <Icon
                as={showPassword ? EyeIcon : EyeOffIcon}
                color="$darkBlue500"
              />
            </Pressable>
          </Input>
        </View>
      </FormControl>
      {errorMessage && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 20,
            paddingHorizontal: 20,
            marginBottom: -20,
          }}
        >
          <FormControlErrorIcon as={AlertCircleIcon} />
          <FormControlErrorText style={{ marginLeft: 10 }}>
            {errorMessage}
          </FormControlErrorText>
        </View>
      )}
    </View>
  );
};

export default UpdatePasswordForm;

const styles = StyleSheet.create({});
