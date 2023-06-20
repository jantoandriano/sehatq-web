import { HCFDetailCache, useGetHCFDetail } from "@sehatq/components";
import { useRouter } from "next/router";
import React from "react";
import { HealthCareFacilityDesktop } from "./health-care-facility-desktop";
import { HealthCareFacilityMobile } from "./health-care-facility-mobile";

export type HealthCareFacilityProps = {
  isMobile: boolean;
};

function selectHCFId(cache: HCFDetailCache) {
  return {
    id: cache.data.id,
    bookingOnline: cache.data.bookingOnline,
  };
}

export function HealthCareFacility(props: HealthCareFacilityProps) {
  const { isMobile } = props;
  const router = useRouter();
  const { hcfSlug } = router.query;

  const { data: hcf } = useGetHCFDetail(
    {
      hcfSlug: (hcfSlug as string) ?? "",
      userLat: "",
      userLong: "",
    },
    { select: selectHCFId }
  );

  const otherProps = {
    isMobile,
    slug: (hcfSlug as string) ?? "",
    userLat: "",
    userLong: "",
    hcfId: hcf ? `${hcf.id}` : "",
    bookingOnline: !!hcf?.bookingOnline,
  };

  if (isMobile) {
    return <HealthCareFacilityMobile {...otherProps} />;
  }

  return <HealthCareFacilityDesktop {...otherProps} />;
}
