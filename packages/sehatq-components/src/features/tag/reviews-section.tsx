import React from "react";

import { useGetReviews, ReviewsCache, useGetReviewsFeatured } from "../review";
import {
  ReviewsSectionDesktop,
  ReviewSectionDesktopSkeleton,
} from "./reviews-section-desktop";
import {
  ReviewsSectionMobile,
  ReviewSectionMobileSkeleton,
} from "./reviews-section-mobile";

function selectData(ReviewList: ReviewsCache) {
  return ReviewList.data.slice(0, 3).map((review) => {
    return {
      id: review.id,
      slug: review.slug,
      imageUrl: review.imageUrl,
      imageAlt: review.imageAlt,
      title: review.title,
      meta: review.meta,
      category: review.category,
      author: review.author,
      publishedDate: review.publishedDate,
    };
  });
}

export type ReviewsSectionSkeletonProps = {
  isMobile?: boolean;
};

export type ReviewsSectionProps = {
  isMobile?: boolean;
  tagSlug: string;
};

export function ReviewsSection(props: ReviewsSectionProps) {
  const { isMobile, tagSlug } = props;

  const query = {
    page: "1",
    perPage: "3",
    tagSlug,
  };

  const {
    data: reviews,
    isLoading,
    error,
  } = useGetReviews(query, {
    select: selectData,
  });

  const { data: featured } = useGetReviewsFeatured();

  const otherProps = {
    reviews: error ? [] : reviews ?? [],
    featured: featured && featured.length > 0 ? featured[0] : null,
    tagSlug,
  };

  if (isLoading) {
    return <ReviewsSectionSkeleton isMobile={isMobile} />;
  }

  if (reviews?.length === 0) {
    return null;
  }

  if (isMobile) {
    return <ReviewsSectionMobile {...otherProps} />;
  }

  return <ReviewsSectionDesktop {...otherProps} />;
}

export function ReviewsSectionSkeleton(props: ReviewsSectionSkeletonProps) {
  const { isMobile } = props;
  if (isMobile) return <ReviewSectionMobileSkeleton />;
  return <ReviewSectionDesktopSkeleton />;
}
