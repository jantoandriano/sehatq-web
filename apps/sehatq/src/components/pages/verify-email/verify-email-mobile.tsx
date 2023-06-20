import React from "react";

import {
  Button,
  Center,
  Modal,
  ModalContent,
  Text,
  useImage,
  OTPEmail,
  VStack,
} from "@sehatq/components";
import { useAssets } from "@sehatq/utils";
import { SehatQHeader } from "@components/ui/sehatq-header";

interface Props {
  onSuccess: () => void;
  closeModal: () => void;
  isVerificationSuccess: boolean;
  email: string;
  initialResendOTPTimer: number;
  otpType: "verification" | "change";
}

export function VerifyEmailMobile({
  onSuccess,
  closeModal,
  isVerificationSuccess,
  email,
  initialResendOTPTimer,
  otpType,
}: Props) {
  const ASSETS = useAssets(["SUCCESS_SUBMIT_FORUM"]);
  const Image = useImage();

  return (
    <>
      <SehatQHeader variant="text" text="" />
      <Center mt="12">
        <OTPEmail
          isMobile
          onSuccess={onSuccess}
          email={email}
          initialResendOTPTimer={initialResendOTPTimer}
          otpType={otpType}
        />
      </Center>

      <Modal isOpen={isVerificationSuccess} onClose={closeModal}>
        <ModalContent w="full" h="full" bg="white" margin="0" py="8" px="8">
          <VStack justifyContent="space-between" h="full">
            <VStack spacing="4" h="full" justifyContent="center">
              <Image
                src={ASSETS.SUCCESS_SUBMIT_FORUM}
                alt="success submit otp"
                width={1}
                height={1}
                layout="responsive"
                wrapperProps={{
                  width: "2xs",
                  mb: 4,
                }}
              />
              {otpType === "verification" ? (
                <Text
                  fontFamily="Poppins"
                  fontWeight="semibold"
                  fontSize="lg"
                  textAlign="center"
                >
                  Yey! Email Kamu Berhasil Diverifikasi
                </Text>
              ) : (
                <>
                  <Text
                    fontFamily="Poppins"
                    fontWeight="semibold"
                    fontSize="lg"
                    textAlign="center"
                  >
                    Yey! Email Baru Berhasil Diverifikasi
                  </Text>
                  <Text fontSize="md" textAlign="center">
                    Email {email} sudah tersimpan di profilmu
                  </Text>
                </>
              )}
            </VStack>
            <Button w="full" onClick={closeModal}>
              OK, Kembali ke Profil
            </Button>
          </VStack>
        </ModalContent>
      </Modal>
    </>
  );
}
