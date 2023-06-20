/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useReducer, useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Text,
  Divider,
  Textarea,
  Input,
} from "@sehatq/components";
import { Address } from "@queries/address/address-queries";
import {
  ShippingAddress,
  useAddShippingAddress,
  useShippingAddresses,
  useUpdateCartShippingAddress,
  useUpdateShippingAddress,
} from "@queries/address/shipping-address-queries";
import { useGetPrescriptionCart } from "src/features/prescription-cart";
import { useAuth } from "src/contexts/auth";
import { validatePhoneNumber } from "src/utils/validatePhoneNumber";
import Header from "./header";
import Maps from "./maps";

type SelectedAddress = Address["data"];

type FormAddressProps = {
  onClickBack: () => void;
  selectedAddress: SelectedAddress;
  referrer: "claim" | "drug-prescription";
  backToCart: () => void;
};

type FormValues = {
  address: string;
  label: string;
  phone: string;
  note?: string;
  receiver: string;
  subdistrictDetail: string;
  zipCode: string;
};

type FormErrors = {
  address: string;
  label: string;
  phone: string;
  receiver: string;
  subdistrictDetail: string;
  zipCode: string;
};

function validateForm(values: FormValues) {
  const errors = {} as FormErrors;
  if (!values.label) {
    errors.label = "Label alamat belum diisi";
  }
  if (!values.receiver) {
    errors.receiver = "Nama penerima belum diisi";
  }
  if (!values.phone) {
    errors.phone = "No. telepon belum diisi";
  } else if (!validatePhoneNumber(`${values.phone}`)) {
    errors.phone = "Format no. telepon salah";
  }
  if (!values.address) {
    errors.address = "Detail alamat belum diisi";
  }
  if (!values.subdistrictDetail) {
    errors.subdistrictDetail =
      "Kelurahan / kecamatan / kota / provinsi belum diisi";
  }
  if (!values.zipCode) {
    errors.zipCode = "Kode pos belum diisi";
  }
  return errors;
}

const useForm = (initialShippingAddress: ShippingAddress["data"]) => {
  const initialStateForm = {
    values: {
      ...initialShippingAddress,
      subdistrictDetail: [
        initialShippingAddress?.subdistrict,
        initialShippingAddress?.district,
        initialShippingAddress?.city,
        initialShippingAddress?.province,
      ]
        .filter((e) => e)
        .join(", "),
    },
    errors: {} as FormErrors,
  };

  type FormState = typeof initialStateForm;
  // type FormAction =
  //   | {
  //       type: "CHANGE";
  //       payload: { name: string; value: string | null | undefined };
  //     }
  //   | {
  //       type: "ERROR";
  //       payload: { errors: FormErrors };
  //     };

  function formReducer(state: FormState, action: any): FormState {
    const { type, payload } = action;
    switch (type) {
      case "CHANGE": {
        const values = {
          ...state.values,
          [payload.name]: payload.value,
        };
        return {
          ...state,
          values,
          errors: {
            ...state.errors,
            [payload.name]:
              validateForm(values)[payload.name as keyof FormErrors],
          },
        };
      }
      case "ERROR":
        return {
          ...state,
          errors: payload.errors,
        };
      default:
        return state;
    }
  }

  const [stateForm, dispatchStateForm] = useReducer(
    formReducer,
    initialStateForm
  );

  const setFormValue = (name: string, value: string) => {
    dispatchStateForm({
      type: "CHANGE",
      payload: { name, value },
    });
  };

  const setFormError = (errors: FormErrors) => {
    dispatchStateForm({
      type: "ERROR",
      payload: { errors },
    });
  };

  return { stateForm, dispatchStateForm, setFormValue, setFormError };
};

