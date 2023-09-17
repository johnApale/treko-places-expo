import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Checkbox } from "expo-checkbox";
import { SearchIcon } from "@gluestack-ui/themed";
import { getCategories } from "../../helpers/categoryOptions";
import { Categories } from "../../types/supabase";

interface MultiselectDropdownProps {
  updateFormData: (updatedData: any) => void;
  isDropdownVisible: boolean;
  setDropdownVisible: (visible: boolean) => void;
  selectedOptions: Categories[] | undefined;
  setSelectedOptions: (selectedOption: Categories[]) => void;
  scrollToPosition: (y: number) => void;
  position: number;
}

const MultiselectDropdown: React.FC<MultiselectDropdownProps> = ({
  updateFormData,
  isDropdownVisible,
  setDropdownVisible,
  selectedOptions,
  setSelectedOptions,
  scrollToPosition,
  position,
}) => {
  const [options, setOptions] = useState<Categories[] | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [isInputFocused, setInputFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const fetchData = async () => {
    try {
      const data = await getCategories();
      if (data instanceof Error) {
        console.log(data);
      } else {
        setOptions(data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleOption = (option: Categories) => {
    if (selectedOptions?.includes(option)) {
      const updatedOptions = selectedOptions.filter((item) => item !== option);
      setSelectedOptions(updatedOptions);
      const selectedIds = updatedOptions.map((option) => option.id);
      updateFormData({ category: selectedIds });
    } else {
      if (selectedOptions) {
        setSelectedOptions([...selectedOptions, option]);
        const selectedIds = selectedOptions?.map((option) => option.id);
        selectedIds?.push(option.id);
        updateFormData({ category: selectedIds });
      }
    }

    setSearchQuery("");
  };

  const filteredOptions = options?.filter((option: Categories) =>
    option.category_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInputSubmit = () => {
    if (searchQuery.trim() !== "") {
      const selectedOption = options?.find(
        (option: Categories) =>
          option?.category_name.toLowerCase() === searchQuery.toLowerCase()
      );

      if (selectedOption) {
        toggleOption(selectedOption);
      } else {
        // If the option doesn't exist in the list, you might want to handle it accordingly.
        // For example, display an error message or add it to a separate list.
      }

      setSearchQuery("");
    }
  };
  const containerStyle = {
    flexDirection: "row",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: isInputFocused ? "#547ca4" : "#D9D9D9",
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: selectedOptions?.length === 0 ? 10 : 7,
  };

  return (
    <>
      <Pressable
        style={containerStyle as any}
        onPress={() => {
          inputRef.current?.focus();
        }}
      >
        <View style={{ flexDirection: "column", flex: 1 }}>
          <View style={styles.tagContainer}>
            {selectedOptions?.map((category) => (
              <View key={category.id} style={styles.tag}>
                <Text style={{ color: "white", fontSize: 10 }}>
                  {category.category_name}
                </Text>
                <Pressable onPress={() => toggleOption(category)}>
                  <Feather
                    name="x"
                    size={12}
                    color="white"
                    style={{ paddingTop: 1, marginLeft: 5 }}
                  />
                </Pressable>
              </View>
            ))}
            <TextInput
              style={styles.input}
              ref={inputRef}
              placeholder={
                selectedOptions?.length === 0 ? "Select Category" : ""
              }
              placeholderTextColor={"gray"}
              value={searchQuery}
              onChangeText={(text) => {
                setSearchQuery(text);
                setDropdownVisible(true);
              }}
              // onSubmitEditing={handleInputSubmit}
              onFocus={() => {
                setInputFocused(true);
                setDropdownVisible(true);
                scrollToPosition(position);
              }}
              onKeyPress={(e) => {
                if (e.nativeEvent.key === "Backspace" && searchQuery === "") {
                  // Check if backspace key was pressed and input is empty
                  if (selectedOptions?.length && selectedOptions?.length > 0) {
                    // Remove the last option from the array
                    const updatedCategory = selectedOptions.slice(0, -1);
                    setSelectedOptions(updatedCategory);
                    updateFormData({ category: updatedCategory });
                  }
                }
              }}
            />
          </View>
        </View>
        <View style={styles.searchIconContainer}>
          <SearchIcon />
        </View>
      </Pressable>

      {isDropdownVisible && (
        <View style={styles.dropdownContainer}>
          <ScrollView
            style={styles.dropdown}
            // keyboardShouldPersistTaps="always"
          >
            {filteredOptions?.map((item: Categories) => (
              <Pressable
                key={item.id}
                style={[
                  styles.option,
                  selectedOptions?.includes(item) && styles.selectedOption,
                ]}
                onPress={() => toggleOption(item)}
              >
                <Checkbox
                  value={selectedOptions?.includes(item)}
                  onValueChange={() => toggleOption(item)}
                  style={styles.checkbox} // Adjust styling
                />
                <Text
                  style={[
                    selectedOptions?.includes(item) && { color: "#E17858" },
                    { fontSize: 12 },
                  ]}
                >
                  {item.category_name}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  searchIconContainer: {
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E17858",
    paddingVertical: 4,
    paddingHorizontal: 5,
    marginRight: 3,
    marginBottom: 3,
    borderRadius: 1,
  },
  input: {
    fontSize: 14,
  },
  dropdownContainer: {
    marginLeft: 3,
  },
  dropdown: {
    borderColor: "black",
    maxHeight: 150,
    overflow: "scroll",
    backgroundColor: "white",
    width: "99%",
    borderBottomLeftRadius: 3, // Add some border radius
    borderBottomRightRadius: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  selectedOption: {
    backgroundColor: "#FE53031F",
  },
  checkboxContainer: {
    padding: 0,
    marginRight: 10,
  },
  checkbox: {
    height: 14,
    width: 14,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "lightgray",
  },
});

export default MultiselectDropdown;
