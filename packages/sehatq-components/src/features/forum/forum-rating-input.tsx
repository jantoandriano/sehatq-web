import React, { useState } from "react";
import { getRatingMessage } from "@sehatq/utils";
import { RatingInputCard } from "../general";
import { RatingInputValue } from "../../user-interfaces";
import {
  ForumRatingCache,
  useGetForumRating,
  useSubmitForumRating,
} from "./forum-rating-queries";

export type ForumRatingInputProps = {
  isMobile?: boolean;
  forumId: number;
};

function selectData(forumRating: ForumRatingCache) {
  return forumRating.data;
}

export function ForumRatingInput(props: ForumRatingInputProps) {
  const { isMobile, forumId } = props;
  const [rating, setRating] = useState<RatingInputValue>("1");
  const [submited, setSubmited] = useState(false);
  const submitForumRating = useSubmitForumRating();
  const {
    data: forumRating,
    isLoading,
    refetch,
  } = useGetForumRating({ forumId: `${forumId}` }, { select: selectData });

  function onSubmitRating(value: RatingInputValue) {
    setRating(value);
    submitForumRating.mutate(
      {
        forumId: forumId,
        rating: value,
        review: getRatingMessage(value),
      },
      {
        onSuccess: () => {
          refetch();
          setSubmited(true);
        },
      }
    );
  }

  return (
    <RatingInputCard
      isMobile={!!isMobile}
      average={forumRating?.average ?? 0}
      totalReview={forumRating?.totalReview ?? 0}
      rating={rating}
      onSubmit={onSubmitRating}
      isLoading={isLoading}
      submited={submited}
      requiredLogin
    />
  );
}
