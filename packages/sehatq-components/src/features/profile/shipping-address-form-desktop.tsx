import React, { ReactElement } from "react";
import {
  BasicLocationIconActive,
  BasicLocationIconInActive,
  Button,
  Checkbox,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Text,
  Textarea,
  VStack,
} from "../../user-interfaces";
import { DCPInput, GoogleMapInput } from "../general";
import { Fields, FieldUnion } from "./shipping-address-form-reducer";

export type ShippingAddressFormGeneralProps = {
  values: Fields;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onChangeInput: (field: FieldUnion) => void;
  onChangeDCP: (value: {
    subdistrict: string;
    district: string;
    city: string;
    province: string;
    zipCode: string;
  }) => void;
  errors?: Record<string, string | undefined>;
  isShowMapInput: boolean;
  onShowHideMapInput: () => void;
  placeDescription: string;
  onChangePinLocation: (location: {
    placeId: string;
    latitude: number;
    longitude: number;
  }) => void;
};

function FormInput(props: {
  isInvalid: boolean;
  errorMessage?: string;
  helperText?: string;
  label: string;
  maxW?: string;
  children: ReactElement;
}) {
  return (
    <FormControl
      variant="floating"
      isInvalid={props.isInvalid}
      maxW={props.maxW}
    >
      {props.children}
      <FormLabel>{props.label}</FormLabel>
      {props.helperText ? (
        <FormHelperText color="charcoalGrey" fontSize="xs">
          {props.helperText}
        </FormHelperText>
      ) : null}
      <FormErrorMessage fontSize="xxs" fontStyle="italic">
        {props.errorMessage}
      </FormErrorMessage>
    </FormControl>
  );
}

function PinLocation(props: {
  values: Fields;
  onShowHideMapInput: () => void;
  placeDescription: string;
}) {
  const { values, placeDescription, onShowHideMapInput } = props;
  return (
    <>
      <Flex
        direction="column"
        background={values.googlePlaceId ? "iceBlue.500" : "gray.500"}
        border="1px solid"
        borderColor={values.googlePlaceId ? "main.500" : "veryLightPink"}
        borderRadius="base"
        py={3}
        px={4}
        width="full"
      >
        <HStack>
          <Text fontSize="md" color="charcoalGrey" fontWeight="semibold">
            Pin Lokasi
          </Text>
          <Text fontSize="sm" color="brownGrey.500" fontWeight="semibold">
            (Opsional)
          </Text>
        </HStack>
        <Flex mt={2} direction="row" justify="space-between" width="full">
          <HStack align="start">
            {values.googlePlaceId ? (
              <BasicLocationIconActive width="32px" height="42px" />
            ) : (
              <BasicLocationIconInActive width="32px" height="42px" />
            )}{" "}
            <Text color="charcoalGrey" fontSize="md" pr={4}>
              {values.googlePlaceId
                ? placeDescription
                : "Tandai lokasi di peta jika kamu menggunakan metode pengiriman instan"}
            </Text>
          </HStack>
          <Button
            variant={values.googlePlaceId ? "outline" : "solid"}
            colorScheme="main"
            background={values.googlePlaceId ? "white" : undefined}
            color={values.googlePlaceId ? "sea.500" : "white"}
            fontSize="sm"
            fontWeight="semibold"
            height="38px"
            minW="138px"
            borderRadius="base"
            borderColor={values.googlePlaceId ? "main.500" : undefined}
            onClick={onShowHideMapInput}
          >
            {values.googlePlaceId ? "Ubah Lokasi" : "Tandai Lokasi"}
          </Button>
        </Flex>
      </Flex>
    </>
  );
}

