import React from "react";
import {
  ConsultationProductsInfo,
  GridBlock,
  GridBlockItem,
  PrescriptionForm,
  PrescriptionImageExample,
  Text,
  VStack,
} from "@sehatq/components";
import { SehatqNavbar } from "@components/ui/sehatq-navbar";
import { PrescriptionFormHead } from "@components/head";

export type PrescriptionFormGeneralProps = {
  consultationId?: string;
};
export function PrescriptionFormDesktop(props: PrescriptionFormGeneralProps) {
  return (
    <>
      <PrescriptionFormHead />
      <SehatqNavbar withCompanyPartner />
      <VStack
        pt={6}
        align="start"
        direction="column"
        width="1090px"
        marginLeft="auto"
        marginRight="auto"
      >
        <Text as="h1" fontSize="xl" fontFamily="poppins" fontWeight="semibold">
          {props.consultationId ? "Tebus Resep" : "Upload Resep"}
        </Text>
        <Text fontSize="md">
          {props.consultationId
            ? "Tebus rekomendasi resep dari doktermu. Bisa dikirim sampai ke rumah, loh! "
            : "Silakan upload foto resep yang valid dari dokter Anda dan dapatkan obat dengan mudah"}
        </Text>
      </VStack>
      <GridBlock gridTemplateColumns="586px 480px" my={9}>
        <GridBlockItem>
          <PrescriptionForm consultationId={props.consultationId} />
        </GridBlockItem>
        <GridBlockItem>
          {props.consultationId ? (
            <ConsultationProductsInfo consultationId={props.consultationId} />
          ) : (
            <PrescriptionImageExample />
          )}
        </GridBlockItem>
      </GridBlock>
    </>
  );
}
