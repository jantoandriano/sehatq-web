import { useAssets } from "@sehatq/utils";
import React from "react";
import {
  Button,
  HStack,
  IconButton,
  EditIcon,
  ArrowBackIcon,
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Text,
  Textarea,
  useImage,
  VStack,
} from "../../user-interfaces";
import { Fields, Errors } from "./forum-comment-form-reducer";

export type ForumCommentEditFormMobileProps = {
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

export function ForumCommentEditFormMobile(
  props: ForumCommentEditFormMobileProps
) {
  const {
    isOpen,
    onOpen,
    values,
    errors,
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
        icon={<EditIcon width="24px" height="24px" />}
      />
      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalContent borderRadius="none">
          <HStack
            paddingX={4}
            paddingY={2}
            align="center"
            width="full"
            height="56px"
          >
            <IconButton
              variant="fit"
              aria-label="back"
              onClick={onClose}
              icon={
                <ArrowBackIcon width="28px" height="28px" color="sea.500" />
              }
            />
            <Text fontWeight="semibold" fontFamily="poppins">
              Edit Komentar
            </Text>
          </HStack>
          <ModalBody paddingX={4} paddingTop={6}>
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
          <ModalFooter paddingX={4}>
            <VStack spacing={2} width="full">
              <Button
                variant="solid"
                colorScheme="main"
                width="full"
                height="40px"
                size="sm"
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
                height="40px"
                size="sm"
                borderRadius="base"
                onClick={onClose}
              >
                Batal
              </Button>
            </VStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Drawer placement="bottom" onClose={onClose} isOpen={isSuccess && isOpen}>
        <DrawerOverlay zIndex="modal" />
        <DrawerContent borderTopRadius="lg">
          <DrawerBody px={6} pt={4} pb={10} textAlign="center">
            <Image
              src={ASSETS.SUCCESS_SUBMIT_FORUM}
              width={220}
              height={220}
              alt="Komentar Sudah Terkirim"
            />
            <Text
              fontFamily="poppins"
              fontWeight="semibold"
              fontSize="lg"
              mt={4}
            >
              Komentar Berhasil Diedit!
            </Text>
            <Button
              mt={8}
              width="full"
              variant="solid"
              colorScheme="main"
              borderRadius="base"
              onClick={onClose}
            >
              Kembali ke Forum
            </Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
