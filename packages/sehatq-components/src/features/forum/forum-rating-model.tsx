export interface ForumRatingData {
  id: number;
  type: string;
  rating: {
    average: number;
    totalReview: number;
  };
}

export interface ForumRatingResponse {
  data: ForumRatingData[];
}

export interface ForumRatingInputResponse {
  meta: { message: string };
  data: ForumRatingData[];
}

export function modelForumRating(data: ForumRatingResponse["data"]) {
  return {
    average: data[0]?.rating?.average,
    totalReview: data[0]?.rating?.totalReview,
  };
}

export type ForumRating = ReturnType<typeof modelForumRating>;
