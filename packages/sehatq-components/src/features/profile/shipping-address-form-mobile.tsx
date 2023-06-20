import React, { ReactElement } from "react";
import {
  ArrowBackIcon,
  BasicLocationIconActive,
  BasicLocationIconInActive,
  Button,
  Checkbox,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  IconButton,
  Input,
  Skeleton,
  Text,
  Textarea,
  VStack,
} from "../../user-interfaces";
import { DCPInput, GoogleMapInput } from "../general";
import { ShippingAddressFormGeneralProps } from "./shipping-address-form-desktop";
import { Fields } from "./shipping-address-form-reducer";

function FormInput(props: {
  isInvalid: boolean;
  errorMessage?: string;
  helperText?: string;
  label: string;
  children: ReactElement;
}) {
  return (
    <FormControl variant="floating" isInvalid={props.isInvalid}>
      {props.children}
      <FormLabel fontSize="sm">{props.label}</FormLabel>
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

function PinPoint(props: {
  values: Fields;
  onShowHideMapInput: () => void;
  placeDescription: string;
}) {
  const { values, onShowHideMapInput, placeDescription } = props;
  return (
    <>
      <VStack
        background={values.googlePlaceId ? "iceBlue.500" : "gray.500"}
        border="1px solid"
        borderColor={values.googlePlaceId ? "main.500" : "veryLightPink"}
        borderRadius="base"
        py={3}
        px={4}
        width="full"
        spacing={3}
        align="start"
      >
        <HStack>
          <Text fontSize="sm" color="charcoalGrey" fontWeight="semibold">
            Pin Lokasi
          </Text>
          <Text fontSize="sm" color="brownGrey.500" fontWeight="semibold">
            (Opsional)
          </Text>
        </HStack>
        <HStack align="start">
          {values.googlePlaceId ? (
            <BasicLocationIconActive width="32px" height="42px" />
          ) : (
            <BasicLocationIconInActive width="32px" height="42px" />
          )}{" "}
          <Text color="charcoalGrey" fontSize="sm">
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
          minW="full"
          borderRadius="base"
          borderColor={values.googlePlaceId ? "main.500" : undefined}
          onClick={onShowHideMapInput}
        >
          {values.googlePlaceId ? "Ubah Lokasi" : "Tandai Lokasi"}
        </Button>
      </VStack>
    </>
  );
}
export function ShippingAddressFormMobile(
  props: ShippingAddressFormGeneralProps
) {
  const {
    values,
    errors,
    onChangeDCP,
    onChangeInput,
    onSubmit,
    isLoading,
    onShowHideMapInput,
    isShowMapInput,
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
            fontSize="sm"
            onChange={(e) => {
              e.preventDefault();
              onChangeInput({ name: "label", value: e.target.value });
            }}
            background="white"
            placeholder="Label Alamat"
          />
        </FormInput>
        <FormInput
          isInvalid={Boolean(errors?.receiver)}
          label="Nama Penerima"
          errorMessage={errors?.receiver}
        >
          <Input
            value={(values.receiver as string) ?? ""}
            border="1px solid"
            borderRadius="base"
            fontSize="sm"
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
            fontSize="sm"
            onChange={(e) => {
              e.preventDefault();
              onChangeInput({ name: "phone", value: e.target.value });
            }}
            background="white"
            placeholder="No. Telepon"
          />
        </FormInput>
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
            fontSize="sm"
            onChange={(e) => {
              e.preventDefault();
              onChangeInput({ name: "address", value: e.target.value });
            }}
            background="white"
            placeholder="Detail Alamat"
          />
        </FormInput>
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
          isMobile
        />
        <FormInput
          isInvalid={Boolean(errors?.zipCode)}
          label="Kode Pos"
          errorMessage={errors?.zipCode}
        >
          <Input
            value={(values.zipCode as string) ?? ""}
            border="1px solid"
            borderRadius="base"
            fontSize="sm"
            onChange={(e) => {
              e.preventDefault();
              onChangeInput({ name: "zipCode", value: e.target.value });
            }}
            background="white"
            placeholder="Kode Pos"
            readOnly
          />
        </FormInput>
        <FormInput
          isInvalid={Boolean(errors?.note)}
          label="Catatan"
          errorMessage={errors?.note}
        >
          <Input
            value={(values.note as string) ?? ""}
            border="1px solid"
            borderRadius="base"
            fontSize="sm"
            background="white"
            placeholder="Catatan"
            onChange={(e) => {
              e.preventDefault();
              onChangeInput({ name: "note", value: e.target.value });
            }}
          />
        </FormInput>
        {values.subdistrict ? <PinPoint {...props} /> : null}
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
          fontSize="sm"
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
      <Drawer isOpen={isShowMapInput} onClose={onShowHideMapInput} size="full">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader
            fontFamily="poppins"
            fontWeight="semibold"
            fontSize="sm"
            color="charcoalGrey"
          >
            <IconButton
              aria-label="back button"
              onClick={onShowHideMapInput}
              variant="fit"
              colorScheme="sea"
              autoFocus={false}
              marginRight={2}
              icon={<ArrowBackIcon boxSize="28px" color="main.600" />}
            />
            Pilih Lokasi Pengiriman
          </DrawerHeader>
          <DrawerBody p={4}>
            <GoogleMapInput
              isMobile
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
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export function ShippingAddressFormMobileSkeleton() {
  return (
    <VStack width="full" spacing={6} align="start">
      <VStack direction="column" width="full" align="start" spacing={2}>
        <Skeleton height="40px" width="full" borderRadius="base" />
        <Text color="charcoalGrey" fontSize="xs">
          Contoh: Alamat Rumah, Alamat Kantor, Apartemen, Dropship
        </Text>
      </VStack>
      <Skeleton height="40px" width="full" borderRadius="base" />
      <Skeleton height="40px" width="full" borderRadius="base" />
      <Skeleton height="80px" width="full" borderRadius="base" />
      <Skeleton height="40px" width="full" borderRadius="base" />
      <Skeleton height="40px" width="full" borderRadius="base" />
      <Skeleton height="40px" width="full" borderRadius="base" />
      <Skeleton height="40px" width="full" borderRadius="base" />
      <Skeleton height="40px" width="200px" borderRadius="base" />
      <Skeleton height="40px" width="full" borderRadius="base" />
    </VStack>
  );
}
