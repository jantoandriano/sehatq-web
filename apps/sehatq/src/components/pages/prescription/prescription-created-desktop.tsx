import {
  Center,
  HStack,
  Link,
  Text,
  useImage,
  VStack,
} from "@sehatq/components";
import React from "react";
import { useAssets, useNavigation } from "@sehatq/utils";
import { SehatqNavbar } from "@components/ui/sehatq-navbar";
import { PrescriptionCreatedHead } from "@components/head";

type PrescriptionCreatedDesktopProps = {
  prescriptionNo: string;
};

export function PrescriptionCreatedDesktop(
  props: PrescriptionCreatedDesktopProps
) {
  const ASSETS = useAssets(["SUCCESS_SUBMIT_FORUM"]);
  const { Navigate } = useNavigation();
  const Image = useImage();
  return (
    <>
      <PrescriptionCreatedHead />
      <SehatqNavbar withCompanyPartner />
      <Center width="full" mt={10}>
        <VStack
          align="start"
          background="white"
          borderRadius="xl"
          boxShadow="base"
          p={6}
          spacing={4}
          maxW={686}
        >
          <VStack marginX="auto" width="500px" justify="center" spacing={5}>
            <Image
              src={ASSETS.SUCCESS_SUBMIT_FORUM}
              width={250}
              height={250}
              alt="success submit image"
              layout="fixed"
            />
            <VStack width="100%">
              <Text
                fontFamily="poppins"
                fontWeight="semibold"
                textAlign="center"
                fontSize="md"
              >
                Resepmu Sedang Diproses
              </Text>
              <Text fontSize="sm" maxW={435} textAlign="center">
                Proses pembayaran bisa dilakukan setelah resep siap ditebus.
              </Text>
            </VStack>
          </VStack>
          <VStack
            align="start"
            width="full"
            p={3}
            background="iceBlue.500"
            borderRadius="base"
          >
            <HStack align="start">
              <Text fontSize="20px" color="#4D555B" mt="-1">
                •
              </Text>
              <Text fontSize="sm" color="#4D555B">
                Resep ini sedang diproses dan hanya dapat digunakan 1 kali.
              </Text>
            </HStack>
            <HStack align="start">
              <Text fontSize="20px" color="#4D555B" mt="-1">
                •
              </Text>
              <Text fontSize="sm" color="#4D555B">
                Waktu operasional untuk memproses resep dilayani{" "}
                <Text as="span" d="inline" fontWeight="semibold">
                  setiap hari
                </Text>{" "}
                jam{" "}
                <Text as="span" d="inline" fontWeight="semibold">
                  06:00 - 23:00
                </Text>
              </Text>
            </HStack>
          </VStack>
          <Navigate
            name="PRESCRIPTION"
            query={{ prescriptionNo: props.prescriptionNo }}
          >
            <Link
              variant="solid"
              borderRadius="base"
              colorScheme="main"
              fontSize="md"
              width="full"
            >
              Lihat Status Resep
            </Link>
          </Navigate>
        </VStack>
      </Center>
    </>
  );
}
