export type SportType = "swim" | "run" | "mtb" | "road";

export interface Activity {
  type: SportType;
  distance: number;
  duration: number;
  elevation: number;
}

export interface ActivityMetadata {
  name: string;
  description: string;
  image: string;
  external_url?: string;
  attributes: {
    trait_type: string;
    value: string | number;
  }[];
}

export interface SportDisplay {
  id: SportType;
  label: string;
  icon: string;
  color: string;
}
