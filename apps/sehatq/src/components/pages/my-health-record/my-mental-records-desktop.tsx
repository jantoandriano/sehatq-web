import React from "react";
import {
  Flex,
  Text,
  Box,
  ProfileSideMenu,
  FamilyMemberSlider as _FamilyMemberSlider,
  MyMentalRecords as _MyMentalRecords,
  GridBlock,
  GridBlockItem,
} from "@sehatq/components";
import { SehatqNavbar } from "@components/ui/sehatq-navbar";
import { MyMentalRecordsQuery, MyMentalRecordsParams } from "@get-props";
import { withQuery } from "@utils";

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

export function MyHealthRecordsDesktop() {
  return (
    <>
      <SehatqNavbar withCompanyPartner />
      <GridBlock my={6}>
        <GridBlockItem>
          <ProfileSideMenu isMobile={false} />
        </GridBlockItem>
        <GridBlockItem>
          <Flex bgColor="white" align="center" justify="space-between">
            <Box>
              <Text fontSize="5xl" fontWeight="semibold" fontFamily="poppins">
                Kesehatan Mental
              </Text>
            </Box>
          </Flex>
          <FamilyMemberSlider isMobile={false} />
          <MyMentalRecords isMobile={false} />
        </GridBlockItem>
      </GridBlock>
    </>
  );
}
