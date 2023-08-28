const addInfoContent = [
  {
    title: "Take and upload a photo",
    description:
      "We won't store this, but will use its metadata to get a more precise location.",
    //   icon: CameraOutlined,
  },
  {
    title: "Enter some basic information",
    description:
      "Tell us the name of the place and describe your experience there. Get creative!",
    //   icon: EditOutlined,
  },
  {
    title: "Add relevant tags",
    description:
      "Enter keywords that you think fit the place you visited, or simply create your own.",
    //   icon: TagsOutlined,
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
