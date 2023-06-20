export interface DCPSuggestionResponse {
  data: {
    subdistrict: string;
    district: string;
    city: string;
    province: string;
    zipCode: string;
  }[];
}
export function modelDCPSuggestion(data: DCPSuggestionResponse["data"]) {
  return data;
}
export type DCPSuggestion = ReturnType<typeof modelDCPSuggestion>[0];
