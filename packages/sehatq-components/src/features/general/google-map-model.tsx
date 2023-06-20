export interface PlaceSuggestionResponse {
  data: {
    placeId: string;
    description: string;
  }[];
}

export function modelPlaceSuggestion(data: PlaceSuggestionResponse["data"]) {
  return data;
}

export type PlaceSuggestion = ReturnType<typeof modelPlaceSuggestion>[0];

export interface PlaceDetailResponse {
  data: {
    placeId: string;
    address: string;
    city: string;
    country: string;
    description: string;
    district: string;
    latitude: number;
    localPlaceId: number;
    longitude: number;
    province: string;
    subDistrict: string;
    zipCode: string;
  };
}

export function modelPlaceDetail(data: PlaceDetailResponse["data"]) {
  return data;
}

export type PlaceDetail = ReturnType<typeof modelPlaceDetail>;
