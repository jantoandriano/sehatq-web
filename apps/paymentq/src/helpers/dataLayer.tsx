import { PaymentCheckoutVerifyResponse } from "@components/features/payment/payment-model";
import { PAYMENT_DOMAIN } from "src/constants";
import { concatString, setDataLayerObject } from "src/utils";

type ecommerceDataRenderCheckOut = {
  name: string;
  id: string;
  price: number;
  brand: string;
  category: string;
  variant: string;
  dimension14: string;
  quantity: number;
  coupon: string;
};

export const pushDataLayerRenderCheckOutPayment = (
  data: PaymentCheckoutVerifyResponse,
  step: number
) => {
  const attr = {
    eventCategory: "Ecommerce",
    eventAction: `Checkout Step ${step}`,
    eventLabel: "Toko",
    userId: data?.data.orderLog.user.userId,
    channel: data?.data.orderLog.domain,
    event: "checkout",
  };
  const productsData: ecommerceDataRenderCheckOut[] = [];
  data?.data.orderLog.items.map((item) => {
    item.products.map((itm) => {
      const catName: string[] = [];
      itm.category.map((i) => {
        catName.push(i.name);
      });
      productsData.push({
        name: itm.productName,
        id: itm.productSku,
        price: itm.sellingPrice,
        brand: itm.brand,
        category: catName.length > 0 ? catName.join("/") : "",
        variant: "",
        dimension14:
          attr.channel === PAYMENT_DOMAIN.TELEMED
            ? ""
            : concatString(
                [item.shippingMethod.name, item.shippingMethod.group.name],
                " "
              ),
        quantity: itm.qty,
        coupon: "Not Available",
      });
    });
  });
  const dataCommerce = {
    checkout: {
      actionField: {
        step: step,
        action: "checkout",
      },
      products: productsData,
    },
  };
  setDataLayerObject(true, attr, dataCommerce);
};
