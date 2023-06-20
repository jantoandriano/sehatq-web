import { useAssets } from "@sehatq/utils";
import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  FormControl,
  FormErrorMessage,
  Text,
  Textarea,
  VStack,
  Button,
  useImage,
} from "../../user-interfaces";
import { Fields, Errors } from "./forum-comment-form-reducer";

export type ForumCommentFormMobileProps = {
  values: Fields;
  errors: Errors;
  submited: boolean;
  textButton: string;
  isLoading: boolean;
  isShowForm: boolean;
  widthButton?: string;
  onCloseForm: () => void;
  onClickShowForm: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onChangeInput: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export function ForumCommentFormMobile(props: ForumCommentFormMobileProps) {
  const {
    values,
    errors,
    onSubmit,
    submited,
    isLoading,
    isShowForm,
    textButton,
    widthButton,
    onCloseForm,
    onChangeInput,
    onClickShowForm,
  } = props;

  const ASSETS = useAssets(["SUCCESS_SUBMIT_FORUM"]);
  const Image = useImage();
  return (
    <>
      <Button
        variant="solid"
        size="sm"
        height="40px"
        onClick={onClickShowForm}
        width={widthButton}
      >
        {textButton}
      </Button>
      <Drawer placement="bottom" onClose={onCloseForm} isOpen={isShowForm}>
        <DrawerOverlay />
        {submited ? (
          <DrawerContent borderTopRadius="lg">
            <DrawerBody px={6} pt={4} pb={10}>
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
                  fontSize="lg"
                  width="290px"
                >
                  Komentar Sudah Terkirim Terima Kasih
                </Text>
                <Button
                  mt={4}
                  variant="solid"
                  colorScheme="main"
                  width="full"
                  height="40px"
                  size="md"
                  borderRadius="base"
                  onClick={onCloseForm}
                >
                  Kembali ke Forum
                </Button>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        ) : (
          <DrawerContent borderTopRadius="lg">
            <DrawerBody p={6}>
              <VStack mt={6} spacing={4} width="full">
                <FormControl isInvalid={errors?.comment ? true : false}>
                  <Textarea
                    name="comment"
                    borderRadius="base"
                    height="337px"
                    placeholder="Beri Komentar"
                    value={values.comment}
                    onChange={onChangeInput}
                  />
                  <FormErrorMessage fontSize="xxs" fontStyle="italic">
                    {errors?.comment}
                  </FormErrorMessage>
                </FormControl>

                <Button
                  variant="solid"
                  colorScheme="main"
                  width="full"
                  height="40px"
                  size="sm"
                  borderRadius="base"
                  onClick={onSubmit}
                  disabled={isLoading}
                  isLoading={isLoading}
                >
                  Kirim
                </Button>
                <Text
                  fontSize="xxs"
                  color="brownGrey.500"
                  fontStyle="italic"
                  lineHeight={10}
                >
                  Butuh beberapa saat untuk menampilkan komentarmu.
                </Text>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        )}
      </Drawer>
    </>
  );
}
