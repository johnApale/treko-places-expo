import { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  AlertCircleIcon,
  EyeIcon,
  EyeOffIcon,
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  Icon,
  Input,
  InputField,
  InputIcon,
} from "@gluestack-ui/themed";

import { loginFields } from "../../constants/authFields";
import ActionButton from "../shared/ActionButton";
import { useAuth } from "../../contexts/AuthProvider";
import { AuthError } from "@supabase/supabase-js";

type LoginProps = {
  setLoginError: (message: string) => void;
};

const fields = loginFields;
const fieldsState: any = {};
loginFields.forEach((field) => {
  fieldsState[field.name] = { value: "", error: false };
});

export default function LoginForm({ setLoginError }: LoginProps) {
  const [loginState, setLoginState] = useState(fieldsState);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<any>();

  const { signIn } = useAuth();

  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  const handleChange = (name: string, text: string) => {
    setLoginState((prevState: any) => ({
      ...prevState,
      [name]: { ...prevState[name], value: text, error: false },
    }));
  };

  const handleSubmit = async () => {
    let hasError = false;

    // Implement form validation based on your loginFields configuration
    loginFields.forEach((field) => {
      if (
        field.validation?.required?.value &&
        !loginState[field.name].value.trim()
      ) {
        setLoginState((prevState: any) => ({
          ...prevState,
          [field.name]: { ...prevState[field.name], error: true },
        }));
        hasError = true;
      } else if (
        field.validation?.pattern?.value &&
        !field.validation.pattern.value.test(loginState[field.name].value)
      ) {
        setLoginState((prevState: any) => ({
          ...prevState,
          [field.name]: { ...prevState[field.name], error: true },
        }));
        hasError = true;
      } else if (
        field.validation?.minLength?.value &&
        loginState[field.name].value.length < field.validation.minLength.value
      ) {
        setLoginState((prevState: any) => ({
          ...prevState,
          [field.name]: { ...prevState[field.name], error: true },
        }));
        hasError = true;
      }
    });

    if (!hasError) {
      const formData: any = {};
      fields.forEach((field) => {
        formData[field.name] = loginState[field.name].value;
      });
      const error = await signIn(formData);
      if (error) {
        setLoginError(error);
      }
    }
  };

  return (
    <View>
      <FormControl>
        {fields.map((field) => (
          <View style={{ marginTop: 30 }} key={field.id}>
            <Input backgroundColor="white">
              <InputField
                type={
                  field.type === "password"
                    ? showPassword
                      ? "text"
                      : "password"
                    : "text"
                }
                placeholder={field.placeholder}
                onChangeText={(text) => handleChange(field.name, text)}
                value={loginState[field.name].name}
              />
              {field.type === "password" && (
                <InputIcon pr="$3" onPress={handleState}>
                  <Icon
                    as={showPassword ? EyeIcon : EyeOffIcon}
                    color="$darkBlue500"
                  />
                </InputIcon>
              )}
            </Input>
            {loginState[field.name].error && (
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 10,
                  marginBottom: -15,
                  alignItems: "center",
                }}
              >
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>
                  {field.validation?.message}
                </FormControlErrorText>
              </View>
            )}
          </View>
        ))}

        <View style={{ marginTop: 50, marginBottom: 30 }}>
          <ActionButton text="Login" action={handleSubmit} />
        </View>
      </FormControl>
    </View>
  );
}

const styles = StyleSheet.create({});
