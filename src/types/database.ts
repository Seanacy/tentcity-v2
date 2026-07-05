export interface Location {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  phone: string | null;
  hours: string | null;
  description: string | null;
  capacity: string | null;
  services: string | null;
  requirements: string | null;
  notes: string | null;
  additional_info: string | null;
  youtube_url: string | null;
  image_url: string | null;
  gender_served: string | null;
  age_min: number | null;
  age_max: number | null;
  user_id: string;
  created_at: string;
  updated_at: string;
  categories?: Category[];
  assets?: LocationAsset[];
}
 
export interface Category {
  id: number;
  name: string;
  description: string | null;
  color: string;
  icon_name: string;
  is_standard: boolean;
  tags: string[];
  created_at: string;
  updated_at: string;
}
 
export interface LocationAsset {
  id: number;
  location_id: number;
  url: string;
  type: string;
  created_at: string;
}
 
export interface LocationCategory {
  location_id: number;
  category_id: number;
}
 
export interface User {
  id: string;
  email: string;
  name: string | null;
  role: "admin" | "user";
  created_at: string;
}
 
// Anonymized location tracking for analytics
export interface LocationPing {
  id: string;
  anon_id: string;
  lat: number;
  lng: number;
  accuracy: number | null;
  app_source: "tentcity" | "bridgework" | "osaat";
  session_id: string;
  created_at: string;
}
 
// BridgeWork task type for Employment integration
export interface BridgeWorkTask {
  id: string;
  title: string;
  description: string;
  category: string;
  pay: number;
  location: string;
  latitude?: number;
  longitude?: number;
  status: string;
  created_at: string;
}
 
export interface Database {
  public: {
    Tables: {
 
      locations: {
        Row: Location;
        Insert: Omit<Location, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Location, "id">>;
      };
      categories: {
        Row: Category;
        Insert: Omit<Category, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Category, "id">>;
      };
      location_assets: {
        Row: LocationAsset;
        Insert: Omit<LocationAsset, "id" | "created_at">;
        Update: Partial<Omit<LocationAsset, "id">>;
      };
      location_categories: {
        Row: LocationCategory;
        Insert: LocationCategory;
        Update: Partial<LocationCategory>;
      };
      users: {
        Row: User;
        Insert: Omit<User, "created_at">;
        Update: Partial<Omit<User, "id">>;
      };
      location_pings: {
        Row: LocationPing;
        Insert: Omit<LocationPing, "id" | "created_at">;
        Update: Partial<Omit<LocationPing, "id">>;
      };
      location_favorites: {
        Row: LocationFavorite;
        Insert: Omit<LocationFavorite, "id" | "created_at">;
        Update: Partial<Omit<LocationFavorite, "id">>;
      };
      location_subscriptions: {
        Row: LocationSubscription;
        Insert: Omit<LocationSubscription, "id" | "created_at">;
        Update: Partial<Omit<LocationSubscription, "id">>;
      };
      location_flags: {
        Row: LocationFlag;
        Insert: Omit<LocationFlag, "id" | "created_at" | "status">;
        Update: Partial<Omit<LocationFlag, "id">>;
      };
      location_suggestions: {
        Row: LocationSuggestion;
        Insert: Omit<LocationSuggestion, "id" | "created_at" | "status">;
        Update: Partial<Omit<LocationSuggestion, "id">>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
}

export interface LocationFavorite {
  id: string;
  user_id: string;
  location_id: number;
  created_at: string;
}

export interface LocationSubscription {
  id: string;
  user_id: string;
  location_id: number;
  created_at: string;
}

export interface LocationFlag {
  id: string;
  user_id: string;
  location_id: number;
  reason: string | null;
  status: string;
  created_at: string;
}

export interface LocationSuggestion {
  id: string;
  submitted_by: string | null;
  name: string;
  address: string | null;
  description: string | null;
  category: string | null;
  phone: string | null;
  hours: string | null;
  status: string;
  created_at: string;
}
