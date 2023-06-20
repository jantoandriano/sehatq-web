import { useNavigation } from "@sehatq/utils";
import React, { useEffect, useReducer, useState } from "react";
import { useToast } from "../../user-interfaces";
import { useGetProfile } from "../profile";
import { AddressesCache, useGetAddresses } from "../profile/address-query";
import { PrescriptionFormDesktop } from "./prescription-form-desktop";
import { PrescriptionFormMobile } from "./prescription-form-mobile";
import {
  FieldUnion,
  initialPrescriptionFormState,
  prescriptionFormReducer,
  validateForm,
} from "./prescription-form-reducer";
import { useSubmitPrescription } from "./prescription-queries";

export type PrescriptionFormProps = {
  isMobile?: boolean;
  consultationId?: string;
};

function selectAddresses(cache: AddressesCache) {
  return cache.data.map((item) => ({
    id: item.id,
    receiverName: item.receiverName,
    label: item.label,
    address: item.address,
    phone: item.phone,
    note: item.note,
    isDefault: item.isDefault,
    googlePlaceId: item.googlePlaceId,
  }));
}

const customStyleToastMobile = {
  isCenterText: false,
  wrapperProps: {
    mb: "60px",
    color: "#802323",
    borderRadius: "lg",
  },
  containerStyle: {
    width: "100%",
    padding: "16px",
  },
};

const customStyleToastDesktop = {
  isCenterText: true,
  containerStyle: {
    width: "100%",
  },
  wrapperProps: {
    mt: "130px",
    color: "#802323",
  },
};

export function PrescriptionForm(props: PrescriptionFormProps) {
  const [isShowAddreesInput, setShowAddressInput] = useState(false);
  const [stateForm, dispatchStateForm] = useReducer(prescriptionFormReducer, {
    ...initialPrescriptionFormState,
  });
  const [isLoading, setIsloading] = useState(false);
  const toast = useToast();
  const submitPrescription = useSubmitPrescription();
  const { isSuccess, isLoading: loadingProfile } = useGetProfile();
  const { navigate } = useNavigation();

  function changeSingleField(value: FieldUnion) {
    dispatchStateForm({
      ...value,
      type: "change-field",
      isEnableValidate: true,
    });
  }
  useGetAddresses(
    {
      query: "",
    },
    {
      select: selectAddresses,
      onSuccess(data) {
        const mainAddress = data.find((f) => f.isDefault);
        changeSingleField({
          name: "userAddressId",
          value: mainAddress ? `${mainAddress.id}` : "",
        });
      },
    }
  );

  if (!isSuccess && !loadingProfile) {
    navigate("EXTERNAL_LOGIN");
  }

  useEffect(() => {
    changeSingleField({
      name: "consultationId",
      value: props.consultationId ? Number(props.consultationId) : undefined,
    });
  }, [props.consultationId]);

  function onChangeInput(field: FieldUnion) {
    changeSingleField(field);
  }

  function onHideAddressInput() {
    setShowAddressInput(false);
  }

  function onShowAddressInput() {
    const errors = validateForm(stateForm.values);
    if (errors.images) {
      toast({
        status: "error",
        message: errors.images,
        position: props.isMobile ? "bottom" : "top",
        ...(props.isMobile ? customStyleToastMobile : customStyleToastDesktop),
      });
    } else {
      setShowAddressInput(true);
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errors = validateForm(stateForm.values);
    const hasError = Object.values(errors).some((value) => Boolean(value));
    if (!hasError) {
      setIsloading(true);
      submitPrescription.mutate(
        {
          ...stateForm.values,
          userAddressId: Number(stateForm.values.userAddressId),
          images: stateForm.values.images ?? [],
        },
        {
          onError: () => {
            setIsloading(false);
          },
        }
      );
    } else {
      const showErrorMessage = errors.images ?? errors.userAddressId;
      if (showErrorMessage) {
        toast({
          status: "error",
          message: showErrorMessage,
          position: props.isMobile ? "bottom" : "top",
          ...(props.isMobile
            ? customStyleToastMobile
            : customStyleToastDesktop),
        });
      }

      dispatchStateForm({
        type: "change-error",
        value: errors,
      });
    }
  }

  const otherProps = {
    values: stateForm.values,
    errors: stateForm.errors,
    onChangeInput,
    onSubmit,
    isLoading,
    consultationId: props.consultationId,
  };

  if (props.isMobile) {
    const mobileProps = {
      ...otherProps,
      isShowAddreesInput,
      onShowAddressInput,
      onHideAddressInput,
    };
    return <PrescriptionFormMobile {...mobileProps} />;
  }

  return <PrescriptionFormDesktop {...otherProps} />;
}
