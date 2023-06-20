import React from "react";
import { Box, VStack } from "../../user-interfaces";
import {
  MyTelemedicineHistoryCard,
  MyTelemedicineHistoryCardProps,
  MyTelemedicineHistoryCardSkeleton,
} from "./my-telemedicine-history-card";

export type MyTelemedicineHistoryListMobileProps = {
  data: MyTelemedicineHistoryCardProps[];
  refInView?: (node?: Element | null) => void;
  isMaxPage?: boolean;
};

export function MyTelemedicineHistoryListMobile(
  props: MyTelemedicineHistoryListMobileProps
) {
  return (
    <VStack width="full" alignItems="normal" spacing={3}>
      {props.data.map((telemed) => (
        <MyTelemedicineHistoryCard
          {...telemed}
          key={telemed.consultationId}
          isMobile
        />
      ))}
      {!props.isMaxPage && (
        <Box ref={props.refInView} marginTop={4}>
          <MyTelemedicineHistoryCardSkeleton isMobile />
        </Box>
      )}
    </VStack>
  );
}

export function MyTelemedicineHistoryListMobileSkeleton() {
  return (
    <VStack width="full" alignItems="normal" spacing={3}>
      {Array.from(Array(4).keys()).map((index) => {
        return (
          <Box width="full" key={index}>
            <MyTelemedicineHistoryCardSkeleton isMobile />
          </Box>
        );
      })}
    </VStack>
  );
}
