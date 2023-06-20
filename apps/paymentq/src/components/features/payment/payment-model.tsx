import { customFormat } from "src/utils";
import { PAYMENT_DOMAIN, PAYMENT_PRODUCT_TYPES } from "@constants";
import { type StateSelectPaymentType } from "./payment";

export interface PaymentMethodListResponse {
  code: number;
  meta: {
    pagination: {
      page: number;
      perPage: number;
      maxPage: number;
      total: number;
    };
    message: string;
  };
  data: {
    name: string;
    slug: string;
    position: string;
    options: {
      id: number;
      name: string;
      slugProvider: string;
      imageUrl: string;
      description: string;
      type: string;
      status: string;
      adminFee: number;
      adminFeeUnit: string;
      productType: string;
      domain: string;
      minPayment: number;
      maxPayment: number;
      disable: boolean;
      disabledReason: string;
      insuranceInputRequired: boolean;
    }[];
  }[];
}

export interface PaymentCheckoutVerifyResponse {
  code: number;
  meta: { message: string };
  data: {
    id: string;
    coNumber: string;
    paymentLink: string;
    selectPayment: boolean;
    status: string;
    orderLog: {
      productType: string;
      domain: string;
      channel: string;
      voucherCode: string;
      voucherValue: number;
      voucherType: string;
      totalItems: number;
      totalAdminFee: number;
      totalDeliveryFee: number;
      totalShippingInsurance: number;
      totalProductInsurance: number;
      totalActualAmount: number;
      totalSellingAmount: number;
      totalStoreAmount: number;
      totalDiscountAmount: number;
      totalTaxAmount: number;
      totalDonation: number;
      grandTotal: number;
      referenceId: string;
      referenceType: string;
      notes: string;
      user: {
        userId: number;
        uuid: string;
        name: string;
        phone: string;
        email: string;
        gender: string;
        dob: string;
      };
      userLogin: {
        uuid: string;
        name: string;
        email: string;
        userId: number;
      };
      items: {
        merchantName: string;
        products: {
          consultationDetail: {
            chatScheduleDate: string;
            chatScheduleTime: string;
            city: string;
            clinicName: string;
            district: string;
            practicePlace: string;
          };
          category: {
            level: number;
            name: string;
          }[];
          productName: string;
          productSku: string;
          description: string;
          brand: string;
          qty: number;
          productURL: string;
          productImageURL: string;
          sellingPrice: number;
          productId: number;
        }[];
        shippingMethod: {
          discountAmount: number;
          group: {
            id: number;
            name: string;
          };
          id: number;
          insurance: {
            note: string;
            totalShippingInsurance: number;
          };
          name: string;
          price: number;
        };
      }[];
      shippingAddress: {
        address: string;
        city: string;
        district: string;
        id: number;
        label: string;
        latitude: number;
        longitude: number;
        note: string;
        phone: string;
        province: string;
        receiver: string;
      };
      donation: { name: string; value: number };
      callbackURL: string;
      backURL: string;
      paymentCheckoutExpired: string;
    };
    serverTime: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface ResponsePurchase {
  code: number;
  meta: { message: string };
  data: {
    status: string;
    detail: {
      id: number;
      coNumber: string;
      grandTotal: number;
      paymentType: string;
      paymentMethod: { id: number; name: string };
      vaNumber: string;
      currency: string;
      expiredAt: string;
      createdAt: string;
      updatedAt: string;
      createdBy: string;
      updatedBy: string;
      redirectUrl?: string;
    }[];
  };
}

export interface PaymentCheckLimitBody {
  coNumber: string;
  planManagerCode: string;
  userServiceUserId?: number;
}

export interface ResponsePaymentCheckLimit {
  code: number;
  meta: { message: string };
  data: {
    member: {
      covered: number;
      remainingLimit: number;
      excess: number;
      excessWithAdminFee: number;
    };
    doctor: {
      doctorName: string;
      specialization: string;
    };
    products?: {
      name: string;
      categoryCode: string;
      isCovered: boolean;
    }[];
    isAllCovered: boolean;
    tncUrl: string;
  };
}

export function modelPaymentMethodList(data: PaymentMethodListResponse) {
  return data;
}

export function modelPaymentCheckoutVerify(
  data: PaymentCheckoutVerifyResponse
) {
  return data;
}

export type LastTransactionResponse = {
  code: number;
  meta: {
    message: string;
  };
  data: {
    id: number;
    coNumber: string;
    accountNumber: string;
    status: string;
    orderTime: string;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string;
  };
};

export function modelLastTransaction(data: LastTransactionResponse) {
  return data;
}

export const modelNetCoreDataPurchase = (
  orders: PaymentCheckoutVerifyResponse,
  statePaymentSelect: StateSelectPaymentType[],
  grandtotal: number
) => {
  if (
    orders?.data.orderLog.domain === PAYMENT_DOMAIN.TELEMED &&
    orders?.data.orderLog.productType === PAYMENT_PRODUCT_TYPES.DIGITAL
  ) {
    return modelNetcoreTelemedPay(
      orders as PaymentCheckoutVerifyResponse,
      statePaymentSelect,
      grandtotal
    );
  } else {
    return modelNetcoreProductPurchase(
      orders as PaymentCheckoutVerifyResponse,
      statePaymentSelect,
      grandtotal
    );
  }
};

export function modelNetcoreTelemedPay(
  order: PaymentCheckoutVerifyResponse,
  statePayment: StateSelectPaymentType[],
  grandtotal: number
) {
  const { coNumber, orderLog } = order?.data;
  return {
    amount: grandtotal as number,
    chatscheduledate_new: orderLog?.items[0].products[0].consultationDetail
      .chatScheduleDate
      ? customFormat(
          orderLog?.items[0].products[0].consultationDetail.chatScheduleDate,
          "yyyy-mm-dd"
        )
      : "",
    chatscheduletime:
      orderLog?.items[0].products[0].consultationDetail.chatScheduleTime || "",
    city: orderLog?.items[0].products[0].consultationDetail.city || "",
    clinicname:
      orderLog?.items[0].products[0].consultationDetail.clinicName || "",
    district: orderLog?.items[0].products[0].consultationDetail.district || "",
    doctorname: orderLog?.items[0].products[0].productName || "",
    doctorspeciality: orderLog?.items[0].products[0].description || "",
    orderid: "0",
    paymentoption: statePayment[0]?.slug,
    paymentvendor: statePayment[0]?.name,
    practiceplace: "SehatQ",
    status: "pending",
    totalbill: grandtotal as number,
    totalproductprice: (orderLog?.totalSellingAmount as number) || 0,
    uuid: orderLog?.userLogin.uuid || "",
    uuidpatient: orderLog?.user.uuid || "",
    ordernumber: coNumber || "",
    vouchercode: orderLog?.voucherCode || "",
    paymentvendor2: statePayment.length > 1 ? statePayment[1]?.name : "",
    paymentoption2: statePayment.length > 1 ? statePayment[1]?.slug : "",
  };
}

type itemsDataProductPurchaseType = {
  brand: string;
  prqt: number;
  currency: string;
  producturl: string;
  productimageurl: string;
  productprice: number;
  productname: string;
  merchant: string;
  prid: number;
  type: string;
  productcategory1: string;
  productcategory2: string;
  productcategory3: string;
}[];

const modelProductPurchaseItemData = (order: PaymentCheckoutVerifyResponse) => {
  const { orderLog } = order?.data;
  const typeCondition = () => {
    if (orderLog?.domain === "telemed" && orderLog?.productType === "general") {
      return "drug_prescription_telemed";
    } else if (
      orderLog?.domain === "toko" &&
      orderLog?.productType === "general"
    ) {
      if (!orderLog?.referenceId) {
        return "product_otc";
      } else {
        return "drug_prescription_selfupload";
      }
    } else if (
      orderLog?.domain === "toko" &&
      orderLog?.productType === "digital"
    ) {
      return "prepaid_booking_online";
    }
  };

  const itemsData: itemsDataProductPurchaseType = [];
  orderLog?.items.map((item) => {
    item.products.map((itm) => {
      const mappingLabelCategory = (num: number) => {
        if (itm.category) {
          const dataResult = itm.category.filter((i) => i.level === num);
          return dataResult[0]?.name || "";
        } else {
          return "";
        }
      };
      itemsData.push({
        brand: itm.brand || "",
        prqt: itm.qty as number,
        currency: "IDR",
        producturl: itm.productURL || "",
        productimageurl: itm.productImageURL || "",
        productprice: itm.sellingPrice as number,
        productname: itm.productName || "",
        merchant: item.merchantName || "",
        prid: itm.productId as number,
        type: typeCondition() as string,
        productcategory1: mappingLabelCategory(1),
        productcategory2: mappingLabelCategory(2),
        productcategory3: mappingLabelCategory(3),
      });
    });
  });
  return itemsData;
};

export function modelNetcoreProductPurchase(
  order: PaymentCheckoutVerifyResponse,
  statePayment: StateSelectPaymentType[],
  grandtotal: number
) {
  const { coNumber, orderLog } = order?.data;
  return {
    amount: grandtotal as number,
    itemcount: orderLog?.totalItems as number,
    items: modelProductPurchaseItemData(order),
    orderid: "0",
    shippingaddress: orderLog?.shippingAddress.address || "",
    shippingcity: orderLog?.shippingAddress.city || "",
    status: "pending",
    totalbill: grandtotal as number,
    totalproductprice: orderLog?.totalSellingAmount as number,
    vouchercode: orderLog?.voucherCode || "",
    uuid: orderLog?.userLogin.uuid || "",
    uuidpatient: orderLog?.user.uuid || "",
    ordernumber: coNumber || "",
    paymentoption: statePayment[0]?.slug || "",
    paymentvendor: statePayment[0]?.name || "",
    paymentvendor2: statePayment.length > 1 ? statePayment[1]?.name : "",
    paymentoption2: statePayment.length > 1 ? statePayment[1]?.slug : "",
  };
}
