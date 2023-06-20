import React from "react";
import {
  Flex,
  Box,
  Text,
  VStack,
  ProfileSideMenu,
  GridBlock,
  GridBlockItem,
  IconButton,
  ArrowBackIcon,
  PrescriptionStatusCard as _PrescriptionStatusCard,
  PrescriptionInfoCard as _PrescriptionInfoCard,
  PrescriptionPatientCard as _PrescriptionPatientCard,
  PrescriptionDoctorCard as _PrescriptionDoctorCard,
  PrescriptionOrderCard as _PrescriptionOrderCard,
  PrescriptionAddressCard as _PrescriptionAddressCard,
  CancelPrescription as _CancelPrescription,
  PrescriptionStatusCode,
} from "@sehatq/components";
import { useNavigation } from "@sehatq/utils";
import { SehatqNavbar } from "@components/ui/sehatq-navbar";
import { withQuery } from "src/utils";
import { MyPrescriptionParams } from "@get-props";
import { MyPrescriptionHead } from "@components/head";

export interface MyPrescriptionDesktopProps {
  status?: PrescriptionStatusCode;
}

const PrescriptionStatusCard = withQuery(
  _PrescriptionStatusCard,
  (query: MyPrescriptionParams) => ({
    prescriptionNo: query.prescriptionNo,
  })
);

const PrescriptionInfoCard = withQuery(
  _PrescriptionInfoCard,
  (query: MyPrescriptionParams) => ({
    prescriptionNo: query.prescriptionNo,
  })
);

const PrescriptionPatientCard = withQuery(
  _PrescriptionPatientCard,
  (query: MyPrescriptionParams) => ({
    prescriptionNo: query.prescriptionNo,
  })
);

const PrescriptionDoctorCard = withQuery(
  _PrescriptionDoctorCard,
  (query: MyPrescriptionParams) => ({
    prescriptionNo: query.prescriptionNo,
  })
);

const PrescriptionOrderCard = withQuery(
  _PrescriptionOrderCard,
  (query: MyPrescriptionParams) => ({
    prescriptionNo: query.prescriptionNo,
  })
);

const PrescriptionAddressCard = withQuery(
  _PrescriptionAddressCard,
  (query: MyPrescriptionParams) => ({
    prescriptionNo: query.prescriptionNo,
  })
);

const CancelPrescription = withQuery(
  _CancelPrescription,
  (query: MyPrescriptionParams) => ({
    prescriptionNo: query.prescriptionNo,
  })
);

export function MyPrescriptionDesktop(props: MyPrescriptionDesktopProps) {
  const { navigate } = useNavigation();
  const { status } = props;
  function goBack() {
    navigate("PROFILE_PRESCRIPTIONS");
  }
  return (
    <>
      <MyPrescriptionHead />
      <SehatqNavbar withCompanyPartner />
      <GridBlock my={6}>
        <GridBlockItem>
          <ProfileSideMenu isMobile={false} />
        </GridBlockItem>
        <GridBlockItem>
          <Flex bgColor="white" align="center" justify="space-between">
            <Box>
              <Text fontSize="5xl" fontWeight="semibold" fontFamily="poppins">
                Riwayat Resep
              </Text>
              <Text fontSize="md">Catatan semua riwayat resepmu.</Text>
            </Box>
          </Flex>
          <Box
            border="1px solid"
            borderColor="veryLightPink"
            borderRadius="3xl"
            my={5}
          >
            <Flex
              borderBottom="1px solid"
              borderColor="veryLightPink"
              align="center"
              px={7}
              py={5}
            >
              <IconButton
                aria-label="back button"
                onClick={goBack}
                variant="fit"
                colorScheme="sea"
                boxSize={6}
                icon={<ArrowBackIcon width={7} height={6} color="sea.600" />}
              />
              <Text fontWeight="semibold" fontSize="lg" ml={4}>
                Detail Resep
              </Text>
            </Flex>
            <Box
              background="iceBlue.500"
              borderBottomRadius="3xl"
              pt={4}
              px={4}
              pb={8}
            >
              <VStack spacing={4}>
                <PrescriptionStatusCard />
                <PrescriptionInfoCard />
                {status === "purchased" && <PrescriptionOrderCard />}
                <PrescriptionPatientCard />
                <PrescriptionDoctorCard />
                {(status === "requested" || status === "approved") && (
                  <PrescriptionAddressCard />
                )}
              </VStack>
              {status === "created" ? (
                <Flex justify="center" marginTop={6}>
                  <CancelPrescription />
                </Flex>
              ) : null}
            </Box>
          </Box>
        </GridBlockItem>
      </GridBlock>
    </>
  );
}
