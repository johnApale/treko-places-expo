import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";

type TextFieldProps = {
  placeholder: string;
};
const CustomTextField = ({ placeholder }: TextFieldProps) => {
  const [textFieldFocus, setTextFieldFocus] = useState(false);
  const textFieldStyle = {
    height: 100,
    padding: 10,
    backgroundColor: "white",
    borderColor: textFieldFocus ? "#547ca4" : "#D9D9D9",
    borderWidth: 1,
    borderRadius: 3,
  };
  return (
    <>
      <TextInput
        multiline={true}
        style={textFieldStyle}
        placeholder={placeholder}
        placeholderTextColor={"gray"}
        onFocus={() => {
          setTextFieldFocus(true);
        }}
        onBlur={() => {
          setTextFieldFocus(false);
        }}
      ></TextInput>
    </>
  );
};

export default CustomTextField;
