import {
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  AlertCircleIcon,
  FormControl,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
} from "@gluestack-ui/themed";
import * as ImagePicker from "expo-image-picker";
import { Feather } from "@expo/vector-icons";
import * as Location from "expo-location";

import Tag from "../custom/Tag";
import MultiSelectDropdown from "../custom/MultiSelectDropdown";
import ActionButton from "../shared/ActionButton";
import CustomTextField from "../custom/CustomTextField";
import UploadButton from "./UploadButton";

import { AddFormType, AddressType, MainNavigationProp } from "../../types";
import {
  createLocation,
  createPlace,
  createPlacesCategories,
  uploadPhoto,
} from "../../helpers/addLocation";

import LoadingOverlay from "../shared/LoadingOverlay";
import { useAuth } from "../../contexts/AuthProvider";
import { Categories } from "../../types/supabase";

const AddForm = ({ navigation }: MainNavigationProp) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<AddFormType | undefined | null>();
  const [selectedOptions, setSelectedOptions] = useState<Categories[]>([]);
  const [imageName, setImageName] = useState("");
  const [showAddress, setShowAddress] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [saveError, setSaveError] = useState("");
  const [addressData, setAddressData] = useState<
    AddressType | undefined | null
  >();

  const { user } = useAuth();

  const isFormValid = (formData: AddFormType | undefined | null) => {
    // Check if the required fields in `formData` are filled in
    if (
      formData?.photo_path &&
      formData.name &&
      formData.category &&
      formData.description &&
      formData.tags
    ) {
      return true;
    }
    return false;
  };

  const handleCamera = async () => {
    setDropdownVisible(false);
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
    }
    if (permission.granted === true) {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });
      if (!result.canceled) {
        setIsLoading(true);
        await handlePhoto(result);
        await handleLocation();
        setIsLoading(false);
      }
    } else {
      alert("Camera permission necessary to use the app.");
    }
  };

  const handleUpload = async () => {
    setDropdownVisible(false);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) {
      setIsLoading(true);
      await handlePhoto(result);
      setIsLoading(false);
    }
  };

  const handlePhoto = async (result: any) => {
    try {
      let { path, name } = await uploadPhoto(result);
      if (path && name) {
        setFormData((prevState: any) => ({
          ...prevState,
          photo_path: path,
        }));
        setImageName(name);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLocation = async () => {
    const { coords } = await Location.getCurrentPositionAsync({});
    const address = await Location.reverseGeocodeAsync({
      longitude: coords.longitude,
      latitude: coords.latitude,
    });
    if (address[0]) {
      setAddressData({
        street_address: address[0].name || undefined,
        city: address[0].city || undefined,
        state: address[0].region || undefined,
        postalCode: address[0].postalCode || undefined,
        country: address[0].country || undefined,
        longitude: coords.longitude,
        latitude: coords.latitude,
      });
    }
  };

  const updateFormData = (updatedData: any) => {
    setFormData((prevData) => ({
      ...prevData,
      ...updatedData,
    }));
  };

  const handleAddressChange = (name: string, text: string) => {
    setAddressData((prevData: any) => ({
      ...prevData,
      [name]: text,
    }));
  };

  const handleSubmit = async () => {
    setDropdownVisible(false);
    if (!isFormValid(formData)) {
      setSaveError("Missing required fields.");
    } else {
      try {
        setIsLoading(true);
        setSaveError("");
        const place_id = await createPlace(user, formData);
        let location_result;
        if (addressData) {
          if (!addressData.latitude || !addressData.longitude) {
            const coords = await Location.geocodeAsync(
              `${addressData.street_address} ${addressData.city} ${addressData.state} ${addressData.country}`
            );
            const address = await Location.reverseGeocodeAsync({
              longitude: coords[0].longitude,
              latitude: coords[0].latitude,
            });
            let cleanAddress;
            if (address[0]) {
              cleanAddress = {
                street_address: address[0].name || undefined,
                city: address[0].city || undefined,
                state: address[0].region || undefined,
                postalCode: address[0].postalCode || undefined,
                country: address[0].country || undefined,
                longitude: coords[0].longitude,
                latitude: coords[0].latitude,
              };
            }
            location_result = await createLocation(place_id, cleanAddress);
          } else {
            location_result = await createLocation(place_id, addressData);
            console.log(location_result);
            if (!location_result) {
              console.log(location_result);
              setSaveError("Trouble saving location. Try again later.");
              throw Error;
            }
          }
        }
        const category_result = await createPlacesCategories(
          place_id,
          formData?.category
        );
        console.log(category_result);

        if (location_result || category_result) {
          console.log("Err: ", location_result, category_result);
          setSaveError("Trouble saving location. Try again later.");
        } else {
          // reset fields
          setFormData(null);
          setAddressData(null);
          setSelectedOptions([]);

          // update to completion screen
          navigation.navigate("Confirmation");
        }
      } catch (error) {
        console.log(error);
        setSaveError("Trouble saving location. Try again later.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      {isLoading && <LoadingOverlay />}
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
              {formData?.photo_path && (
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
                    style={{
                      marginLeft: 10,
                      fontSize: 12,
                      color: "#4BB54A",
                    }}
                  >
                    {imageName}
                  </Text>
                </View>
              )}
              {errorMsg !== "" && (
                <FormControlHelper>
                  <FormControlHelperText
                    color="darkred"
                    fontSize={12}
                    marginBottom={-25}
                  >
                    {errorMsg}
                  </FormControlHelperText>
                </FormControlHelper>
              )}
              <Pressable
                onPress={() => {
                  setShowAddress(!showAddress);
                }}
              >
                <FormControlLabel
                  style={{
                    marginTop: 30,
                    marginBottom: 15,
                    justifyContent: "space-between",
                  }}
                >
                  <FormControlLabelText>Location Address</FormControlLabelText>

                  {!showAddress ? (
                    <Feather name="chevron-down" size={20} color="black" />
                  ) : (
                    <Feather name="chevron-up" size={20} color="black" />
                  )}
                </FormControlLabel>
              </Pressable>
              {showAddress && (
                <>
                  <Input size="sm">
                    <InputField
                      placeholder="Street Address"
                      style={{ backgroundColor: "white", borderRadius: 3 }}
                      value={addressData?.street_address}
                      onFocus={() => {
                        setDropdownVisible(false);
                      }}
                      onChangeText={(text) => {
                        handleAddressChange("street_address", text);
                      }}
                    />
                  </Input>
                  <Input size="sm" marginTop={15}>
                    <InputField
                      placeholder="City"
                      style={{ backgroundColor: "white", borderRadius: 3 }}
                      value={addressData?.city}
                      onFocus={() => {
                        setDropdownVisible(false);
                      }}
                      onChangeText={(text) => {
                        handleAddressChange("city", text);
                      }}
                    />
                  </Input>
                  <Input size="sm" marginTop={15}>
                    <InputField
                      placeholder="State"
                      style={{ backgroundColor: "white", borderRadius: 3 }}
                      value={addressData?.state}
                      onFocus={() => {
                        setDropdownVisible(false);
                      }}
                      onChangeText={(text) => {
                        handleAddressChange("state", text);
                      }}
                    />
                  </Input>
                  <Input size="sm" marginTop={15}>
                    <InputField
                      placeholder="Postal Code"
                      style={{ backgroundColor: "white", borderRadius: 3 }}
                      value={addressData?.postalCode}
                      onFocus={() => {
                        setDropdownVisible(false);
                      }}
                      onChangeText={(text) => {
                        handleAddressChange("postalCode", text);
                      }}
                    />
                  </Input>
                  <Input size="sm" marginTop={15} marginBottom={25}>
                    <InputField
                      placeholder="Country"
                      style={{ backgroundColor: "white", borderRadius: 3 }}
                      value={addressData?.country}
                      onFocus={() => {
                        setDropdownVisible(false);
                      }}
                      onChangeText={(text) => {
                        handleAddressChange("country", text);
                      }}
                    />
                  </Input>
                </>
              )}

              <FormControlLabel style={{ marginTop: 5, marginBottom: 15 }}>
                <FormControlLabelText>Name of location</FormControlLabelText>
              </FormControlLabel>
              <Input size="sm">
                <InputField
                  placeholder="Location name"
                  style={{ backgroundColor: "white", borderRadius: 3 }}
                  value={formData?.name}
                  onChangeText={(text) => {
                    updateFormData({ name: text });
                  }}
                  onFocus={() => {
                    setDropdownVisible(false);
                  }}
                />
              </Input>

              <FormControlLabel style={{ marginTop: 30, marginBottom: 15 }}>
                <FormControlLabelText>Category</FormControlLabelText>
              </FormControlLabel>
              <MultiSelectDropdown
                updateFormData={updateFormData}
                isDropdownVisible={isDropdownVisible}
                setDropdownVisible={setDropdownVisible}
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}
              />
              <FormControlLabel style={{ marginTop: 30, marginBottom: 15 }}>
                <FormControlLabelText>Description</FormControlLabelText>
              </FormControlLabel>
              <CustomTextField
                placeholder="Enter some details about your experience and whether you'd recommend this place."
                formData={formData}
                updateFormData={updateFormData}
                setDropdownVisible={setDropdownVisible}
              />
              <FormControlLabel style={{ marginTop: 30, marginBottom: 15 }}>
                <FormControlLabelText>Tags</FormControlLabelText>
              </FormControlLabel>
              <Tag
                updateFormData={updateFormData}
                setDropdownVisible={setDropdownVisible}
              />
            </FormControl>
            {saveError && (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingTop: 20,
                  marginBottom: -30,
                }}
              >
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>{saveError}</FormControlErrorText>
              </View>
            )}
            <View style={styles.buttonContainer}>
              <ActionButton text="Submit Location" action={handleSubmit} />
            </View>
          </View>
        </ScrollView>

        {/* {isFormComplete && ( */}

        {/* )} */}
      </View>
    </KeyboardAvoidingView>
  );
};

export default AddForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2EBE3",
  },
  scrollContent: {
    padding: 20,
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
    marginTop: 15,
    marginBottom: -10,
    marginLeft: 5,
  },
  buttonContainer: {
    marginTop: 40,
    paddingBottom: 40,
  },
});
