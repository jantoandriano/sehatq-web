import { formatDate } from "@sehatq/utils";

export interface MerchantReviewsResponse {
  meta: {
    rating: {
      average: number;
      totalReview: number;
      star1Total: number;
      star2Total: number;
      star3Total: number;
      star4Total: number;
      star5Total: number;
    };
    pagination: {
      total: number;
      page: number;
      perPage: number;
      maxPage: number;
      next: string;
      prev: string;
    };
  };
  data: {
    id: string;
    merchantId: number;
    rating: number;
    review: string;
    createdAt: string;
    user: {
      id: number;
      name: string;
      email: string;
      phone: string;
      photoUrl: string;
    };
    others: {
      moId: string;
      status: string;
      merchant: {
        id: number;
        name: string;
      };
      tags?: string[];
    };
  }[];
}

export function modelMerchantReviews(data: MerchantReviewsResponse["data"]) {
  return data.map((modelMerchantReview) => ({
    id: modelMerchantReview.id,
    rating: modelMerchantReview.rating,
    review: modelMerchantReview.review,
    createdAt: formatDate(
      new Date(modelMerchantReview.createdAt),
      "d MMM yyyy"
    ),
    userName: modelMerchantReview.user.name,
    tags: modelMerchantReview.others.tags ?? [],
  }));
}

export type MerchantReview = ReturnType<typeof modelMerchantReviews>[number];
