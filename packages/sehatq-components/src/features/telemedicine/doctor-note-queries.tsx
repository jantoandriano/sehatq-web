import { useMutation } from "react-query";
import { createBrowserFetch, FetchError, AwaitedReturn } from "@sehatq/utils";
import { ENV } from "@sehatq/constants";

import { useToast } from "../../user-interfaces";

export type DownloadDoctorNoteVariables = {
  consultationId: string;
  doctorNoteId: string;
};

export async function downloadDoctorNote(
  variables: DownloadDoctorNoteVariables
) {
  const { consultationId, doctorNoteId } = variables;
  const fetch = createBrowserFetch();

  return await fetch.get<Blob>(
    `${ENV.API}/telemed-service/consultations/${consultationId}/doctor-notes/${doctorNoteId}`,
    {
      headers: {
        "content-type": "application/pdf",
        accept: "application/pdf",
      },
      responseType: "blob",
    }
  );
}

type DownloadDoctorNoteReturn = AwaitedReturn<typeof downloadDoctorNote>;

export function useDownloadDoctorNote() {
  const toast = useToast();
  return useMutation<
    DownloadDoctorNoteReturn,
    FetchError,
    DownloadDoctorNoteVariables
  >(downloadDoctorNote, {
    onError: ({ message }) => {
      toast({
        message,
        status: "error",
      });
    },
    onSuccess: (data) => {
      const fileName = "catatan-dokter.pdf";
      const url = window.URL.createObjectURL(data);
      const downloadLink = document.createElement("a");
      downloadLink.href = url;
      downloadLink.download = fileName;
      downloadLink.click();
    },
  });
}
