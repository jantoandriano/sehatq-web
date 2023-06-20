import React from "react";
import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SehatqWarningIcon,
  Skeleton,
  Text,
  VStack,
} from "../../user-interfaces";
import { AddressList } from "./address-list";
import { ShippingAddressForm } from "./shipping-address-form";

export type ShippingAddressInputGeneralProps = {
  selectedAddress?: {
    label: string;
    receiver: string;
    address: string;
    phone: string;
    isDefault: boolean;
  };
  onShowHideAddressList: () => void;
  isShowAddressList: boolean;
  onSelectAddress: (value: string) => void;
  isShowAddressForm: boolean;
  onShowHideAddressForm: () => void;
  selectedAddressId?: string;
  onSubmit: (value: string) => void;
  onEditAddress: (valeu: string) => void;
  onCallbackAddress: (
    data:
      | {
          id: string;
          receiverName: string;
          label: string;
          address: string;
          phone: string;
          note: string;
          isDefault: boolean;
          googlePlaceId: string | null;
        }[]
      | undefined
  ) => void;
  isShowSubmitButton: boolean;
};

export function ShippingAddressInputDesktop(
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
      {selectedAddress ? (
        <VStack
          align="start"
          width="full"
          spacing={4}
          divider={<Divider border="0.5px solid" borderColor="veryLightPink" />}
        >
          <VStack align="start" spacing={4} width="full">
            <Text
              color="charcoalGrey"
              fontFamily="poppins"
              fontWeight="semibold"
              fontSize="md"
            >
              Alamat Pengiriman
            </Text>
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
            <Flex direction="row" justify="space-between" width="full">
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
              <Button
                minW="181px"
                variant="outline"
                background="white"
                height="24px"
                fontSize="xs"
                fontWeight="semibold"
                borderRadius="base"
                color="sea.500"
                borderColor="main.500"
                onClick={onShowHideAddressList}
              >
                Ganti Alamat
              </Button>
            </Flex>
          </VStack>
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
        </VStack>
      ) : (
        <VStack align="start" spacing={4} width="full">
          <Text
            color="charcoalGrey"
            fontFamily="poppins"
            fontWeight="semibold"
            fontSize="md"
          >
            Alamat Pengiriman
          </Text>
          <HStack
            align="start"
            background="iceBlue.500"
            p={4}
            borderRadius="base"
            width="full"
          >
            <SehatqWarningIcon mt={0.5} />
            <Text fontSize="xs">
              Tujuan pengiriman akan membantu SehatQ mencarikan apotek terdekat
              dari alamatmu.
            </Text>
          </HStack>
          <Text
            color="charcoalGrey"
            fontFamily="poppins"
            fontWeight="semibold"
            fontSize="sm"
          >
            Mau Dikirim ke Mana?
          </Text>
          <Flex direction="row" justify="space-between" width="full">
            <Text color="charcoalGrey" fontSize="xs" pr={10}>
              Tambah alamat pengiriman dulu biar pesananmu cepat sampai.
            </Text>
            <Button
              minW="181px"
              variant="outline"
              background="white"
              height="24px"
              fontSize="xs"
              fontWeight="semibold"
              borderRadius="base"
              color="sea.500"
              borderColor="main.500"
              onClick={onShowHideAddressList}
            >
              Tambah Alamat
            </Button>
          </Flex>
        </VStack>
      )}
      <Modal
        isOpen={isShowAddressList}
        onClose={
          isShowAddressForm ? onShowHideAddressForm : onShowHideAddressList
        }
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="md"
            fontFamily="poppins"
            fontWeight="semibold"
            textAlign="center"
          >
            {isShowAddressForm
              ? selectedAddressId
                ? "Ubah Alamat"
                : "Tambah Alamat Baru"
              : "Atur Alamat"}
          </ModalHeader>
          <ModalCloseButton h={6} w={6} top="3" color="brownGrey.500" />
          <Divider border="0.5px solid" borderColor="veryLightPink" />
          <ModalBody p={4} overflow="auto" maxH="570px">
            {isShowAddressForm ? (
              <Box width="full" mt={4}>
                <ShippingAddressForm
                  onSuccess={onSelectAddress}
                  id={selectedAddressId}
                />
              </Box>
            ) : (
              <>
                <Button
                  variant="unstyled"
                  width="full"
                  textAlign="right"
                  fontSize="sm"
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
                <AddressList
                  selectedValue={selectedAddressId}
                  onClickAddress={onSelectAddress}
                  onEditAddress={onEditAddress}
                  callback={onCallbackAddress}
                />
              </>
            )}
          </ModalBody>
          {!isShowAddressForm ? (
            <ModalFooter p={4}>
              {isShowSubmitButton ? (
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
              ) : null}
            </ModalFooter>
          ) : null}
        </ModalContent>
      </Modal>
    </>
  );
}

export function ShippingAddressInputDesktopSkeleton() {
  return (
    <VStack align="start" spacing={4} width="full">
      <Text
        color="charcoalGrey"
        fontFamily="poppins"
        fontWeight="semibold"
        fontSize="md"
      >
        Alamat Pengiriman
      </Text>
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
      <Flex direction="row" justify="space-between" width="full">
        <Skeleton width="150px" height="21px" />
        <Skeleton width="181px" height="24px" borderRadius="base" />
      </Flex>
    </VStack>
  );
}
