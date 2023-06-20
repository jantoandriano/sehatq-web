import React from "react";
import {
  Center,
  PaginationLink,
  VStack,
  VStackProps,
} from "../../user-interfaces";
import {
  MyTelemedicineHistoryCard,
  MyTelemedicineHistoryCardProps,
  MyTelemedicineHistoryCardSkeleton,
} from "./my-telemedicine-history-card";

export type MyTelemedicineHistoryListDesktopProps = {
  data: MyTelemedicineHistoryCardProps[];
  page: number;
  maxPage: number;
} & VStackProps;

export function MyTelemedicineHistoryListDesktop(
  props: MyTelemedicineHistoryListDesktopProps
) {
  return (
    <>
      <VStack {...props} width="full" alignItems="normal" spacing={4}>
        {props.data.map((telemed) => (
          <MyTelemedicineHistoryCard
            {...telemed}
            key={telemed.consultationId}
          />
        ))}
      </VStack>
      <Center mt={12}>
        <PaginationLink
          page={props.page}
          maxPage={props.maxPage}
          navigateName="TELEMED_HISTORIES"
          navigateOptions={{ shallow: true, scroll: true }}
          background="white"
        />
      </Center>
    </>
  );
}

export type MyTelemedicineHistoryListDesktopSkeletonProps = VStackProps;
export function MyTelemedicineHistoryListDesktopSkeleton(
  props: MyTelemedicineHistoryListDesktopSkeletonProps
) {
  return (
    <VStack {...props} width="full" alignItems="normal" spacing={4}>
      {Array.from(Array(4).keys()).map((index) => {
        return <MyTelemedicineHistoryCardSkeleton key={index} />;
      })}
    </VStack>
  );
}
