import React, { useState } from "react";
import { useToast } from "../../user-interfaces";
import {
  CUSTOMER_SERVICE_REVIEW_OPTIONS,
  CustomerServiceReviewOptionKey,
} from "./customer-service-review-constants";
import {
  CustomerServiceReviewModalDesktop,
  CustomerServiceReviewModalDesktopProps,
} from "./customer-service-review-modal-desktop";
import {
  CustomerServiceReviewModalMobile,
  CustomerServiceReviewModalMobileProps,
} from "./customer-service-review-modal-mobile";
import { useReviewCustomerService } from "./customer-service-review-queries";

export type CustomerServiceReviewModalProps =
  | ({
      isMobile?: false;
      bookingId: string;
      onSuccessSubmit: () => void;
    } & CustomerServiceReviewModalDesktopProps["modalProps"])
  | ({
      isMobile: true;
      bookingId: string;
      onSuccessSubmit: () => void;
    } & CustomerServiceReviewModalMobileProps["modalProps"]);

export function CustomerServiceReviewModal(
  props: CustomerServiceReviewModalProps
) {
  const { isMobile, bookingId, onSuccessSubmit, ...modalProps } = props;

  const [selectedCSRating, setSelectedCSRating] = useState<
    CustomerServiceReviewOptionKey | ""
  >("");
  const [selectedCSReviewTags, setSelectedCSReviewTags] = useState<
    Record<string, boolean>
  >({});
  const [csReview, setCSReview] = useState("");
  const [formError, setFormError] = useState({ csReview: false });
  const reviewCustomerServiceMutation = useReviewCustomerService();
  const toast = useToast();

  function onSelectCSRating(rating: CustomerServiceReviewOptionKey) {
    setSelectedCSRating(rating);
    resetSelectedTagsReviewCs();
  }

  function onSelectCSReviewTags(tag: string) {
    setSelectedCSReviewTags((tags) => {
      if (tags[tag]) {
        delete tags[tag];

        return { ...tags };
      }

      return { ...tags, [tag]: true };
    });
  }

  function onChangeCSReview(e: React.ChangeEvent<HTMLTextAreaElement>) {
    if (e.target.value.length >= 3) setFormError({ csReview: false });

    if (e.target.value.length <= 500) setCSReview(e.target.value);
  }

  function resetSelectedTagsReviewCs() {
    setSelectedCSReviewTags({});
  }

  function onSubmitCSReview(e: React.FormEvent) {
    e.preventDefault();
    if (selectedCSRating && validationSubmitCustomerServiceReview()) {
      reviewCustomerServiceMutation.mutate({
        bookingId,
        review: csReview,
        rating: CUSTOMER_SERVICE_REVIEW_OPTIONS[selectedCSRating].value,
        tags: Object.keys(selectedCSReviewTags),
      });
    }
  }

  function validationSubmitCustomerServiceReview() {
    if (csReview.length < 3) {
      toast({
        message: "Ulasan harus diisi",
        status: "error",
      });
      setFormError({ csReview: true });
      return false;
    }

    return true;
  }

  function onSuccessSubmitCSReview() {
    modalProps.onClose();
    onSuccessSubmit();
  }

  const otherProps = {
    modalProps,
    selectedCSRating,
    onSelectCSRating,
    selectedCSReviewTags,
    onSelectCSReviewTags,
    onChangeCSReview,
    csReview,
    onSubmitCSReview,
    isLoading: reviewCustomerServiceMutation.isLoading,
    isSuccess: reviewCustomerServiceMutation.isSuccess,
    onSuccessSubmitCSReview,
    formError,
  };

  if (isMobile) return <CustomerServiceReviewModalMobile {...otherProps} />;

  return <CustomerServiceReviewModalDesktop {...otherProps} />;
}
