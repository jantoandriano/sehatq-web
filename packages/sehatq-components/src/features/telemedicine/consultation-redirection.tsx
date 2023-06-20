import { useEffect, cloneElement, ReactElement } from "react";
import { useNavigation } from "@sehatq/utils";
import { URLS } from "@sehatq/constants";
import {
  useGetMyLatestTelemedicine,
  MyLatestTelemedicineCache,
} from "../profile/my-telemedicine-queries";
import { checkActiveConsultation } from "./consultation-helpers";

type ConsultationRedirectionProps = {
  children?: ReactElement;
  currentNavigationName: keyof typeof URLS;
};

export function ConsultationRedirection(props: ConsultationRedirectionProps) {
  const { children, currentNavigationName } = props;
  const isLoading = useConsultationRedirection(currentNavigationName);
  return children ? cloneElement(children, { isLoading }) : null;
}

function selectConsultationRedirection(cache: MyLatestTelemedicineCache) {
  if (
    cache.status === "init" &&
    (cache.payment === null || cache.payment.status === "paid")
  ) {
    return {
      name: "TELEMEDICINE_FORM" as const,
      query: { consultationId: cache.id },
    };
  } else if (checkActiveConsultation(cache)) {
    return {
      name: "TELEMED_CHAT" as const,
      query: { consultationId: cache.id },
    };
  }
  return null;
}

function useConsultationRedirection(currentNavigationName?: keyof typeof URLS) {
  const { data, isLoading } = useGetMyLatestTelemedicine({
    staleTime: 0,
    cacheTime: 0,
    select: selectConsultationRedirection,
  });
  const { navigate } = useNavigation();

  useEffect(() => {
    if (data && currentNavigationName !== data.name) {
      navigate(data.name, data.query);
    }
  }, [data, currentNavigationName, navigate]);

  return isLoading || (data && data.name === currentNavigationName)
    ? false
    : Boolean(data);
}
