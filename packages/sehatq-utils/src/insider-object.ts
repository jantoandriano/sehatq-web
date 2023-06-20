import { InsiderObjectPageTypes } from "@sehatq/constants";
interface InsiderObject {
  page?: {
    type: InsiderObjectPageTypes;
  };
  user?: {
    birthday: string;
    email: string;
    email_optin: boolean;
    gdpr_optin: boolean;
    gender: string;
    phone_number: string;
    transaction_count: string;
    uuid: number;
    whatsapp_optin: boolean;
    username: string;
    custom: {
      login_method: string;
    };
  };
  basket?: {
    currency: "IDR";
    line_items: {
      currency: string;
      custom: {
        brand: string;
        label: string;
        listing: string[];
        order: string;
        quantity: number;
        variant: string;
        id: number;
        name: string;
        product_image_url: string;
        stock: number;
        taxonomy: string;
        unit_price: number;
        unit_sale_price: number;
        url: string;
      };
    }[];
    quantity: number;
    subtotal: number;
    total: number;
  };
  product?: {
    id: number;
    name: string;
    taxonomy: string[];
    currency: string;
    unit_price: string;
    unit_sale_price: string;
    url: string;
    custom?: {
      article_category: string;
      article_tags: string[];
    };
  };
}
declare global {
  interface Window {
    insider_object: InsiderObject;
  }
}

export const NOT_AVAILABLE = "Not available";

export function pushInsiderObject(obj: InsiderObject) {
  if (typeof window !== "undefined") {
    const oldInsider = window.insider_object;
    const newInsider = () => obj;

    if (oldInsider) {
      window.insider_object = {
        ...oldInsider,
        ...newInsider(),
      };
    } else {
      window.insider_object = {
        ...newInsider(),
      };
    }
  }
}
