import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { format } from "date-fns";
import {
  Box,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea,
  DatePicker,
  Dropdown,
  Button,
  Input,
  HStack,
  ClockIcon,
} from "@sehatq/components";
import { useRouter } from "next/router";
import { useCreateConsultation } from "./consultation-queries";
import { ConsultationBanner } from "./consultation-banner";

type FormFields = {
  symptom?: string;
  name?: string;
  birthDate?: Date;
  gender?: string;
};

type FormErrors = {
  [K in keyof FormFields]?: string;
};

const fields: FormFields = {};
const errors: FormErrors = {};

export function ConsultationForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    fields,
    errors,
  });
  const { mutate: createConsultation, isLoading: isLoadingCreateConsultation } =
    useCreateConsultation();

  const storedUserChannelData = Cookies.get("userChannelData");
  const userChannelData = storedUserChannelData
    ? JSON.parse(storedUserChannelData)
    : {};

  useEffect(() => {
    setForm((prevState) => ({
      ...prevState,
      fields: {
        ...prevState.fields,
        name: userChannelData.name,
        birthDate: new Date(userChannelData.birthDate),
        gender: userChannelData.gender?.substring(0, 1),
      },
    }));
  }, []);

  function getFormErrors() {
    const errors: FormErrors = {};

    if (!form.fields.name) {
      errors.name = "Mohon isi nama lengkap Anda";
    }

    if (!form.fields.symptom) {
      errors.symptom = "Mohon isi keluhan Anda";
    }

    if (!form.fields.birthDate) {
      errors.birthDate = "Mohon isi tanggal lahir Anda";
    }

    if (!form.fields.gender) {
      errors.gender = "Mohon pilih jenis kelamin";
    }
    return errors;
  }

  function isFormValid() {
    return Object.values(getFormErrors()).every((error) => !error);
  }

  function submitConsultationData() {
    const consultationData = {
      userId: userChannelData.id,
      height: userChannelData.height,
      weight: userChannelData.weight,
      userPhotoUrl: userChannelData.photoUrl,
      identityNumber: userChannelData.idNumber,
      gender: form.fields.gender,
      symptom: form.fields.symptom,
      birthDate:
        form.fields.birthDate && format(form.fields.birthDate, "yyyy-MM-dd"),
      type: "regular-consultation",
      appChannel: userChannelData.channel,
    };
    createConsultation(consultationData, {
      onSuccess: (res) => {
        router.push(`/chat/${res.data.id}`);
      },
    });
  }

  function handleUpdateForm(
    key: keyof FormFields,
    value: string | Date | undefined
  ) {
    setForm((prevState) => ({
      ...prevState,
      fields: {
        ...prevState.fields,
        [key]: value,
      },
      errors: {
        ...prevState.errors,
        [key]: "",
      },
    }));
  }

  function handleSubmitForm(e: React.FormEvent) {
    e.preventDefault();
    if (isFormValid()) {
      submitConsultationData();
    } else {
      setForm((prevState) => ({
        ...prevState,
        errors: {
          ...prevState.errors,
          ...getFormErrors(),
        },
      }));
    }
  }

  return (
    <Box padding={3}>
      <Text
        as="h1"
        fontSize="sm"
        fontWeight="semibold"
        fontFamily="poppins"
        marginBottom={5}
      >
        Form Konsultasi
      </Text>
      <ConsultationBanner />
      <HStack
        borderRadius="8px"
        padding={3}
        backgroundColor="#F0F9FA"
        marginBottom={5}
      >
        <ClockIcon />
        <Text display="inline" fontSize="sm" marginLeft={2}>
          Waktu konsultasi 30 menit
        </Text>
      </HStack>
      <Text fontWeight="semibold" fontFamily="poppins" marginBottom={6}>
        Keluhan Pasien
      </Text>
      <form onSubmit={handleSubmitForm}>
        <FormControl
          variant="floating"
          isInvalid={!!form.errors.symptom}
          marginBottom={5}
        >
          <Box
            borderWidth={1}
            borderColor={
              form.errors.symptom ? "indicator.red" : "veryLightPink"
            }
            borderRadius={4}
          >
            <Textarea
              value={form.fields.symptom || ""}
              onChange={(e) => handleUpdateForm("symptom", e.target.value)}
              borderWidth={0}
              resize="none"
              placeholder="Keluhan"
              minHeight={86}
              maxLength={190}
            />
            <FormLabel>Keluhan</FormLabel>
            <Text paddingY={1} paddingX={3} textAlign="right">
              {form.fields.symptom ? form.fields.symptom.length : 0}/190
            </Text>
          </Box>
          <FormErrorMessage>{form.errors.symptom}</FormErrorMessage>
        </FormControl>
        <Text fontWeight="semibold" fontFamily="poppins" marginBottom={6}>
          Detail Pasien
        </Text>
        <FormControl
          variant="floating"
          isInvalid={!!form.errors.name}
          marginBottom={6}
        >
          <Input
            placeholder="Nama Lengkap"
            value={form.fields.name || ""}
            onChange={(e) => handleUpdateForm("name", e.target.value)}
          />
          <FormLabel>Nama Lengkap</FormLabel>
          <FormErrorMessage>{form.errors.name}</FormErrorMessage>
        </FormControl>
        <FormControl
          variant="floating"
          isInvalid={!!form.errors.birthDate}
          marginBottom={6}
        >
          <DatePicker
            onChange={(e) => handleUpdateForm("birthDate", e)}
            pickerProps={{
              fromYear: 1930,
              toYear: new Date().getFullYear(),
            }}
            inputProps={{ boxShadow: "none" }}
            variant="input"
            value={form.fields.birthDate || new Date()}
            isMobile
          />
          <FormLabel>Tanggal Lahir</FormLabel>
          <FormErrorMessage>{form.errors.birthDate}</FormErrorMessage>
        </FormControl>
        <FormControl
          variant="floating"
          isInvalid={!!form.errors.gender}
          marginBottom={6}
        >
          <Dropdown
            placeholder="Jenis Kelamin*"
            value={form.fields.gender || "f"}
            options={[
              { value: "m", label: "Pria" },
              { value: "f", label: "Wanita" },
            ]}
            onChange={(e) => handleUpdateForm("gender", e)}
            isMobile
          />
          <FormLabel>Jenis Kelamin</FormLabel>
          <FormErrorMessage>{form.errors.gender}</FormErrorMessage>
        </FormControl>
        <Button
          width="100%"
          type="submit"
          isLoading={isLoadingCreateConsultation}
        >
          Mulai Chat Dokter
        </Button>
      </form>
    </Box>
  );
}
