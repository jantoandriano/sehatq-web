export interface Address {
  id: number;
  label: string;
  receiver: string;
  address: string;
  province: string;
  city: string;
  district: string;
  subdistrict: string;
  phone: string;
  zipCode: string;
  latitude: number;
  longitude: number;
  note: string;
  default: boolean;
  googlePlaceId: string | null;
}

export interface AddressesResponse {
  data: Address[];
  meta: {
    pagination: {
      total: number;
      page: number;
      current: number;
      perPage: number;
      maxPage: number;
      next: string;
      prev: string;
    };
  };
}

export function modelAddresses(data: AddressesResponse["data"]) {
  return data.map((address) => ({
    id: `${address.id}`,
    receiverName: address.receiver,
    label: address.label,
    address: address.address,
    district: address.district,
    subdistrict: address.subdistrict,
    city: address.city,
    province: address.province,
    zipCode: address.zipCode,
    phone: address.phone,
    note: address.note,
    isDefault: address.default,
    googlePlaceId: address.googlePlaceId,
  }));
}

export interface AddressDetailResponse {
  data: Address;
}

export function modelAddressDetail(data: AddressDetailResponse["data"]) {
  return {
    id: data.id,
    label: data.label,
    receiver: data.receiver,
    address: data.address,
    province: data.province,
    city: data.city,
    district: data.district,
    subdistrict: data.subdistrict,
    phone: data.phone,
    zipCode: data.zipCode,
    latitude: data.latitude,
    longitude: data.longitude,
    note: data.note,
    default: data.default,
    googlePlaceId: data.googlePlaceId ?? undefined,
  };
}

export interface AddressSubmitResponse {
  meta: {
    message: string;
  };
  data: Address;
}