export function ShippingAddressFormDesktop(
  props: ShippingAddressFormGeneralProps
) {
  const {
    values,
    errors,
    onChangeDCP,
    onChangeInput,
    onSubmit,
    isLoading,
    isShowMapInput,
    onShowHideMapInput,
    onChangePinLocation,
  } = props;

  return (
    <>
      <VStack width="full" spacing={6}>
        <FormInput
          isInvalid={Boolean(errors?.label)}
          label="Label Alamat"
          errorMessage={errors?.label}
          helperText="Contoh: Alamat Rumah, Alamat Kantor, Apartemen, Dropship"
        >
          <Input
            value={(values.label as string) ?? ""}
            border="1px solid"
            borderRadius="base"
            fontSize="md"
            onChange={(e) => {
              e.preventDefault();
              onChangeInput({ name: "label", value: e.target.value });
            }}
            background="white"
            placeholder="Label Alamat"
          />
        </FormInput>
        <HStack width="full" justify="space-between" align="start">
          <FormInput
            isInvalid={Boolean(errors?.receiver)}
            label="Nama Penerima"
            errorMessage={errors?.receiver}
          >
            <Input
              value={(values.receiver as string) ?? ""}
              border="1px solid"
              borderRadius="base"
              fontSize="md"
              onChange={(e) => {
                e.preventDefault();
                onChangeInput({ name: "receiver", value: e.target.value });
              }}
              background="white"
              placeholder="Nama Penerima"
            />
          </FormInput>
          <FormInput
            isInvalid={Boolean(errors?.phone)}
            label="No. Telepon"
            errorMessage={errors?.phone}
          >
            <Input
              value={(values.phone as string) ?? ""}
              border="1px solid"
              borderRadius="base"
              fontSize="md"
              onChange={(e) => {
                e.preventDefault();
                onChangeInput({ name: "phone", value: e.target.value });
              }}
              background="white"
              placeholder="No. Telepon"
            />
          </FormInput>
        </HStack>
        <FormInput
          isInvalid={Boolean(errors?.address)}
          label="Detail Alamat"
          errorMessage={errors?.address}
        >
          <Textarea
            value={(values.address as string) ?? ""}
            border="1px solid"
            borderRadius="base"
            height="80px"
            fontSize="md"
            onChange={(e) => {
              e.preventDefault();
              onChangeInput({ name: "address", value: e.target.value });
            }}
            background="white"
            placeholder="Detail Alamat"
          />
        </FormInput>
        <HStack width="full" align="start">
          <DCPInput
            onChange={onChangeDCP}
            value={{
              subdistrict: values.subdistrict,
              district: values.district,
              city: values.city,
              province: values.province,
              zipCode: values.zipCode,
            }}
            errorMessage={errors?.district}
          />
          <FormInput
            isInvalid={Boolean(errors?.zipCode)}
            label="Kode Pos"
            errorMessage={errors?.zipCode}
            maxW="114px"
          >
            <Input
              value={(values.zipCode as string) ?? ""}
              border="1px solid"
              borderRadius="base"
              fontSize="md"
              onChange={(e) => {
                e.preventDefault();
                onChangeInput({ name: "zipCode", value: e.target.value });
              }}
              background="white"
              placeholder="Kode Pos"
              readOnly
            />
          </FormInput>
        </HStack>
        <FormInput
          isInvalid={Boolean(errors?.note)}
          label="Catatan"
          errorMessage={errors?.note}
        >
          <Input
            value={(values.note as string) ?? ""}
            border="1px solid"
            borderRadius="base"
            fontSize="md"
            background="white"
            placeholder="Catatan"
            onChange={(e) => {
              e.preventDefault();
              onChangeInput({ name: "note", value: e.target.value });
            }}
          />
        </FormInput>
        {values.subdistrict ? <PinLocation {...props} /> : null}
        <Checkbox
          width="full"
          colorScheme={values.default ? "main" : "brownGrey"}
          isChecked
          onChange={(e) => {
            e.preventDefault();
            onChangeInput({ name: "default", value: !values.default });
          }}
        >
          <Text fontSize="sm" color="charcoalGrey">
            Jadikan sebagai alamat utama.
          </Text>
        </Checkbox>
        <Button
          width="full"
          fontSize="md"
          fontWeight="semibold"
          variant="solid"
          boxShadow="0px 20px 10px -17px rgb(112 203 207)"
          colorScheme="main"
          borderRadius="base"
          onClick={onSubmit}
          disabled={isLoading}
          isLoading={isLoading}
        >
          Simpan
        </Button>
      </VStack>
      <Modal isOpen={isShowMapInput} onClose={onShowHideMapInput} size="xl">
        <ModalOverlay />
        <ModalContent borderTopLeftRadius="xl" borderTopRightRadius="xl">
          <ModalHeader
            fontFamily="poppins"
            fontWeight="semibold"
            fontSize="md"
            color="charcoalGrey"
            textAlign="center"
          >
            Pilih Lokasi Pengiriman
          </ModalHeader>
          <ModalCloseButton h={6} w={6} top="3" color="brownGrey.500" />
          <Divider border="0.5px solid" borderColor="veryLightPink" />
          <ModalBody p={4}>
            <GoogleMapInput
              coverageArea={values.subdistrict}
              placeId={values.googlePlaceId}
              onChange={(location: {
                placeId: string;
                latitude: number;
                longitude: number;
                subdistrict?: string;
                district?: string;
                city?: string;
                province?: string;
                zipCode?: string;
              }) => {
                onChangePinLocation(location);
                onShowHideMapInput();
              }}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export function ShippingAddressFormDesktopSkeleton() {
  return (
    <VStack align="start" width="full" spacing={6}>
      <Skeleton height="40px" width="full" borderRadius="base" />
      <HStack width="full" justify="space-between" align="start">
        <Skeleton height="40px" width="full" borderRadius="base" />
        <Skeleton height="40px" width="full" borderRadius="base" />
      </HStack>
      <Skeleton height="80px" width="full" borderRadius="base" />
      <HStack width="full" align="start">
        <Skeleton height="40px" width="full" borderRadius="base" />
        <Skeleton height="40px" width="114px" borderRadius="base" />
      </HStack>
      <Skeleton height="40px" width="full" borderRadius="base" />
      <Skeleton height="40px" width="200px" borderRadius="base" />
      <Skeleton height="40px" width="full" borderRadius="base" />
    </VStack>
  );
}
