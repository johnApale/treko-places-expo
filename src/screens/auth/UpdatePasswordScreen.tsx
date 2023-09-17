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
import ForgotPasswordScreen from "./ForgotPasswordScreen";
import { useAuth } from "../../contexts/AuthProvider";

// Need to finish supabase workflow

const UpdatePasswordScreen = ({ navigation, route }: AuthNavigationProp) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { setUser } = useAuth();
  const { error_description } = route.params;
  const handleUpdate = async () => {
    if (
      password !== confirmPassword ||
      password === "" ||
      confirmPassword === ""
    ) {
      setErrorMessage("Invalid password entry. Please check and try again!");
    } else {
      try {
        const { data, error } = await supabase.auth.updateUser({
          password: password,
        });

        if (error) {
          console.log("error", error);
          setErrorMessage(error.message);
          throw Error;
        } else {
          console.log(data);
          setUser(data.user);
          setErrorMessage("");
        }
      } catch (error) {
        return;
      }
    }
  };

  const navigateToLogin = () => {
    setErrorMessage("");
    navigation.navigate("Login");
  };
  return (
    <>
      {error_description ? (
        <ForgotPasswordScreen
          navigation={navigation}
          error_description={error_description}
        />
      ) : (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
          <View style={styles.container}>
            <ScreenTitle title="Change Password" titleSize={32} />
            <UpdatePasswordForm
              password={password}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              setPassword={setPassword}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
            />
            <View style={{ marginTop: 40, marginBottom: 20 }}>
              <ActionButton text="Change Password" action={handleUpdate} />
            </View>
            <View style={styles.linksContainer}>
              <Pressable onPress={navigateToLogin}>
                <Text style={{ ...(textStyle.link as any) }}>
                  Back to login
                </Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      )}
    </>
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
