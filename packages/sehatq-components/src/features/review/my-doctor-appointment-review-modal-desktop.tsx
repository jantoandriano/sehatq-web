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
  VStack,
  Button,
  StackDivider,
  SehatqStarIcon,
  Textarea,
  ModalProps,
  Wrap,
  Image,
  FormControl,
  FormErrorMessage,
} from "../../user-interfaces";
import {
  MyDoctorAppointmentReviewOptionKey,
  MY_DOCTOR_APPOINTMENT_REVIEW_OPTIONS,
} from "./my-doctor-appointment-review-constants";

export type MyDoctorAppointmentReviewModalDesktopProps = {
  modalProps: Omit<ModalProps, "children">;
  selectedDoctorRating: MyDoctorAppointmentReviewOptionKey | 0;
  onSelectDoctorRating: (
    rating: MyDoctorAppointmentReviewOptionKey | 0
  ) => void;
  selectedDoctorReviewTags: Record<string, boolean>;
  onSelectDoctorReviewTags: (tag: string) => void;

  onChangeDoctorReview: React.ChangeEventHandler<HTMLTextAreaElement>;
  doctorReview: string;
  onSubmitDoctorReview: React.FormEventHandler<HTMLDivElement>;
  imageSrc: string;
  title: string;
  description: string;
  isLoading: boolean;
  formError: {
    doctorReview: boolean;
  };
};
export function MyDoctorAppointmentReviewModalDesktop(
  props: MyDoctorAppointmentReviewModalDesktopProps
) {
  const {
    modalProps,
    selectedDoctorRating,
    onSelectDoctorRating,
    selectedDoctorReviewTags,
    onSelectDoctorReviewTags,
    onChangeDoctorReview,
    doctorReview,
    onSubmitDoctorReview,
    imageSrc,
    title,
    description,
    isLoading,
    formError,
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
          Kasih Penilaian Kamu
        </ModalHeader>
        <ModalCloseButton h="16px" w="16px" top="6" color="veryLightPink" />
        <ModalBody p="0" as="form" onSubmit={onSubmitDoctorReview}>
          <HStack padding="4" bg="iceBlue.500" borderRadius="base" mt="4">
            <Image src={imageSrc} boxSize="7.6%" alt="avatar" />
            <Box>
              <Text fontFamily="poppins" fontWeight="semibold">
                {title}
              </Text>
              <Text fontSize="sm">{description}</Text>
            </Box>
          </HStack>
          <Text
            textAlign="center"
            fontFamily="poppins"
            fontWeight="semibold"
            mt="6"
            mb="5"
          >
            Kasih rating booking kamu yuk!
          </Text>
          <HStack justifyContent="center" spacing="8">
            {Object.values(MY_DOCTOR_APPOINTMENT_REVIEW_OPTIONS).map(
              (option) => {
                return (
                  <VStack
                    key={option.id}
                    align="center"
                    justifyContent="center"
                    cursor="pointer"
                    onClick={() => {
                      onSelectDoctorRating(option.value);
                    }}
                  >
                    <Box boxSize="60px">
                      <SehatqStarIcon
                        boxSize="60px"
                        color={
                          option.value <= selectedDoctorRating
                            ? option.color
                            : "veryLightPink"
                        }
                      />
                    </Box>
                  </VStack>
                );
              }
            )}
          </HStack>
          {selectedDoctorRating ? (
            <>
              <StackDivider color="veryLightPink" border="0.5px solid" my="6" />
              <VStack
                spacing="6"
                divider={<StackDivider borderColor="veryLightPink" />}
              >
                <Box w="100%">
                  <Text fontFamily="poppins" fontWeight="semibold" mb="4">
                    {selectedDoctorRating >= 4
                      ? "Apa yang menurut kamu baik?"
                      : "Apa yang perlu kami perbaiki?"}
                  </Text>

                  <Wrap spacing="3" shouldWrapChildren>
                    {MY_DOCTOR_APPOINTMENT_REVIEW_OPTIONS[
                      selectedDoctorRating
                    ].tags.map((tag) => {
                      return (
                        <Button
                          key={tag}
                          fontSize="sm"
                          fontWeight="semibold"
                          variant="chip"
                          borderColor="veryLightPink"
                          bg="white"
                          {...(Object.keys(selectedDoctorReviewTags).includes(
                            tag
                          ) && {
                            borderColor: "squash.500",
                            color: "squash.500",
                            bg: "squash.100",
                          })}
                          onClick={() => onSelectDoctorReviewTags(tag)}
                        >
                          {tag}
                        </Button>
                      );
                    })}
                  </Wrap>
                </Box>
                <Box w="100%">
                  <HStack justify="space-between" alignItems="center" mb="3">
                    <Text fontFamily="poppins" fontWeight="semibold">
                      {selectedDoctorRating >= 4
                        ? "Ceritakan pengalaman baik kamu"
                        : "Tulis masukanmu di sini ya!"}
                    </Text>
                    <Text
                      fontWeight="semibold"
                      color="brownGrey.500"
                      fontSize="xs"
                    >
                      {doctorReview.length}/500
                    </Text>
                  </HStack>
                  <FormControl isInvalid={formError.doctorReview}>
                    <Textarea
                      value={doctorReview}
                      onChange={onChangeDoctorReview}
                      borderColor="veryLightPink"
                      h="90px"
                      borderRadius="xl"
                      _placeholder={{ color: "brownGrey.500" }}
                      _hover={{ borderColor: "main.500" }}
                      _focus={{ borderColor: "main.500" }}
                      _invalid={{
                        borderColor: "cherry.500",
                        borderWidth: "0.5px",
                      }}
                      resize="none"
                      fontSize="sm"
                      autoFocus={false}
                      placeholder="Min. 3 karakter"
                    />
                    <FormErrorMessage fontSize="xxs">
                      Ulasan harus diisi
                    </FormErrorMessage>
                  </FormControl>
                </Box>
              </VStack>

              <VStack mt="5" spacing="3.5">
                <Box
                  fontSize="xs"
                  py="2"
                  bgColor="squash.100"
                  w="100%"
                  textAlign="center"
                >
                  Review yang diberikan hanya untuk internal SehatQ
                </Box>
                <Button w="100%" type="submit" isLoading={isLoading}>
                  Kirim
                </Button>
              </VStack>
            </>
          ) : null}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
