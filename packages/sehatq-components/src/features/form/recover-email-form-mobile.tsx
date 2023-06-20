import React, { ChangeEvent, MouseEvent } from "react";
import { useAssets } from "@sehatq/utils";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  Modal,
  ModalBody,
  ModalContent,
  Text,
  useImage,
  ViewIcon,
  ViewOffIcon,
  VStack,
} from "../../user-interfaces";
import { ChangeableFieldTypes } from "./recover-email-form-types";

interface Props {
  fieldType: ChangeableFieldTypes;
  stateForm: {
    password: string;
    confirmPassword: string;
  };
  stateError: {
    password: string;
    confirmPassword: string;
  };
  isLoading: boolean;
  isRecoverSuccess: boolean;
  email: string;
  handleChangePassword: (e: ChangeEvent<HTMLElement>) => void;
  changeFieldType: (e: MouseEvent<HTMLElement>) => void;
  handleSubmit: () => void;
  closeModal: () => void;
}

export function RecoverEmailFormMobile({
  fieldType,
  stateForm,
  stateError,
  isLoading,
  isRecoverSuccess,
  email,
  handleChangePassword,
  changeFieldType,
  handleSubmit,
  closeModal,
}: Props) {
  const ASSETS = useAssets(["SUCCESS_SUBMIT_FORUM", "GENERIC_WARNING"]);
  const Image = useImage();

  return (
    <>
      <VStack w="full" mt="4" px="1" justifyContent="space-between" minH="md">
        <VStack w="full" spacing="9">
          <Flex
            bgColor="squash.50"
            w="full"
            py="3"
            borderRadius="base"
            px="4"
            gap="2"
          >
            <Image
              src={ASSETS.GENERIC_WARNING}
              alt="warning"
              layout="responsive"
              width={1}
              height={1}
              wrapperProps={{
                width: "24px",
              }}
            />
            <Text color="squash.600" fontSize="xs">
              Segera ubah password untuk memulihkan email akunmu
            </Text>
          </Flex>

          <FormControl isInvalid={!!stateError.password} variant="floating">
            <InputGroup border="0.5px solid #DADADA" borderRadius="md">
              <Input
                id="password"
                value={stateForm.password}
                onChange={handleChangePassword}
                type={fieldType.password}
                name="password"
                placeholder="Masukkan Password Baru"
                border="none"
                h="46px"
                _placeholder={{ color: "brownGrey.500" }}
                sx={{
                  "&:placeholder-shown + label": {
                    display: "none",
                  },
                }}
              />
              <FormLabel
                sx={{
                  "&": {
                    color: "var(--sehatq-colors-brownGrey-500) !important",
                    fontWeight: "normal !important",
                  },
                }}
              >
                Password
              </FormLabel>
              <IconButton
                aria-label="see password"
                variant="ghost"
                onClick={changeFieldType}
                icon={
                  fieldType.password === "password" ? (
                    <ViewIcon color="sea.500" w="30px" h="24px" />
                  ) : (
                    <ViewOffIcon color="sea.500" w="30px" h="24px" />
                  )
                }
              />
            </InputGroup>
            {stateError.password ? (
              <FormErrorMessage pl="4">{stateError.password}</FormErrorMessage>
            ) : (
              <></>
            )}
          </FormControl>

          <FormControl
            isInvalid={!!stateError.confirmPassword}
            variant="floating"
          >
            <InputGroup border="0.5px solid #DADADA" borderRadius="md">
              <Input
                id="confirm_password"
                value={stateForm.confirmPassword}
                onChange={handleChangePassword}
                type={fieldType.confirmPassword}
                name="confirmPassword"
                placeholder="Ulangi Password Baru"
                border="none"
                h="46px"
                _placeholder={{ color: "brownGrey.500" }}
                sx={{
                  "&:placeholder-shown + label": {
                    display: "none",
                  },
                }}
              />
              <FormLabel
                sx={{
                  "&": {
                    color: "var(--sehatq-colors-brownGrey-500) !important",
                    fontWeight: "normal !important",
                  },
                }}
              >
                Ulangi Password
              </FormLabel>
              <IconButton
                aria-label="see password"
                variant="ghost"
                onClick={changeFieldType}
                icon={
                  fieldType.confirmPassword === "password" ? (
                    <ViewIcon color="sea.500" w="30px" h="24px" />
                  ) : (
                    <ViewOffIcon color="sea.500" w="30px" h="24px" />
                  )
                }
              />
            </InputGroup>
            {stateError.confirmPassword ? (
              <FormErrorMessage pl="4">
                {stateError.confirmPassword}
              </FormErrorMessage>
            ) : (
              <></>
            )}
          </FormControl>
        </VStack>

        <Button w="full" h="46px" onClick={handleSubmit} isLoading={isLoading}>
          Ubah Password
        </Button>
      </VStack>

      <Modal isOpen={isRecoverSuccess} onClose={closeModal}>
        <ModalContent w="full" h="inherit" boxShadow="unset">
          <ModalBody mt="10">
            <VStack w="full" h="full" justifyContent="space-between" pb="5">
              <Image
                src={ASSETS.SUCCESS_SUBMIT_FORUM}
                alt="success submit otp"
                width={1}
                height={1}
                layout="responsive"
                wrapperProps={{
                  width: "2xs",
                }}
              />
              <VStack spacing="2">
                <Text
                  fontFamily="Poppins"
                  fontWeight="semibold"
                  fontSize="lg"
                  textAlign="center"
                >
                  Password Berhasil Diubah
                </Text>
                <Text fontSize="md" textAlign="center">
                  Emailmu sudah dipulihkan kembali ke <strong>{email}</strong>
                </Text>
              </VStack>
              <Button w="full" onClick={closeModal}>
                OK, Kembali ke Profil
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
