import { ENV } from "@sehatq/constants";
import { createBrowserFetch, formatDate } from "@sehatq/utils";
import Cookies from "js-cookie";
import { NextRouter, useRouter } from "next/router";
import { useMutation } from "react-query";

const trackedPageUrl: string[] = [
  "/kesehatan-anak",
  "/penyakit-dalam",
  "/kesehatan-jantung",
];

interface GuestBookPayload {
  data: {
    referralPage: string;
    destinationPage: string;
    timeAt: string;
  };
  headers: {
    utmCampaign?: string;
    utmSource?: string;
    utmMedium?: string;
  };
}

function sendGuestBookTrackingAPI(payload: GuestBookPayload) {
  const fetch = createBrowserFetch();
  return fetch.post(
    `${ENV.API}/content-service/sehatq/guest-book`,
    payload.data,
    {
      headers: payload.headers,
    }
  );
}

export function useFillGuestBook() {
  const router: NextRouter = useRouter();
  const { mutate } = useMutation({
    mutationFn: sendGuestBookTrackingAPI,
  });

  const fillGuestBook = (destinationPage: string) => {
    const currentUrl: string = router.asPath;
    const isLoggedIn = !!Cookies.get("token");

    let isTrackedUrl = false;
    trackedPageUrl.forEach((trackedUrl: string) => {
      if (currentUrl.startsWith(trackedUrl)) {
        isTrackedUrl = true;
      }
    });
    if (!isTrackedUrl) return;

    const payload: GuestBookPayload = {
      data: {
        referralPage: location.href,
        destinationPage,
        timeAt: formatDate(Date.now(), "yyyy-MM-dd HH:mm:ss"),
      },
      headers: {
        utmCampaign: router.query.utm_campaign as string,
        utmSource: router.query.utm_source as string,
        utmMedium: router.query.utm_medium as string,
      },
    };

    if (isLoggedIn) {
      mutate(payload);
    } else {
      Cookies.set("bookGuestData", JSON.stringify(payload.data), {
        path: "/",
        domain: ".sehatq.com",
        expires: 7,
      });
    }
  };

  return { fillGuestBook };
}
