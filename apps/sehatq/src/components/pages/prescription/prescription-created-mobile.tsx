import { Flex, HStack, Link, Text, useImage, VStack } from "@sehatq/components";
import React from "react";
import { useAssets, useNavigation } from "@sehatq/utils";
import { PrescriptionCreatedHead } from "@components/head";

type PrescriptionCreatedMobileProps = {
  prescriptionNo: string;
};

export function PrescriptionCreatedMobile(
  props: PrescriptionCreatedMobileProps
) {
  const ASSETS = useAssets(["SUCCESS_SUBMIT_FORUM"]);
  const { Navigate } = useNavigation();
  const Image = useImage();
  return (
    <>
      <PrescriptionCreatedHead />
      <Flex
        background="white"
        p={4}
        pt={16}
        width="full"
        direction="column"
        justify="space-between"
        height="100vh"
      >
        <VStack align="start" width="full" spacing={4}>
          <VStack marginX="auto" width="full" justify="center" spacing={5}>
            <Image
              src={ASSETS.SUCCESS_SUBMIT_FORUM}
              width={250}
              height={250}
              alt="success submit image"
              layout="responsive"
              wrapperProps={{
                width: "75%",
              }}
            />
            <VStack width="100%">
              <Text
                fontSize="md"
                fontWeight="semibold"
                fontFamily="poppins"
                textAlign="center"
              >
                Resepmu Sedang Diproses
              </Text>
              <Text
                fontSize="sm"
                fontWeight="normal"
                fontFamily="openSans"
                maxW={251}
                textAlign="center"
              >
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
              <Text fontSize="20px" color="#4D555B" mt="-1.5">
                •
              </Text>
              <Text fontSize="xs" color="#4D555B">
                Resep ini sedang diproses dan hanya dapat digunakan 1 kali.
              </Text>
            </HStack>
            <HStack align="start">
              <Text fontSize="20px" color="#4D555B" mt="-1.5">
                •
              </Text>
              <Text fontSize="xs" color="#4D555B">
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
      </Flex>
    </>
  );
}
