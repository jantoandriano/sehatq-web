import React from "react";
import {
  ArrowBackIcon,
  Badge,
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  IconButton,
  SehatqWarningIcon,
  Skeleton,
  SkeletonText,
  Text,
  VStack,
} from "../../user-interfaces";
import { AddressList } from "./address-list";
import { ShippingAddressForm } from "./shipping-address-form";
import { ShippingAddressInputGeneralProps } from "./shipping-address-input-desktop";

export function ShippingAddressInputMobile(
  props: ShippingAddressInputGeneralProps
) {
  const {
    selectedAddress,
    onSelectAddress,
    onShowHideAddressList,
    isShowAddressList,
    isShowAddressForm,
    onShowHideAddressForm,
    selectedAddressId,
    onSubmit,
    onEditAddress,
    onCallbackAddress,
    isShowSubmitButton,
  } = props;
  return (
    <>
      <Flex direction="column">
        <Text
          color="charcoalGrey"
          fontFamily="poppins"
          fontWeight="semibold"
          fontSize="sm"
        >
          Alamat Pengiriman
        </Text>
        {selectedAddress ? (
          <VStack
            background="white"
            borderRadius="xl"
            boxShadow="base"
            mt={3}
            p={4}
            align="start"
            width="full"
            spacing={3}
            divider={
              <Divider border="0.5px solid" borderColor="veryLightPink" />
            }
          >
            <VStack align="start" spacing={2} width="full">
              <HStack>
                <Text color="charcoalGrey" fontSize="sm" fontWeight="semibold">
                  {selectedAddress.label}
                </Text>
                {selectedAddress.isDefault ? (
                  <Badge
                    variant="solid"
                    colorScheme="main"
                    textTransform="capitalize"
                    fontSize="xxs"
                    px={2}
                  >
                    Alamat Utama
                  </Badge>
                ) : null}
              </HStack>
            </VStack>
            <VStack align="start" width="full" spacing={3}>
              <Flex direction="column">
                <Text
                  color="charcoalGrey"
                  fontSize="xs"
                  fontWeight="semibold"
                  fontFamily="poppins"
                >
                  {selectedAddress.receiver}
                </Text>
                <Text color="charcoalGrey" fontSize="xs">
                  {selectedAddress.address}
                </Text>
                <Text color="charcoalGrey" fontSize="xs" fontWeight="semibold">
                  {selectedAddress.phone}
                </Text>
              </Flex>
              <Button
                variant="outline"
                background="white"
                height="24px"
                fontSize="xs"
                fontWeight="semibold"
                borderRadius="base"
                color="sea.500"
                borderColor="main.500"
                width="full"
                onClick={onShowHideAddressList}
              >
                Ganti Alamat
              </Button>
              <HStack
                align="start"
                background="iceBlue.500"
                p={4}
                borderRadius="base"
                width="full"
              >
                <SehatqWarningIcon mt={0.5} />
                <Text fontSize="xs">
                  Tujuan pengiriman akan membantu SehatQ mencarikan apotek
                  terdekat dari alamatmu.
                </Text>
              </HStack>
            </VStack>
          </VStack>
        ) : (
          <VStack
            mt={3}
            align="start"
            spacing={3}
            width="full"
            p={4}
            background="white"
            borderRadius="xl"
            boxShadow="base"
          >
            <Text
              color="charcoalGrey"
              fontFamily="poppins"
              fontWeight="semibold"
              fontSize="sm"
            >
              Mau Dikirim ke Mana?
            </Text>
            <Text fontSize="xs">
              Tambah alamat pengiriman dulu biar pesananmu cepat sampai.
            </Text>
            <Button
              variant="solid"
              height="24px"
              fontSize="xs"
              fontWeight="semibold"
              borderRadius="base"
              width="full"
              onClick={onShowHideAddressList}
            >
              Tambah Alamat
            </Button>
            <HStack
              align="start"
              background="iceBlue.500"
              p={4}
              borderRadius="base"
              width="full"
            >
              <SehatqWarningIcon mt={0.5} />
              <Text fontSize="xs">
                Tujuan pengiriman akan membantu SehatQ mencarikan apotek
                terdekat dari alamatmu.
              </Text>
            </HStack>
          </VStack>
        )}
      </Flex>
      <Drawer
        isOpen={isShowAddressList}
        onClose={
          isShowAddressForm ? onShowHideAddressForm : onShowHideAddressList
        }
        size="full"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            <Flex direction="row" justify="space-between" width="full">
              <HStack width="full">
                <IconButton
                  aria-label="back button"
                  onClick={
                    isShowAddressForm
                      ? onShowHideAddressForm
                      : onShowHideAddressList
                  }
                  variant="fit"
                  colorScheme="sea"
                  autoFocus={false}
                  marginRight={2}
                  icon={<ArrowBackIcon boxSize="28px" color="main.600" />}
                />
                <Text
                  fontSize="sm"
                  fontWeight="semibold"
                  color="charcoalGrey"
                  fontFamily="poppins"
                >
                  {isShowAddressForm
                    ? selectedAddressId
                      ? "Ubah Alamat"
                      : "Tambah Alamat Baru"
                    : "Atur Alamat"}
                </Text>
              </HStack>
              {!isShowAddressForm ? (
                <Button
                  variant="unstyled"
                  width="105px"
                  textAlign="right"
                  fontSize="xs"
                  fontWeight="semibold"
                  color="sea.500"
                  height="19px"
                  mb={2}
                  onClick={() => {
                    onSelectAddress("");
                    onShowHideAddressForm();
                  }}
                >
                  Tambah Alamat
                </Button>
              ) : null}
            </Flex>
          </DrawerHeader>
          <DrawerBody>
            {isShowAddressForm ? (
              <ShippingAddressForm
                isMobile
                onSuccess={onSelectAddress}
                id={selectedAddressId}
              />
            ) : (
              <AddressList
                isMobile
                selectedValue={selectedAddressId}
                onClickAddress={onSelectAddress}
                onEditAddress={onEditAddress}
                callback={onCallbackAddress}
              />
            )}
          </DrawerBody>
          {!isShowAddressForm && isShowSubmitButton ? (
            <Box position="fixed" bottom={4} px={6} width="full">
              <Button
                width="full"
                fontSize="md"
                fontWeight="semibold"
                variant="solid"
                boxShadow="0px 20px 10px -17px rgb(112 203 207)"
                colorScheme="main"
                borderRadius="base"
                onClick={() =>
                  selectedAddressId ? onSubmit(selectedAddressId) : undefined
                }
              >
                Pilih Alamat
              </Button>
            </Box>
          ) : null}
        </DrawerContent>
      </Drawer>
    </>
  );
}

export function ShippingAddressInputMobileSkeleton() {
  return (
    <VStack
      mt={3}
      align="start"
      spacing={3}
      width="full"
      p={4}
      background="white"
      borderRadius="xl"
      boxShadow="base"
    >
      <Skeleton width="150px" height="21px" />
      <SkeletonText width="150px" noOfLines={2} skeletonHeight={4} />
      <Skeleton width="full" height="24px" borderRadius="base" />
      <HStack
        align="start"
        background="iceBlue.500"
        p={4}
        borderRadius="base"
        width="full"
      >
        <SehatqWarningIcon mt={0.5} />
        <Text fontSize="xs">
          Tujuan pengiriman akan membantu SehatQ mencarikan apotek terdekat dari
          alamatmu.
        </Text>
      </HStack>
    </VStack>
  );
}
