import { TextInput } from "react-native";
import React, { useState } from "react";
import { AddFormType } from "../../types";

type TextFieldProps = {
  placeholder: string;
  formData: AddFormType | undefined | null;
  updateFormData: (updatedData: any) => void;
  setDropdownVisible: (visible: boolean) => void;
  scrollToPosition: (y: number) => void;
  position: number;
};
const CustomTextField = ({
  placeholder,
  formData,
  updateFormData,
  setDropdownVisible,
  scrollToPosition,
  position,
}: TextFieldProps) => {
  const [textFieldFocus, setTextFieldFocus] = useState(false);
  const textFieldStyle = {
    flex: 1,
    height: 100,
    padding: 10,
    backgroundColor: "white",
    borderColor: textFieldFocus ? "#547ca4" : "#D9D9D9",
    borderWidth: 1,
    borderRadius: 3,
  };

  const handleChange = (text: string) => {
    updateFormData({ description: text });
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
          setDropdownVisible(false);
          scrollToPosition(position);
        }}
        onBlur={() => {
          setTextFieldFocus(false);
        }}
        value={formData?.description || ""}
        onChangeText={(text) => handleChange(text)}
      />
    </>
  );
};

export default CustomTextField;
