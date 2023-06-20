import { parseToDate } from "@sehatq/utils";
import { useAtom } from "jotai";
import React, { useCallback, useEffect, useState } from "react";
import {
  HCPDetailCache,
  useGetHCPDetail,
} from "./health-care-professional-queries";
import { HCPSchedulesCardSkeleton } from "./health-care-professional-schedules-card";
import { hcpScheduleSelectedAtom } from "./health-care-professional-schedules-card-atoms";
import { HCPSchedulesListDesktop } from "./health-care-professional-schedules-list-desktop";
import { HCPSchedulesListMobile } from "./health-care-professional-schedules-list-mobile";

export type HCPSchedulesListProps = {
  isMobile: boolean;
  hcpSlug: string;
  hcfId?: string;
  date?: string;
};

function selectHCPData(hcp: HCPDetailCache, hcfId?: string) {
  if (hcfId) {
    return {
      ...hcp.data,
      hcpHcfSchedules: hcp.data.hcpHcfSchedules.filter(
        (f) => f.id == Number(hcfId)
      ),
    };
  }
  return hcp.data;
}

export function HCPSchedulesList(props: HCPSchedulesListProps) {
  const { isMobile, hcpSlug, hcfId, date } = props;

  const query = {
    hcpSlug,
    userLat: "",
    userLong: "",
  };
  const { data: hcpData, isLoading } = useGetHCPDetail(query, {
    select: (hcp) => selectHCPData(hcp, hcfId),
  });

  const getDefaultCollapse = useCallback(() => {
    const availToCollaps = hcpData?.hcpHcfSchedules.find(
      (f) => f.bookingOnline > 0
    );
    if (hcpData && availToCollaps) {
      return {
        hcpId: hcpData.id,
        hcfId: availToCollaps.id,
      };
    }
  }, [hcpData]);

  const [scheduleCollapse, setScheduleCollapse] = useState<
    { hcfId: number; hcpId: number } | undefined
  >(getDefaultCollapse);

  // set default atom
  const [atomSelectedSchedule, setAtomHCPSelectedSchedule] = useAtom(
    hcpScheduleSelectedAtom
  );

  useEffect(() => {
    setScheduleCollapse(getDefaultCollapse);
    setAtomHCPSelectedSchedule(undefined);
  }, [getDefaultCollapse, setAtomHCPSelectedSchedule]);

  function onCollapseToggle(hcfId: number, hcpId: number) {
    setScheduleCollapse({ hcfId, hcpId });
  }

  function onScheduleClick(schedule?: {
    hcpId: number;
    hcfId: number;
    date: string;
    time: string;
    bookingOnline: number;
    refHcp: string;
  }) {
    setAtomHCPSelectedSchedule(schedule);
  }

  const schedules =
    hcpData?.hcpHcfSchedules.map((hcf) => ({
      isMobile,
      hcpId: hcpData?.id,
      hcpSlug,
      hcfId: hcf.id,
      hcfName: hcf.name,
      hcfAddress: [hcf.district, hcf.city].join(", "),
      hcfDistance: hcf.distance,
      hcfLatitude: hcf.latitude,
      hcfLongitude: hcf.longitude,
      hcfImageUrl: hcf.imageUrl,
      hcfImageAlt: hcf.imageAlt,
      hcfPartner: hcf.partner,
      procedures: hcf.procedures.map((proc) => proc.name),
      bookingOnline: hcf.bookingOnline,
      phone: hcf.phone,
      onCollapseToggle: onCollapseToggle,
      onScheduleClick,
      selectedSchedule: atomSelectedSchedule,
      defaultDate: date ? parseToDate(date, "yyyy-MM-dd") : new Date(),
    })) ?? [];

  if (isLoading) {
    return <HCPSchedulesCardSkeleton isMobile={isMobile} />;
  }

  if (isMobile) {
    return (
      <HCPSchedulesListMobile
        scheduleCollapse={scheduleCollapse}
        schedules={schedules}
      />
    );
  }
  return (
    <HCPSchedulesListDesktop
      scheduleCollapse={scheduleCollapse}
      schedules={schedules}
    />
  );
}
