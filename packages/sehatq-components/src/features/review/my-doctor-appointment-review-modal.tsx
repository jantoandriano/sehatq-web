import React, { useState } from "react";
import { useToast } from "../../user-interfaces";
import {
  MyDoctorAppointmentReviewModalDesktop,
  MyDoctorAppointmentReviewModalDesktopProps,
} from "./my-doctor-appointment-review-modal-desktop";
import {
  MyDoctorAppointmentReviewModalMobile,
  MyDoctorAppointmentReviewModalMobileProps,
} from "./my-doctor-appointment-review-modal-mobile";
import { useReviewMyDoctorAppointment } from "./my-doctor-appointment-review-queries";

export type MyDoctorAppointmentReviewModalProps =
  | ({
      isMobile?: false;
      bookingId: string;
      onSuccessSubmit: () => void;
    } & Pick<
      MyDoctorAppointmentReviewModalDesktopProps,
      "title" | "imageSrc" | "description"
    > &
      MyDoctorAppointmentReviewModalDesktopProps["modalProps"])
  | ({
      isMobile: true;
      bookingId: string;
      onSuccessSubmit: () => void;
    } & Pick<
      MyDoctorAppointmentReviewModalMobileProps,
      "title" | "imageSrc" | "description"
    > &
      MyDoctorAppointmentReviewModalMobileProps["modalProps"]);

export function MyDoctorAppointmentReviewModal(
  props: MyDoctorAppointmentReviewModalProps
) {
  const {
    isMobile,
    title,
    imageSrc,
    description,
    bookingId,
    onSuccessSubmit,
    ...modalProps
  } = props;

  const [selectedDoctorRating, setSelectedDoctorRating] =
    useState<
      MyDoctorAppointmentReviewModalDesktopProps["selectedDoctorRating"]
    >(0);
  const [selectedDoctorReviewTags, setSelectedDoctorReviewTags] = useState<
    Record<string, boolean>
  >({});
  const [doctorReview, setDoctorReview] = useState("");
  const [formError, setFormError] = useState({ doctorReview: false });

  const reviewMyDoctorAppointmentMutation = useReviewMyDoctorAppointment();
  const toast = useToast();

  function onSelectDoctorRating(
    rating: MyDoctorAppointmentReviewModalDesktopProps["selectedDoctorRating"]
  ) {
    setSelectedDoctorRating(rating);
    resetSelectedTagsReviewCs();
  }

  function onSelectDoctorReviewTags(tag: string) {
    setSelectedDoctorReviewTags((tags) => {
      if (tags[tag]) {
        delete tags[tag];

        return { ...tags };
      }

      return { ...tags, [tag]: true };
    });
  }

  function onChangeDoctorReview(e: React.ChangeEvent<HTMLTextAreaElement>) {
    if (e.target.value.length >= 3) setFormError({ doctorReview: false });

    if (e.target.value.length <= 500) setDoctorReview(e.target.value);
  }

  function resetSelectedTagsReviewCs() {
    setSelectedDoctorReviewTags({});
  }

  function onSubmitDoctorReview(e: React.FormEvent) {
    e.preventDefault();
    if (validationSubmitDoctorReview()) {
      reviewMyDoctorAppointmentMutation.mutate(
        {
          bookingId,
          review: doctorReview,
          rating: selectedDoctorRating,
          tags: Object.keys(selectedDoctorReviewTags),
        },
        {
          onSuccess: () => {
            onSuccessSubmit();
          },
        }
      );
    }
  }

  function validationSubmitDoctorReview() {
    if (doctorReview.length < 3) {
      toast({
        message: "Ulasan harus diisi",
        status: "error",
      });
      setFormError({ doctorReview: true });
      return false;
    }

    return true;
  }

  const otherProps = {
    modalProps,
    title,
    imageSrc,
    description,
    selectedDoctorRating,
    onSelectDoctorRating,
    selectedDoctorReviewTags,
    onSelectDoctorReviewTags,
    onChangeDoctorReview,
    doctorReview,
    onSubmitDoctorReview,
    isLoading: reviewMyDoctorAppointmentMutation.isLoading,
    formError,
  };

  if (isMobile) return <MyDoctorAppointmentReviewModalMobile {...otherProps} />;

  return <MyDoctorAppointmentReviewModalDesktop {...otherProps} />;
}
