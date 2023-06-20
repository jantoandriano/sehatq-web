import React from "react";
import { useNavigation } from "@sehatq/utils";
import { useGetProfile } from "../profile/profile-queries";
import { RatingInputValue } from "../../user-interfaces";
import {
  RatingInputCardDesktop,
  RatingInputCardDesktopSkeleton,
} from "./rating-input-card-desktop";
import {
  RatingInputCardMobile,
  RatingInputCardMobileSkeleton,
} from "./rating-input-card-mobile";

export type RatingInputCardProps = {
  isMobile: boolean;
  rating?: RatingInputValue;
  average?: number;
  totalReview?: number;
  isLoading?: boolean;
  submited?: boolean;
  onSubmit: (rating: RatingInputValue) => void;
  requiredLogin?: boolean;
};

export function RatingInputCard(props: RatingInputCardProps) {
  const {
    isMobile,
    isLoading,
    submited,
    average,
    totalReview,
    rating,
    onSubmit,
    requiredLogin,
  } = props;
  const { navigate } = useNavigation();
  const { isSuccess } = useGetProfile();

  function onSubmitRating(value: RatingInputValue) {
    if (isSuccess || !requiredLogin) {
      onSubmit(value);
    } else {
      navigate("EXTERNAL_LOGIN");
    }
  }

  const otherProps = {
    average: average ?? 0,
    totalReview: totalReview ?? 0,
    rating: rating ?? "1",
    onSubmitRating,
    isLoading,
    submited: !!submited,
  };

  if (isLoading) {
    return <RatingInputCardSkeleton isMobile={isMobile} />;
  }

  if (isMobile) {
    return <RatingInputCardMobile {...otherProps} />;
  }

  return <RatingInputCardDesktop {...otherProps} />;
}

export type RatingInputCardSkeletonProps = {
  isMobile?: boolean;
};

export function RatingInputCardSkeleton(props: RatingInputCardSkeletonProps) {
  const { isMobile } = props;
  if (isMobile) return <RatingInputCardMobileSkeleton />;

  return <RatingInputCardDesktopSkeleton />;
}
