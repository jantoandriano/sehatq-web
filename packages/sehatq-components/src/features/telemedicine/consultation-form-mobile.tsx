import React from "react";
import {
  Box,
  Button,
  DatePicker,
  Divider,
  Dropdown,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Skeleton,
  Text,
  Textarea,
} from "../../user-interfaces";
import { FamilyInput, FamilySelectedData } from "../profile/family-input";
import { ConsultationDisclaimer } from "./consultation-disclaimer";
import { ConsultationTermAndCondition } from "./consultation-term-and-condition";
import { FieldUnion, Fields } from "./consultation-form-reducer";

export type ConsultationFormMobileProps = {
  values: Fields;
  isLoading: boolean;
  isShowNikAndAddress: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onChangeInput: (field: FieldUnion) => void;
  onChangeMember: (value: FamilySelectedData | undefined) => void;
  errors?: Record<string, string | undefined>;
};

export function ConsultationFormMobile(props: ConsultationFormMobileProps) {
  const {
    errors,
    values,
    isLoading,
    onSubmit,
    onChangeInput,
    onChangeMember,
    isShowNikAndAddress,
  } = props;
  return (
    <>
      <Text
        color="charcoalGrey"
        fontSize="md"
        fontFamily="poppins"
        fontWeight="semibold"
      >
        Keluhan Pasien
      </Text>
      <FormControl
        variant="floating"
        isInvalid={errors?.symptom ? true : false}
        size="small"
        my={6}
      >
        <Textarea
          value={values.symptom}
          border="1px solid"
          borderRadius="base"
          height="120px"
          onChange={(e) => {
            e.preventDefault();
            onChangeInput({ name: "symptom", value: e.target.value });
          }}
          background="white"
          fontSize="sm"
          _placeholder={{
            fontSize: "xs",
          }}
          placeholder="Keluhan"
        />
        <FormLabel fontSize="xs">Keluhan</FormLabel>
        <FormErrorMessage fontSize="xxs" fontStyle="italic">
          {errors?.symptom}
        </FormErrorMessage>
      </FormControl>
      <Divider border="0.5pox solid" borderColor="veryLightPink" width="full" />
      <Text
        color="charcoalGrey"
        fontSize="md"
        fontFamily="poppins"
        fontWeight="semibold"
        my={6}
      >
        Detail Pasien
      </Text>
      <FamilyInput value={values.userId} onChange={onChangeMember} isMobile />
      <FormControl
        size="small"
        variant="floating"
        isInvalid={errors?.birthDate ? true : false}
        my={6}
      >
        <DatePicker
          isMobile
          variant="input"
          value={values.birthDate}
          onChange={(value) => onChangeInput({ name: "birthDate", value })}
          placeholder="Tanggal Lahir"
          inputProps={{
            boxShadow: "none",
          }}
          isError={errors?.birthDate ? true : false}
        />
        <FormLabel fontSize="xs">Tanggal Lahir</FormLabel>
        <FormErrorMessage fontSize="xxs" fontStyle="italic">
          {errors?.birthDate}
        </FormErrorMessage>
      </FormControl>
      <FormControl
        variant="floating"
        isInvalid={errors?.phone ? true : false}
        size="small"
      >
        <Input
          value={(values.phone as string) ?? ""}
          fontSize="sm"
          border="1px solid"
          borderRadius="base"
          onChange={(e) => {
            e.preventDefault();
            onChangeInput({ name: "phone", value: e.target.value });
          }}
          background="white"
          type="number"
          placeholder="No. Handphone"
          _placeholder={{
            fontSize: "xs",
          }}
        />
        <FormLabel fontSize="xs">No. Handphone</FormLabel>
        <FormErrorMessage fontSize="xxs" fontStyle="italic">
          {errors?.phone}
        </FormErrorMessage>
      </FormControl>
      <FormControl
        variant="floating"
        isInvalid={errors?.gender ? true : false}
        my={6}
        size="small"
      >
        <Dropdown
          isMobile
          onChange={(value) => onChangeInput({ name: "gender", value })}
          options={[
            {
              value: "m" as const,
              label: "Pria",
            },
            {
              value: "f" as const,
              label: "Wanita",
            },
          ]}
          isError={errors?.gender ? true : false}
          placeholder="Jenis Kelamin"
          value={values.gender}
        />
        <FormLabel fontSize="xs">Jenis Kelamin</FormLabel>
        <FormErrorMessage fontSize="xxs" fontStyle="italic">
          {errors?.gender}
        </FormErrorMessage>
      </FormControl>
      <FormControl
        hidden={!isShowNikAndAddress}
        variant="floating"
        isInvalid={errors?.identityNumber ? true : false}
        size="small"
      >
        <Input
          value={(values.identityNumber as string) ?? ""}
          fontSize="sm"
          border="1px solid"
          borderRadius="base"
          onChange={(e) => {
            e.preventDefault();
            onChangeInput({ name: "identityNumber", value: e.target.value });
          }}
          background="white"
          type="number"
          placeholder="NIK"
          _placeholder={{
            fontSize: "xs",
          }}
        />
        <FormLabel fontSize="xs">NIK</FormLabel>
        <FormErrorMessage fontSize="xxs" fontStyle="italic">
          {errors?.identityNumber}
        </FormErrorMessage>
      </FormControl>
      <FormControl
        hidden={!isShowNikAndAddress}
        variant="floating"
        isInvalid={errors?.address ? true : false}
        my={6}
        size="small"
      >
        <Textarea
          value={(values.address as string) ?? ""}
          fontSize="sm"
          border="1px solid"
          borderRadius="base"
          height="128px"
          onChange={(e) => {
            e.preventDefault();
            onChangeInput({ name: "address", value: e.target.value });
          }}
          background="white"
          placeholder="Alamat"
          _placeholder={{
            fontSize: "xs",
          }}
        />
        <FormLabel fontSize="xs">Alamat</FormLabel>
        <FormErrorMessage fontSize="xxs" fontStyle="italic">
          {errors?.address}
        </FormErrorMessage>
      </FormControl>
      <ConsultationDisclaimer isMobile isFullWidth />
      <Box my={6} width="full">
        <ConsultationTermAndCondition isMobile />
      </Box>
      <Button
        isLoading={isLoading}
        borderRadius="base"
        variant="solid"
        colorScheme="main"
        boxShadow="2xl"
        width="full"
        height="50px"
        fontSize="sm"
        fontWeight="semibold"
        onClick={onSubmit}
      >
        Lanjutkan
      </Button>
    </>
  );
}

export function ConsultationFormMobileSkeleton() {
  return (
    <>
      <Skeleton width="126px" height="24px" />
      <Skeleton width="full" height="120px" borderRadius="base" my={6} />
      <Divider border="0.5pox solid" borderColor="veryLightPink" width="full" />
      <Skeleton width="106px" height="24px" my={6} />
      <Skeleton width="full" height="46px" borderRadius="xl" />
      <Skeleton width="full" height="38px" borderRadius="base" my={6} />
      <Skeleton width="full" height="38px" borderRadius="base" />
      <Skeleton width="full" height="38px" borderRadius="base" my={6} />
      <Skeleton width="full" height="80px" borderRadius="base" />
      <Skeleton width="full" height="40px" borderRadius="base" my={6} />
      <Skeleton width="full" height="54px" borderRadius="base" />
      <Skeleton
        mt={6}
        boxShadow="2xl"
        width="full"
        height="50px"
        borderRadius="base"
      />
    </>
  );
}
