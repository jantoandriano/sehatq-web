import { useAssets } from "@sehatq/utils";
import React from "react";
import {
  Button,
  HStack,
  IconButton,
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

export type ForumCommentReplyFormMobileProps = {
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

export function ForumCommentReplyFormMobile(
  props: ForumCommentReplyFormMobileProps
) {
  const {
    isOpen,
    onOpen,
    errors,
    values,
    onClose,
    onSubmit,
    onChange,
    isSuccess,
    commentBy,
    isLoading,
    disableSubmit,
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
        size="xs"
      >
        Balas komentar ini
      </Button>
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
              Balas Komentar
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
                <FormLabel>Balas Komentar {commentBy}</FormLabel>
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
                Balas
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
              width="290px"
              mt={4}
            >
              Komentar Sudah Terkirim Terima Kasih
            </Text>
            <Button
              mt={8}
              variant="solid"
              colorScheme="main"
              width="full"
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
