import { ASSETS } from "@sehatq/constants";
import { useAssets, useNavigation } from "@sehatq/utils";
import React from "react";
import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  HStack,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useImage,
  VStack,
} from "../../user-interfaces";
import { Fallback } from "../general";
import { ForumCategoryInput } from "./forum-category-input";

export type ForumFormDesktopProps = {
  isShowForm: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onCloseForm: () => void;
  onChangeInput: (name: string, value: string | number) => void;
  errors?: Record<string, string | undefined>;
  submited: boolean;
  onClickNewQuestion: () => void;
  textButton?: string;
  widthButton?: string;
  heightButton?: string;
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
  isBannerQuestionInput?: boolean;
  onClickNewQuestionBanner: () => void;
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
          value={value}
          borderRadius="base"
          placeholder={placeholder}
          size="md"
          onChange={(e) => {
            e.preventDefault();
            onChangeInput(fieldName, e.target.value);
          }}
        ></Textarea>
      ) : type == "select" ? (
        <ForumCategoryInput
          isFullWidth
          isRequired={errorText ? true : false}
          placeholder={placeholder}
          selectedValue={value as number | undefined}
          onChange={(selected) => {
            onChangeInput(fieldName, selected.value);
          }}
          maxHeightOptions="200px"
        />
      ) : (
        <Input
          border="0.5px solid"
          borderRadius="base"
          placeholder={placeholder}
          onChange={(e) => {
            e.preventDefault();
            onChangeInput(fieldName, e.target.value);
          }}
          size="md"
          type={type}
        ></Input>
      )}

      <FormErrorMessage fontSize="xs" fontStyle="italic">
        {errorText}
      </FormErrorMessage>
    </FormControl>
  );
}

export function ForumFormBanner(props: ForumFormDesktopProps) {
  const {
    onChangeInput,
    errors,
    textButton,
    widthButton,
    onClickNewQuestionBanner,
  } = props;
  const Image = useImage();
  return (
    <Flex direction="row" justify="space-between">
      <Flex
        direction="column"
        justify="space-between"
        align="start"
        borderRadius="xl"
        border="1px solid"
        borderColor="veryLightPink"
        width="80%"
        mr={3}
      >
        <FormControl p={5} isInvalid={errors?.question ? true : false}>
          <Textarea
            p={0}
            minHeight="66px"
            height="full"
            border="none"
            resize="none"
            value={props.values?.question}
            borderRadius="base"
            placeholder="Pertanyaan"
            size="md"
            onChange={(e) => {
              e.preventDefault();
              onChangeInput("question", e.target.value);
            }}
          />
          <VStack width="full" align="end" spacing={1}>
            {errors?.question ? (
              <FormErrorMessage fontSize="xxs" fontStyle="italic">
                {errors?.question}
              </FormErrorMessage>
            ) : (
              <FormHelperText color="brownGrey.500" fontSize="xxs">
                (maks. 500 karakter)
              </FormHelperText>
            )}
          </VStack>
        </FormControl>
        <Divider border="1px solid" borderColor="veryLightPink" my={1} />
        <HStack px={5} justify="space-between" width="full" height="55px">
          <Text fontSize="xs" fontStyle="italic" color="brownGrey.500">
            Postingan membutuhkan waku beberapa saat untuk tampil
          </Text>
          <Button
            variant={props.variant ?? "solid"}
            background={props.background ?? "main.500"}
            borderRadius={props.borderRadius ?? "base"}
            onClick={onClickNewQuestionBanner}
            size="sm"
            height={props.heightButton ?? "40px"}
            width={widthButton ?? "120px"}
            role={props.isLogin ? "button" : "link"}
          >
            {textButton ?? "Kirim"}
          </Button>
        </HStack>
      </Flex>
      <Image
        src={ASSETS.FORUM_BANNER}
        alt="forum-banner"
        layout="fill"
        objectFit="cover"
        priority
        wrapperProps={{
          width: "230px",
          paddingBottom: "20%",
          borderRadius: "xl",
          overflow: "hidden",
        }}
      />
    </Flex>
  );
}

export function ForumFormDesktop(props: ForumFormDesktopProps) {
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
    isBannerQuestionInput,
    disableNavigateBack,
  } = props;

  const ASSETS = useAssets(["SUCCESS_SUBMIT_FORUM", "FORUM_TELEMED_BANNER"]);
  const { Navigate } = useNavigation();
  const Image = useImage();
  return (
    <>
      {isBannerQuestionInput ? (
        <ForumFormBanner {...props} />
      ) : (
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
          {textButton ?? "Buat Pertanyaan Baru"}
        </Button>
      )}
      <Modal
        size={submited ? "sm" : "lg"}
        isOpen={isShowForm}
        onClose={onCloseForm}
      >
        <ModalOverlay />
        {submited ? (
          <ModalContent borderRadius="xl">
            <ModalBody padding={6}>
              <VStack spacing={6} width="full">
                <Fallback
                  image={{
                    src: ASSETS.SUCCESS_SUBMIT_FORUM,
                    width: 260,
                    height: 229,
                  }}
                  layout="vertical"
                  title="Pertanyaan Terkirim"
                  description={
                    <Text
                      color="charcoalGrey"
                      fontSize="sm"
                      fontFamily="openSans"
                      textAlign="center"
                    >
                      Tunggu sebentar, ya. Tim SehatQ sedang melakukan moderasi
                      sebelum menampilkan pertanyaanmu.
                    </Text>
                  }
                  isFullWidth
                />
                {disableNavigateBack ? (
                  <Button
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
              </VStack>
            </ModalBody>
          </ModalContent>
        ) : (
          <ModalContent borderRadius="xl">
            <ModalHeader
              fontSize="xl"
              color="charcoalGrey"
              fontWeight="semibold"
            >
              Tulis Pertanyaanmu
            </ModalHeader>
            <ModalCloseButton border="none" color="main.500" size="md" />
            <ModalBody paddingY={2} paddingX={6}>
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
                  value={props.values?.question}
                />
              </VStack>
            </ModalBody>
            <ModalFooter paddingX={6}>
              <VStack spacing={1} width="full">
                <Button
                  variant="solid"
                  colorScheme="main"
                  width="full"
                  height="46px"
                  size="md"
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
            </ModalFooter>
          </ModalContent>
        )}
      </Modal>
    </>
  );
}
