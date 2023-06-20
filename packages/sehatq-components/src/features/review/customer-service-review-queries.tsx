import { ENV } from "@sehatq/constants";
import { AwaitedReturn, createBrowserFetch, FetchError } from "@sehatq/utils";
import { useMutation } from "react-query";
import { useToast } from "../../user-interfaces";

export type ReviewCustomerServiceVariables = {
  bookingId: string;
  rating: number;
  tags: string[];
  review: string;
};

export async function reviewCustomerService(
  variables: ReviewCustomerServiceVariables
) {
  const fetch = createBrowserFetch();

  const response = await fetch.patch<{
    meta: {
      message: string;
    };
    data: Record<string, never>;
  }>(`${ENV.API}/booking/customer-service/ratings/${variables?.bookingId}`, {
    rating: variables.rating,
    review: variables.review,
    tags: variables.tags,
  });
  return {
    message: response.meta?.message,
  };
}

type ReviewCustomerServiceReturn = AwaitedReturn<typeof reviewCustomerService>;

export function useReviewCustomerService() {
  const toast = useToast();
  return useMutation<
    ReviewCustomerServiceReturn,
    FetchError,
    ReviewCustomerServiceVariables
  >(reviewCustomerService, {
    onError: ({ message }) => {
      toast({
        message,
        status: "error",
      });
    },
    onSuccess: (data) => {
      toast({
        message: data.message,
        status: "success",
      });
    },
  });
}
