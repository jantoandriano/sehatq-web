import { ENV } from "@sehatq/constants";
import { AwaitedReturn, createBrowserFetch, FetchError } from "@sehatq/utils";
import { useMutation } from "react-query";
import { useToast } from "../../user-interfaces";

export type ReviewMyDoctorAppointmentVariables = {
  bookingId: string;
  rating: number;
  tags: string[];
  review: string;
};

export async function reviewMyDoctorAppointment(
  variables: ReviewMyDoctorAppointmentVariables
) {
  const fetch = createBrowserFetch();

  const response = await fetch.patch<{
    meta: {
      message: string;
    };
    data: Record<string, never>;
  }>(`${ENV.API}/booking/ratings/${variables?.bookingId}`, {
    rating: variables.rating,
    review: variables.review,
    tags: variables.tags,
  });
  return {
    message: response.meta?.message,
  };
}

type ReviewMyDoctorAppointmentReturn = AwaitedReturn<
  typeof reviewMyDoctorAppointment
>;

export function useReviewMyDoctorAppointment() {
  const toast = useToast();
  return useMutation<
    ReviewMyDoctorAppointmentReturn,
    FetchError,
    ReviewMyDoctorAppointmentVariables
  >(reviewMyDoctorAppointment, {
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
