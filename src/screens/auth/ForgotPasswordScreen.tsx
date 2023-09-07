import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenTitle from "../../components/shared/ScreenTitle";
import ForgotPasswordForm from "../../components/auth/ForgotPasswordForm";
import ActionButton from "../../components/shared/ActionButton";
import { Text as textStyle } from "../../styles";
import { AuthNavigationProp } from "../../types";

const ForgotPasswordScreen = ({ navigation }: AuthNavigationProp) => {
  const handleLogin = () => {
    console.log("login");
  };

  const navigateToLogin = () => {
    navigation.navigate("Login");
  };
  return (
    <View style={styles.container}>
      <ScreenTitle
        title="Reset password"
        titleSize={32}
        description="Enter your email and we’ll send you instructions on how to reset your password."
      />

      <ForgotPasswordForm />
      <View style={{ marginTop: 40, marginBottom: 30 }}>
        <ActionButton text="Login" action={handleLogin} />
      </View>
      <View style={styles.linksContainer}>
        <Pressable onPress={navigateToLogin}>
          <Text style={{ ...(textStyle.link as any) }}>Back to login</Text>
        </Pressable>
      </View>
    </View>
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
