import React from "react";

import {
  Button,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useImage,
  OTPEmail,
  VStack,
} from "@sehatq/components";
import { useAssets } from "@sehatq/utils";
import { SehatqNavbar } from "@components/ui/sehatq-navbar";

interface Props {
  onSuccess: () => void;
  closeModal: () => void;
  isVerificationSuccess: boolean;
  email: string;
  initialResendOTPTimer: number;
  otpType: "verification" | "change";
}

export function VerifyEmailDesktop({
  onSuccess,
  closeModal,
  email,
  initialResendOTPTimer,
  isVerificationSuccess,
  otpType,
}: Props) {
  const ASSETS = useAssets(["SUCCESS_SUBMIT_FORUM"]);
  const Image = useImage();

  return (
    <>
      <SehatqNavbar withCompanyPartner />
      <Center pt="12">
        <OTPEmail
          isMobile={false}
          onSuccess={onSuccess}
          email={email}
          initialResendOTPTimer={initialResendOTPTimer}
          otpType={otpType}
        />
      </Center>

      <Modal isOpen={isVerificationSuccess} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent w="lg" h="lg">
          <ModalCloseButton />
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
                      Email <strong>{email}</strong> sudah tersimpan di profilmu
                    </Text>
                  </>
                )}
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
