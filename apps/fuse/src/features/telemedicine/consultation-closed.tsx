import React from "react";
import Link from "next/link";
import {
  Button,
  Container,
  Fallback,
  Flex,
  Image,
  Text,
  VStack,
} from "@sehatq/components";
import { useAssets } from "@sehatq/utils";
import { ConsultationCache, useGetConsultation } from "./consultation-queries";

export type ConsultationClosedProps = {
  consultationId: string;
};

function selectRecommendation(chat: ConsultationCache) {
  return chat.data.recommendation;
}

export function ConsultationClosed(props: ConsultationClosedProps) {
  const { consultationId } = props;
  const query = {
    consultationId: consultationId ?? "",
  };

  const { data: recommendation } = useGetConsultation(query, {
    select: selectRecommendation,
    enabled: !!consultationId,
  });

  const ASSETS = useAssets(["ILLUSTRATION_CHAT_ENDED", "SEHATQ"]);

  return (
    <Container>
      <Flex flexDirection="column" align="center" justify="center" minH="100vh">
        <Image
          src={ASSETS.SEHATQ}
          alt="SehatQ"
          width={160}
          height={132}
          mb="auto"
        />
        <Fallback
          image={{
            src: ASSETS.ILLUSTRATION_CHAT_ENDED,
            width: 264,
            height: 264,
          }}
          layout="vertical"
          title="Chat Dokter Selesai"
          description={
            <Text fontSize="sm" textAlign="center">
              Selain ikuti anjuran dokter, jangan lupa tebus <br /> resep dari
              konsultasimu, ya
            </Text>
          }
          isMobile
          isFullWidth
        />
        <VStack spacing={2} mt="auto" mb={4} w="full">
          {!!recommendation && (
            <Button colorScheme="main" w="full">
              <Link
                href={{
                  pathname: "/drug-recommendation/[id]",
                  query: { id: consultationId },
                }}
              >
                Tebus Obat
              </Link>
            </Button>
          )}
          <Button variant="unstyled" color="sea.500" w="full">
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
      </Flex>
    </Container>
  );
}
