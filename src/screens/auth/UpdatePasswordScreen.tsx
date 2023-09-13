import {
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import ScreenTitle from "../../components/shared/ScreenTitle";
import ForgotPasswordForm from "../../components/auth/ForgotPasswordForm";
import ActionButton from "../../components/shared/ActionButton";
import { Text as textStyle } from "../../styles";
import { AuthNavigationProp } from "../../types";
import { supabase } from "../../../lib/supabase";
import {
  AlertCircleIcon,
  FormControlErrorIcon,
  FormControlErrorText,
} from "@gluestack-ui/themed";
import UpdatePasswordForm from "../../components/auth/UpdatePasswordForm";

// Need to finish supabase workflow

const UpdatePasswordScreen = ({ navigation }: AuthNavigationProp) => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleReset = async () => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "treko-places://reset-password",
      });
      if (error) {
        console.log("error", error);
        setErrorMessage(error.message);
        throw Error;
      } else {
        setErrorMessage("");
      }
    } catch (error) {
      return;
    }
  };

  const navigateToLogin = () => {
    setErrorMessage("");
    navigation.navigate("Login");
  };
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
      <View style={styles.container}>
        <ScreenTitle title="Change Password" titleSize={32} />

        <UpdatePasswordForm />

        <View style={styles.linksContainer}>
          <Pressable onPress={navigateToLogin}>
            <Text style={{ ...(textStyle.link as any) }}>Back to login</Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default UpdatePasswordScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F2EBE3",
    justifyContent: "center",
  },
  linksContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
