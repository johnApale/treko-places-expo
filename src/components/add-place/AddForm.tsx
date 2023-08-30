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
} from "@gluestack-ui/themed";
import Tag from "../custom/Tag";

const AddForm = () => {
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
        <FormControlLabel style={{ marginBottom: 15 }}>
          <FormControlLabelText>Name of location</FormControlLabelText>
        </FormControlLabel>
        <Input>
          <InputField
            placeholder="Location name"
            style={{ backgroundColor: "white" }}
          />
        </Input>
        <FormControlLabel style={{ marginBottom: 15 }}>
          <FormControlLabelText>Category</FormControlLabelText>
        </FormControlLabel>
        <FormControlLabel style={{ marginBottom: 15 }}>
          <FormControlLabelText>Description</FormControlLabelText>
        </FormControlLabel>
        <FormControlLabel style={{ marginBottom: 15 }}>
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
