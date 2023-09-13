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

// Need to finish supabase workflow

const ForgotPasswordScreen = ({ navigation }: AuthNavigationProp) => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [sent, setSent] = useState(false);
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
        setSent(true);
        setErrorMessage("");
      }
    } catch (error) {
      return;
    }
  };

  const navigateToLogin = () => {
    setErrorMessage("");
    setSent(false);
    navigation.navigate("Login");
  };
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
      {sent ? (
        <View style={styles.container}>
          <ScreenTitle
            title="Check Email"
            titleSize={32}
            description="An email has been sent to your email with instructions on how to reset your password."
          />

          <ActionButton text="Back to login" action={navigateToLogin} />
        </View>
      ) : (
        <View style={styles.container}>
          <ScreenTitle
            title="Reset Password"
            titleSize={32}
            description="Enter your email and we’ll send you instructions on how to reset your password."
          />

          <ForgotPasswordForm setEmail={setEmail} />
          <View style={{ marginTop: 40, marginBottom: 20 }}>
            <ActionButton text="Send Email" action={handleReset} />
          </View>
          <View style={styles.linksContainer}>
            <Pressable onPress={navigateToLogin}>
              <Text style={{ ...(textStyle.link as any) }}>Back to login</Text>
            </Pressable>
          </View>
          {errorMessage && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: 20,
                paddingHorizontal: 20,
              }}
            >
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText style={{ marginLeft: 10 }}>
                {errorMessage}
              </FormControlErrorText>
            </View>
          )}
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default ForgotPasswordScreen;
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
