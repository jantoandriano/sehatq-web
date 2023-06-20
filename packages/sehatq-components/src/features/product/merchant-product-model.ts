import { generatePriceDisplay } from "@sehatq/utils";

export interface MerchantProductsResponse {
  meta: {
    pagination: { page: number; perPage: number; total: number };
    sortBy: {
      id: number;
      name: string;
    }[];
  };
  data: {
    id: number;
    originalPrice: number;
    sellingPrice: number;
    price: number;
    discount: number;
    stock: number;
    official: 1 | 0;
    merchant: {
      id: number;
      name: string;
      slug: string;
      imageUrl: string;
      location: string;
      distance: number;
    };
  }[];
}

export function modelMerchantProducts(data: MerchantProductsResponse["data"]) {
  return data.map((modelMerchantProduct) => ({
    id: modelMerchantProduct.id,
    originalPrice:
      modelMerchantProduct.originalPrice === modelMerchantProduct.sellingPrice
        ? null
        : modelMerchantProduct.originalPrice,
    originalPriceDisplay:
      modelMerchantProduct.originalPrice === modelMerchantProduct.sellingPrice
        ? null
        : generatePriceDisplay(modelMerchantProduct.originalPrice),
    sellingPrice: modelMerchantProduct.price,
    sellingPriceDisplay: generatePriceDisplay(modelMerchantProduct.price),
    discount: modelMerchantProduct.discount,
    discountDisplay: modelMerchantProduct.discount
      ? `${modelMerchantProduct.discount}%`
      : "",
    stock: modelMerchantProduct.stock,
    merchantId: modelMerchantProduct.merchant.id,
    merchantName: modelMerchantProduct.merchant.name,
    merchantSlug: modelMerchantProduct.merchant.slug,
    merchantLogoUrl: modelMerchantProduct.merchant.imageUrl,
    merchantLocation: modelMerchantProduct.merchant.location,
    merchantDistance: modelMerchantProduct.merchant.distance,
    isOfficialStore: Boolean(modelMerchantProduct.official),
  }));
}

export type MerchantProduct = ReturnType<typeof modelMerchantProducts>[0];
