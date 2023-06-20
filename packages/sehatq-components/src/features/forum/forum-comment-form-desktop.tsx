import { useAssets } from "@sehatq/utils";
import React from "react";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  Textarea,
  useImage,
  VStack,
} from "../../user-interfaces";
import { ForumForm } from "./forum-form";
import { Fields, Errors } from "./forum-comment-form-reducer";

export type ForumCommentFormDesktopProps = {
  values: Fields;
  errors: Errors;
  submited: boolean;
  isLoading: boolean;
  onCloseForm: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onChangeInput: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export function ForumCommentFormDesktop(props: ForumCommentFormDesktopProps) {
  const {
    values,
    errors,
    onSubmit,
    submited,
    isLoading,
    onCloseForm,
    onChangeInput,
  } = props;

  const ASSETS = useAssets(["SUCCESS_SUBMIT_FORUM"]);
  const Image = useImage();
  return (
    <>
      <Modal size="sm" isOpen={submited} onClose={onCloseForm}>
        <ModalOverlay />
        <ModalContent borderRadius="xl">
          <ModalBody padding={6}>
            <VStack marginX="auto" width="full" justify="center" spacing={5}>
              <Image
                src={ASSETS.SUCCESS_SUBMIT_FORUM}
                width={218}
                height={192}
                alt="Komentar Sudah Terkirim"
                layout="responsive"
                wrapperProps={{
                  width: "75%",
                }}
              />
              <Text
                fontFamily="poppins"
                fontWeight="semibold"
                textAlign="center"
                fontSize="xl"
                width="290px"
              >
                Komentar Sudah Terkirim Terima Kasih
              </Text>
              <Button
                mt={4}
                variant="solid"
                colorScheme="main"
                width="full"
                height="46px"
                size="md"
                borderRadius="base"
                onClick={onCloseForm}
              >
                Kembali ke Forum
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Flex
        direction="column"
        background="white"
        p={6}
        borderRadius="xl"
        justify="space-between"
        minH="252px"
        boxShadow="base"
      >
        <Text
          fontSize="lg"
          fontFamily="poppins"
          color="charcoalGrey"
          fontWeight="semibold"
        >
          Beri Komentar
        </Text>
        <FormControl isInvalid={errors?.comment ? true : false}>
          <Textarea
            name="comment"
            border="none"
            height="118px"
            borderRadius="base"
            background="gray.500"
            value={values.comment}
            onChange={onChangeInput}
            placeholder="Tuliskan komentarmu untuk pertanyaan ini"
          />
          <FormErrorMessage fontSize="xs" fontStyle="italic">
            {errors?.comment}
          </FormErrorMessage>
        </FormControl>
        <Flex direction="row" justify="space-between">
          <Text color="brownGrey.500" fontSize="xs" fontStyle="italic">
            Butuh beberapa saat untuk menampilkan komentarmu.
          </Text>
          <HStack spacing="2">
            <ForumForm isMobile={false} />
            <Button
              variant="solid"
              size="sm"
              height="40px"
              onClick={onSubmit}
              disabled={isLoading}
              isLoading={isLoading}
            >
              Kirim Komentar
            </Button>
          </HStack>
        </Flex>
      </Flex>
    </>
  );
}
