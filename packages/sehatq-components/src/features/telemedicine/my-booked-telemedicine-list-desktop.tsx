import React from "react";

import {
  Center,
  PaginationLink,
  VStack,
  VStackProps,
} from "../../user-interfaces";

import {
  MyBookedTelemedicineCard,
  MyBookedTelemedicineCardProps,
  MyBookedTelemedicineCardSkeleton,
} from "./my-booked-telemedicine-card";

export type MyBookedTelemedicineListDesktopProps = {
  data: MyBookedTelemedicineCardProps[];
  page: number;
  maxPage: number;
} & VStackProps;

export function MyBookedTelemedicineListDesktop(
  props: MyBookedTelemedicineListDesktopProps
) {
  return (
    <>
      <VStack {...props} width="full" alignItems="normal" spacing={4}>
        {props.data.map((telemed) => (
          <MyBookedTelemedicineCard {...telemed} key={telemed.consultationId} />
        ))}
      </VStack>
      <Center mt={12}>
        <PaginationLink
          page={props.page}
          maxPage={props.maxPage}
          navigateName="TELEMED_SCHEDULE"
          navigateOptions={{ shallow: true, scroll: true }}
          background="white"
        />
      </Center>
    </>
  );
}

export type MyBookedTelemedicineListDesktopSkeletonProps = VStackProps;
export function MyBookedTelemedicineListDesktopSkeleton(
  props: MyBookedTelemedicineListDesktopSkeletonProps
) {
  return (
    <VStack {...props} width="full" alignItems="normal" spacing={4}>
      {Array.from(Array(4).keys()).map((index) => {
        return <MyBookedTelemedicineCardSkeleton key={index} />;
      })}
    </VStack>
  );
}
