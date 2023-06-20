export interface FilterOptionsSort {
  id: string;
  name: string;
}

export interface FilterOptionsHCFType {
  id: number;
  name: string;
  slug: string;
  imageUrl: string[];
}

export interface FilterOptionsHCFGeneralFacility {
  id: number;
  name: string;
  slug: string;
  imageUrl: string;
}

export interface FilterOptionsHCFMedicalFacility {
  id: number;
  name: string;
  slug: string;
  imageUrl: string;
}

export interface FilterOptionsHCPCity {
  code: string;
  name: string;
  slug: string;
  district: {
    code: string;
    slug: string;
    name: string;
  }[];
}

export interface FilterOptionsHCPSpeciality {
  id: number;
  name: string;
  slug: string;
  imageUrl: string[];
}

export interface FilterOptionsHCPGender {
  id: string;
  name: string;
}

export interface FilterOptionsHCPSchedule {
  id: string;
  name: string;
}

export interface FilterOptionsHCPProcedure {
  id: number;
  slug: string;
  name: string;
}

export interface HCPFiltersResponse {
  data: {
    sort: FilterOptionsSort[];
    hcfType: FilterOptionsHCFType[];
    hcfGeneralFacility: FilterOptionsHCFGeneralFacility[];
    hcfMedicalFacility: FilterOptionsHCFMedicalFacility[];
    city: FilterOptionsHCPCity[];
    hcpSpeciality: FilterOptionsHCPSpeciality[];
    hcpGender: FilterOptionsHCPGender[];
    hcpSchedule: FilterOptionsHCPSchedule[];
    procedures: FilterOptionsHCPProcedure[];
  };
}

export function modelHCPFilters(data: HCPFiltersResponse["data"]) {
  return {
    sort: data.sort,
    speciality: data.hcpSpeciality,
    procedures: data.procedures,
    cities: data.city,
    schedules: data.hcpSchedule,
    genders: data.hcpGender,
  };
}

export type HCPFilters = ReturnType<typeof modelHCPFilters>;
