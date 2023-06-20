import React, { useReducer } from "react";
import { formatDate, useNavigation } from "@sehatq/utils";
import { FamilySelectedData } from "../profile/family-input";
import { useGetProfile } from "../profile";
import {
  FamilyMembersCache,
  useGetFamilyMembers,
} from "../profile/family-members-queries";
import {
  ConsultationFormDesktop,
  ConsultationFormDesktopSkeleton,
} from "./consultation-form-desktop";
import {
  ConsultationFormMobile,
  ConsultationFormMobileSkeleton,
} from "./consultation-form-mobile";
import { useSubmitConsultation } from "./consultation-queries";
import {
  initialConsultationFormState,
  consultationFormReducer,
  validateForm,
  Fields,
  FieldUnion,
} from "./consultation-form-reducer";

type ConsultationFormContext =
  | {
      type: "booking" | "walk-in";
      isShowNikAndAddress: boolean;
      consultationId: string;
    }
  | {
      type: "ethical-drug";
      drug: {
        id: number;
        name: string;
      };
    }
  | {
      type: "corporate" | "regular";
      drug?: {
        id: number;
        name: string;
      };
    };

export type ConsultationFormProps = {
  isMobile?: boolean;
  isLoading?: boolean;
} & ConsultationFormContext;

function generateConsultationVariables(
  values: Fields,
  context: ConsultationFormContext
) {
  const { address, identityNumber, phone, photoUrl, ...otherValues } = values;
  return {
    ...otherValues,
    phone: phone ?? "",
    birthDate: formatDate(values.birthDate as Date, "yyyy-MM-dd"),
    userPhotoUrl: photoUrl,
    historyDisease: "",
    ethicalDrug: "",
    allergies: "",
    ...("isShowNikAndAddress" in context && context.isShowNikAndAddress
      ? {
          address: address ?? "",
          identityNumber: identityNumber ?? "",
        }
      : undefined),
    ...(context.type === "regular"
      ? {
          type: "regular-consultation",
          ...(context.drug
            ? {
                drug: {
                  tokoId: context.drug.id,
                  name: context.drug.name,
                  qty: 1,
                },
              }
            : undefined),
        }
      : undefined),
    ...(context.type === "ethical-drug"
      ? {
          drug: {
            tokoId: context.drug.id,
            name: context.drug.name,
            qty: 1,
          },
        }
      : undefined),
    ...(context.type === "corporate" && context.drug
      ? {
          drug: {
            tokoId: context.drug.id,
            name: context.drug.name,
            qty: 1,
          },
        }
      : undefined),
    ...(context.type === "booking" || context.type === "walk-in"
      ? {
          status: "initToPending" as const,
          consultationId: context.consultationId,
        }
      : undefined),
  };
}

function selectFamily(data: FamilyMembersCache) {
  return [
    ...data.map((familyMember) => ({
      userId: familyMember.id,
      name: familyMember.name,
      photoUrl: familyMember.imgSrc,
      age: familyMember.age,
      relation: familyMember.relation,
      height: familyMember.height,
      weight: familyMember.weight,
      birthDate: familyMember.birthDate,
      phone: familyMember.phone,
      address: familyMember.address,
      identityNumber: familyMember.identityNumber,
      gender: familyMember.gender,
    })),
  ];
}

export function ConsultationForm(props: ConsultationFormProps) {
  const isShowNikAndAddress =
    props.type === "booking" || props.type === "walk-in"
      ? props.isShowNikAndAddress
      : false;
  const drugName = "drug" in props && props.drug ? props.drug.name : null;
  const { data: profile } = useGetProfile();

  const [stateForm, dispatchStateForm] = useReducer(consultationFormReducer, {
    ...initialConsultationFormState,
    isShowNikAndAddress,
  });

  const submitForum = useSubmitConsultation();

  const { navigate } = useNavigation();

  const { data: members, isLoading } = useGetFamilyMembers(
    { includeMe: "1" },
    {
      select: selectFamily,
      enabled: Boolean(profile?.id),
    }
  );

  if (stateForm.isShowNikAndAddress !== isShowNikAndAddress) {
    dispatchStateForm({
      type: "change-show-nik-and-address",
      value: isShowNikAndAddress,
    });
  }
  if (!stateForm.values.userId && members && profile) {
    const defaultMember = members.find((f) => f.userId == profile?.id);
    if (defaultMember) {
      dispatchStateForm({
        type: "change-fields",
        fields: defaultMember,
      });
    }
  }

  if (!stateForm.values.symptom && drugName) {
    onChangeInput({
      name: "symptom",
      value: `Saya ingin membeli obat ${drugName}`,
    });
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errors = validateForm(stateForm.values, isShowNikAndAddress);
    const hasError = Object.values(errors).some((value) => Boolean(value));

    if (!hasError) {
      const values = generateConsultationVariables(stateForm.values, props);
      submitForum.mutate(values, {
        onSuccess: (response) => {
          if (props.type === "booking") {
            navigate("TELEMEDICINES");
          } else if (props.type === "walk-in") {
            navigate("TELEMED_CHAT", {
              consultationId: props.consultationId,
            });
          } else {
            if (response.paymentPageUrl) {
              navigate(response.paymentPageUrl);
            } else {
              navigate("TELEMED_CHAT", {
                consultationId: response.consultationId,
              });
            }
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

  function onChangeMember(value: FamilySelectedData | undefined) {
    if (value) {
      dispatchStateForm({
        type: "change-fields",
        fields: value,
        isEnableValidate: true,
      });
    }
  }

  function onChangeInput(field: FieldUnion) {
    dispatchStateForm({
      ...field,
      type: "change-field",
      isEnableValidate: true,
    });
  }

  if (isLoading || props.isLoading) {
    return <ConsultationFormSkeleton isMobile={props.isMobile} />;
  }

  const otherProps = {
    onSubmit,
    onChangeInput,
    onChangeMember,
    errors: stateForm.errors,
    isLoading: submitForum.isLoading,
    values: stateForm.values,
    isShowNikAndAddress,
  };

  if (props.isMobile) {
    return <ConsultationFormMobile {...otherProps} />;
  }
  return <ConsultationFormDesktop {...otherProps} />;
}

export type ConsultationFormSkeletonProps = {
  isMobile?: boolean;
};

export function ConsultationFormSkeleton(props: ConsultationFormSkeletonProps) {
  if (props.isMobile) {
    return <ConsultationFormMobileSkeleton />;
  }
  return <ConsultationFormDesktopSkeleton />;
}
