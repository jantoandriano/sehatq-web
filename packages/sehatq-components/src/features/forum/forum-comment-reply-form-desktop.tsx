import { useAssets } from "@sehatq/utils";
import React from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Modal,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  Textarea,
  useImage,
  VStack,
} from "../../user-interfaces";
import { Fields, Errors } from "./forum-comment-form-reducer";

export type ForumCommentReplyFormDesktopProps = {
  values: Fields;
  errors: Errors;
  isOpen: boolean;
  isSuccess: boolean;
  commentBy: string;
  isLoading: boolean;
  disableSubmit: boolean;
  onClose: () => void;
  onOpen: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export function ForumCommentReplyFormDesktop(
  props: ForumCommentReplyFormDesktopProps
) {
  const {
    isOpen,
    onClose,
    onSubmit,
    onChange,
    values,
    errors,
    disableSubmit,
    isSuccess,
    commentBy,
    onOpen,
    isLoading,
  } = props;

  const ASSETS = useAssets(["SUCCESS_SUBMIT_FORUM"]);
  const Image = useImage();
  return (
    <>
      <Button
        variant="outline"
        colorScheme="main"
        color="sea.500"
        borderColor="main.500"
        width="fit-content"
        onClick={onOpen}
        size="sm"
      >
        Balas komentar ini
      </Button>
      <Modal size={isSuccess ? "sm" : "lg"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        {isSuccess ? (
          <ModalContent borderRadius="xl">
            <ModalBody padding={6} textAlign="center">
              <Image
                src={ASSETS.SUCCESS_SUBMIT_FORUM}
                width={260}
                height={260}
                alt="Komentar Sudah Terkirim"
              />
              <Text
                fontFamily="poppins"
                fontWeight="semibold"
                fontSize="xl"
                width="290px"
                mt={5}
              >
                Komentar Sudah Terkirim Terima Kasih
              </Text>
              <Button
                mt={10}
                size="lg"
                variant="solid"
                width="full"
                colorScheme="main"
                borderRadius="base"
                onClick={onClose}
              >
                Kembali ke Forum
              </Button>
            </ModalBody>
          </ModalContent>
        ) : (
          <ModalContent borderRadius="xl">
            <ModalHeader fontFamily="poppins" fontSize="2xl">
              Balas Komentar
            </ModalHeader>
            <ModalCloseButton
              size="md"
              top="4"
              right="6"
              color="veryLightPink"
            />
            <ModalBody paddingY={4} paddingX={6}>
              <VStack spacing={2}>
                <FormControl
                  variant="floating"
                  isInvalid={errors?.comment ? true : false}
                >
                  <Textarea
                    name="comment"
                    minHeight="340px"
                    border="0.5px solid"
                    borderRadius="base"
                    size="md"
                    value={values.comment}
                    onChange={onChange}
                  ></Textarea>
                  <FormLabel>Balas Komentar {commentBy}</FormLabel>
                  <FormErrorMessage fontSize="xs" fontStyle="italic">
                    {errors?.comment}
                  </FormErrorMessage>
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter paddingX={6}>
              <VStack spacing={2} width="full">
                <Button
                  variant="solid"
                  colorScheme="main"
                  width="full"
                  height="46px"
                  size="md"
                  borderRadius="base"
                  onClick={onSubmit}
                  disabled={disableSubmit || isLoading}
                  isLoading={isLoading}
                >
                  Balas
                </Button>
                <Button
                  variant="ghost"
                  colorScheme="sea"
                  width="full"
                  height="46px"
                  size="md"
                  borderRadius="base"
                  onClick={onClose}
                >
                  Batal
                </Button>
              </VStack>
            </ModalFooter>
          </ModalContent>
        )}
      </Modal>
    </>
  );
}
