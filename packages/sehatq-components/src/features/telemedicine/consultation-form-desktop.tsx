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
  HStack,
  Input,
  Skeleton,
  Text,
  Textarea,
} from "../../user-interfaces";
import { FamilyInput, FamilySelectedData } from "../profile/family-input";
import { ConsultationTermAndCondition } from "./consultation-term-and-condition";
import { FieldUnion, Fields } from "./consultation-form-reducer";

export type ConsultationFormDesktopProps = {
  values: Fields;
  isLoading: boolean;
  isShowNikAndAddress: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onChangeInput: (field: FieldUnion) => void;
  onChangeMember: (value: FamilySelectedData | undefined) => void;
  errors?: Record<string, string | undefined>;
};

export function ConsultationFormDesktop(props: ConsultationFormDesktopProps) {
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
      <Box boxShadow="base" background="white" borderRadius="xl" p={6} mb={6}>
        <Text
          color="charcoalGrey"
          fontSize="md"
          fontFamily="poppins"
          fontWeight="semibold"
          mb={6}
        >
          Kamu konsultasi untuk siapa?
        </Text>
        <FamilyInput value={values.userId} onChange={onChangeMember} />
      </Box>
      <Box boxShadow="base" background="white" borderRadius="xl" p={6}>
        <Text
          color="charcoalGrey"
          fontSize="md"
          fontFamily="poppins"
          fontWeight="semibold"
          mb={6}
        >
          Beritahu ke Kami Apa Yang Kamu Alami
        </Text>
        <FormControl
          variant="floating"
          isInvalid={errors?.symptom ? true : false}
        >
          <Textarea
            value={(values.symptom as string) ?? ""}
            border="1px solid"
            borderRadius="base"
            height="128px"
            onChange={(e) => {
              e.preventDefault();
              onChangeInput({ name: "symptom", value: e.target.value });
            }}
            background="white"
            placeholder="Keluhan"
          />
          <FormLabel>Keluhan</FormLabel>
          <FormErrorMessage fontSize="xxs" fontStyle="italic">
            {errors?.symptom}
          </FormErrorMessage>
        </FormControl>
        <Text mt={2} mb={6} color="brownGrey.500" fontSize="xs">
          Gejala, durasi, tindakan yang sudah dilakukan
        </Text>
        <Divider
          border="0.5pox solid"
          borderColor="veryLightPink"
          width="full"
        />
        <Text
          color="charcoalGrey"
          fontSize="md"
          fontFamily="poppins"
          fontWeight="semibold"
          my={6}
        >
          Data Diri Pasien
        </Text>
        <HStack align="start">
          <FormControl
            variant="floating"
            isInvalid={errors?.birthDate ? true : false}
          >
            <DatePicker
              variant="input"
              value={values.birthDate}
              onChange={(value) => onChangeInput({ name: "birthDate", value })}
              placeholder="Tanggal Lahir"
              inputProps={{
                boxShadow: "none",
              }}
              isError={errors?.birthDate ? true : false}
            />
            <FormLabel>Tanggal Lahir</FormLabel>
            <FormErrorMessage fontSize="xxs" fontStyle="italic">
              {errors?.birthDate}
            </FormErrorMessage>
          </FormControl>
          <FormControl
            variant="floating"
            isInvalid={errors?.phone ? true : false}
          >
            <Input
              border="1px solid"
              borderRadius="base"
              onChange={(e) => {
                e.preventDefault();
                onChangeInput({ name: "phone", value: e.target.value });
              }}
              background="white"
              type="number"
              placeholder="No. Handpone"
              value={(values.phone as string) ?? ""}
            />
            <FormLabel>No. Handphone</FormLabel>
            <FormErrorMessage fontSize="xxs" fontStyle="italic">
              {errors?.phone}
            </FormErrorMessage>
          </FormControl>
        </HStack>
        <HStack align="start" my={6}>
          <FormControl
            variant="floating"
            isInvalid={errors?.gender ? true : false}
          >
            <Dropdown
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
              inputProps={{
                width: isShowNikAndAddress ? "full" : "49.5%",
              }}
            />
            <FormLabel>Jenis Kelamin</FormLabel>
            <FormErrorMessage fontSize="xxs" fontStyle="italic">
              {errors?.gender}
            </FormErrorMessage>
          </FormControl>
          <FormControl
            hidden={!isShowNikAndAddress}
            variant="floating"
            isInvalid={errors?.identityNumber ? true : false}
          >
            <Input
              border="1px solid"
              borderRadius="base"
              onChange={(e) => {
                e.preventDefault();
                onChangeInput({
                  name: "identityNumber",
                  value: e.target.value,
                });
              }}
              background="white"
              type="number"
              placeholder="NIK"
              value={(values.identityNumber as string) ?? ""}
            />
            <FormLabel>NIK</FormLabel>
            <FormErrorMessage fontSize="xxs" fontStyle="italic">
              {errors?.identityNumber}
            </FormErrorMessage>
          </FormControl>
        </HStack>
        <FormControl
          hidden={!isShowNikAndAddress}
          variant="floating"
          isInvalid={errors?.address ? true : false}
        >
          <Textarea
            border="1px solid"
            borderRadius="base"
            height="128px"
            onChange={(e) => {
              e.preventDefault();
              onChangeInput({ name: "address", value: e.target.value });
            }}
            background="white"
            placeholder="Alamat"
            value={(values.address as string) ?? ""}
          />
          <FormLabel>Alamat</FormLabel>
          <FormErrorMessage fontSize="xxs" fontStyle="italic">
            {errors?.address}
          </FormErrorMessage>
        </FormControl>
      </Box>
      <HStack mt={6} width="full" justify="space-between">
        <ConsultationTermAndCondition />
        <Button
          disabled={isLoading}
          isLoading={isLoading}
          borderRadius="base"
          variant="solid"
          colorScheme="main"
          boxShadow="2xl"
          width="328px"
          height="50px"
          fontSize="md"
          fontWeight="semibold"
          onClick={onSubmit}
        >
          Lanjutkan
        </Button>
      </HStack>
    </>
  );
}

