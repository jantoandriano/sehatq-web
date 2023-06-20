import React from "react";
import { useAssets, useNavigation } from "@sehatq/utils";
import {
  Button,
  Text,
  Box,
  Flex,
  FormControl,
  FormLabel,
  DatePicker,
  FormErrorMessage,
  Input,
  Dropdown,
  Checkbox,
  Link,
  useImage,
  FileInput,
} from "../../user-interfaces";
import { FieldUnion, Fields } from "./family-form-reducer";

export type FamilyFormMobileProps = {
  isLoading: boolean;
  isAgree: boolean;
  values: Fields;
  onSubmit: (e: React.FormEvent) => void;
  onChangeInput: (field: FieldUnion) => void;
  onChangePhoto: (files: File[]) => void;
  setAgree: (value: boolean) => void;
  errors?: Record<string, string | undefined>;
};

export function FamilyFormMobile(props: FamilyFormMobileProps) {
  const {
    isAgree,
    onChangeInput,
    onChangePhoto,
    setAgree,
    values,
    errors,
    onSubmit,
  } = props;
  const { Navigate } = useNavigation();
  const Image = useImage();
  const ASSETS = useAssets(["BG_PHOTO"]);

  return (
    <>
      <Box bg="white" boxShadow="sm" px={4} py={5} borderRadius="10px">
        <FormControl
          variant="floating"
          mb={6}
          isInvalid={Boolean(errors?.name)}
        >
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
        <FormControl
          variant="floating"
          my={6}
          isInvalid={Boolean(errors?.birthDate)}
        >
          <DatePicker
            isMobile
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
        <FormControl
          variant="floating"
          my={6}
          isInvalid={Boolean(errors?.phone)}
        >
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
        <FormControl
          variant="floating"
          my={6}
          isInvalid={Boolean(errors?.relation)}
        >
          <Dropdown
            isMobile
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
        <FormControl
          variant="floating"
          my={6}
          isInvalid={errors?.gender ? true : false}
        >
          <Dropdown
            isMobile
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
        <FormControl
          variant="floating"
          my={6}
          isInvalid={Boolean(errors?.height)}
        >
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
        <FormControl
          variant="floating"
          my={6}
          isInvalid={Boolean(errors?.weight)}
        >
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

        <Text
          color="charcoalGrey"
          fontSize="sm"
          fontFamily="poppins"
          width="full"
          pt={4}
        >
          Pilih Jenis Identitas
        </Text>
        <FormControl
          variant="floating"
          my={6}
          isInvalid={Boolean(errors?.relation)}
        >
          <Dropdown
            isMobile
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
          my={6}
          isInvalid={Boolean(errors?.identityNumber)}
        >
          <Input
            border="1px solid"
            borderRadius="base"
            background="white"
            type="number"
            placeholder="Nomor Identitas"
            value={(values.identityNumber as string) ?? ""}
            onChange={(e) => {
              e.preventDefault();
              onChangeInput({ name: "identityNumber", value: e.target.value });
            }}
          />
          <FormLabel>Nomor Identitas</FormLabel>
          <FormErrorMessage fontSize="xxs" fontStyle="italic">
            {errors?.identityNumber}
          </FormErrorMessage>
        </FormControl>

        <Text color="charcoalGrey" fontSize="sm" fontWeight="semibold" mb={3}>
          Upload Foto Data Diri
        </Text>

        <FileInput
          boxProps={{
            ...(values.photo && {
              border: "1px solid #70cbcf",
              bg: "#f0f9fa",
            }),
            borderRadius: 4,
            height: "200px",
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
          <Image
            src={values.photo || (ASSETS.BG_PHOTO as string)}
            alt="photo"
            layout="fill"
            objectFit="contain"
            wrapperProps={{
              width: "100%",
              height: "100%",
              position: "relative",
              borderRadius: "md",
              overflow: "hidden",
            }}
            priority
          />
        </FileInput>
        <Text color="#d9001b" fontSize="10px" fontStyle="italic" my={2}>
          {errors?.photo}
        </Text>
        <Text color="#a7a7a7" fontSize="10px" mb={5}>
          Catatan: Gambar harus jelas dan tidak terpotong. File maksimal 5mb
          dengan format Jpeg atau PNG.
        </Text>

        <Flex justifyContent="center" mb={4}>
          <Box mr={3} mt={2}>
            <Checkbox
              onChange={(e) => {
                setAgree(e.target.checked);
              }}
              borderColor="main.500"
            />
          </Box>
          <Box>
            <Text as="span" fontSize="xs">
              Dengan melanjutkan, saya telah membaca dan menyetujui{" "}
            </Text>
            <Navigate name="TNC">
              <Link as="span" color="#2b8e8e" fontSize="xs">
                Syarat & Ketentuan SehatQ
              </Link>
            </Navigate>
          </Box>
        </Flex>
      </Box>
      <Flex justifyContent="center" my={5}>
        <Button
          borderRadius="base"
          variant="solid"
          boxShadow="2xl"
          width="full"
          height="40px"
          fontSize="md"
          fontWeight="semibold"
          onClick={onSubmit}
          disabled={!isAgree}
        >
          Simpan
        </Button>
      </Flex>
    </>
  );
}
