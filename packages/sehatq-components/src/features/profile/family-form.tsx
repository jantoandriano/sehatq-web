import React, { useReducer, useState } from "react";
import { toBase64, formatDate } from "@sehatq/utils";

import { useSubmitFamilyForm } from "../profile/family-members-queries";
import { FamilyFormMobile } from "./family-form-mobile";
import { FamilyFormDesktop } from "./family-form-desktop";

import {
  initialFamilyFormState,
  familyFormReducer,
  validateForm,
  FieldUnion,
  Fields,
} from "./family-form-reducer";

export type FamilyFormProps = {
  isMobile: boolean;
  onSuccess?: () => void;
};

export interface ReturnGenerateFamilyForm {
  name: string;
  relationId: number;
  gender: string;
  birthDate: string;
  height: number;
  weight: number;
  phone: string;
  photo: string;
  idType: string;
  idNumber: string;
  idImageBase64: string;
  address: string;
}

function generateFamilyFormVariables(values: Fields): ReturnGenerateFamilyForm {
  return {
    name: values.name,
    relationId: parseInt(values.relation),
    gender: values.gender,
    birthDate: formatDate(values.birthDate as Date, "yyyy-MM-dd"),
    height: parseInt(values.height),
    weight: parseInt(values.weight),
    phone: values.phone,
    photo: values.photo,
    idType: values.type,
    idNumber: values.identityNumber,
    idImageBase64: "",
    address: "",
  };
}

export function FamilyForm(props: FamilyFormProps) {
  const { isMobile, onSuccess } = props;
  const [isAgree, setAgree] = useState<boolean>(false);
  const [stateForm, dispatchStateForm] = useReducer(
    familyFormReducer,
    initialFamilyFormState
  );

  const { mutate, isLoading } = useSubmitFamilyForm();

  function onChangeInput(field: FieldUnion) {
    dispatchStateForm({
      ...field,
      type: "change-field",
      isEnableValidate: true,
    });
  }

  async function onChangePhoto(files: File[]) {
    const photo = (await toBase64(files[0])) as string;
    dispatchStateForm({
      name: "photo",
      value: photo,
      type: "change-field",
      isEnableValidate: true,
    });
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errors = validateForm(stateForm.values);
    const hasError = Object.values(errors).some((value) => Boolean(value));

    if (!hasError) {
      const values = generateFamilyFormVariables(stateForm.values);
      mutate(values, {
        onSuccess: () => {
          if (onSuccess) {
            onSuccess();
          }
        },
      });
    } else {
      dispatchStateForm({
        type: "change-error",
        value: errors,
      });
    }
  }

  const newProps = {
    isAgree,
    isLoading,
    values: stateForm.values,
    errors: stateForm.errors,
    setAgree,
    onChangeInput,
    onChangePhoto,
    onSubmit,
  };

  if (isMobile) {
    return <FamilyFormMobile {...newProps} />;
  }
  return <FamilyFormDesktop {...newProps} />;
}
