export interface ArticleRatingData {
  id: number;
  type: string;
  rating: {
    average: number;
    totalReview: number;
  };
}

export interface ArticleRatingResponse {
  data: ArticleRatingData[];
}

export interface ArticleRatingInputResponse {
  meta: { message: string };
  data: ArticleRatingData[];
}

export function modelArticleRating(data: ArticleRatingResponse["data"]) {
  return {
    average: data[0].rating.average,
    totalReview: data[0].rating.totalReview,
  };
}

export type ArticleRating = ReturnType<typeof modelArticleRating>;
