import React, { MouseEventHandler } from "react";
import { Box, Flex, Slider } from "../../user-interfaces";
import { MerchantShippingInfo } from "../merchant-shipping/merchant-shipping-info";
import {
  MerchantProductCard,
  MerchantProductCardSkeleton,
} from "./merchant-product-card";
import { ProductType } from "./product-model";
import { PRODUCT_TYPES } from "./product-constants";
import { MerchantProduct } from "./merchant-product-model";

export interface MerchantProductsDesktopProps {
  isLoading: boolean;
  productType: ProductType;
  fetchNextPage: () => void;
  atomMerchantProductSortBy: string | null;
  merchantProducts: MerchantProduct[];
  atomMerchantProduct: MerchantProduct | null;
  isOpenShippingInfo: boolean;
  onOpenShippingInfo: (
    merchantProduct: MerchantProduct,
    clickAllowed: (() => boolean) | undefined
  ) => MouseEventHandler;
  onCloseShippingInfo: () => void;
  hasAnotherMerchantProducts: boolean;
  stateMerchantProductForShippingInfo: MerchantProduct | null;
  updateSelectedMerchantProduct: (newMerchantProduct: MerchantProduct) => void;
}

export function MerchantProductsDesktop(props: MerchantProductsDesktopProps) {
  const {
    productType,
    fetchNextPage,
    merchantProducts,
    atomMerchantProduct,
    updateSelectedMerchantProduct,
    isLoading,
    onOpenShippingInfo,
    onCloseShippingInfo,
    atomMerchantProductSortBy,
    hasAnotherMerchantProducts,
    stateMerchantProductForShippingInfo,
    isOpenShippingInfo,
  } = props;
  return (
    <>
      {merchantProducts?.length > 0 ? (
        <Slider
          key={atomMerchantProductSortBy}
          isLazyLoad
          initialSlideNumber={4}
          slidesToShow={4}
          slideGap={0}
          slides={merchantProducts}
          getKey={(merchantProduct) => merchantProduct.id}
          loadingMoreComponent={
            <MerchantProductCardSkeleton isMobile={false} />
          }
          hasMoreSlideToLoad={hasAnotherMerchantProducts}
          loadMoreSlide={fetchNextPage}
          renderSlide={({ slide: merchantProduct, clickAllowed }) => (
            <Box padding={2} height="100%">
              <MerchantProductCard
                isMobile={false}
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
                {...(productType !== PRODUCT_TYPES.DIGITAL
                  ? {
                      merchantNavigation: {
                        name: "MERCHANT_DETAIL",
                        query: {
                          slug: merchantProduct.merchantSlug,
                        },
                      },
                    }
                  : {})}
                onClick={() => {
                  if (clickAllowed && clickAllowed()) {
                    updateSelectedMerchantProduct(merchantProduct);
                  }
                }}
                onShowShippingInfo={
                  productType === PRODUCT_TYPES.GENERAL
                    ? onOpenShippingInfo(merchantProduct, clickAllowed)
                    : undefined
                }
                isSelected={atomMerchantProduct?.id === merchantProduct.id}
                isOfficialStore={merchantProduct.isOfficialStore}
              />
            </Box>
          )}
        />
      ) : isLoading ? (
        <Flex paddingTop={2} paddingBottom={3} wrap="nowrap">
          {Array.from(Array(4).keys()).map((id, idx) => (
            <Box key={id} flex="1" marginLeft={idx === 0 ? 0 : 4}>
              <MerchantProductCardSkeleton
                isMobile={false}
                hideShippingInfo={productType === PRODUCT_TYPES.DIGITAL}
              />
            </Box>
          ))}
        </Flex>
      ) : null}
      <MerchantShippingInfo
        isOpen={isOpenShippingInfo}
        onBack={onCloseShippingInfo}
        onClose={onCloseShippingInfo}
        merchantProductId={stateMerchantProductForShippingInfo?.id}
        merchantLocation={stateMerchantProductForShippingInfo?.merchantLocation}
      />
    </>
  );
}
