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
    };
  };
}
