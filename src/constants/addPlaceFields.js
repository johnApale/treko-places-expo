import { FontAwesome } from "@expo/vector-icons";

const addInfoContent = [
  {
    id: 1,
    title: "Take and upload a photo",
    description:
      "We won't store this, but will use its metadata to get a more precise location.",
    icon: <FontAwesome name="camera-retro" size={20} color="black" />,
  },
  {
    id: 2,
    title: "Enter some basic information",
    description:
      "Tell us the name of the place and describe your experience there. Get creative!",
    icon: <FontAwesome name="edit" size={20} color="black" />,
  },
  {
    id: 3,
    title: "Add relevant tags",
    description:
      "Enter keywords that you think fit the place you visited, or simply create your own.",
    icon: <FontAwesome name="tags" size={20} color="black" />,
  },
];

const addFields = [
  {
    title: "Name of location",
    label: "name",
    type: "name",
    id: "name",
    placeholder: "Location name",
  },
];

const categoryItems = ["Business", "Restaurant", "Bar"];

export { addFields, categoryItems, addInfoContent };