const FormAddress = ({
  onClickBack,
  selectedAddress,
  referrer,
  backToCart,
}: FormAddressProps) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();
  const {
    user: { token },
  } = useAuth();
  const shippingAddresses = useShippingAddresses({
    enabled: referrer !== "claim",
  });
  const addShippingAddress = useAddShippingAddress();
  const updateShippingAddress = useUpdateShippingAddress({
    withoutHeaderChannel: referrer !== "claim",
  });
  const { mutate: updateCartShippingAddress } = useUpdateCartShippingAddress();
  const { data: prescriptionCart } = useGetPrescriptionCart(
    { token },
    { enabled: referrer === "claim" && !!token }
  );

  const { stateForm, setFormValue, setFormError } = useForm({
    ...selectedAddress,
    province: selectedAddress?.province || "",
    city: selectedAddress?.city || "",
    district: selectedAddress?.district || "",
    subdistrict: selectedAddress?.subDistrict || "",
    zipCode: selectedAddress?.zipCode || "",
    googlePlaceId: selectedAddress.placeId,
    note: "",
    label: "",
    receiver: "",
    phone: "",
  });

  useEffect(() => {
    if (
      !!shippingAddresses?.data?.data?.length ||
      prescriptionCart?.meta.shippingAddress
    ) {
      setFormValue(
        "note",
        shippingAddresses?.data?.data[0].note ||
          prescriptionCart?.meta.shippingAddress.note ||
          ""
      );
      setFormValue(
        "label",
        shippingAddresses?.data?.data[0].label ||
          prescriptionCart?.meta.shippingAddress.label ||
          ""
      );
      setFormValue(
        "receiver",
        shippingAddresses?.data?.data[0].receiver ||
          prescriptionCart?.meta.shippingAddress.receiver ||
          ""
      );
      setFormValue(
        "phone",
        shippingAddresses?.data?.data[0].phone ||
          prescriptionCart?.meta.shippingAddress.phone ||
          ""
      );
    }
  }, [shippingAddresses?.data?.data, prescriptionCart?.meta.shippingAddress]);

  const handleSubmit = () => {
    setIsSubmitting(true);
    const errors = validateForm(stateForm.values);
    if (
      Object.keys(errors).some((key) =>
        Boolean(errors[key as keyof FormErrors])
      )
    ) {
      setIsSubmitting(false);
      setFormError(errors);
    } else if (router.query.shippingAddressId || referrer === "claim") {
      updateShippingAddress
        .mutateAsync({
          ...stateForm.values,
          default: true,
          id:
            referrer === "claim"
              ? (prescriptionCart?.meta.shippingAddress.addressId as number)
              : (router.query.shippingAddressId as string),
        })
        .then(() => {
          if (referrer === "claim") {
            updateCartShippingAddress(
              {
                cartId: prescriptionCart?.meta.cartId ?? "",
                id: prescriptionCart?.meta.shippingAddress.addressId as number,
              },
              {
                onSettled: () => setIsSubmitting(false),
                onSuccess: () => backToCart(),
              }
            );
          } else {
            router.back();
          }
        })
        .catch(() => setIsSubmitting(false));
    } else {
      addShippingAddress.mutate(
        {
          ...stateForm.values,
          default: true,
        },
        {
          onSettled: () => setIsSubmitting(false),
          onSuccess: () => {
            router.push(`/drug-recommendation/${router.query.id}`);
          },
        }
      );
    }
    // TODO: await until success save adress
  };

  const renderMap = () => (
    <>
      <Maps
        id="formAddressMap"
        location={{
          lat: selectedAddress?.latitude || 0,
          lng: selectedAddress?.longitude || 0,
        }}
        height="25vh"
        hideCurrentLocation
      />
      <Box
        size="sm"
        display="block"
        position="relative"
        width="150px"
        p="8px"
        textAlign="center"
        background="#6D7278"
        color="#fff"
        m="auto"
        mt="-60px"
        mb="16px"
        borderRadius="4px"
        cursor="pointer"
        onClick={onClickBack}
      >
        Ubah Pin Poin
      </Box>
    </>
  );

  const renderSelectedAddress = () => (
    <Box p="16px 8px">
      <Text
        mt="6px"
        mb="3px"
        fontFamily="poppins"
        fontSize="sm"
        fontWeight="semibold"
      >
        {selectedAddress?.address}
      </Text>
      <Text fontSize="xs" fontWeight="light">
        {selectedAddress?.description}
      </Text>
    </Box>
  );

  const renderForm = () => {
    const renderInputText = (
      field: string,
      value: string | null | undefined,
      placeholder: string,
      error: string | null | undefined,
      isDisabled?: boolean
    ) => (
      <Box my={4}>
        <Input
          value={value || ""}
          onChange={(e) => setFormValue(field, e.target.value)}
          borderRadius="6px"
          size="sm"
          placeholder={placeholder}
          isInvalid={!!error}
          isDisabled={isDisabled}
        />
        <Text fontSize="xs" color="cherry.500" mt={1}>
          {error}
        </Text>
      </Box>
    );
    return (
      <Box p="18px 0">
        <Box>
          <Textarea
            value={stateForm.values.address}
            onChange={(e) => setFormValue("address", e.target.value)}
            borderRadius="6px"
            size="sm"
            placeholder="Detail Alamat"
            rows={5}
            isInvalid={!!stateForm.errors.address}
          />
          <Text fontSize="xs" color="cherry.500" mt={1}>
            {stateForm.errors.address}
          </Text>
        </Box>
        {renderInputText(
          "subdistrictDetail",
          stateForm.values.subdistrictDetail,
          "Kelurahan / Kecamatan / Kota / Provinsi",
          stateForm.errors.subdistrictDetail
        )}
        {renderInputText(
          "zipCode",
          stateForm.values.zipCode,
          "Kode Pos",
          stateForm.errors.zipCode,
          true
        )}
        {renderInputText("note", stateForm.values.note, "Catatan", "")}
        {renderInputText(
          "label",
          stateForm.values.label,
          "Label Alamat",
          stateForm.errors.label
        )}
        {renderInputText(
          "receiver",
          stateForm.values.receiver,
          "Nama Penerima",
          stateForm.errors.receiver
        )}
        {renderInputText(
          "phone",
          stateForm.values.phone,
          "No. Telepon",
          stateForm.errors.phone
        )}
      </Box>
    );
  };

  return (
    <>
      <Header title="Atur alamat" onClickBack={onClickBack} />
      {!!selectedAddress && (
        <>
          {renderMap()}
          <Box p={6}>
            {renderSelectedAddress()}
            <Divider borderColor="veryLightPink" border="solid 0.5px" />
            {renderForm()}
            <Button onClick={handleSubmit} isLoading={isSubmitting} isFullWidth>
              Simpan
            </Button>
          </Box>
        </>
      )}
    </>
  );
};

export default FormAddress;
