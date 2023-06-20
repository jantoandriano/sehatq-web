import { FocusableElement } from "@chakra-ui/utils";
import { useNavigation } from "@sehatq/utils";
import React, { useRef, useState } from "react";
import { CartNavbarMenuDesktop } from "./cart-navbar-menu-desktop";
import { CartCache, useGetCart, useRemoveCartProduct } from "./cart-queries";

function selectCartCounter({ data }: CartCache) {
  if (data.products.length > 999) return "999+";

  return `${data.products.length || ""}`;
}
function selectProductsFromCart({ data }: CartCache) {
  return data.products.slice(0, 3).map((product) => {
    return {
      id: product.productMerchant.id,
      name: product.name,
      price: product.priceDisplay,
      qty: `${product.productMerchant.qty} barang`,
      slug: product.slug,
      productImgSrc: product.thumbUrlOriginal,
      merchantId: `${product.merchant.id}`,
    };
  });
}
export function CartNavbarMenu() {
  const { Navigate } = useNavigation();
  const { data: cartCounter } = useGetCart({
    select: selectCartCounter,
  });
  const { data: products } = useGetCart({
    select: selectProductsFromCart,
  });
  const removeCartProductMutation = useRemoveCartProduct();
  const [deleteProductId, setDeleteProductId] = useState<number | null>(null);

  const cancelConfirmationDeleteRef = useRef<unknown>();

  function showConfirmationDelete(merchantProductId: number) {
    setDeleteProductId(merchantProductId);
  }

  function hideConfirmationDelete() {
    setDeleteProductId(null);
  }

  function confirmDelete() {
    if (deleteProductId) {
      removeCartProductMutation.mutate({
        merchantProductId: deleteProductId,
      });
      hideConfirmationDelete();
    }
  }

  const otherProps = {
    cartCounter,
    Navigate,
    products,
    isShowConfirmationDelete: !!deleteProductId,
    cancelConfirmationDeleteRef:
      cancelConfirmationDeleteRef as React.MutableRefObject<FocusableElement>,
    otherProducts:
      Number(cartCounter) - 3 > 0
        ? `${Number(cartCounter) - 3} barang lainnya`
        : "",
    showConfirmationDelete,
    hideConfirmationDelete,
    confirmDelete,
  };
  return <CartNavbarMenuDesktop {...otherProps} />;
}
