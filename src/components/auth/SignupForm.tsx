import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { signupFields } from "../../constants/authFields";
import {
  EyeIcon,
  EyeOffIcon,
  FormControl,
  Icon,
  Input,
  InputField,
  InputIcon,
} from "@gluestack-ui/themed";

const fields = signupFields;
let fieldsState: any = {};
signupFields.forEach((field) => {
  fieldsState[field.name] = { value: "", error: false };
});

const SignupForm = () => {
  const [signupState, setSignupState] = useState(fieldsState);
  const [showPassword, setShowPassword] = useState(false);

  //   const { signUp } = useAuth();
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  const handleChange = (name: string, text: string) => {
    setSignupState((prevState: any) => ({
      ...prevState,
      [name]: { ...prevState[name], value: text, error: false },
    }));
  };

  const handleSubmit = () => {
    let hasError = false;

    // Loop through the fields and validate each one
    fields.forEach((field) => {
      if (
        field.validation?.required?.value &&
        !signupState[field.name].value.trim()
      ) {
        setSignupState((prevState: any) => ({
          ...prevState,
          [field.name]: { ...prevState[field.name], error: true },
        }));
        hasError = true;
      } else if (
        field.validation?.pattern?.value &&
        !field.validation.pattern.value.test(signupState[field.name].value)
      ) {
        setSignupState((prevState: any) => ({
          ...prevState,
          [field.name]: { ...prevState[field.name], error: true },
        }));
        hasError = true;
      } else if (
        field.validation?.minLength?.value &&
        signupState[field.name].value.length < field.validation.minLength.value
      ) {
        setSignupState((prevState: any) => ({
          ...prevState,
          [field.name]: { ...prevState[field.name], error: true },
        }));
        hasError = true;
      } else if (field.validation?.match?.value) {
        const confirmPassword = signupState[field.name].value;
        if (signupState["password"].value !== confirmPassword) {
          setSignupState((prevState: any) => ({
            ...prevState,
            [field.name]: { ...prevState[field.name], error: true },
          }));
          hasError = true;
        }
      }
    });

    if (!hasError) {
      console.log(signupState);
      createAccount();
    }
  };

  //handle Signup API Integration here
  const createAccount = () => {
    const formData: any = {};
    fields.forEach((field) => {
      if (field.name !== "confirm_password")
        formData[field.name] = signupState[field.name].value;
    });
    // signUp(formData);
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
                value={signupState[field.name].name}
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
          </View>
        ))}
      </FormControl>
    </View>
  );
};

export default SignupForm;

const styles = StyleSheet.create({});
