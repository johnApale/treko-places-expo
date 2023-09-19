import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
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
  getPlace,
  updatePlace,
  updateCategories,
  uploadPhoto,
} from "../../helpers/addLocation";

import LoadingOverlay from "../shared/LoadingOverlay";
import { useAuth } from "../../contexts/AuthProvider";
import { Categories } from "../../types/supabase";

const AddForm = ({ navigation }: MainNavigationProp) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUpload, setIsUpload] = useState<boolean | null>();
  const [formData, setFormData] = useState<AddFormType | undefined | null>();
  const [selectedOptions, setSelectedOptions] = useState<
    Categories[] | undefined
  >([]);
  const [photoData, setPhotoData] = useState<any>({});
  const [tags, setTags] = useState<string[]>([]);
  const [imageName, setImageName] = useState("");
  const [showAddress, setShowAddress] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [saveError, setSaveError] = useState("");
  const [photos, setPhotos] = useState<string[]>();
  const [addressData, setAddressData] = useState<
    AddressType | undefined | null
  >();
  const [existingAddress, setExistingAddress] = useState<
    number | null | undefined
  >();

  const scrollViewRef = useRef<ScrollView | null>(null);

  const { user } = useAuth();

  useEffect(() => {
    if (
      addressData?.street_address &&
      addressData?.city &&
      addressData?.state &&
      addressData?.postalCode &&
      addressData?.country &&
      !existingAddress
    ) {
      fetchData();
    }
  }, [addressData]);

  const fetchData = async () => {
    if (isUpload) {
      cleanAddress();
    }
    const data = await getPlace(addressData);
    if (data !== "error") {
      setFormData({
        photo_path: formData?.photo_path,
        name: data.name,
        category: data.category_id,
        description: data?.description,
        tags: data?.tags,
      });
      setSelectedOptions(data?.categories);
      setTags(data.tags);
      setPhotos(data.photos);
      showAlert(data.id);
    }
  };

  const showAlert = (id: number) => {
    Alert.alert(
      "Warning!",
      "This location already exists in the database. Submitting this form will update the record. Do you wish to continue?",
      [
        {
          text: "No",
          onPress: () => {
            setExistingAddress(null);
            clearData();
          },
          style: "cancel",
        },
        { text: "Yes", onPress: () => setExistingAddress(id) },
      ]
    );
  };

  const clearData = () => {
    setFormData(null);
    setAddressData(null);
    setPhotoData({});
    setImageName("");
    setSelectedOptions([]);
    setExistingAddress(null);
    setShowAddress(false);
    setTags([]);
    setIsUpload(null);
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  };

  const isFormValid = (formData: AddFormType | undefined | null) => {
    // Check if the required fields in `formData` are filled in
    if (
      imageName &&
      formData?.name &&
      formData.category &&
      formData.description &&
      formData.tags
    ) {
      return true;
    }
    return false;
  };

  const scrollToPosition = (y: number) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y, animated: true });
    }
  };

  const handleCamera = async () => {
    setExistingAddress(null);
    setIsUpload(false);
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
        const photoName = result.assets[0].fileName;
        setIsLoading(true);

        setPhotoData(result);
        setImageName(photoName || "image.jpg");
        await handleLocation();
        setIsLoading(false);
      }
    } else {
      alert("Camera permission necessary to use the app.");
    }
  };

  const handleUpload = async () => {
    setDropdownVisible(false);
    setIsUpload(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) {
      setIsLoading(true);
      const photoName = result.assets[0].fileName;
      setPhotoData(result);
      setImageName(photoName || "image.jpg");
      setIsLoading(false);
    }
  };

  const handleLocation = async () => {
    const { coords } = await Location.getCurrentPositionAsync({
      accuracy: Location.LocationAccuracy.BestForNavigation,
    });

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

  const handleUpdate = async () => {
    setDropdownVisible(false);
    if (!isFormValid(formData)) {
      setSaveError("Missing required fields.");
    } else {
      try {
        setIsLoading(true);
        setSaveError("");
        const photo_result = await uploadPhoto(photoData);
        if (photo_result !== "error") {
          setFormData((prevState: any) => ({
            ...prevState,
            photo_path: photo_result,
          }));
        } else {
          setSaveError("Error saving photo. Try again later.");
          throw Error;
        }
        const place_result = await updatePlace(
          existingAddress,
          user,
          formData,
          photos,
          photo_result
        );
        const categories_result = await updateCategories(
          existingAddress,
          formData?.category
        );
        if (place_result === "error" || categories_result === "error") {
          throw Error;
        }
        clearData();
        navigation.navigate("Confirmation");
      } catch (error) {
        console.log(error);
        setSaveError("Trouble updating location. Try again later.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const cleanAddress = async () => {
    if (addressData) {
      if (!addressData.latitude || !addressData.longitude) {
        const coords = await Location.geocodeAsync(
          `${addressData.street_address} ${addressData.city} ${addressData.state} ${addressData.country}`
        );
        const address = await Location.reverseGeocodeAsync({
          longitude: coords[0].longitude,
          latitude: coords[0].latitude,
        });
        if (address[0]) {
          setAddressData({
            street_address: address[0].name || undefined,
            city: address[0].city || undefined,
            state: address[0].region || undefined,
            postalCode: address[0].postalCode || undefined,
            country: address[0].country || undefined,
            longitude: coords[0].longitude,
            latitude: coords[0].latitude,
          });
        }
      }
    }
  };

  const handleSubmit = async () => {
    setDropdownVisible(false);
    if (!isFormValid(formData)) {
      setSaveError("Missing required fields.");
    } else {
      try {
        setIsLoading(true);
        setSaveError("");
        const photo_result = await uploadPhoto(photoData);
        if (photo_result !== "error") {
          setFormData((prevState: any) => ({
            ...prevState,
            photo_path: photo_result,
          }));
        } else {
          setSaveError("Error saving photo. Try again later.");
          throw Error;
        }

        const place_id = await createPlace(user, photo_result, formData);
        if (place_id === "error") {
          throw Error;
        }

        let location_result;
        if (addressData) {
          location_result = await createLocation(place_id, addressData);
          if (location_result === "error") {
            setSaveError("Trouble saving location. Try again later.");
            throw Error;
          }
        }
        const category_result = await createPlacesCategories(
          place_id,
          formData?.category
        );
        if (category_result === "error") {
          throw Error;
        }

        // reset fields
        clearData();
        // update to completion screen
        navigation.navigate("Confirmation");
        // }
      } catch (error) {
        if (saveError === "") {
          setSaveError("Trouble saving location. Try again later.");
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      {isLoading && <LoadingOverlay />}
      <View style={styles.container}>
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollContent}
        >
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
              {imageName && (
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
                  <Input size="sm" paddingBottom={5}>
                    <InputField
                      placeholder="Street Address"
                      style={{ backgroundColor: "white", borderRadius: 3 }}
                      value={addressData?.street_address}
                      onFocus={() => {
                        setDropdownVisible(false);
                        scrollToPosition(140);
                      }}
                      onChangeText={(text: string) => {
                        handleAddressChange("street_address", text);
                      }}
                    />
                  </Input>
                  <Input size="sm" marginTop={15} paddingBottom={5}>
                    <InputField
                      placeholder="City"
                      style={{ backgroundColor: "white", borderRadius: 3 }}
                      value={addressData?.city}
                      onFocus={() => {
                        setDropdownVisible(false);
                        scrollToPosition(200);
                      }}
                      onChangeText={(text: string) => {
                        handleAddressChange("city", text);
                      }}
                    />
                  </Input>
                  <Input size="sm" marginTop={15} paddingBottom={5}>
                    <InputField
                      placeholder="State"
                      style={{ backgroundColor: "white", borderRadius: 3 }}
                      value={addressData?.state}
                      onFocus={() => {
                        setDropdownVisible(false);
                        scrollToPosition(250);
                      }}
                      onChangeText={(text: string) => {
                        handleAddressChange("state", text);
                      }}
                    />
                  </Input>
                  <Input size="sm" marginTop={15} paddingBottom={5}>
                    <InputField
                      placeholder="Postal Code"
                      style={{ backgroundColor: "white", borderRadius: 3 }}
                      value={addressData?.postalCode}
                      onFocus={() => {
                        setDropdownVisible(false);
                        scrollToPosition(300);
                      }}
                      onChangeText={(text: string) => {
                        handleAddressChange("postalCode", text);
                      }}
                    />
                  </Input>
                  <Input
                    size="sm"
                    marginTop={15}
                    marginBottom={25}
                    paddingBottom={5}
                  >
                    <InputField
                      placeholder="Country"
                      style={{ backgroundColor: "white", borderRadius: 3 }}
                      value={addressData?.country}
                      onFocus={() => {
                        setDropdownVisible(false);
                        scrollToPosition(350);
                      }}
                      onChangeText={(text: string) => {
                        handleAddressChange("country", text);
                      }}
                    />
                  </Input>
                </>
              )}

              <FormControlLabel style={{ marginTop: 5, marginBottom: 15 }}>
                <FormControlLabelText>Name of location</FormControlLabelText>
              </FormControlLabel>
              <Input size="sm" paddingBottom={5}>
                <InputField
                  placeholder="Location name"
                  style={{ backgroundColor: "white", borderRadius: 3 }}
                  value={formData?.name}
                  onChangeText={(text: string) => {
                    updateFormData({ name: text });
                  }}
                  onFocus={() => {
                    setDropdownVisible(false);
                    scrollToPosition(!showAddress ? 180 : 450);
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
                scrollToPosition={scrollToPosition}
                position={!showAddress ? 280 : 550}
              />

              <FormControlLabel style={{ marginTop: 30, marginBottom: 15 }}>
                <FormControlLabelText>Description</FormControlLabelText>
              </FormControlLabel>
              <CustomTextField
                placeholder="Enter some details about your experience and whether you'd recommend this place."
                formData={formData}
                updateFormData={updateFormData}
                setDropdownVisible={setDropdownVisible}
                scrollToPosition={scrollToPosition}
                position={!showAddress ? 390 : 650}
              />
              <FormControlLabel style={{ marginTop: 30, marginBottom: 15 }}>
                <FormControlLabelText>Tags</FormControlLabelText>
              </FormControlLabel>
              <Tag
                updateFormData={updateFormData}
                setDropdownVisible={setDropdownVisible}
                scrollToPosition={scrollToPosition}
                tags={tags}
                setTags={setTags}
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
            {existingAddress ? (
              <View style={styles.buttonContainer}>
                <ActionButton text="Update Location" action={handleUpdate} />
              </View>
            ) : (
              <View style={styles.buttonContainer}>
                <ActionButton text="Submit Location" action={handleSubmit} />
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </>
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
    paddingBottom: 250,
  },
});
