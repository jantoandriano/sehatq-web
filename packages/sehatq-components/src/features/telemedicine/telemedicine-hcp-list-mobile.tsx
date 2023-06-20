import React from "react";
import { Box, VStack } from "../../user-interfaces";

import {
  TelemedicineHCPCard,
  TelemedicineHCPCardProps,
  TelemedicineHCPCardSkeleton,
} from "./telemedicine-hcp-card";

export type TelemedicineHCPListMobileProps = {
  data: TelemedicineHCPCardProps[];
  refInView?: (node?: Element | null) => void;
  isMaxPage?: boolean;
};

export function TelemedicineHCPListMobile(
  props: TelemedicineHCPListMobileProps
) {
  const { data, refInView, isMaxPage } = props;
  return (
    <VStack width="full" alignItems="normal" spacing={4}>
      {data.map((doctor) => (
        <TelemedicineHCPCard {...doctor} key={doctor.doctorId} isMobile />
      ))}
      {!isMaxPage && (
        <Box ref={refInView} marginTop={4}>
          <TelemedicineHCPCardSkeleton isMobile />
        </Box>
      )}
    </VStack>
  );
}

export function TelemedicineHCPListMobileSkeleton() {
  return (
    <>
      {Array.from(Array(4).keys()).map((index) => {
        return (
          <Box key={index} pb={4}>
            <TelemedicineHCPCardSkeleton isMobile />
          </Box>
        );
      })}
    </>
  );
}
