import React from "react";

import { Box, VStack } from "../../user-interfaces";

import {
  MyBookedTelemedicineCard,
  MyBookedTelemedicineCardProps,
  MyBookedTelemedicineCardSkeleton,
} from "./my-booked-telemedicine-card";

export type MyBookedTelemedicineListMobileProps = {
  data: MyBookedTelemedicineCardProps[];
  refInView?: (node?: Element | null) => void;
  isMaxPage?: boolean;
};

export function MyBookedTelemedicineListMobile(
  props: MyBookedTelemedicineListMobileProps
) {
  return (
    <VStack width="full" alignItems="normal" spacing={3}>
      {props.data.map((telemed) => (
        <MyBookedTelemedicineCard
          {...telemed}
          key={telemed.consultationId}
          isMobile
        />
      ))}
      {!props.isMaxPage && (
        <Box ref={props.refInView} marginTop={4}>
          <MyBookedTelemedicineCardSkeleton isMobile />
        </Box>
      )}
    </VStack>
  );
}

export function MyBookedTelemedicineListMobileSkeleton() {
  return (
    <VStack width="full" alignItems="normal" spacing={3}>
      {Array.from(Array(4).keys()).map((index) => {
        return <MyBookedTelemedicineCardSkeleton key={index} isMobile />;
      })}
    </VStack>
  );
}
