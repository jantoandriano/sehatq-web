import {
  getMyPrescriptions,
  PrescriptionStatusFlag,
  myPrescriptionKeys,
} from "@sehatq/components";
import { createNodeFetch, nullify } from "@sehatq/utils";
import { dehydrate, QueryClient } from "react-query";

export type MyPrescriptionsQuery = {
  statusFlag?: PrescriptionStatusFlag | "";
};

export type MyPrescriptionsParams = {
  cookie: string;
};

export async function getMyPrescriptionsProps(
  arg: MyPrescriptionsParams & MyPrescriptionsQuery & { isMobile: boolean }
) {
  const { statusFlag = "", isMobile, cookie } = arg;
  const fetch = createNodeFetch({ isMobile, cookie });
  const queryClient = new QueryClient();
  const myPrescriptionQuery = {
    statusFlag: statusFlag || "",
    patientName: "",
  };
  await queryClient.prefetchQuery(
    myPrescriptionKeys.list(myPrescriptionQuery),
    async () =>
      await getMyPrescriptions({
        fetch,
        query: myPrescriptionQuery,
      })
  );
  return { dehydratedState: nullify(dehydrate(queryClient)), isMobile };
}
