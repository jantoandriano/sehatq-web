import React from "react";
import { Skeleton, Text, VStack, SkeletonText } from "../../user-interfaces";

export type PrescriptionAddressCardDesktopProps = {
  prescription?: {
    name: string;
    address: string;
    subdistrict: string;
    district: string;
    city: string;
    province: string;
    zipCode: string;
    phone: string;
  } | null;
};

export function PrescriptionAddressCardDesktop(
  props: PrescriptionAddressCardDesktopProps
) {
  const { prescription } = props;
  return (
    <>
      {prescription && (
        <VStack
          align="start"
          background="white"
          borderRadius="lg"
          boxShadow="base"
          px={8}
          pt={4}
          pb={5}
          spacing={4}
          width="full"
        >
          <Text
            color="charcoalGrey"
            fontSize="md"
            lineHeight="7"
            fontWeight="semibold"
            fontFamily="poppins"
          >
            Tujuan Pengiriman
          </Text>
          <VStack spacing={2} align="flex-start">
            <Text
              color="charcoalGrey"
              fontSize="sm"
              fontWeight="semibold"
              fontFamily="poppins"
              lineHeight="5"
            >
              {prescription.name}
            </Text>
            <Text color="charcoalGrey" fontSize="sm" lineHeight="5">
              {`${prescription.address} ${prescription.subdistrict} ${prescription.district} ${prescription.city}, ${prescription.province}, ${prescription.zipCode}`}
            </Text>
            <Text
              color="charcoalGrey"
              fontSize="sm"
              fontWeight="semibold"
              lineHeight="5"
            >
              {prescription.phone}
            </Text>
          </VStack>
        </VStack>
      )}
    </>
  );
}

export function PrescriptionAddressCardSkeletonDesktop() {
  return (
    <VStack
      align="start"
      background="white"
      borderRadius="lg"
      boxShadow="base"
      px={8}
      pt={4}
      pb={5}
      spacing={4}
      width="full"
    >
      <Text
        color="charcoalGrey"
        fontSize="md"
        lineHeight="7"
        fontWeight="semibold"
        fontFamily="poppins"
      >
        Tujuan Pengiriman
      </Text>
      <VStack spacing={2} align="flex-start">
        <Skeleton width="115px" height="21px" />
        <SkeletonText
          skeletonHeight={5}
          noOfLines={2}
          spacing={1}
          width="666px"
        />
        <Skeleton width="96px" height="19px" />
      </VStack>
    </VStack>
  );
}
