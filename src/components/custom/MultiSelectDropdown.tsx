import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Checkbox } from "expo-checkbox";
import { SearchIcon } from "@gluestack-ui/themed";

interface MultiselectDropdownProps {
  options: string[];
}

const MultiselectDropdown: React.FC<MultiselectDropdownProps> = ({
  options,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isInputFocused, setInputFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const toggleOption = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }

    setSearchQuery("");
    setTimeout(() => {
      inputRef.current?.focus(); // Focus on the TextInput after a delay
    }, 200);
  };

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInputSubmit = () => {
    if (searchQuery.trim() !== "") {
      if (filteredOptions.includes(searchQuery)) {
        toggleOption(searchQuery);
      } else {
        setSelectedOptions([...selectedOptions, searchQuery]);
      }
      setSearchQuery("");
      setTimeout(() => {
        inputRef.current?.focus(); // Focus on the TextInput after a delay
      }, 200);
    }
  };
  const containerStyle = {
    flexDirection: "row",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: isInputFocused ? "#547ca4" : "#D9D9D9",
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: selectedOptions.length === 0 ? 10 : 7,
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
            {selectedOptions.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={{ color: "white", fontSize: 10 }}>{tag}</Text>
                <TouchableOpacity onPress={() => toggleOption(tag)}>
                  <Feather
                    name="x"
                    size={12}
                    color="white"
                    style={{ paddingTop: 1, marginLeft: 5 }}
                  />
                </TouchableOpacity>
              </View>
            ))}
            <TextInput
              style={styles.input}
              ref={inputRef}
              placeholder={
                selectedOptions.length === 0 ? "Select Category" : ""
              }
              placeholderTextColor={"gray"}
              value={searchQuery}
              onChangeText={(text) => {
                setSearchQuery(text);
                setDropdownVisible(true);
              }}
              onSubmitEditing={handleInputSubmit}
              onFocus={() => {
                setInputFocused(true);
                setDropdownVisible(true);
              }}
              onBlur={() => {
                setInputFocused(false);
                setDropdownVisible(false);
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
          <View style={styles.dropdown}>
            {filteredOptions.map((item) => (
              <TouchableOpacity
                key={filteredOptions.indexOf(item)}
                style={[
                  styles.option,
                  selectedOptions.includes(item) && styles.selectedOption,
                ]}
                onPress={() => toggleOption(item)}
              >
                <Checkbox
                  value={selectedOptions.includes(item)}
                  onValueChange={() => toggleOption(item)}
                  style={styles.checkbox} // Adjust styling
                />
                <Text
                  style={[
                    selectedOptions.includes(item) && { color: "#E17858" },
                    { fontSize: 12 },
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
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
