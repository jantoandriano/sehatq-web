import React, { useState } from "react";
import { getRatingMessage, useNavigation } from "@sehatq/utils";
import { RatingInputValue } from "../../user-interfaces";
import { useGetProfile } from "../profile/profile-queries";
import {
  ArticleRatingInputDesktop,
  ArticleRatingInputDesktopSkeleton,
} from "./article-rating-input-desktop";
import {
  ArticleRatingInputMobile,
  ArticleRatingInputMobileSkeleton,
} from "./article-rating-input-mobile";
import {
  ArticleRatingCache,
  useGetArticleRating,
  useSubmitArticleRating,
} from "./article-rating-queries";

export type ArticleRatingInputProps = {
  isMobile?: boolean;
  articleId: number;
};

function selectData(articleRating: ArticleRatingCache) {
  return articleRating.data;
}

export function ArticleRatingInput(props: ArticleRatingInputProps) {
  const { isMobile, articleId } = props;
  const { navigate } = useNavigation();
  const [rating, setRating] = useState<RatingInputValue>("1");
  const [submited, setSubmited] = useState(false);
  const { isSuccess } = useGetProfile();
  const submitArticleRating = useSubmitArticleRating();
  const {
    data: articleRating,
    isLoading,
    refetch,
  } = useGetArticleRating(
    { articleId: `${articleId}` },
    { select: selectData }
  );

  function onSubmitRating(value: RatingInputValue) {
    if (isSuccess) {
      setRating(value);
      submitArticleRating.mutate(
        {
          articleId: articleId,
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
    } else {
      navigate("EXTERNAL_LOGIN");
    }
  }

  const otherProps = {
    average: articleRating?.average ?? 0,
    totalReview: articleRating?.totalReview ?? 0,
    rating,
    onSubmitRating,
    isLoading,
    submited,
  };

  if (isLoading) {
    return <ArticleRatingInputSkeleton isMobile={isMobile} />;
  }

  if (isMobile) {
    return <ArticleRatingInputMobile {...otherProps} />;
  }

  return <ArticleRatingInputDesktop {...otherProps} />;
}

export type ArticleRatingInputSkeletonProps = {
  isMobile?: boolean;
};

export function ArticleRatingInputSkeleton(
  props: ArticleRatingInputSkeletonProps
) {
  const { isMobile } = props;
  if (isMobile) return <ArticleRatingInputMobileSkeleton />;

  return <ArticleRatingInputDesktopSkeleton />;
}
