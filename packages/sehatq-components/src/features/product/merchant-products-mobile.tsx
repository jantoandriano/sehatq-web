/** npm packages */
import React, { MouseEventHandler } from "react";
import { MerchantShippingInfo } from "../merchant-shipping/merchant-shipping-info";
import { Box } from "../../user-interfaces";
import {
  MerchantProductCard,
  MerchantProductCardSkeleton,
} from "./merchant-product-card";

import { ProductType } from "./product-model";
import { PRODUCT_TYPES } from "./product-constants";
import { MerchantProduct } from "./merchant-product-model";

export interface MerchantProductsMobileProps {
  isLoading: boolean;
  productType: ProductType;
  merchantProducts: MerchantProduct[];
  refInView: (node?: Element | null) => void;
  atomMerchantProduct: MerchantProduct | null;
  isOpenShippingInfo: boolean;
  onOpenShippingInfo: (
    merchantProduct: MerchantProduct,
    clickAllowed?: (() => boolean) | undefined
  ) => MouseEventHandler;
  onCloseShippingInfo: () => void;
  hasAnotherMerchantProducts: boolean;
  stateMerchantProductForShippingInfo: MerchantProduct | null;
  updateSelectedMerchantProduct: (newMerchantProduct: MerchantProduct) => void;
}

export function MerchantProductsMobile({
  productType,
  refInView,
  merchantProducts,
  atomMerchantProduct,
  updateSelectedMerchantProduct,
  isOpenShippingInfo,
  onOpenShippingInfo,
  onCloseShippingInfo,
  hasAnotherMerchantProducts,
  stateMerchantProductForShippingInfo,
  isLoading,
}: MerchantProductsMobileProps) {
  return (
    <>
      {merchantProducts?.length > 0 ? (
        <>
          {merchantProducts.map((merchantProduct, index) => (
            <Box
              key={merchantProduct.merchantName}
              marginTop={index === 0 ? 0 : 4}
            >
              <MerchantProductCard
                isMobile
                name={merchantProduct.merchantName}
                imageUrl={merchantProduct.merchantLogoUrl}
                imageAlt={merchantProduct.merchantName}
                discountDisplay={merchantProduct.discountDisplay}
                city={merchantProduct.merchantLocation}
                distance={merchantProduct.merchantDistance}
                originalPriceDisplay={
                  merchantProduct.discount
                    ? merchantProduct?.originalPriceDisplay || ""
                    : ""
                }
                sellingPriceDisplay={merchantProduct.sellingPriceDisplay}
                onClick={() => {
                  updateSelectedMerchantProduct(merchantProduct);
                }}
                onShowShippingInfo={
                  productType === PRODUCT_TYPES.GENERAL
                    ? onOpenShippingInfo(merchantProduct)
                    : undefined
                }
                isSelected={atomMerchantProduct?.id === merchantProduct.id}
                isOfficialStore={merchantProduct.isOfficialStore}
              />
            </Box>
          ))}
          {hasAnotherMerchantProducts ? (
            <Box ref={refInView} marginTop={4}>
              <MerchantProductCardSkeleton
                isMobile
                hideShippingInfo={productType !== PRODUCT_TYPES.DIGITAL}
              />
            </Box>
          ) : null}
        </>
      ) : isLoading ? (
        Array.from(Array(3).keys()).map((id, idx) => (
          <Box key={id} marginTop={idx === 0 ? 0 : 3}>
            <MerchantProductCardSkeleton
              isMobile
              hideShippingInfo={productType !== PRODUCT_TYPES.DIGITAL}
            />
          </Box>
        ))
      ) : null}
      <MerchantShippingInfo
        isMobile
        isOpen={isOpenShippingInfo}
        onBack={onCloseShippingInfo}
        onClose={onCloseShippingInfo}
        merchantProductId={stateMerchantProductForShippingInfo?.id}
        merchantLocation={stateMerchantProductForShippingInfo?.merchantLocation}
      />
    </>
  );
}
