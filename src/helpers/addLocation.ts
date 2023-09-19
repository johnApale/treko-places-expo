import { User } from "@supabase/supabase-js";
import { supabase } from "../../lib/supabase";
import { AddFormType, AddressType } from "../types";

export const createPlace = async (
  user: User | undefined | null,
  photo_result: string,
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
          photos: [photo_result],
          added_by: user?.id,
        },
      ])
      .select();
    if (data) {
      console.log(data);
      return data[0].id;
    } else {
      console.log("Places error", error.message);
      throw Error;
    }
  } catch (error) {
    console.log("Error writing to Places table: ", error);
    return "error";
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
        console.log("Location Error", error.message);
        return "error";
      }
      return data;
    } else {
      console.log(error);
      return "error";
    }
  } catch (error) {
    console.log("Error writing to Location table: ", error);
    return "error";
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
      console.log("PlacesCategories Error", placeCategoryError.message);
      return "error";
    }
  } catch (error) {
    console.log("Error writing to PlacesTags table: ", error);
  }
};

interface UploadResult {
  path: string | null; // Adjust the type if necessary
  name: string | null; // Adjust the type if necessary
}

export const uploadPhoto = async (photo_result: any): Promise<string> => {
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
      throw Error;
    } else {
      return photoData?.path;
    }
  } catch (error) {
    console.log(error);
    return "error";
  }
};

export const getPlace = async (addressData: AddressType | undefined | null) => {
  try {
    const { data, error } = await supabase
      .from("Locations")
      .select("place_id")
      .eq("street_address", addressData?.street_address)
      .eq("city", addressData?.city)
      .eq("state", addressData?.state)
      .eq("postal_code", addressData?.postalCode);

    if (error) {
      console.log("LocationError:", error.message);
      throw Error;
    } else {
      const { data: PlaceData, error: PlaceError } = await supabase
        .from("Places")
        .select("*")
        .eq("id", data[0].place_id);
      if (PlaceError) {
        console.log(PlaceError);
        throw Error;
      }
      const { data: CategoryData, error: CategoryError } = await supabase
        .from("PlacesCategories")
        .select("*, Categories !inner(*)")
        .eq("place_id", PlaceData[0].id);
      const categoriesResult = CategoryData?.map((item) => item.Categories);
      const result = {
        id: PlaceData[0].id,
        name: PlaceData[0].name,
        description: PlaceData[0].description,
        tags: PlaceData[0].tags,
        category_id: categoriesResult?.map((category) => category.id as number),
        categories: categoriesResult,
        photos: PlaceData[0].photos,
      };
      return result;
    }
  } catch (error) {
    return "error";
  }
};

export const updatePlace = async (
  id: number | null | undefined,
  user: User | null | undefined,
  formData: AddFormType | undefined | null,
  photos: string[] | undefined,
  photo_result: string
) => {
  try {
    let updatedPhotos;
    if (photos) {
      updatedPhotos = [...photos, photo_result];
    }
    const currentTimestamp = new Date().toISOString();
    const { data, error } = await supabase
      .from("Places")
      .update({
        name: formData?.name,
        description: formData?.description,
        tags: formData?.tags,
        photos: updatedPhotos,
        updated_by: user?.id,
        updated_at: currentTimestamp,
      })
      .eq("id", id)
      .select();
    if (error) {
      console.log(error);
      throw Error;
    }
  } catch (error) {
    return "error";
  }
};

export const updateCategories = async (
  id: number | null | undefined,
  categories: number[] | undefined
) => {
  try {
    const { data, error } = await supabase
      .from("PlacesCategories")
      .delete()
      .eq("place_id", id);
    if (error) {
      throw Error;
    }
    const placeCategoryData = categories?.map((category_id) => ({
      place_id: id,
      category_id: category_id,
    }));
    const { data: _updateData, error: updateError } = await supabase
      .from("PlacesCategories")
      .insert(placeCategoryData);

    if (updateError) {
      throw Error;
    }
  } catch (error) {
    return "error";
  }
};
