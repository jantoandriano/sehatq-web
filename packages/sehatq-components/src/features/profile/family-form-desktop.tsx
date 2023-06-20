import React from "react";
import { useAssets, useNavigation } from "@sehatq/utils";
import {
  Button,
  Text,
  Box,
  HStack,
  Flex,
  FormControl,
  FormLabel,
  DatePicker,
  FormErrorMessage,
  Input,
  Dropdown,
  Checkbox,
  useImage,
  FileInput,
  Link,
} from "../../user-interfaces";
import { FieldUnion, Fields } from "./family-form-reducer";

export type FamilyFormDesktopProps = {
  isLoading: boolean;
  isAgree: boolean;
  values: Fields;
  setAgree: (value: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
  onChangeInput: (field: FieldUnion) => void;
  onChangePhoto: (files: File[]) => void;
  errors?: Record<string, string | undefined>;
};

export function FamilyFormDesktop(props: FamilyFormDesktopProps) {
  const {
    isLoading,
    onChangeInput,
    onChangePhoto,
    values,
    errors,
    onSubmit,
    isAgree,
    setAgree,
  } = props;
  const Image = useImage();
  const ASSETS = useAssets(["BG_PHOTO"]);
  const { Navigate } = useNavigation();

  return (
    <Box bg="white">
      <HStack align="start">
        <FormControl variant="floating" isInvalid={Boolean(errors?.name)}>
          <Input
            border="1px solid"
            borderRadius="base"
            background="white"
            placeholder="Nama Lengkap"
            value={values.name}
            onChange={(e) => {
              e.preventDefault();
              onChangeInput({ name: "name", value: e.target.value });
            }}
          />
          <FormLabel>Nama Lengkap</FormLabel>
          <FormErrorMessage fontSize="xxs" fontStyle="italic">
            {errors?.name}
          </FormErrorMessage>
        </FormControl>
        <FormControl variant="floating" isInvalid={Boolean(errors?.birthDate)}>
          <DatePicker
            variant="input"
            placeholder="Tanggal Lahir"
            inputProps={{
              boxShadow: "none",
            }}
            isError={errors?.birthDate ? true : false}
            value={values.birthDate}
            onChange={(value) => onChangeInput({ name: "birthDate", value })}
          />
          <FormLabel>Tanggal Lahir</FormLabel>
          <FormErrorMessage fontSize="xxs" fontStyle="italic">
            {errors?.birthDate}
          </FormErrorMessage>
        </FormControl>
      </HStack>

      <HStack align="start" my={6}>
        <FormControl variant="floating" isInvalid={Boolean(errors?.phone)}>
          <Input
            border="1px solid"
            borderRadius="base"
            background="white"
            type="number"
            placeholder="No. Telepon"
            value={(values.phone as string) ?? ""}
            onChange={(e) => {
              e.preventDefault();
              onChangeInput({ name: "phone", value: e.target.value });
            }}
          />
          <FormLabel>No. Telepon</FormLabel>
          <FormErrorMessage fontSize="xxs" fontStyle="italic">
            {errors?.phone}
          </FormErrorMessage>
        </FormControl>
        <FormControl variant="floating" isInvalid={Boolean(errors?.gender)}>
          <Dropdown
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
            placeholder="Jenis Kelamin"
            inputProps={{
              width: "full",
            }}
            isError={errors?.gender ? true : false}
            value={values.gender}
            onChange={(value) => onChangeInput({ name: "gender", value })}
          />
          <FormLabel>Jenis Kelamin</FormLabel>
          <FormErrorMessage fontSize="xxs" fontStyle="italic">
            {errors?.gender}
          </FormErrorMessage>
        </FormControl>
      </HStack>

      <HStack align="start" my={6}>
        <FormControl variant="floating" isInvalid={Boolean(errors?.weight)}>
          <Input
            border="1px solid"
            borderRadius="base"
            background="white"
            type="number"
            placeholder="Berat Badan (kg)"
            value={values.weight}
            onChange={(e) => {
              e.preventDefault();
              onChangeInput({ name: "weight", value: e.target.value });
            }}
          />
          <FormLabel>Berat Badan (kg)</FormLabel>
          <FormErrorMessage fontSize="xxs" fontStyle="italic">
            {errors?.weight}
          </FormErrorMessage>
        </FormControl>
        <FormControl variant="floating" isInvalid={Boolean(errors?.height)}>
          <Input
            border="1px solid"
            borderRadius="base"
            background="white"
            type="number"
            placeholder="Tinggi Badan (cm)"
            value={values.height}
            onChange={(e) => {
              e.preventDefault();
              onChangeInput({ name: "height", value: e.target.value });
            }}
          />
          <FormLabel>Tinggi Badan (cm)</FormLabel>
          <FormErrorMessage fontSize="xxs" fontStyle="italic">
            {errors?.height}
          </FormErrorMessage>
        </FormControl>
      </HStack>

      <HStack align="start" my={6}>
        <FormControl
          variant="floating"
          w="50%"
          pr={1}
          isInvalid={Boolean(errors?.relation)}
        >
          <Dropdown
            options={[
              {
                value: "1" as const,
                label: "Suami",
              },
              {
                value: "2" as const,
                label: "Istri",
              },
              {
                value: "3" as const,
                label: "Anak Laki-laki",
              },
              {
                value: "4" as const,
                label: "Anak Perempuan",
              },
            ]}
            placeholder="Hubungan Keluarga"
            inputProps={{
              width: "full",
            }}
            isError={errors?.relation ? true : false}
            value={values.relation}
            onChange={(value) => onChangeInput({ name: "relation", value })}
          />
          <FormLabel>Hubungan Keluarga</FormLabel>
          <FormErrorMessage fontSize="xxs" fontStyle="italic">
            {errors?.relation}
          </FormErrorMessage>
        </FormControl>
      </HStack>

      <HStack align="start" mt={10} mb={4}>
        <Text
          color="charcoalGrey"
          fontSize="md"
          fontFamily="poppins"
          fontWeight="semibold"
          width="full"
        >
          Pilih Jenis Identitas
        </Text>
        <Text
          color="charcoalGrey"
          fontSize="md"
          fontFamily="poppins"
          fontWeight="semibold"
          pl={3}
          width="full"
        >
          Upload Foto Data Diri
        </Text>
      </HStack>

      <HStack align="start" my={6}>
        <Flex flexDirection="column" w="full">
          <FormControl
            variant="floating"
            mb={6}
            isInvalid={Boolean(errors?.type)}
          >
            <Dropdown
              options={[
                {
                  value: "ktp" as const,
                  label: "KTP",
                },
                {
                  value: "passport" as const,
                  label: "Paspor",
                },
                {
                  value: "kk" as const,
                  label: "Kartu Keluarga",
                },
                {
                  value: "sim" as const,
                  label: "SIM",
                },
              ]}
              placeholder="Jenis Identitas"
              inputProps={{
                width: "full",
              }}
              isError={errors?.type ? true : false}
              value={values.type}
              onChange={(value) => onChangeInput({ name: "type", value })}
            />
            <FormLabel>Jenis Identitas</FormLabel>
            <FormErrorMessage fontSize="xxs" fontStyle="italic">
              {errors?.type}
            </FormErrorMessage>
          </FormControl>
          <FormControl
            variant="floating"
            mb={6}
            isInvalid={Boolean(errors?.identityNumber)}
          >
            <Input
              border="1px solid"
              borderRadius="base"
              background="white"
              placeholder="Nomor Identitas"
              value={(values.identityNumber as string) ?? ""}
              onChange={(e) => {
                e.preventDefault();
                onChangeInput({
                  name: "identityNumber",
                  value: e.target.value,
                });
              }}
            />
            <FormLabel>Nomor Identitas</FormLabel>
            <FormErrorMessage fontSize="xxs" fontStyle="italic">
              {errors?.identityNumber}
            </FormErrorMessage>
          </FormControl>
        </Flex>
        <Box width="full" pl={2} cursor="pointer">
          <FileInput
            boxProps={{
              ...(values.photo && {
                border: "1px solid #70cbcf",
                bg: "#f0f9fa",
                w: "376px",
              }),
              h: "235px",
              borderRadius: 4,
              mb: 4,
              cursor: "pointer",
            }}
            dropzoneProps={{
              accept: {
                "image/*": [".jpeg", ".jpg", ".png"],
              },
              multiple: false,
              onDrop: onChangePhoto,
            }}
          >
            <>
              <Image
                src={values.photo || (ASSETS.BG_PHOTO as string)}
                alt="photo"
                height={234}
                width={376}
                wrapperProps={{
                  position: "relative",
                  borderRadius: "md",
                  overflow: "hidden",
                }}
                priority
              />
            </>
          </FileInput>
          <Text color="#a7a7a7" fontSize="13px" mb={2}>
            Catatan: Gambar harus jelas dan tidak terpotong. File maksimal 1Mb
            dengan format Jpeg atau PNG
          </Text>
          <Text color="#d9001b" fontSize="10px" fontStyle="italic">
            {errors?.photo}
          </Text>
        </Box>
      </HStack>

      <Flex justifyContent="center" mb={4}>
        <Box mr={3} mt={2}>
          <Checkbox
            onChange={(e) => {
              setAgree(e.target.checked);
            }}
            borderColor="main.500"
          />
        </Box>
        <Box w="470px">
          <Text as="span" fontSize="sm">
            Dengan melanjutkan, saya telah membaca dan menyetujui{" "}
          </Text>
          <Navigate name="TNC">
            <Link as="span" color="#2b8e8e" fontSize="sm" display="inline">
              Syarat & Ketentuan SehatQ
            </Link>
          </Navigate>
        </Box>
      </Flex>
      <Flex justifyContent="center">
        <Button
          borderRadius="base"
          variant="solid"
          boxShadow="2xl"
          width="500px"
          height="50px"
          fontSize="md"
          fontWeight="semibold"
          disabled={!isAgree || isLoading}
          isLoading={isLoading}
          onClick={onSubmit}
        >
          Simpan
        </Button>
      </Flex>
    </Box>
  );
}
