import { generatePriceDisplay } from "@sehatq/utils";

export interface CartResponse {
  meta: {
    adsTrackingSource?: string;
    binCode: string;
    cartId: string;
    domain: string;
    donations?: string;
    installmentPeriod: number;
    invoice: {
      adminFee: number;
      minPayment: number;
      shipping: number;
      total: number;
      totalDonation: number;
      totalProduct: number;
      totalProductInsurance: number;
      totalShippingInsurance: number;
      totalWithoutAdminFee: number;
      voucherDiscount: number;
      shippingAddress: {
        address: string;
        addressId: number;
        city: string;
        district: string;
        googlePlaceId: string;
        label: string;
        latitude: number;
        longitude: number;
        note: string;
        phone: string;
        province: string;
        receiver: string;
        subdistrict: string;
        zipCode: string;
      };
      totalItems: number;
      voucherCode: string;
      voucherType: string;
      voucherValue: number;
    };
    isPrescription: boolean;
    latestAdsTrackingId?: string;
    paymentMethodId: number;
    paymentMethodName: string;
    paymentMethodType: string;
    prescription?: string;
    selectedAll: boolean;
  };
  data: {
    disable: boolean;
    id: number;
    imageUrl: string;
    imageUrlOriginal: string;
    location: string;
    message: string;
    name: string;
    official: number;
    products: {
      adsTrackingId?: string;
      adsTrackingSource?: string;
      brand: string;
      cartProductId: string;
      category: string[];
      categoryNames: string;
      domain: string;
      dosage?: string;
      howToUse?: string;
      id: number;
      name: string;
      productInsurance: {
        availability: boolean;
        insuranceFee: number;
        maxQty: number;
        name: string;
        note: string;
        productInsuranceId: number;
        qty: number;
        selected: boolean;
      };
      productMerchant: {
        disable: boolean;
        discount: number;
        id: number;
        message: string;
        price: number;
        qty: number;
        selected: boolean;
        sellingPrice: number;
        stock: number;
        substitutionAvailable: boolean;
        tax: number;
        voucherValue: number;
      };
      slug: string;
      thumbUrl: string;
      thumbUrlOriginal: string;
      weight: number;
      merchant: {
        id: number;
      };
      priceDisplay: string;
    }[];
    selected: boolean;
    shippingMethod: null;
    slug: string;
    voucherType: string;
    voucherValue: number;
    weightTotal: number;
  }[];
  unavailable: [];
}

export function modelCart(data: CartResponse["data"]) {
  return {
    merchants: data,
    products: data?.reduce((prev, current) => {
      const products = current.products.map((product) => {
        return {
          ...product,
          priceDisplay: generatePriceDisplay(
            product.productMerchant.sellingPrice
          ),
          merchant: {
            id: current.id,
          },
        };
      });
      prev.push(...products);

      return prev;
    }, [] as CartResponse["data"][number]["products"]),
  };
}
