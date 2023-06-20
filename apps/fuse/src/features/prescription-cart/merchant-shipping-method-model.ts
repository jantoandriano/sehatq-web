import { generatePriceDisplay } from "@sehatq/utils";

export interface MerchantShippingMethodsResponse {
  data: Data[];
  meta: Meta;
}

export interface Data {
  id: number;
  methods: Method[];
  name: string;
  priceMax: number;
  priceMin: number;
}

export interface Method {
  disabled: boolean;
  eta: string;
  icon_url: string;
  id: number;
  info: string;
  name: string;
  price: number;
}

export interface Meta {
  mechant: Mechant;
  shippingAddress: ShippingAddress;
}

export interface Mechant {
  id: number;
}

export interface ShippingAddress {
  latitude: number;
  longitude: number;
}

export function modelMerchantShippingMethods(
  data: MerchantShippingMethodsResponse["data"]
) {
  return data.map((elm) => ({
    id: elm.id,
    name: elm.name,
    priceRange:
      elm.priceMin !== 0 && elm.priceMin !== elm.priceMax
        ? `${generatePriceDisplay(elm.priceMin)} - ${generatePriceDisplay(
            elm.priceMax
          )}`
        : generatePriceDisplay(elm.priceMin || elm.priceMax),
    methods: elm.methods.map((method) => ({
      id: method.id,
      name: method.name,
      iconUrl: method.icon_url,
      price: generatePriceDisplay(method.price),
      info: method.info,
      isDisabled: method.disabled,
      eta: method.eta ? `*${method.eta}` : "",
    })),
  }));
}

export type MerchantShippingMethod = ReturnType<
  typeof modelMerchantShippingMethods
>[0];
