import { Pressable, StyleSheet, Text, View } from "react-native";
import ScreenTitle from "../../components/shared/ScreenTitle";
import LoginForm from "../../components/auth/LoginForm";
import OAuthButton from "../../components/auth/OAuthButton";
import { Divider } from "@gluestack-ui/themed";
import ActionButton from "../../components/shared/ActionButton";
import { Text as textStyle } from "../../styles";
import { AuthNavigationProp } from "../../types";

const LoginScreen = ({ navigation }: AuthNavigationProp) => {
  const handleLogin = () => {
    console.log("login");
  };
  const navigateToSignup = () => {
    navigation.navigate("Signup");
  };

  const navigateToForgot = () => {
    navigation.navigate("ForgotPassword");
  };

  return (
    <View style={styles.container}>
      <ScreenTitle title="Log in" titleSize={32} />
      <OAuthButton provider="Google" />
      <Divider marginTop={30}></Divider>
      <LoginForm />
      <View style={{ marginTop: 50, marginBottom: 30 }}>
        <ActionButton text="Login" action={handleLogin} />
      </View>
      <View style={styles.linksContainer}>
        <Pressable onPress={navigateToSignup}>
          <Text style={{ ...(textStyle.link as any) }}>Create an account</Text>
        </Pressable>
        <Pressable onPress={navigateToForgot}>
          <Text style={{ ...(textStyle.link as any) }}>Forgot Password?</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F2EBE3",
    justifyContent: "center",
  },
  linksContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
