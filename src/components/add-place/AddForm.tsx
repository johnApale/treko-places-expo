import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  FormControl,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
  Textarea,
  TextareaInput,
} from "@gluestack-ui/themed";
import Tag from "../custom/Tag";
import MultiSelectDropdown from "../custom/MultiSelectDropdown";

const AddForm = () => {
  const options = ["Option 1", "Option 2", "Option 3", "Option 4"];

  const handleTagAdded = (tag: string) => {
    console.log("Tag added:", tag);
    // You can save the tag to your state or perform other actions here
  };
  return (
    <View style={styles.container}>
      <FormControl>
        <FormControlLabel>
          <FormControlLabelText>Upload a Photo</FormControlLabelText>
        </FormControlLabel>
        <FormControlHelper>
          <FormControlHelperText>
            Take a photo or add one from your gallery.{"\n"}File limit is 10MB.
          </FormControlHelperText>
        </FormControlHelper>
        <FormControlLabel style={{ marginTop: 30, marginBottom: 15 }}>
          <FormControlLabelText>Name of location</FormControlLabelText>
        </FormControlLabel>
        <Input size="sm">
          <InputField
            placeholder="Location name"
            style={{ backgroundColor: "white", borderRadius: 3 }}
          />
        </Input>
        <FormControlLabel style={{ marginTop: 30, marginBottom: 15 }}>
          <FormControlLabelText>Category</FormControlLabelText>
        </FormControlLabel>
        <MultiSelectDropdown options={options} />
        <FormControlLabel style={{ marginTop: 30, marginBottom: 15 }}>
          <FormControlLabelText>Description</FormControlLabelText>
        </FormControlLabel>
        <Textarea size="sm">
          <TextareaInput
            placeholder="Enter some details about your experience and whether you’d recommend this place."
            style={{
              backgroundColor: "white",
              borderRadius: 3,
              paddingTop: 10,
            }}
          />
        </Textarea>
        <FormControlLabel style={{ marginTop: 30, marginBottom: 15 }}>
          <FormControlLabelText>Tags</FormControlLabelText>
        </FormControlLabel>
        <Tag onTagAdded={handleTagAdded} />
      </FormControl>
    </View>
  );
};

export default AddForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F2EBE3",
  },
});
