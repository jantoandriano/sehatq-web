import { useQuery, UseQueryOptions } from "react-query";
// import { ENV } from "@sehatq/constants";
import { cleanQuery, createBrowserFetch, FetchError } from "@sehatq/utils";
import { FetcherArgs } from "@sehatq/components/src/types";

export type PrescriptionRequestCart = {
  meta: {
    cartId: string;
    isPrescription: boolean;
    domain: string;
    totalItems: number;
    voucherCode: string;
    voucherValue: number;
    voucherType: string;
    paymentMethodId: any;
    paymentMethodType: string;
    paymentMethodName: string;
    installmentPeriod: number;
    binCode: string;
    latestAdsTrackingId: any;
    adsTrackingSource: any;
    invoice: {
      minPayment: number;
      total: number;
      totalWithoutAdminFee: number;
      totalProduct: number;
      shipping: number;
      totalShippingInsurance: number;
      totalProductInsurance: number;
      adminFee: number;
      voucherDiscount: number;
      totalDonation: number;
    };
    shippingAddress: {
      addressId: number;
      label: string;
      receiver: string;
      address: string;
      phone: string;
      latitude: number;
      longitude: number;
      province: string;
      city: string;
      district: string;
      subdistrict: string;
      zipCode: string;
      note: string;
      googlePlaceId: string;
    };
    selectedAll: boolean;
    donations: any;
    prescription: {
      domain: string;
      recommendationId: string;
      recommendationExpiry: string;
      doctorName: string;
      registrationNumber: string;
      patientName: string;
      birthdate: any;
      gender: string;
      address: string;
      createdAt: string;
    };
  };
  data: Array<{
    id: number;
    slug: string;
    name: string;
    imageUrl: string;
    imageUrlOriginal: string;
    official: number;
    location: string;
    weightTotal: number;
    voucherType: string;
    voucherValue: number;
    disable: boolean;
    message: string;
    selected: boolean;
    shippingMethod?: {
      id: number;
      name: string;
      price: number;
      group: {
        id: number;
        name: string;
      };
      insurance: {
        availability: boolean;
        notes: any;
        useShippingInsurance: boolean;
        totalShippingInsurance: number;
      };
    };
    products: Array<{
      id: number;
      cartProductId: string;
      name: string;
      slug: string;
      brand: string;
      thumbUrl: string;
      thumbUrlOriginal: string;
      weight: number;
      category: Array<string>;
      categoryNames: string;
      domain: string;
      adsTrackingId: any;
      adsTrackingSource: any;
      dosage: any;
      howToUse: any;
      productMerchant: {
        id: number;
        qty: number;
        stock: number;
        price: number;
        sellingPrice: number;
        discount: number;
        tax: number;
        voucherValue: number;
        disable: boolean;
        message: string;
        selected: boolean;
        substitutionAvailable: boolean;
      };
      productInsurance: {
        name: string;
        availability: boolean;
        selected: boolean;
        note: string;
        insuranceFee: number;
        productInsuranceId: any;
        qty: number;
        maxQty: number;
      };
    }>;
  }>;
  unavailable: Array<any>;
};

type PrescriptionRequestCartQuery = {
  token: string;
};

export const prescriptionRequestCartKeys = {
  all: ["PRESCRIPTION_REQUEST_CART"],
  details: () => [...prescriptionRequestCartKeys.all, "DETAILS"],
  detail: (query: PrescriptionRequestCartQuery) => [
    ...prescriptionRequestCartKeys.details(),
    cleanQuery(query),
  ],
};

export async function getPrescriptionRequestCart({
  fetch,
  query,
}: FetcherArgs<PrescriptionRequestCartQuery>) {
  // const url = `${ENV.API}/tcore/integrations/prescription-requests/cart?token=${query.token}`;
  const url = `https://private-anon-0ad17b09e0-tokoqapi.apiary-mock.com/v1/tcore/integrations/prescription-requests/cart?token=${query.token}`;
  return await fetch.get<PrescriptionRequestCart>(url);
}

export type PrescriptionRequestCartCache = Awaited<
  ReturnType<typeof getPrescriptionRequestCart>
>;

export function usePrescriptionRequestCart<
  TData = PrescriptionRequestCartCache
>(
  query: PrescriptionRequestCartQuery,
  options?: UseQueryOptions<PrescriptionRequestCartCache, FetchError, TData>
) {
  return useQuery<PrescriptionRequestCartCache, FetchError, TData>(
    prescriptionRequestCartKeys.detail(query),
    async () => {
      const fetch = createBrowserFetch();
      return getPrescriptionRequestCart({ fetch, query });
    },
    options
  );
}
