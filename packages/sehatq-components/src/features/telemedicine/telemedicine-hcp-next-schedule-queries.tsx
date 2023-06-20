import { useQuery, UseQueryOptions, useMutation } from "react-query";
import {
  createBrowserFetch,
  cleanQuery,
  FetchError,
  AwaitedReturn,
} from "@sehatq/utils";
import { ENV } from "@sehatq/constants";
import { FetcherArgs } from "../../types";
import { useToast } from "../../user-interfaces";
import {
  TelemedicineHCPNextScheduleResponse,
  AddTelemedicineReminderResponse,
  DeleteTelemedicineReminderResponse,
} from "./telemedicine-hcp-next-schedule-model";

type TelemedicineHCPNextScheduleQuery = {
  doctorId: string;
};

export const telemedicineHCPNextScheduleKeys = {
  all: ["TELEMEDICINE_HCP_NEXT_SCHEDULE"],
  lists: () => [...telemedicineHCPNextScheduleKeys.all, "LIST"],
  list: (query: TelemedicineHCPNextScheduleQuery) => [
    ...telemedicineHCPNextScheduleKeys.lists(),
    cleanQuery(query),
  ],
};

export async function getTelemedicineHCPNextSchedule({
  fetch,
  query,
}: FetcherArgs<TelemedicineHCPNextScheduleQuery>) {
  const result = await fetch.get<TelemedicineHCPNextScheduleResponse>(
    `${ENV.API}/telemed-service/doctors/${query.doctorId}/next-schedule`
  );
  return result.data;
}

export type TelemedicineHCPNextScheduleCache = AwaitedReturn<
  typeof getTelemedicineHCPNextSchedule
>;

export function useGetTelemedicineHCPNextSchedule<
  TData = TelemedicineHCPNextScheduleCache
>(
  query: TelemedicineHCPNextScheduleQuery,
  options?: UseQueryOptions<TelemedicineHCPNextScheduleCache, FetchError, TData>
) {
  return useQuery<TelemedicineHCPNextScheduleCache, FetchError, TData>(
    telemedicineHCPNextScheduleKeys.list(query),
    async () => {
      const fetch = createBrowserFetch();
      return getTelemedicineHCPNextSchedule({ fetch, query });
    },
    options
  );
}

export type AddTelemedicineReminderVariables = {
  doctorId: number;
};

export async function addTelemedicineReminder(
  variables: AddTelemedicineReminderVariables
) {
  const fetch = createBrowserFetch();

  const response = await fetch.post<AddTelemedicineReminderResponse>(
    `${ENV.API}/telemed-service/doctor-reminders`,
    { doctorId: variables.doctorId }
  );
  return {
    message: response.meta.message,
  };
}

type AddTelemedicineReminderReturn = AwaitedReturn<
  typeof addTelemedicineReminder
>;

export function useAddTelemedicineReminder() {
  const toast = useToast();
  return useMutation<
    AddTelemedicineReminderReturn,
    FetchError,
    AddTelemedicineReminderVariables
  >(addTelemedicineReminder, {
    onSuccess: ({ message }) => {
      toast({
        id: "add-telemedicine-reminder",
        status: "netral",
        message,
      });
    },
    onError: ({ message }) => {
      toast({
        id: "add-telemedicine-reminder",
        status: "error",
        message,
      });
    },
  });
}

export type DeleteTelemedicineReminderVariables = {
  doctorId: number;
};

export async function deleteTelemedicineReminder(
  variables: DeleteTelemedicineReminderVariables
) {
  const fetch = createBrowserFetch();

  const response = await fetch.delete<DeleteTelemedicineReminderResponse>(
    `${ENV.API}/telemed-service/doctor-reminders`,
    {
      data: {
        doctorId: variables.doctorId,
      },
    }
  );
  return {
    message: response.meta.message,
  };
}

type DeleteTelemedicineReminderReturn = AwaitedReturn<
  typeof deleteTelemedicineReminder
>;

export function useDeleteTelemedicineReminder() {
  const toast = useToast();
  return useMutation<
    DeleteTelemedicineReminderReturn,
    FetchError,
    DeleteTelemedicineReminderVariables
  >(deleteTelemedicineReminder, {
    onSuccess: ({ message }) => {
      toast({
        id: "delete-telemedicine-reminder",
        status: "netral",
        message,
      });
    },
    onError: ({ message }) => {
      toast({
        id: "delete-telemedicine-reminder",
        status: "error",
        message,
      });
    },
  });
}
