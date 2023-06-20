import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import {
  Box,
  Checkbox,
  Divider,
  Dropdown,
  Flex,
  Image,
  Text,
  Center,
  Spinner,
} from "@sehatq/components";
import {
  MerchantShippingMethod,
  PrescriptionCart,
  ShippingAddress,
  TotalBill,
  useGetPrescriptionCart,
  useUpdateAllPrescriptionCart,
} from "src/features/prescription-cart";
import {
  useUpdateMerchantPrescriptionCart,
  useUpdateProductPrescriptionCart,
} from "src/features/prescription-cart/prescription-cart-queries";
import { useAuth } from "src/contexts/auth";
import { Address } from "../drug-recommendation";

const COOKIE_DOMAIN = ".sehatq.com";

export function Claim() {
  const [stateScreen, setStateScreen] = useState<"cart" | "address">("cart");
  const router = useRouter();
  const { token: paramToken } = router.query;
  const {
    user: { token: cookieToken },
  } = useAuth();
  const query = {
    token: `${paramToken}` ?? "",
  };

  useEffect(() => {
    if (cookieToken && cookieToken !== paramToken) {
      Cookies.remove("token", { path: "/" });
    }
    if (paramToken) {
      Cookies.set("token", paramToken, {
        path: "/",
        domain: COOKIE_DOMAIN,
        expires: 1,
      });
    }
  }, [cookieToken, paramToken]);

  const {
    data: { data: dataPrescriptionCart = [], meta: metaPrescriptionCart } = {},
    isLoading: isLoadingPrescriptionCart,
    refetch: refetchPrescriptionCart,
  } = useGetPrescriptionCart(query, { enabled: !!paramToken });
  const {
    mutate: updateAllPrescription,
    isLoading: isUpdatingAllPrescription,
  } = useUpdateAllPrescriptionCart();
  const {
    mutate: updateMerchantPrescriptionCart,
    isLoading: isUpdatingMerchantPrescription,
  } = useUpdateMerchantPrescriptionCart();
  const {
    mutate: updateProductPrescriptionCart,
    isLoading: isUpdatingProductPrescipriptiont,
  } = useUpdateProductPrescriptionCart();

  const isLoading =
    isUpdatingAllPrescription ||
    isUpdatingMerchantPrescription ||
    isUpdatingProductPrescipriptiont;

  function handleChangeCart({
    type,
    selected,
    merchantIds,
    productMerchantId,
    qty,
  }: {
    type: "all" | "merchant" | "product";
    selected: boolean;
    merchantIds?: number;
    productMerchantId?: number;
    qty?: number;
  }) {
    const payload = {
      cartId: metaPrescriptionCart?.cartId || "",
      selected: !metaPrescriptionCart?.selectedAll || false,
    };
    const onSuccess = () => refetchPrescriptionCart();
    if (type === "merchant" && merchantIds) {
      updateMerchantPrescriptionCart(
        {
          ...payload,
          selected,
          merchantIds,
        },
        { onSuccess }
      );
    } else if (type === "product" && productMerchantId && qty) {
      updateProductPrescriptionCart(
        {
          ...payload,
          selected,
          productMerchantId,
          qty,
        },
        { onSuccess }
      );
    } else {
      updateAllPrescription(
        { ...payload, selected },
        {
          onSuccess,
        }
      );
    }
  }

  function isMerchantShippingDisabled(
    products: PrescriptionCart["data"][0]["products"]
  ): boolean {
    const countSelectedProduct = products.filter(
      (product) => product.productMerchant.isSelected
    ).length;

    return !countSelectedProduct;
  }

  const MerchantList = ({
    merchant,
  }: {
    merchant: typeof dataPrescriptionCart[0];
  }) => (
    <Box key={merchant.id}>
      <Flex alignItems="center">
        <Checkbox
          isChecked={merchant.isSelected}
          onChange={() =>
            handleChangeCart({
              type: "merchant",
              merchantIds: merchant.id,
              selected: !merchant.isSelected,
            })
          }
          colorScheme="main"
          borderRadius="3px"
          borderColor="veryLightPink"
        >
          <Text fontFamily="poppins" fontWeight="semibold" fontSize="xs">
            {merchant.name}
          </Text>
        </Checkbox>
        <Box ml={2} mb="-4px" display="inline">
          <Image
            src="/images/official-merchant-logo.svg"
            width={3}
            height={3}
            alt="merchant"
          />
        </Box>
      </Flex>
      <Divider my={4} borderColor="veryLightPink" border="solid 0.5px" />
      {merchant.products.map((product, productIndex) => (
        <Box key={product.id} mt={3}>
          <Box opacity={product.productMerchant.isDisabled ? "0.5" : "1"}>
            <Flex>
              <Checkbox
                isChecked={
                  product.productMerchant.isSelected &&
                  !product.productMerchant.isDisabled
                }
                isDisabled={product.productMerchant.isDisabled}
                onChange={() =>
                  handleChangeCart({
                    type: "product",
                    productMerchantId: product.productMerchant.id,
                    selected: !product.productMerchant.isSelected,
                    qty: product.productMerchant.qty,
                  })
                }
                maxHeight="18px"
                colorScheme="main"
                borderRadius="3px"
                borderColor="veryLightPink"
                mr="14px"
              />
              <Image
                alt="product"
                src={product.thumbUrl}
                width={12}
                height={12}
              />
              <Box display="inline-block" verticalAlign="top" ml={3}>
                <Text fontSize="sm" fontFamily="poppins" fontWeight="medium">
                  {product.name}
                </Text>
                <Text color="sea.500" fontWeight="bold" fontSize="sm">
                  {product.productMerchant.price}
                </Text>
              </Box>
            </Flex>
            <Flex justifyContent="flex-end">
              <Dropdown
                isMobile
                value={`${product.productMerchant.qty}`}
                onChange={(value) =>
                  handleChangeCart({
                    type: "product",
                    productMerchantId: product.productMerchant.id,
                    selected: product.productMerchant.isSelected,
                    qty: +value,
                  })
                }
                options={[...new Array(product.productMerchant.stock)].map(
                  (_, i) => ({ value: `${i + 1}`, label: `${i + 1}` })
                )}
                inputProps={{
                  rounded: "none",
                  width: "10%",
                  border: "none",
                  borderBottom: "solid .5px",
                  borderBottomColor: "veryLightPink",
                  isDisabled:
                    product.productMerchant.stock < 1 ||
                    !product.productMerchant.isSelected,
                }}
              />
            </Flex>
          </Box>

          {product.productMerchant.isDisabled &&
            product.productMerchant.message && (
              <Box mx={4} mt={1}>
                <Text fontSize="xxs" color="cherry.500" fontWeight="semibold">
                  {product.productMerchant.message}
                </Text>
              </Box>
            )}

          {productIndex !== merchant.products.length - 1 && (
            <Divider my={4} borderColor="veryLightPink" border="solid 0.5px" />
          )}
        </Box>
      ))}
      <Box my={5} mx={4}>
        <MerchantShippingMethod
          isDisabled={isMerchantShippingDisabled(merchant.products)}
          cartId={metaPrescriptionCart?.cartId || ""}
          merchantId={merchant.id}
          shippingMethod={merchant.shippingMethod}
        />
      </Box>
    </Box>
  );

  if (stateScreen === "cart") {
    return (
      <Box>
        <Flex
          position="fixed"
          zIndex={1}
          top={0}
          width="full"
          height="53px"
          alignItems="center"
          background="#fff"
          px={4}
        >
          <Text fontSize="sm" fontFamily="poppins" fontWeight="semibold">
            Klaim Obat
          </Text>
        </Flex>
        {isLoadingPrescriptionCart && (
          <Center height="100vh">
            <Spinner />
          </Center>
        )}
        {!!dataPrescriptionCart.length && !!metaPrescriptionCart && (
          <Box mt="53px">
            <ShippingAddress
              id={metaPrescriptionCart.shippingAddress.addressId}
              address={metaPrescriptionCart.shippingAddress.address}
              googlePlaceId={metaPrescriptionCart.shippingAddress.googlePlaceId}
              label={metaPrescriptionCart.shippingAddress.label}
              phone={metaPrescriptionCart.shippingAddress.phone}
              receiver={metaPrescriptionCart.shippingAddress.receiver}
              handleChangeScreen={() => setStateScreen("address")}
            />
            <Box px={3}>
              <Box
                mt={4}
                p={3}
                background="paleBlue.500"
                border="0.5px solid"
                borderColor="sea.500"
                borderRadius="4px"
                fontFamily="openSans"
                fontSize="xs"
              >
                <Text>Dengan melanjutkan, saya telah menyetujui</Text>
                <Text fontWeight="bold" color="sea.500">
                  Syarat dan Ketentuan SehatQ
                </Text>
              </Box>
            </Box>
            <Box px={3}>
              <Flex mt="24px" alignItems="center">
                <Checkbox
                  isDisabled={isUpdatingAllPrescription}
                  isChecked={metaPrescriptionCart?.selectedAll}
                  onChange={() =>
                    handleChangeCart({
                      type: "all",
                      selected: !metaPrescriptionCart.selectedAll,
                    })
                  }
                  colorScheme="main"
                  borderRadius="3px"
                  borderColor="veryLightPink"
                  mr="14px"
                >
                  <Text fontSize="xs" fontWeight="semibold">
                    Pilih Semua Produk
                  </Text>
                </Checkbox>
              </Flex>
            </Box>
            <Box background="#F2F2F2" height="8px" my={3} />
            <Box pb={20}>
              {!!dataPrescriptionCart.length &&
                dataPrescriptionCart.map((elm, idx) => (
                  <Box key={elm.id}>
                    <Box px={3}>
                      <MerchantList merchant={elm} />
                    </Box>
                    {idx !== dataPrescriptionCart.length - 1 && (
                      <Box background="#F2F2F2" height="8px" my={3} />
                    )}
                  </Box>
                ))}
            </Box>
            <TotalBill
              cartId={metaPrescriptionCart.cartId}
              isLoading={isLoading}
              total={metaPrescriptionCart.invoice.total}
            />
          </Box>
        )}
      </Box>
    );
  }

  return (
    <Address
      referrer="claim"
      backToCart={() => setStateScreen("cart")}
      googlePlaceId={metaPrescriptionCart?.shippingAddress.googlePlaceId || ""}
    />
  );
}
