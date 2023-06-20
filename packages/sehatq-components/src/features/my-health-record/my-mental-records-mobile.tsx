import React from "react";

import {
  Center,
  PaginationLink,
  Text,
  Skeleton,
  Box,
  Flex,
  Button,
  VStack,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
} from "../../user-interfaces";
import { MyEmptyMentalRecord } from "./my-empty-mental-record";
import {
  MyMentalRecordCard,
  MyMentalRecordCardSkeleton,
} from "./my-mental-record-card";
import { MyMentalRecordDateFilter } from "./my-mental-record-date-filter";
import { MyMentalRecordsData } from "./my-mental-records-model";

export type MyMentalRecordsMobileProps = {
  isLoading: boolean;
  mentalRecords: MyMentalRecordsData[];
  labelRange: string;
  page: string;
  maxPage: string;
  userId: string;
  dateRange?: string;
  isShowConfirmationDelete: boolean;
  showConfirmationDelete: (mentalId: number) => void;
  hideConfirmationDelete: () => void;
  confirmDelete: () => void;
};

export function MyMentalRecordsMobile(props: MyMentalRecordsMobileProps) {
  const {
    isLoading,
    mentalRecords,
    labelRange,
    userId,
    dateRange,
    page,
    maxPage,
    isShowConfirmationDelete,
    showConfirmationDelete,
    hideConfirmationDelete,
    confirmDelete,
  } = props;

  return (
    <>
      {mentalRecords?.length > 0 ? (
        <Box p={4} height="100%">
          <Flex mb={3} justify="space-between" align="center">
            <Text
              fontSize="sm"
              fontFamily="poppins"
              fontWeight="semibold"
              textTransform="capitalize"
            >
              {labelRange}
            </Text>
            <MyMentalRecordDateFilter
              page={page}
              dateRange={dateRange}
              userId={userId}
              isMobile
            />
          </Flex>
          <VStack spacing={3} width="100%">
            {mentalRecords.map((mentalRecord) => (
              <Box key={mentalRecord.id} width="100%">
                <MyMentalRecordCard
                  isMobile
                  {...mentalRecord}
                  userId={userId}
                  mentalId={mentalRecord.id}
                  showConfirmationDelete={showConfirmationDelete}
                />
              </Box>
            ))}
          </VStack>
          <Center mt={4}>
            <PaginationLink
              page={Number(page)}
              maxPage={Number(maxPage)}
              navigateName="MY_MENTAL_RECORDS"
              variant="circle"
              size="small"
              navigateOptions={{ shallow: true, scroll: true }}
            />
          </Center>
          <Drawer
            isOpen={isShowConfirmationDelete}
            placement="bottom"
            onClose={hideConfirmationDelete}
          >
            <DrawerOverlay>
              <DrawerContent alignItems="center" p={4}>
                <DrawerBody textAlign="center" p={0}>
                  <Text
                    fontFamily="poppins"
                    fontWeight="semibold"
                    fontSize="md"
                    mb={2.5}
                  >
                    Hapus Detail Kesehatan Mental?
                  </Text>
                  <Text fontSize="sm" mt={2}>
                    Detail yang sudah dihapus tidak
                  </Text>
                  <Text fontSize="sm">dapat dikembalikan</Text>
                  <Button
                    mt={6}
                    variant="solid"
                    colorScheme="main"
                    size="md"
                    width="100%"
                    fontSize="md"
                    fontWeight="semibold"
                    justifyContent="center"
                    onClick={confirmDelete}
                    autoFocus={false}
                  >
                    Hapus Detail Kesehatan Mental
                  </Button>
                  <Button
                    mt={1}
                    variant="unstyled"
                    fontSize="md"
                    fontWeight="semibold"
                    color="sea.500"
                    onClick={hideConfirmationDelete}
                    autoFocus={false}
                  >
                    Batal
                  </Button>
                </DrawerBody>
              </DrawerContent>
            </DrawerOverlay>
          </Drawer>
        </Box>
      ) : isLoading ? (
        <MyMentalRecordsSkeletonMobile />
      ) : (
        <MyEmptyMentalRecord isMobile />
      )}
    </>
  );
}

export function MyMentalRecordsSkeletonMobile() {
  return (
    <Box p={4}>
      <Skeleton width="100px" height="33px" mb={3} />
      <VStack spacing={3}>
        {Array.from(Array(3).keys()).map((id) => (
          <Box key={id} width="100%">
            <MyMentalRecordCardSkeleton isMobile />
          </Box>
        ))}
      </VStack>
    </Box>
  );
}
