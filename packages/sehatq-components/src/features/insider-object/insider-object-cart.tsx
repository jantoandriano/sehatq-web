import { ENV } from "@sehatq/constants";
import { pushInsiderObject, NOT_AVAILABLE } from "@sehatq/utils";
import { useEffect } from "react";
import { CartCache, useGetCart } from "../cart/cart-queries";

function selectCart({ data, meta }: CartCache) {
  const { products } = data;
  const { invoice } = meta;

  return {
    line_items: products.map((product) => {
      return {
        currency: "IDR",
        custom: {
          url: `${ENV.TOKOQ_DOMAIN}/produk/${product.slug}`,
          name: product.name,
          stock: product.productMerchant.stock,
          taxonomy: NOT_AVAILABLE,
          product_image_url: product.thumbUrl,
          id: product.productMerchant.id,
          unit_price: product.productMerchant.price,
          unit_sale_price: product.productMerchant.sellingPrice,
          quantity: product.productMerchant.qty,
          label: "Toko",
          brand: product.brand,
          listing: product.category,
          variant: NOT_AVAILABLE,
          order: NOT_AVAILABLE,
        },
      };
    }),
    quantity: invoice.totalItems,
    subtotal: invoice.totalWithoutAdminFee,
    total: invoice.total,
  };
}
export function InsiderObjectCart() {
  const { data: cart } = useGetCart({ select: selectCart });
  useEffect(() => {
    if (cart) {
      pushInsiderObject({
        basket: {
          currency: "IDR",
          ...cart,
        },
      });
    }
  }, [cart]);

  return null;
}
