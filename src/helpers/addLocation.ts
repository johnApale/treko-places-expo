import { User } from "@supabase/supabase-js";
import { supabase } from "../../lib/supabase";
import { AddFormType, AddressType } from "../types";
// };

export const createPlace = async (
  user: User | undefined | null,
  formData: AddFormType | undefined | null
) => {
  try {
    const { data, error } = await supabase
      .from("Places")
      .insert([
        {
          name: formData?.name,
          description: formData?.description,
          tags: formData?.tags,
          photos: [formData?.photo_path],
          added_by: user?.id,
        },
      ])
      .select();
    if (data) {
      return data[0].id;
    } else {
      console.log(error);
      return null;
    }
  } catch (error) {
    console.log("Error writing to Places table: ", error);
    return error;
  }
};

export const createLocation = async (
  place_id: number,
  address: AddressType | undefined | null
) => {
  try {
    const { data, error } = await supabase
      .from("Locations")
      .insert([
        {
          place_id: place_id,
          longitude: address?.longitude,
          latitude: address?.latitude,
          location: `POINT(${address?.longitude} ${address?.latitude})`,
          street_address: address?.street_address || null,
          city: address?.city || null,
          state: address?.state || null,
          postal_code: address?.postalCode || null,
          country: address?.country || null,
        },
      ])
      .select();
    if (data) {
      const location_id: number = data[0].id;

      const { error } = await supabase
        .from("Places")
        .update({ location_id: location_id })
        .eq("id", place_id);

      if (error) {
        console.log(error);
      }
      return data;
    } else {
      console.log(error);
      return;
    }
  } catch (error) {
    console.log("Error writing to Location table: ", error);
    return error;
  }
};

export const createPlacesCategories = async (
  place_id: number,
  categories: number[] | undefined
) => {
  try {
    const placeCategoryData = categories?.map((category_id) => ({
      place_id: place_id,
      category_id: category_id,
    }));
    const { error: placeCategoryError } = await supabase
      .from("PlacesCategories")
      .insert(placeCategoryData);
    if (placeCategoryError) {
      console.error("Error adding place tags:", placeCategoryError.message);
    }
  } catch (error) {
    console.log("Error writing to PlacesTags table: ", error);
    return error;
  }
};

interface UploadResult {
  path: string | null; // Adjust the type if necessary
  name: string | null; // Adjust the type if necessary
}

export const uploadPhoto = async (photo_result: any): Promise<UploadResult> => {
  try {
    const photo = {
      uri: photo_result.assets[0].uri,
      type: photo_result.assets[0].type,
      name: photo_result.assets[0].fileName || "image.jpg",
    };

    const formData = new FormData();
    // @ts-ignore
    formData.append("file", photo);

    const timestamp = +new Date();
    const uploadName = `${photo.name}-${timestamp}`;

    const { data: photoData, error } = await supabase.storage
      .from("images")
      .upload(uploadName, formData);

    if (error) {
      console.log(error);
      throw error;
    }

    return {
      path: photoData?.path,
      name: photo.name,
    };
  } catch (error) {
    console.log(error);
    return { path: null, name: null };
    // return error;
  }
};
