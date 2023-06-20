import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  HStack,
  Box,
  ModalProps,
  Image,
  VStack,
  SehatqStarIcon,
  Wrap,
  Button,
  StackDivider,
  Icon,
} from "../../user-interfaces";

export type MyDoctorAppointmentReviewResultModalDesktopProps = {
  modalProps: Omit<ModalProps, "children">;
  doctorImgSrc: string;
  doctorName: string;
  doctorSpeciality: string;
  bookingRating: string;
  bookingReview: string;
  bookingReviewTags: string[];
  customerService?: {
    rating?: string;
    ratingIcon?: any;
    ratingColor?: string;
    tags: string[];
    review?: string;
  };
};

export function MyDoctorAppointmentReviewResultModalDesktop(
  props: MyDoctorAppointmentReviewResultModalDesktopProps
) {
  const {
    modalProps,
    doctorImgSrc,
    doctorName,
    doctorSpeciality,
    bookingRating,
    bookingReview,
    bookingReviewTags = [],
    customerService,
  } = props;
  return (
    <Modal size="2xl" {...modalProps} trapFocus={false}>
      <ModalOverlay />
      <ModalContent py="6" px="10">
        <ModalHeader
          fontSize="lg"
          fontFamily="poppins"
          fontWeight="semibold"
          p="0"
          mb="0.5"
        >
          Review dan rating booking
        </ModalHeader>
        <ModalCloseButton h="16px" w="16px" top="6" color="veryLightPink" />
        <ModalBody p="0">
          <VStack spacing="6">
            <Box w="100%">
              <HStack
                padding="4"
                bg="iceBlue.500"
                borderRadius="base"
                mt="4"
                w="100%"
              >
                <Image src={doctorImgSrc} boxSize="7.6%" alt="avatar" />
                <Box>
                  <Text fontFamily="poppins" fontWeight="semibold">
                    {doctorName}
                  </Text>
                  <Text fontSize="sm">{doctorSpeciality}</Text>
                </Box>
              </HStack>
              <HStack
                justifyContent="space-between"
                w="100%"
                alignItems="center"
                mt="3.5"
              >
                <Text fontWeight="semibold" fontSize="sm" fontFamily="poppins">
                  Penilaian booking
                </Text>
                <HStack
                  border="1px"
                  borderRadius="2xl"
                  borderColor="veryLightPink"
                  px="2.5"
                  py="1"
                  align="center"
                >
                  <SehatqStarIcon color="#ffcc00" />
                  <Text fontWeight="semibold" fontSize="sm">
                    {bookingRating}
                  </Text>
                </HStack>
              </HStack>
              <Box
                borderLeft="7px solid"
                borderColor="veryLightPink"
                w="100%"
                p="2.5"
                mt="3"
                borderRadius="base"
                background="gray.400"
              >
                <Text fontSize="sm">{bookingReview}</Text>
              </Box>
              <Box w="100%" mt="3.5">
                <Wrap spacing="3" shouldWrapChildren>
                  {bookingReviewTags.map((tag) => {
                    return (
                      <Button
                        key={tag}
                        fontSize="sm"
                        fontWeight="semibold"
                        variant="chip"
                        borderColor="squash.500"
                        color="squash.500"
                        bg="squash.100"
                      >
                        {tag}
                      </Button>
                    );
                  })}
                </Wrap>
              </Box>
            </Box>
            {customerService ? (
              <>
                <StackDivider
                  borderColor="veryLightPink"
                  borderBottomWidth="4px"
                />
                <Box w="100%">
                  <HStack
                    justifyContent="space-between"
                    w="100%"
                    alignItems="center"
                  >
                    <Text
                      fontWeight="semibold"
                      fontSize="sm"
                      fontFamily="poppins"
                    >
                      Customer Service
                    </Text>
                    <HStack
                      border="1px"
                      borderRadius="2xl"
                      borderColor="veryLightPink"
                      px="2.5"
                      py="1"
                      align="center"
                    >
                      <Icon
                        as={customerService.ratingIcon}
                        boxSize="26px"
                        color={customerService.ratingColor}
                      />
                      <Text
                        fontWeight="semibold"
                        fontSize="sm"
                        textTransform="capitalize"
                      >
                        {customerService.rating}
                      </Text>
                    </HStack>
                  </HStack>
                  <Box
                    borderLeft="7px solid"
                    borderColor="veryLightPink"
                    w="100%"
                    p="2.5"
                    mt="3"
                    borderRadius="base"
                    background="gray.400"
                  >
                    <Text fontSize="sm">{customerService.review}</Text>
                  </Box>
                  <Box w="100%" mt="3.5">
                    <Wrap spacing="3" shouldWrapChildren>
                      {customerService.tags.map((tag) => {
                        return (
                          <Button
                            key={tag}
                            fontSize="sm"
                            fontWeight="semibold"
                            variant="chip"
                            borderColor="squash.500"
                            color="squash.500"
                            bg="squash.100"
                          >
                            {tag}
                          </Button>
                        );
                      })}
                    </Wrap>
                  </Box>
                </Box>
              </>
            ) : null}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
