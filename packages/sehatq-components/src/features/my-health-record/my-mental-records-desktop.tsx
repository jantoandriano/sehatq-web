import React from "react";
import { FocusableElement } from "@chakra-ui/utils";

import {
  Center,
  PaginationLink,
  Text,
  Flex,
  Box,
  VStack,
  Button,
  Skeleton,
  AlertDialog,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogBody,
} from "../../user-interfaces";
import { MyEmptyMentalRecord } from "./my-empty-mental-record";
import {
  MyMentalRecordCard,
  MyMentalRecordCardSkeleton,
} from "./my-mental-record-card";
import { MyMentalRecordDateFilter } from "./my-mental-record-date-filter";
import { MyMentalRecordsData } from "./my-mental-records-model";

export type MyMentalRecordsDesktopProps = {
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
  cancelConfirmationDeleteRef?: React.MutableRefObject<FocusableElement>;
  confirmDelete: () => void;
};

export function MyMentalRecordsDesktop(props: MyMentalRecordsDesktopProps) {
  const {
    isLoading,
    mentalRecords,
    labelRange,
    page,
    maxPage,
    userId,
    dateRange,
    isShowConfirmationDelete,
    showConfirmationDelete,
    hideConfirmationDelete,
    cancelConfirmationDeleteRef,
    confirmDelete,
  } = props;

  return (
    <>
      {mentalRecords?.length > 0 ? (
        <>
          <Box
            background="iceBlue.500"
            borderRadius="xl"
            border="solid 0.5px"
            borderColor="veryLightPink"
            p={5}
          >
            <Flex mb={5} justify="space-between" align="center">
              <Text
                fontSize="3xl"
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
              />
            </Flex>
            <VStack spacing={5} width="100%">
              {mentalRecords.map((mentalRecord) => (
                <Box key={mentalRecord.id} width="100%">
                  <MyMentalRecordCard
                    isMobile={false}
                    {...mentalRecord}
                    userId={userId}
                    mentalId={mentalRecord.id}
                    showConfirmationDelete={showConfirmationDelete}
                  />
                </Box>
              ))}
            </VStack>
            <AlertDialog
              isOpen={isShowConfirmationDelete}
              leastDestructiveRef={cancelConfirmationDeleteRef}
              onClose={hideConfirmationDelete}
              isCentered
            >
              <AlertDialogOverlay />
              <AlertDialogContent w="397px" textAlign="center">
                <AlertDialogHeader
                  fontSize="lg"
                  fontWeight="semibold"
                  fontFamily="poppins"
                  pb={1}
                >
                  Hapus Detail Kesehatan Mental?
                </AlertDialogHeader>
                <AlertDialogBody mb={1}>
                  <Box>
                    <Text fontSize="md">
                      Detail yang sudah dihapus tidak dapat dikembalikan
                    </Text>
                    <Button
                      mt={5}
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
                      mt={2}
                      variant="unstyled"
                      fontSize="md"
                      fontWeight="semibold"
                      color="sea.500"
                      onClick={hideConfirmationDelete}
                      autoFocus={false}
                    >
                      Batal
                    </Button>
                  </Box>
                </AlertDialogBody>
              </AlertDialogContent>
            </AlertDialog>
          </Box>
          <Center mt={4}>
            <PaginationLink
              page={Number(page)}
              maxPage={Number(maxPage)}
              navigateName="MY_MENTAL_RECORDS"
              variant="circle"
              navigateOptions={{ shallow: true, scroll: true }}
            />
          </Center>
        </>
      ) : isLoading ? (
        <MyMentalRecordsSkeletonDesktop />
      ) : (
        <MyEmptyMentalRecord isMobile={false} />
      )}
    </>
  );
}

export function MyMentalRecordsSkeletonDesktop() {
  return (
    <Box
      background="iceBlue.500"
      borderRadius="xl"
      border="solid 0.5px"
      borderColor="veryLightPink"
      p={5}
    >
      <Skeleton width="300px" height="33px" mb={5} />
      <VStack spacing={5}>
        {Array.from(Array(5).keys()).map((id) => (
          <Box key={id} width="100%">
            <MyMentalRecordCardSkeleton isMobile={false} />
          </Box>
        ))}
      </VStack>
    </Box>
  );
}
