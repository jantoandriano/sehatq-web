import { useAssets } from "@sehatq/utils";
import React from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  ModalCloseButton,
  ModalHeader,
  Text,
  HStack,
  Box,
  VStack,
  Button,
  StackDivider,
  Icon,
  Textarea,
  DrawerProps,
  Wrap,
  Image,
  Flex,
  FormControl,
  FormErrorMessage,
} from "../../user-interfaces";
import {
  CUSTOMER_SERVICE_REVIEW_OPTIONS,
  CustomerServiceReviewOptionKey,
} from "./customer-service-review-constants";

export type CustomerServiceReviewModalMobileProps = {
  modalProps: Omit<DrawerProps, "children" | "size">;
  selectedCSRating: CustomerServiceReviewOptionKey | "";
  onSelectCSRating: (rating: CustomerServiceReviewOptionKey) => void;
  selectedCSReviewTags: Record<string, boolean>;
  onSelectCSReviewTags: (tag: string) => void;
  onChangeCSReview: React.ChangeEventHandler<HTMLTextAreaElement>;
  csReview: string;
  onSubmitCSReview: React.FormEventHandler<HTMLDivElement>;
  isSuccess: boolean;
  isLoading: boolean;
  onSuccessSubmitCSReview: () => void;
  formError: {
    csReview: boolean;
  };
};
export function CustomerServiceReviewModalMobile(
  props: CustomerServiceReviewModalMobileProps
) {
  const ASSETS = useAssets(["REVIEW_CS_SUCCESS"]);
  const {
    modalProps,
    selectedCSRating,
    onSelectCSRating,
    selectedCSReviewTags,
    onSelectCSReviewTags,
    onChangeCSReview,
    csReview,
    onSubmitCSReview,
    isSuccess,
    isLoading,
    onSuccessSubmitCSReview,
    formError,
  } = props;
  return (
    <Drawer placement="bottom" {...modalProps} trapFocus={false}>
      <DrawerOverlay />
      <DrawerContent py="5" px="4">
        {!isSuccess ? (
          <ModalHeader
            fontSize="sm"
            fontFamily="poppins"
            fontWeight="semibold"
            p="0"
          >
            Nilai pelayanan kami juga, yuk!{" "}
          </ModalHeader>
        ) : null}
        <ModalCloseButton
          h="16px"
          w="16px"
          top="6"
          color="veryLightPink"
          onClick={!isSuccess ? modalProps.onClose : onSuccessSubmitCSReview}
        />
        <DrawerBody p="0" as="form" onSubmit={onSubmitCSReview}>
          {!isSuccess ? (
            <>
              <Text fontSize="xs" mt="1.5" mb="4">
                Bantu kami untuk menjadi lebih baik lagi dengan menilai
                pelayanan Customer Service kami.
              </Text>
              <HStack justifyContent="center" spacing="3" mt="0.5">
                {Object.values(CUSTOMER_SERVICE_REVIEW_OPTIONS).map(
                  (option) => {
                    return (
                      <VStack
                        key={option.id}
                        align="center"
                        justifyContent="center"
                        cursor="pointer"
                        onClick={() => {
                          onSelectCSRating(option.id);
                        }}
                      >
                        <Box
                          border="1.5px solid"
                          borderColor={
                            selectedCSRating === option.id
                              ? option.color
                              : "veryLightPink"
                          }
                          borderRadius="md"
                          bgColor={
                            selectedCSRating === option.id
                              ? option.bgColor
                              : "white"
                          }
                          boxSize="52px"
                        >
                          <Icon
                            as={option.icon}
                            boxSize="52px"
                            color={
                              selectedCSRating === option.id
                                ? option.color
                                : "veryLightPink"
                            }
                          />
                        </Box>
                        <Text
                          fontFamily="poppins"
                          fontSize="xxs"
                          textAlign="center"
                        >
                          {option.name}
                        </Text>
                      </VStack>
                    );
                  }
                )}
              </HStack>
              {selectedCSRating ? (
                <>
                  <StackDivider
                    color="veryLightPink"
                    border="0.5px solid"
                    my="3.5"
                  />
                  <VStack
                    spacing="3.5"
                    divider={<StackDivider borderColor="veryLightPink" />}
                  >
                    <Box w="100%">
                      <Text
                        fontFamily="poppins"
                        fontWeight="semibold"
                        mb="4"
                        fontSize="xs"
                      >
                        {CUSTOMER_SERVICE_REVIEW_OPTIONS[selectedCSRating]
                          .value >= 4
                          ? "Apa yang menurut kamu baik?"
                          : "Apa yang dapat kami perbaiki?"}
                      </Text>
                      <Wrap spacing="3" shouldWrapChildren overflow="hidden">
                        {CUSTOMER_SERVICE_REVIEW_OPTIONS[
                          selectedCSRating
                        ].tags.map((tag) => {
                          return (
                            <Button
                              key={tag}
                              fontSize="xxs"
                              fontWeight="semibold"
                              variant="chip"
                              borderColor="veryLightPink"
                              bg="white"
                              {...(Object.keys(selectedCSReviewTags).includes(
                                tag
                              ) && {
                                borderColor: "squash.500",
                                color: "squash.500",
                                bg: "squash.100",
                              })}
                              onClick={() => onSelectCSReviewTags(tag)}
                            >
                              {tag}
                            </Button>
                          );
                        })}
                      </Wrap>
                    </Box>
                    <Box w="100%">
                      <HStack
                        justify="space-between"
                        alignItems="center"
                        mb="3"
                      >
                        <Text
                          fontFamily="poppins"
                          fontWeight="semibold"
                          fontSize="xs"
                        >
                          Tulis masukanmu di sini ya!
                        </Text>
                        <Text
                          fontWeight="semibold"
                          color="brownGrey.500"
                          fontSize="xxs"
                        >
                          {csReview.length}/500
                        </Text>
                      </HStack>
                      <FormControl isInvalid={formError.csReview}>
                        <Textarea
                          value={csReview}
                          onChange={onChangeCSReview}
                          borderColor="veryLightPink"
                          h="74px"
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
                  <VStack mt="3.5" spacing="3">
                    <Box
                      fontSize="sm"
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
            </>
          ) : (
            <VStack>
              <Flex direction="column" justifyContent="center" align="center">
                <Image
                  width="76%"
                  src={ASSETS.REVIEW_CS_SUCCESS}
                  alt="review-cs-success"
                />
                <Text fontFamily="poppins" fontWeight="semibold">
                  Terima Kasih atas Ulasanmu
                </Text>
                <Text textAlign="center" fontSize="sm">
                  Setiap masukan akan membantu kami dalam meningkatkan pelayanan
                </Text>
              </Flex>
              <Button
                w="100%"
                onClick={onSuccessSubmitCSReview}
                fontWeight="semibold"
              >
                Tutup
              </Button>
            </VStack>
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
