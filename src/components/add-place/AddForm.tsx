import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import {
  FormControl,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
} from "@gluestack-ui/themed";

import Tag from "../custom/Tag";
import MultiSelectDropdown from "../custom/MultiSelectDropdown";
import ActionButton from "../shared/ActionButton";
import CustomTextField from "../custom/CustomTextField";
import UploadButton from "./UploadButton";

const AddForm = () => {
  const options = ["Option 1", "Option 2", "Option 3", "Option 4"];

  const handlePhoto = () => {
    console.log("photo pressed");
  };

  const handleTagAdded = (tag: string) => {
    console.log("Tag added:", tag);
    // You can save the tag to your state or perform other actions here
  };
  const handleSubmit = () => {
    console.log("Submit pressed");
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.formContainer}>
          <FormControl>
            <FormControlLabel>
              <FormControlLabelText>Upload a Photo</FormControlLabelText>
            </FormControlLabel>
            <FormControlHelper>
              <FormControlHelperText style={{ marginBottom: 15 }}>
                Take a photo or add one from your gallery.{"\n"}File limit is
                10MB.
              </FormControlHelperText>
            </FormControlHelper>
            <UploadButton action={handlePhoto} />
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
            <CustomTextField placeholder="Enter some details about your experience and whether you'd recommend this place." />
            <FormControlLabel style={{ marginTop: 30, marginBottom: 15 }}>
              <FormControlLabelText>Tags</FormControlLabelText>
            </FormControlLabel>
            <Tag onTagAdded={handleTagAdded} />
          </FormControl>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <ActionButton text="Submit Location" action={handleSubmit} />
      </View>
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
  scrollContent: {
    flexGrow: 1, // Allows the ScrollView to take all available vertical space
  },
  formContainer: {
    flex: 1,
  },
  buttonContainer: {
    paddingBottom: 30,
  },
});
