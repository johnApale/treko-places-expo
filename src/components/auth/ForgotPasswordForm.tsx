import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { resetFields } from "../../constants/authFields";
import { FormControl, Input, InputField } from "@gluestack-ui/themed";

const fields = resetFields;
const fieldsState: any = {};
resetFields.forEach((field) => {
  fieldsState[field.name] = { value: "", error: false };
});

type ResetFormProps = {
  setEmail: (email: string) => void;
};

const ForgotPasswordForm = ({ setEmail }: ResetFormProps) => {
  const [resetState, setResetState] = useState(fieldsState);
  const handleChange = (name: string, text: string) => {
    setResetState((prevState: any) => ({
      ...prevState,
      [name]: { ...prevState[name], value: text, error: false },
    }));
    setEmail(text);
  };

  return (
    <View>
      <FormControl>
        {fields.map((field) => (
          <View key={field.id}>
            <Input backgroundColor="white">
              <InputField
                type="text"
                placeholder={field.placeholder}
                onChangeText={(text: string) => handleChange(field.name, text)}
                value={resetState[field.name].name}
              />
            </Input>
          </View>
        ))}
      </FormControl>
    </View>
  );
};

export default ForgotPasswordForm;

const styles = StyleSheet.create({});
