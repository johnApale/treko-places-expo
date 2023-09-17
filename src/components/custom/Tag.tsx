import { AddIcon, Input, InputField, InputIcon } from "@gluestack-ui/themed";
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import { Feather } from "@expo/vector-icons";

interface TagInputProps {
  updateFormData: (updatedData: any) => void;
  setDropdownVisible: (visible: boolean) => void;
  scrollToPosition: (y: number) => void;
  tags: string[];
  setTags: (tag: string[]) => void;
}

const Tag: React.FC<TagInputProps> = ({
  updateFormData,
  setDropdownVisible,
  scrollToPosition,
  tags,
  setTags,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [isInputFocused, setInputFocused] = useState(false);

  const inputRef = useRef<TextInput>(null);

  const handleInputChange = (text: string) => {
    setInputValue(text);
  };

  const handleInputSubmit = () => {
    if (inputValue.trim() !== "") {
      const updatedTags = [...tags, inputValue];
      setTags(updatedTags);
      updateFormData({ tags: updatedTags });
      setInputValue("");
    }
    setInputFocused(false);
  };

  const handleTagRemove = (tagToRemove: string) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(updatedTags);
    updateFormData({ tags: updatedTags });
  };

  const handlePressed = () => {
    inputRef.current?.blur(); // Remove focus from current input if any
    scrollToPosition(1000);
    setDropdownVisible(false);
    setInputFocused(true);
    setTimeout(() => {
      inputRef.current?.focus(); // Focus on the TextInput after a delay
    }, 200); // Adjust the delay as needed
  };

  return (
    <View style={styles.container}>
      <View style={styles.tagsContainer}>
        {tags.map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={{ fontSize: 12, color: "white" }}>{tag}</Text>
            <TouchableOpacity onPress={() => handleTagRemove(tag)}>
              <Feather
                name="x"
                size={14}
                color="white"
                style={{ paddingTop: 1, marginLeft: 5 }}
              />
            </TouchableOpacity>
          </View>
        ))}
        {isInputFocused ? (
          <TextInput
            ref={inputRef}
            style={[styles.input]}
            value={inputValue}
            onChangeText={handleInputChange}
            onSubmitEditing={handleInputSubmit}
            onFocus={() => {
              setInputFocused(true);
              setDropdownVisible(false);
            }}
            onBlur={() => setInputFocused(false)}
          />
        ) : (
          <Pressable style={styles.tag} onPress={handlePressed}>
            <AddIcon style={{ marginLeft: -5, height: 14, color: "white" }} />
            <Text style={{ fontSize: 12, marginLeft: 5, color: "white" }}>
              New tag
            </Text>
          </Pressable>
        )}
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          inputRef.current?.focus();
        }}
      ></TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E17858",
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
    borderRadius: 1,
  },
  input: {
    color: "white",
    backgroundColor: "#E17858",
    minWidth: 50,
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
    borderRadius: 1,
    fontSize: 12,
  },
  addButton: {
    marginTop: 10,
  },
});

export default Tag;
