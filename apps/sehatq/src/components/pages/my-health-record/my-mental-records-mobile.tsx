import React from "react";
import {
  Flex,
  FamilyMemberSlider as _FamilyMemberSlider,
  MyMentalRecords as _MyMentalRecords,
} from "@sehatq/components";
import { MyMentalRecordsQuery, MyMentalRecordsParams } from "@get-props";
import { withQuery } from "@utils";
import { SehatQHeader } from "@components/ui/sehatq-header";

const FamilyMemberSlider = withQuery(
  _FamilyMemberSlider,
  (query: MyMentalRecordsParams & MyMentalRecordsQuery) => ({
    userId: query.userId,
    dateRange: query.dateRange,
  })
);

const MyMentalRecords = withQuery(
  _MyMentalRecords,
  (query: MyMentalRecordsQuery & MyMentalRecordsParams) => ({
    userId: query.userId,
    dateRange: query.dateRange,
    page: query.page,
  })
);

export function MyMentalRecordsMobile() {
  return (
    <>
      <SehatQHeader variant="text" text="Kesehatan Mental" />
      <Flex
        flexDirection="column"
        background="iceBlue.500"
        minHeight="calc(100vh - 86px)"
        pt={5}
      >
        <FamilyMemberSlider isMobile />
        <MyMentalRecords isMobile />
      </Flex>
    </>
  );
}
