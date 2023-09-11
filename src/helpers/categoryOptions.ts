import { supabase } from "../../lib/supabase";
import { Categories } from "../types/supabase";

export const getCategories = async (): Promise<
  Categories[] | undefined | Error
> => {
  try {
    let { data: Categories, error } = await supabase
      .from("Categories")
      .select("*");
    if (!error) {
      return Categories as Categories[];
    }
  } catch (error) {
    return error as Error;
  }
};
