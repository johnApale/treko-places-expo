export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      Categories: {
        Row: {
          category_name: string;
          id: number;
        };
        Insert: {
          category_name: string;
          id?: number;
        };
        Update: {
          category_name?: string;
          id?: number;
        };
        Relationships: [];
      };
      Locations: {
        Row: {
          city: string | null;
          country: string | null;
          id: number;
          latitude: number | null;
          location: unknown;
          longitude: number | null;
          place_id: number | null;
          postal_code: string | null;
          state: string | null;
          street_address: string | null;
        };
        Insert: {
          city?: string | null;
          country?: string | null;
          id?: number;
          latitude?: number | null;
          location: unknown;
          longitude?: number | null;
          place_id?: number | null;
          postal_code?: string | null;
          state?: string | null;
          street_address?: string | null;
        };
        Update: {
          city?: string | null;
          country?: string | null;
          id?: number;
          latitude?: number | null;
          location?: unknown;
          longitude?: number | null;
          place_id?: number | null;
          postal_code?: string | null;
          state?: string | null;
          street_address?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "Locations_place_id_fkey";
            columns: ["place_id"];
            referencedRelation: "Places";
            referencedColumns: ["id"];
          }
        ];
      };
      Places: {
        Row: {
          accessibility_info: string | null;
          added_by: string | null;
          amenities: string[] | null;
          avg_rating: number | null;
          avg_wait_time: string | null;
          category: string | null;
          created_at: string | null;
          description: string | null;
          id: number;
          location_id: number | null;
          name: string;
          opening_hours: string | null;
          payment_options: string[] | null;
          phone_number: string | null;
          photos: string[] | null;
          popular_times: string | null;
          price_range: string | null;
          ratings_count: number | null;
          social_media_links: Json | null;
          status: Database["public"]["Enums"]["place_status"] | null;
          tags: string[] | null;
          updated_at: string | null;
          updated_by: string | null;
          website_url: string | null;
        };
        Insert: {
          accessibility_info?: string | null;
          added_by?: string | null;
          amenities?: string[] | null;
          avg_rating?: number | null;
          avg_wait_time?: string | null;
          category?: string | null;
          created_at?: string | null;
          description?: string | null;
          id?: number;
          location_id?: number | null;
          name: string;
          opening_hours?: string | null;
          payment_options?: string[] | null;
          phone_number?: string | null;
          photos?: string[] | null;
          popular_times?: string | null;
          price_range?: string | null;
          ratings_count?: number | null;
          social_media_links?: Json | null;
          status?: Database["public"]["Enums"]["place_status"] | null;
          tags?: string[] | null;
          updated_at?: string | null;
          updated_by?: string | null;
          website_url?: string | null;
        };
        Update: {
          accessibility_info?: string | null;
          added_by?: string | null;
          amenities?: string[] | null;
          avg_rating?: number | null;
          avg_wait_time?: string | null;
          category?: string | null;
          created_at?: string | null;
          description?: string | null;
          id?: number;
          location_id?: number | null;
          name?: string;
          opening_hours?: string | null;
          payment_options?: string[] | null;
          phone_number?: string | null;
          photos?: string[] | null;
          popular_times?: string | null;
          price_range?: string | null;
          ratings_count?: number | null;
          social_media_links?: Json | null;
          status?: Database["public"]["Enums"]["place_status"] | null;
          tags?: string[] | null;
          updated_at?: string | null;
          updated_by?: string | null;
          website_url?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "Places_added_by_fkey";
            columns: ["added_by"];
            referencedRelation: "Users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Places_location_id_fkey";
            columns: ["location_id"];
            referencedRelation: "Locations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Places_updated_by_fkey";
            columns: ["updated_by"];
            referencedRelation: "Users";
            referencedColumns: ["id"];
          }
        ];
      };
      PlacesAuditLog: {
        Row: {
          action: string;
          details: Json | null;
          id: number;
          place_id: number;
          timestamp: string | null;
          user_id: string | null;
        };
        Insert: {
          action: string;
          details?: Json | null;
          id?: number;
          place_id: number;
          timestamp?: string | null;
          user_id?: string | null;
        };
        Update: {
          action?: string;
          details?: Json | null;
          id?: number;
          place_id?: number;
          timestamp?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "PlacesAuditLog_place_id_fkey";
            columns: ["place_id"];
            referencedRelation: "Places";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "PlacesAuditLog_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "Users";
            referencedColumns: ["id"];
          }
        ];
      };
      PlacesCategories: {
        Row: {
          category_id: number;
          place_id: number;
        };
        Insert: {
          category_id: number;
          place_id: number;
        };
        Update: {
          category_id?: number;
          place_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "PlacesCategories_category_id_fkey";
            columns: ["category_id"];
            referencedRelation: "Categories";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "PlacesCategories_place_id_fkey";
            columns: ["place_id"];
            referencedRelation: "Places";
            referencedColumns: ["id"];
          }
        ];
      };
      Users: {
        Row: {
          created_at: string | null;
          first_name: string;
          id: string;
          last_name: string | null;
          places_added_count: number | null;
          profile_pic: string | null;
        };
        Insert: {
          created_at?: string | null;
          first_name: string;
          id: string;
          last_name?: string | null;
          places_added_count?: number | null;
          profile_pic?: string | null;
        };
        Update: {
          created_at?: string | null;
          first_name?: string;
          id?: string;
          last_name?: string | null;
          places_added_count?: number | null;
          profile_pic?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "Users_id_fkey";
            columns: ["id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      place_status: "not_verified" | "verified" | "deleted";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Categories = {
  category_name: string;
  id: number;
};
