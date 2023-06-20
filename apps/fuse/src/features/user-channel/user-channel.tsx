import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { FullpageLoader } from "@components/fullpage-loader";
import { ConsultationStart, useGetLatestConsultation } from "../telemedicine";
import { useGetUserChannel } from "./user-channel-queries";

const COOKIE_DOMAIN = ".sehatq.com";

export function UserChannel() {
  const router = useRouter();
  const {
    query: { uuid, token, sendbirdToken, sendbirdUserId },
  } = router;
  const query = {
    uuid: `${uuid}` ?? "",
    token: `${token}` ?? "",
    sendbirdToken: `${sendbirdToken}` ?? "",
    sendbirdUserId: `${sendbirdUserId}` ?? "",
  };

  const {
    data: { data: dataUserChannel = {} } = {},
    isLoading: isGetUserChannelLoading,
    isSuccess: isGetUserChannelSuccess,
    isError: isGetUserChannelError,
    error: errorGetUserChannel,
  } = useGetUserChannel(query, { enabled: !!uuid });

  const { data: latestConsultation, isLoading: isLatestConsultationLoading } =
    useGetLatestConsultation({
      staleTime: 0,
      cacheTime: 0,
    });

  useEffect(() => {
    if (
      latestConsultation &&
      (latestConsultation.status === "active" ||
        latestConsultation.status === "pending")
    ) {
      router.push({
        pathname: "chat/[consultationId]",
        query: {
          consultationId: latestConsultation.id,
        },
      });
    }
  }, [latestConsultation, router]);

  if (isGetUserChannelSuccess) {
    Cookies.set("token", query.token, {
      path: "/",
      domain: COOKIE_DOMAIN,
      expires: 1,
    });

    Cookies.set("sbtoken", query.sendbirdToken, {
      path: "/",
      domain: COOKIE_DOMAIN,
      expires: 1,
    });

    Cookies.set("sbUserId", query.sendbirdUserId, {
      path: "/",
      domain: COOKIE_DOMAIN,
      expires: 1,
    });

    Cookies.set("userChannelData", JSON.stringify(dataUserChannel), {
      path: "/",
      domain: COOKIE_DOMAIN,
      expires: 1,
    });
  }

  if (isGetUserChannelLoading || isLatestConsultationLoading) {
    return <FullpageLoader />;
  }

  if (isGetUserChannelError) {
    return <div>Error: {errorGetUserChannel?.message}</div>;
  }

  if (!latestConsultation) {
    return <ConsultationStart />;
  }

  return null;
}
