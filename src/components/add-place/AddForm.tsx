import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
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
import * as ImagePicker from "expo-image-picker";
import { Feather } from "@expo/vector-icons";

import Tag from "../custom/Tag";
import MultiSelectDropdown from "../custom/MultiSelectDropdown";
import ActionButton from "../shared/ActionButton";
import CustomTextField from "../custom/CustomTextField";
import UploadButton from "./UploadButton";

import { AddFormType } from "../../types";

const AddForm = () => {
  const options = ["Option 1", "Option 2", "Option 3", "Option 4"];
  const [formData, setFormData] = useState<AddFormType | undefined>();

  const handleCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (permission.granted === true) {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        // allowsEditing: true,
        // aspect: [4, 3],
        quality: 1,
      });

      console.log(result);

      if (!result.canceled) {
        setFormData((prevState: any) => ({
          ...prevState,
          // @ts-ignore
          photo_uri: result.assets[0].uri,
        }));
      }
    } else {
      alert("Camera permission necessary to use the app.");
    }
  };
  const handleUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setFormData((prevState: any) => ({
        ...prevState,
        // @ts-ignore
        photo_uri: result.assets[0].uri,
      }));
    }
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
            <View style={styles.photoButtonContainer}>
              <UploadButton action={handleCamera} buttonType="camera" />
              <UploadButton action={handleUpload} buttonType="upload" />
            </View>
            {/* {testData && <View>{testData}</View>} */}
            {formData?.photo_uri && (
              <View style={styles.photoContainer}>
                <TouchableOpacity
                  onPress={() => {
                    setFormData((prevState: any) => ({
                      ...prevState,
                      photo_uri: "",
                    }));
                  }}
                >
                  <Feather name="trash-2" size={14} color="black" />
                </TouchableOpacity>
                <Text
                  style={{ marginLeft: 10, fontSize: 12, color: "#4BB54A" }}
                >
                  image.jpg
                </Text>
              </View>
            )}
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
  photoButtonContainer: {
    flexDirection: "row",
    paddingHorizontal: 45,
    justifyContent: "space-between",
  },
  photoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginLeft: 5,
  },
  buttonContainer: {
    paddingBottom: 30,
  },
});
