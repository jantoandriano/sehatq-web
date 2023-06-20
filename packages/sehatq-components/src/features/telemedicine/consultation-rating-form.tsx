import React, { useReducer } from "react";
import { useNavigation } from "@sehatq/utils";
import {
  SehatqUserIcon,
  useImage,
  RatingInputValue,
} from "../../user-interfaces";
import { useGetProfile } from "../profile";
import { ConsultationRatingFormDesktop } from "./consultation-rating-form-desktop";
import { ConsultationRatingFormMobile } from "./consultation-rating-form-mobile";
import {
  TelemedicineDoctorCache,
  useGetTelemedicineDoctor,
} from "./doctor-queries";
import { useSubmitConsultationRating } from "./consultation-queries";

export type ConsultationRatingFormProps = {
  isMobile?: boolean;
  doctorId: string;
  consultationId: string;
  enabledFetch?: boolean;
};

function selectTelemedicineDoctor(doctor: TelemedicineDoctorCache) {
  return doctor.data;
}

const initialStateForm = {
  values: {
    review: "",
    tags: {},
    rating: "5" as const,
  },
  errors: {},
};

export interface PayloadValues {
  review?: string;
  tags?: Record<string, boolean>;
  rating: RatingInputValue;
}

function validateForm(values: PayloadValues) {
  const errors: Record<string, string | undefined> = {};
  if (Number(values.rating) <= 1) {
    if (!values.review) {
      errors.review = "Ulasan wajib diisi";
    } else if (values.review.length > 500) {
      errors.review = "Maksimum 500 karakter";
    } else if (values.review.length < 5) {
      errors.review = "Minimum 5 karakter";
    }
    return errors;
  }
}

export interface PayloadForm {
  values: PayloadValues;
  errors?: Record<string, string | undefined>;
}

function formReducer(
  state: PayloadForm,
  payload: {
    name: string;
    value: string | Record<string, boolean> | RatingInputValue;
    errors?: Record<string, string | undefined>;
  }
) {
  const values = {
    ...state.values,
    [payload.name]: payload.value,
  };

  return {
    ...state,
    values,
    errors: {
      ...state.errors,
      [payload.name]: validateForm(values)?.[payload.name],
    },
  };
}

export function ConsultationRatingForm(props: ConsultationRatingFormProps) {
  const { isMobile, consultationId, doctorId, enabledFetch = true } = props;
  const Image = useImage();
  const { navigate } = useNavigation();
  const [stateForm, dispatchStateForm] = useReducer(
    formReducer,
    initialStateForm
  );
  const { data: profile, isLoading: isProfileLoading } = useGetProfile();
  const submitConsultationRatingMutation = useSubmitConsultationRating();
  const { data: doctor } = useGetTelemedicineDoctor(
    { doctorId },
    { select: selectTelemedicineDoctor, enabled: enabledFetch }
  );

  const doctorImage = doctor?.photoUrl ? (
    <Image
      alt={doctor.name}
      src={doctor.photoUrl}
      layout="fill"
      objectFit="contain"
      wrapperProps={{
        margin: "0 auto",
        width: "90px",
        height: "90px",
        borderRadius: "45px",
        overflow: "hidden",
      }}
    />
  ) : (
    <SehatqUserIcon boxSize="90px" />
  );

  async function onChangeInput(name: string, value: string) {
    let customValue = {};
    if (name === "rating" && stateForm.values.rating != value) {
      await dispatchStateForm({
        name: "rating",
        value,
        errors: undefined,
      });
      await dispatchStateForm({
        name: "tags",
        value: {},
        errors: {},
      });
      await dispatchStateForm({
        name: "review",
        value: "",
        errors: {},
      });
    } else if (name === "tags") {
      const handleTags = () => {
        const tags = stateForm.values.tags;
        if (tags?.[value]) {
          delete tags[value];

          return { ...tags };
        }

        return { ...tags, [value]: true };
      };
      customValue = handleTags();
      await dispatchStateForm({
        name: "tags",
        value: customValue,
        errors: {},
      });
    } else {
      await dispatchStateForm({
        name,
        value,
      });
    }
  }

  function onSubmitDoctorReview(e: React.FormEvent) {
    e.preventDefault();
    if (profile?.id) {
      const body = {
        consultationId,
        review: stateForm.values.review,
        rating: Number(stateForm.values.rating),
        tags: stateForm.values.tags && Object.keys(stateForm.values.tags),
      };
      submitConsultationRatingMutation.mutate(body, {
        onSuccess: () => {
          navigate("TELEMEDICINES");
        },
      });
    } else {
      navigate("EXTERNAL_LOGIN");
    }
  }

  let disableSubmit = false;
  if (Number(stateForm.values.rating) <= 1 && !stateForm.values.review) {
    disableSubmit = true;
  } else if (Number(stateForm.values.rating) <= 1 && stateForm.errors) {
    Object.keys(stateForm.errors ?? {}).forEach((key) => {
      if (stateForm.errors[key]) {
        disableSubmit = true;
      }
    });
  }

  const newProps = {
    consultationId,
    selectedDoctorRating: stateForm.values.rating,
    onSubmitDoctorReview,
    selectedDoctorReviewTags: stateForm.values.tags,
    doctorReview: stateForm.values.review,
    isLoadingSubmit:
      submitConsultationRatingMutation.isLoading || isProfileLoading,
    errors: stateForm.errors,
    isDisableSubmit: disableSubmit,
    onChangeInput,
    doctor,
    doctorImage,
  };

  if (isMobile) {
    return <ConsultationRatingFormMobile {...newProps} />;
  }
  return <ConsultationRatingFormDesktop {...newProps} />;
}
