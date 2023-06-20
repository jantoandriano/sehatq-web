import { useAssets } from "@sehatq/utils";
import React from "react";
import {
  Button,
  IconButton,
  EditIcon,
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

export type ForumCommentEditFormDesktopProps = {
  values: Fields;
  errors: Errors;
  isOpen: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  disableSubmit: boolean;
  onClose: () => void;
  onOpen: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export function ForumCommentEditFormDesktop(
  props: ForumCommentEditFormDesktopProps
) {
  const {
    isOpen,
    values,
    errors,
    onOpen,
    onClose,
    onSubmit,
    onChange,
    isSuccess,
    isLoading,
    disableSubmit,
  } = props;

  const ASSETS = useAssets(["SUCCESS_SUBMIT_FORUM"]);
  const Image = useImage();
  return (
    <>
      <IconButton
        variant="fit"
        aria-label="edit"
        onClick={onOpen}
        icon={<EditIcon width="28px" height="28px" />}
      />
      <Modal size={isSuccess ? "sm" : "lg"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        {isSuccess ? (
          <ModalContent borderRadius="xl">
            <ModalCloseButton
              size="md"
              top="4"
              right="6"
              color="veryLightPink"
            />
            <ModalBody
              paddingX={6}
              paddingBottom={5}
              paddingTop={12}
              textAlign="center"
            >
              <Image
                src={ASSETS.SUCCESS_SUBMIT_FORUM}
                width={260}
                height={260}
                alt="Komentar Berhasil Diedit!"
              />
              <Text
                fontFamily="poppins"
                fontWeight="semibold"
                fontSize="xl"
                mt={5}
              >
                Komentar Berhasil Diedit!
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
              Edit Komentar
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
                  <FormLabel>Komentar</FormLabel>
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
                  Simpan
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
