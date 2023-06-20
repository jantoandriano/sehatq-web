import React from "react";
import { useNavigation } from "@sehatq/utils";
import {
  Button,
  Link,
  SimpleGrid,
  Box,
  VStack,
  Text,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
} from "../../user-interfaces";

export type PrescriptionActionsMobileProps = {
  doctorSlug: string | null;
  consultationId: number | null;
  channel: {
    id: number;
    name: string;
    code:
      | "ConsultationBooking"
      | "ConsultationPublic"
      | "ConsultationPrivate"
      | "ConsultationApp";
  } | null;
  createPrescriptionCart: () => void;
  isCreatingPrescriptionCart: boolean;
  recreatePrescription: () => void;
  isRecreatingPrescription: boolean;
  status: "created" | "approved" | "expired" | "request_expired" | "rejected";
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export function PrescriptionActionsMobile(
  props: PrescriptionActionsMobileProps
) {
  const {
    doctorSlug,
    status,
    consultationId,
    channel,
    createPrescriptionCart,
    isCreatingPrescriptionCart,
    recreatePrescription,
    isRecreatingPrescription,
    isOpen,
    onOpen,
    onClose,
  } = props;
  const { Navigate } = useNavigation();
  let button;
  if (status === "created") {
    button = consultationId && (
      <Navigate
        name="PRESCRIPTION_FORM"
        query={consultationId ? { consultationId } : undefined}
      >
        <Link variant="solid" colorScheme="main" width="full">
          Lanjut Tebus Resep
        </Link>
      </Navigate>
    );
  }
  if (status === "approved") {
    button = (
      <Button
        isFullWidth
        onClick={createPrescriptionCart}
        isLoading={isCreatingPrescriptionCart}
      >
        Tebus Sekarang
      </Button>
    );
  }
  if (status === "expired") {
    button =
      consultationId && channel ? (
        <ChatUlangResep doctorSlug={doctorSlug} channel={channel} />
      ) : (
        <UploadUlangResep />
      );
  }
  if (status === "request_expired") {
    button = consultationId ? (
      <TebusUlangResep
        recreatePrescription={recreatePrescription}
        isRecreatingPrescription={isRecreatingPrescription}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />
    ) : (
      <UploadUlangResep />
    );
  }
  if (status === "rejected") {
    button = (
      <SimpleGrid columns={2} spacing={3} w="100%">
        <Navigate name="PRESCRIPTION_FORM">
          <Link width="full" variant="outline" paddingX={2}>
            Upload Ulang
          </Link>
        </Navigate>
        <Navigate name="TELEMEDICINES">
          <Link variant="solid" colorScheme="main" width="full" paddingX={2}>
            Chat Dokter
          </Link>
        </Navigate>
      </SimpleGrid>
    );
  }
  return (
    <Box
      position="sticky"
      bottom="0px"
      left="0px"
      zIndex="docked"
      padding={4}
      width="full"
      background="white"
      boxShadow="0px -2px 12px rgba(0, 0, 0, 0.1)"
    >
      {button}
    </Box>
  );
}

function UploadUlangResep() {
  const { Navigate } = useNavigation();
  return (
    <Navigate name="PRESCRIPTION_FORM">
      <Link variant="solid" colorScheme="main" width="full">
        Upload Ulang Resep
      </Link>
    </Navigate>
  );
}

export type ChatUlangResepProps = {
  doctorSlug: string | null;
  channel: {
    id: number;
    name: string;
    code:
      | "ConsultationBooking"
      | "ConsultationPublic"
      | "ConsultationPrivate"
      | "ConsultationApp";
  };
};

function ChatUlangResep(props: ChatUlangResepProps) {
  const { Navigate } = useNavigation();
  const { doctorSlug, channel } = props;
  return (
    <>
      {channel.code === "ConsultationPrivate" ||
      channel.code === "ConsultationBooking" ? (
        <Navigate name="TELEMED_HCP_PROFILE" query={{ slug: doctorSlug }}>
          <Link variant="solid" colorScheme="main" width="full">
            Chat Ulang Dokter
          </Link>
        </Navigate>
      ) : (
        channel.code === "ConsultationPublic" && (
          <Navigate name="TELEMED_GENERAL_CHAT_FORM">
            <Link variant="solid" colorScheme="main" width="full">
              Chat Ulang Dokter
            </Link>
          </Navigate>
        )
      )}
    </>
  );
}

export type TebusUlangResepProps = {
  recreatePrescription: () => void;
  isRecreatingPrescription: boolean;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

function TebusUlangResep(props: TebusUlangResepProps) {
  const {
    recreatePrescription,
    isRecreatingPrescription,
    isOpen,
    onOpen,
    onClose,
  } = props;
  return (
    <>
      <Button isFullWidth onClick={onOpen}>
        Tebus Ulang Resep
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="bottom"
        onClose={onClose}
        trapFocus={false}
      >
        <DrawerOverlay>
          <DrawerContent borderTopRadius="lg">
            <DrawerBody px={4} py={5}>
              <Text
                color="charcoalGrey"
                fontSize="md"
                fontFamily="poppins"
                fontWeight="semibold"
                width="full"
                lineHeight="7"
                textAlign="center"
              >
                Mau tebus ulang resep ini?
              </Text>
              <VStack spacing={3} mt={4}>
                <Button
                  isFullWidth
                  variant="solid"
                  colorScheme="main"
                  fontSize="sm"
                  fontWeight="semibold"
                  borderRadius="base"
                  onClick={recreatePrescription}
                  isLoading={isRecreatingPrescription}
                >
                  Ya, tebus ulang
                </Button>
                <Button
                  isFullWidth
                  variant="fit"
                  fontWeight="semibold"
                  color="sea.500"
                  fontSize="sm"
                  height="40px"
                  onClick={onClose}
                >
                  Tidak
                </Button>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
}
