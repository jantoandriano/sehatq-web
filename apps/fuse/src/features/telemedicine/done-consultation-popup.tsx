import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAssets } from "@sehatq/utils";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Fallback,
  Text,
  VStack,
} from "@sehatq/components";
import {
  ConsultationCache,
  useGetConsultation,
  useUpdateDrugRecommendation,
} from "./consultation-queries";

export type DoneConsultationPopupProps = {
  consultationId: string;
  isOpen: boolean;
  popupType: "done" | "end" | "expired" | null;
};

function selectRecommendation(chat: ConsultationCache) {
  return chat.data.recommendation;
}

export function DoneConsultationPopup(props: DoneConsultationPopupProps) {
  const { consultationId, isOpen, popupType } = props;
  const router = useRouter();
  const query = {
    consultationId: consultationId ?? "",
  };

  const { data: recommendation } = useGetConsultation(query, {
    select: selectRecommendation,
    enabled: !!consultationId,
  });

  const updateDrugRecommendation = useUpdateDrugRecommendation();

  const ASSETS = useAssets([
    "ILLUSTRATION_TIMES_UP",
    "ILLUSTRATION_CHAT_ENDED",
  ]);

  const handleTebusObat = () => {
    updateDrugRecommendation.mutate(
      { consultationId, status: "user_added" },
      {
        onSuccess: () => router.push(`/drug-recommendation/${consultationId}`),
      }
    );
  };

  return (
    <>
      <Drawer
        placement="bottom"
        onClose={() => false}
        isOpen={isOpen}
        trapFocus={false}
      >
        <DrawerOverlay />
        <DrawerContent borderTopRadius="lg">
          <DrawerBody px={6} pt={4} pb={6}>
            <VStack spacing={7} height="full">
              <Fallback
                image={{
                  src:
                    popupType === "expired"
                      ? ASSETS.ILLUSTRATION_TIMES_UP
                      : ASSETS.ILLUSTRATION_CHAT_ENDED,
                  width: 276,
                  height: 276,
                }}
                layout="vertical"
                title={
                  popupType === "expired" ? (
                    <>
                      Terima kasih
                      <br />
                      Waktu Konsultasi Sudah Habis
                    </>
                  ) : (
                    "Chat Dokter Selesai"
                  )
                }
                description={
                  <Text
                    color="charcoalGrey"
                    fontSize="sm"
                    fontFamily="openSans"
                    textAlign="center"
                  >
                    {popupType === "expired"
                      ? "Kamu tidak bisa mengajukan pertanyaan lagi setelah mengakhiri sesi chat"
                      : "Selain ikuti anjuran dokter, jangan lupa tebus resep dari konsultasimu, ya"}
                  </Text>
                }
                isMobile
              />
              <VStack spacing={2} width="full">
                {recommendation && (
                  <Button
                    isLoading={updateDrugRecommendation.isLoading}
                    onClick={handleTebusObat}
                    isFullWidth
                    variant="solid"
                    fontWeight="semibold"
                    colorScheme="main"
                    borderRadius="base"
                    size="md"
                  >
                    Tebus Obat
                  </Button>
                )}
                <Button
                  isFullWidth
                  variant="outline"
                  fontWeight="semibold"
                  color="sea.500"
                  borderColor="white"
                  size="md"
                >
                  <Link
                    href={{
                      pathname: "/chat/[consultationId]/thank-you",
                      query: { consultationId },
                    }}
                  >
                    Selesai
                  </Link>
                </Button>
              </VStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