export function ConsultationFormDesktopSkeleton() {
  return (
    <>
      <Box boxShadow="base" background="white" borderRadius="xl" p={6} mb={6}>
        <Skeleton width="246px" height="24px" mb={6} />
        <HStack justify="space-between" width="40%" mb={3}>
          <Skeleton width="143px" height="30px" />
          <Skeleton width="86px" height="26px" borderRadius="base" />
        </HStack>
        <HStack mb={3}>
          <Skeleton width="41px" height="17px" />
          <Skeleton width="62px" height="19px" />
        </HStack>
      </Box>
      <Box boxShadow="base" background="white" borderRadius="xl" p={6}>
        <Skeleton width="327px" height="24px" mb={3} />
        <Skeleton width="full" height="127px" borderRadius="base" mb={3} />
        <Skeleton width="256px" height="16px" />
        <Divider
          border="0.5pox solid"
          borderColor="veryLightPink"
          width="full"
          my={6}
        />
        <Skeleton width="129px" height="24px" mb={3} />
        <HStack align="start">
          <Skeleton width="full" height="52px" borderRadius="base" />
          <Skeleton width="full" height="52px" borderRadius="base" />
        </HStack>
        <HStack align="start" my={6}>
          <Skeleton width="full" height="52px" borderRadius="base" />
          <Skeleton width="full" height="52px" borderRadius="base" />
        </HStack>
        <Skeleton width="712px" height="128px" borderRadius="base" />
      </Box>
      <HStack mt={6} width="full" justify="space-between">
        <Skeleton width="359px" height="34px" />
        <Skeleton
          width="328px"
          height="50px"
          borderRadius="base"
          boxShadow="2xl"
        />
      </HStack>
    </>
  );
}
