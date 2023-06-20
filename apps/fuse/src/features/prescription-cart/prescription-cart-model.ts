import { generatePriceDisplay } from "@sehatq/utils";

export interface PrescriptionCartResponse {
  data: Data[];
  meta: Meta;
  unavailable: [];
}

export type Data = {
  disable: boolean;
  id: number;
  imageUrl: string;
  imageUrlOriginal: string;
  location: string;
  message: string;
  name: string;
  official: number;
  products: Product[];
  selected: boolean;
  shippingMethod: ShippingMethod | null;
  slug: string;
  voucherType: string;
  voucherValue: number;
  weightTotal: number;
};

export type Product = {
  adsTrackingId: null;
  adsTrackingSource: null;
  brand: string;
  cartProductId: string;
  category: string[];
  categoryNames: string;
  domain: string;
  dosage: null;
  howToUse: null;
  id: number;
  name: string;
  productInsurance: ProductInsurance;
  productMerchant: ProductMerchant;
  slug: string;
  thumbUrl: string;
  thumbUrlOriginal: string;
  weight: number;
};

export type ProductInsurance = {
  availability: boolean;
  insuranceFee: number;
  maxQty: number;
  name: string;
  note: string;
  productInsuranceId: null;
  qty: number;
  selected: boolean;
};

export type ProductMerchant = {
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

export type ShippingMethod = {
  group: Group;
  id: number;
  insurance: Insurance;
  name: string;
  price: number;
} | null;

export type Group = {
  id: number;
  name: string;
};

export type Insurance = {
  availability: boolean;
  disable: boolean;
  notes: null;
  totalShippingInsurance: number;
  useShippingInsurance: boolean;
};

export type Meta = {
  adsTrackingSource: null;
  binCode: string;
  cartId: string;
  domain: string;
  donations: null;
  installmentPeriod: number;
  invoice: Invoice;
  isPrescription: boolean;
  latestAdsTrackingId: null;
  paymentMethodId: null;
  paymentMethodName: string;
  paymentMethodType: string;
  prescription: Prescription;
  selectedAll: boolean;
  shippingAddress: ShippingAddress;
  totalItems: number;
  voucherCode: string;
  voucherType: string;
  voucherValue: number;
};

export type Invoice = {
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
};

export type Prescription = {
  address: string;
  birthdate: null;
  createdAt: string;
  doctorName: string;
  domain: string;
  gender: string;
  patientName: string;
  recommendationExpiry: string;
  recommendationId: string;
  registrationNumber: string;
};

export type ShippingAddress = {
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

export function modelPrescriptionCart(response: PrescriptionCartResponse) {
  return {
    meta: {
      ...response.meta,
      invoice: {
        adminFee: generatePriceDisplay(response.meta.invoice.adminFee),
        minPayment: generatePriceDisplay(response.meta.invoice.minPayment),
        shipping: generatePriceDisplay(response.meta.invoice.shipping),
        total: generatePriceDisplay(response.meta.invoice.total),
        totalDonation: generatePriceDisplay(
          response.meta.invoice.totalDonation
        ),
        totalProduct: generatePriceDisplay(response.meta.invoice.totalProduct),
        totalProductInsurance: generatePriceDisplay(
          response.meta.invoice.totalProductInsurance
        ),
        totalShippingInsurance: generatePriceDisplay(
          response.meta.invoice.totalShippingInsurance
        ),
        totalWithoutAdminFee: generatePriceDisplay(
          response.meta.invoice.totalWithoutAdminFee
        ),
        voucherDiscount: generatePriceDisplay(
          response.meta.invoice.voucherDiscount
        ),
      },
    },
    data: response.data.map((elm) => ({
      id: elm.id,
      isDisabled: elm.disable,
      isOfficial: Boolean(elm.official),
      isSelected: elm.selected,
      imageUrl: elm.imageUrl,
      imageOriginal: elm.imageUrlOriginal,
      location: elm.location,
      message: elm.message,
      name: elm.name,
      products: elm.products.map((product) => ({
        ...product,
        productInsurance: {
          ...product.productInsurance,
          insuranceFee: generatePriceDisplay(
            product.productInsurance.insuranceFee
          ),
        },
        productMerchant: {
          id: product.productMerchant.id,
          isDisabled: product.productMerchant.disable,
          isSelected: product.productMerchant.selected,
          isSubstitutionAvailable:
            product.productMerchant.substitutionAvailable,
          discount: generatePriceDisplay(product.productMerchant.discount),
          message: product.productMerchant.message,
          price: generatePriceDisplay(product.productMerchant.price),
          qty: product.productMerchant.qty,
          sellingPrice: generatePriceDisplay(
            product.productMerchant.sellingPrice
          ),
          stock: product.productMerchant.stock,
          tax: generatePriceDisplay(product.productMerchant.tax),
          voucherValue: generatePriceDisplay(
            product.productMerchant.voucherValue
          ),
        },
      })),
      shippingMethod: elm.shippingMethod,
      slug: elm.slug,
      voucherType: elm.voucherType,
      voucherValue: generatePriceDisplay(elm.voucherValue),
      weightTotal: elm.weightTotal,
    })),
  };
}

export type PrescriptionCart = ReturnType<typeof modelPrescriptionCart>;
