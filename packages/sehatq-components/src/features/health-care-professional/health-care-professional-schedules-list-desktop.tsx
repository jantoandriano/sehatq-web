import React from "react";
import { Box } from "../../user-interfaces";
import {
  HCPSchedulesCard,
  HCPSchedulesCardProps,
} from "./health-care-professional-schedules-card";

export type HCPSchedulesListDesktopProps = {
  schedules: HCPSchedulesCardProps[] | [];
  scheduleCollapse: { hcfId: number; hcpId: number } | undefined;
};

export function HCPSchedulesListDesktop(props: HCPSchedulesListDesktopProps) {
  const { schedules, scheduleCollapse } = props;
  return (
    <>
      {schedules.map((schedule) => (
        <Box key={schedule.hcfId} pb={6}>
          <HCPSchedulesCard
            {...schedule}
            isCollapse={
              schedule.hcpId == scheduleCollapse?.hcpId &&
              schedule.hcfId == scheduleCollapse?.hcfId
            }
          />
        </Box>
      ))}
    </>
  );
}
