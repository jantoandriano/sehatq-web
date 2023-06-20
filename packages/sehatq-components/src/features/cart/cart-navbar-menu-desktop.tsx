import { FocusableElement } from "@chakra-ui/utils";
import { NavigateProps, useAssets } from "@sehatq/utils";
import React from "react";
import {
  Flex,
  CartIcon,
  Link,
  Box,
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverArrow,
  PopoverBody,
  Stack,
  Image,
  Text,
  StackDivider,
  TrashIcon,
  ChevronRightIcon,
  Button,
  AlertDialog,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  LinkOverlay,
  IconButton,
  LinkBox,
} from "../../user-interfaces";
import { InsiderObjectCart } from "../insider-object";

export type CartNavbarMenuProps = {
  cartCounter?: string;
  Navigate: React.FC<NavigateProps>;
  otherProducts?: string;
  isShowConfirmationDelete: boolean;
  showConfirmationDelete: (merchantProductId: number) => void;
  hideConfirmationDelete: () => void;
  confirmDelete: () => void;
  cancelConfirmationDeleteRef: React.MutableRefObject<FocusableElement>;
  products?: {
    id: number;
    name: string;
    price: string;
    qty: string;
    slug: string;
    productImgSrc: string;
    merchantId: string;
  }[];
};
export function CartNavbarMenuDesktop(props: CartNavbarMenuProps) {
  const ASSETS = useAssets(["EMPTY_CART"]);
  const {
    cartCounter,
    Navigate,
    products,
    otherProducts,
    isShowConfirmationDelete,
    showConfirmationDelete,
    cancelConfirmationDeleteRef,
    hideConfirmationDelete,
    confirmDelete,
  } = props;

  return (
    <>
      <InsiderObjectCart />
      <Popover trigger="hover" placement="bottom-end">
        <PopoverTrigger>
          <IconButton
            aria-label="cart"
            variant="fit"
            icon={
              <Box as="span" position="relative">
                <CartIcon w="30px" h="30px" />
                {cartCounter ? (
                  <Flex
                    as="span"
                    position="absolute"
                    bg="cherry.500"
                    h="18px"
                    w="18px"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="50%"
                    fontWeight="semibold"
                    fontSize="xxs"
                    right="-4px"
                    top="0px"
                    color="white"
                  >
                    {cartCounter}
                  </Flex>
                ) : null}
              </Box>
            }
          />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverBody p="0">
            {products ? (
              <Stack spacing="4" p="5">
                <Stack
                  spacing="4"
                  divider={<StackDivider borderColor="veryLightPink" />}
                >
                  {products.map((product) => {
                    return (
                      <LinkBox key={product.id}>
                        <Stack direction="row" alignItems="center">
                          <Stack
                            direction="row"
                            alignItems="center"
                            width="100%"
                          >
                            <Image
                              alt={product.name}
                              src={product.productImgSrc}
                              w="50px"
                              h="50px"
                              objectFit="contain"
                            />
                            <Box>
                              <Navigate
                                name="EXTERNAL_PRODUCT"
                                query={{
                                  slug: product.slug,
                                  isFromMerchant: "true",
                                  mId: product.merchantId,
                                }}
                              >
                                <LinkOverlay fontSize="xs">
                                  {product.name}
                                </LinkOverlay>
                              </Navigate>
                              <Text fontSize="xxs" color="charcoalGrey">
                                {product.qty}
                              </Text>
                              <Text fontSize="xs" color="cherry.500">
                                {product.price}
                              </Text>
                            </Box>
                          </Stack>
                          <IconButton
                            minW="unset"
                            h="unset"
                            variant="unstyled"
                            icon={<TrashIcon />}
                            aria-label="trashIcon"
                            alignSelf="end"
                            onClick={() => showConfirmationDelete(product.id)}
                          />
                        </Stack>
                      </LinkBox>
                    );
                  })}
                </Stack>
                {otherProducts ? (
                  <Navigate name="EXTERNAL_CART">
                    <Link
                      display="flex"
                      direction="row"
                      alignItems="center"
                      color="black"
                      justifyContent="start"
                    >
                      <Text fontSize="xs" mr="2">
                        {otherProducts}
                      </Text>
                      <ChevronRightIcon
                        background="main.500"
                        color="white"
                        borderRadius="50%"
                        w="12px"
                        h="12px"
                      />
                    </Link>
                  </Navigate>
                ) : null}
                {!products.length && products ? (
                  <Stack alignItems="center" spacing="4">
                    <Image src={ASSETS.EMPTY_CART} alt="empty-cart" w="50%" />
                    <Text fontSize="sm" textAlign="center">
                      Oops! Keranjang belanja anda masih kosong
                    </Text>
                  </Stack>
                ) : null}
                <Navigate name="EXTERNAL_CART">
                  <Link colorScheme="main" variant="solid">
                    Beli
                  </Link>
                </Navigate>
              </Stack>
            ) : null}
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <AlertDialog
        isOpen={isShowConfirmationDelete}
        leastDestructiveRef={cancelConfirmationDeleteRef}
        onClose={hideConfirmationDelete}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader textAlign="center" fontSize="lg">
              Apakah Anda yakin ingin menghapus barang ini dari keranjang?
            </AlertDialogHeader>
            <AlertDialogFooter justifyContent="center">
              <Button variant="outline" onClick={confirmDelete}>
                Hapus
              </Button>
              <Button
                colorScheme="main"
                ml={3}
                onClick={hideConfirmationDelete}
              >
                Batal
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
