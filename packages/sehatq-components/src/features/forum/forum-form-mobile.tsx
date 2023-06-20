import { DrawerFooter } from "@chakra-ui/react";
import { useAssets, useNavigation } from "@sehatq/utils";
import React from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormErrorMessage,
  Input,
  Link,
  Text,
  Textarea,
  useImage,
  VStack,
} from "../../user-interfaces";
import { Fallback } from "../general";
import { ForumCategoryInput } from "./forum-category-input";

export type ForumFormMobileProps = {
  isShowForm: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onCloseForm: () => void;
  onChangeInput: (name: string, value: string | number) => void;
  errors?: Record<string, string | undefined>;
  submited: boolean;
  onClickNewQuestion: () => void;
  textButton?: string;
  heightButton?: string;
  widthButton?: string;
  isLoading: boolean;
  values?: {
    title: string;
    categoryId: number;
    question: string;
  };
  variant?:
    | "link"
    | "outline"
    | "tab"
    | "solid"
    | "ghost"
    | "unstyled"
    | "fit"
    | "chip"
    | undefined;
  background?: string;
  borderRadius?: string;
  disableNavigateBack?: boolean;
  isLogin?: boolean;
};

function InputForm(props: {
  placeholder: string;
  fieldName: string;
  type: "text" | "textarea" | "number" | "select";
  errorText?: string;
  onChangeInput: (name: string, value: string | number) => void;
  value?: string | number;
}) {
  const { placeholder, fieldName, type, errorText, onChangeInput, value } =
    props;

  return (
    <FormControl isInvalid={errorText ? true : false}>
      {type == "textarea" ? (
        <Textarea
          border="0.5px solid"
          borderRadius="base"
          placeholder={placeholder}
          size="sm"
          onChange={(e) => {
            e.preventDefault();
            onChangeInput(fieldName, e.target.value);
          }}
        ></Textarea>
      ) : type == "select" ? (
        <ForumCategoryInput
          isFullWidth
          isMobile={true}
          isRequired={errorText ? true : false}
          placeholder={placeholder}
          selectedValue={value as number | undefined}
          onChange={(selected) => {
            onChangeInput(fieldName, selected.value);
          }}
          maxHeightOptions="150px"
        />
      ) : (
        <Input
          border="0.5px solid"
          borderRadius="base"
          placeholder={placeholder}
          size="sm"
          type={type}
          onChange={(e) => {
            e.preventDefault();
            onChangeInput(fieldName, e.target.value);
          }}
        ></Input>
      )}
      <FormErrorMessage fontSize="xxs" fontStyle="italic">
        {errorText}
      </FormErrorMessage>
    </FormControl>
  );
}

export function ForumFormMobile(props: ForumFormMobileProps) {
  const {
    isShowForm,
    onCloseForm,
    onSubmit,
    onChangeInput,
    errors,
    submited,
    onClickNewQuestion,
    textButton,
    widthButton,
    isLoading,
    disableNavigateBack,
  } = props;

  const ASSETS = useAssets(["SUCCESS_SUBMIT_FORUM", "FORUM_TELEMED_BANNER"]);
  const { Navigate } = useNavigation();
  const Image = useImage();
  return (
    <>
      <Button
        variant={props.variant ?? "outline"}
        background={props.background ?? undefined}
        borderRadius={props.borderRadius ?? undefined}
        onClick={onClickNewQuestion}
        size="sm"
        height={props.heightButton ?? "40px"}
        width={widthButton}
        role={props.isLogin ? "button" : "link"}
      >
        {textButton ?? "Tanya"}
      </Button>
      <Drawer placement="bottom" onClose={onCloseForm} isOpen={isShowForm}>
        <DrawerOverlay />
        {submited ? (
          <DrawerContent borderTopRadius="lg">
            <DrawerBody px={6} pt={4} pb={10}>
              <Fallback
                image={{
                  src: ASSETS.SUCCESS_SUBMIT_FORUM,
                  width: 218,
                  height: 192,
                }}
                layout="vertical"
                title="Pertanyaan Terkirim"
                description={
                  <Text
                    color="charcoalGrey"
                    fontSize="md"
                    fontFamily="openSans"
                    textAlign="center"
                  >
                    Tunggu sebentar, ya. Tim SehatQ sedang melakukan moderasi
                    sebelum menampilkan pertanyaanmu.
                  </Text>
                }
                isMobile
              />
              {disableNavigateBack ? (
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
              ) : (
                <Navigate name="FORUMS">
                  <Link
                    mt={4}
                    variant="solid"
                    colorScheme="main"
                    width="full"
                    height="46px"
                    size="md"
                    borderRadius="base"
                  >
                    Kembali ke Forum
                  </Link>
                </Navigate>
              )}
            </DrawerBody>
          </DrawerContent>
        ) : (
          <DrawerContent borderTopRadius="lg">
            <DrawerHeader
              pb={2}
              pt={3}
              fontSize="lg"
              fontFamily="poppins"
              fontWeight="semibold"
              color="charcoalGrey"
            >
              Tulis Pertanyaanmu
            </DrawerHeader>
            <DrawerBody px={6} pt={4} pb={10}>
              <VStack spacing={2}>
                <InputForm
                  fieldName="title"
                  onChangeInput={onChangeInput}
                  placeholder="Judul"
                  type="text"
                  errorText={errors?.title}
                />
                <InputForm
                  fieldName="categoryId"
                  onChangeInput={onChangeInput}
                  placeholder="Kategori"
                  type="select"
                  errorText={errors?.categoryId}
                  value={props.values?.categoryId}
                />
                <InputForm
                  fieldName="question"
                  onChangeInput={onChangeInput}
                  placeholder="Pertanyaan"
                  type="textarea"
                  errorText={errors?.question}
                />
              </VStack>
            </DrawerBody>
            <DrawerFooter>
              <VStack spacing={1} width="full">
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
                  Pertanyaanmu akan ditampilkan ketika sudah dijawab dokter.
                </Text>
                <Navigate
                  name="TELEMED_FASKES_DETAIL"
                  query={{ hospitalSlug: "sehatq" }}
                >
                  <Link>
                    <Image
                      src={ASSETS.FORUM_TELEMED_BANNER}
                      alt="forum-telemed-banner"
                      width={470}
                      height={90}
                      wrapperProps={{
                        borderRadius: "xl",
                        overflow: "hidden",
                        paddingTop: 2,
                      }}
                    />
                  </Link>
                </Navigate>
              </VStack>
            </DrawerFooter>
          </DrawerContent>
        )}
      </Drawer>
    </>
  );
}
