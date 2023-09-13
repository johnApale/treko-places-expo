import { StyleSheet, Text, View } from "react-native";
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

const UpdatePasswordForm = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  const handleUpdate = () => {
    if (
      password !== confirmPassword ||
      password === "" ||
      confirmPassword === ""
    ) {
      setErrorMessage("Invalid password entry. Please check and try again!");
    } else {
    }
  };
  return (
    <View>
      <FormControl>
        <View>
          <Input backgroundColor="white" marginBottom={20}>
            <InputField
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChangeText={(text) => {
                setErrorMessage("");
                setPassword(text);
              }}
              value={password}
            />
            <InputIcon pr="$3" onPress={handleState}>
              <Icon
                as={showPassword ? EyeIcon : EyeOffIcon}
                color="$darkBlue500"
              />
            </InputIcon>
          </Input>
          <Input backgroundColor="white">
            <InputField
              type="password"
              placeholder="Confirm Password"
              onChangeText={(text) => {
                setErrorMessage("");
                setConfirmPassword(text);
              }}
              value={confirmPassword}
            />
            <InputIcon pr="$3" onPress={handleState}>
              <Icon
                as={showPassword ? EyeIcon : EyeOffIcon}
                color="$darkBlue500"
              />
            </InputIcon>
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
      <View style={{ marginTop: 40, marginBottom: 20 }}>
        <ActionButton text="Change Password" action={handleUpdate} />
      </View>
    </View>
  );
};

export default UpdatePasswordForm;

const styles = StyleSheet.create({});
