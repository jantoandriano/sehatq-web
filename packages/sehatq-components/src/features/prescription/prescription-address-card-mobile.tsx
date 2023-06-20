import React from "react";
import { Skeleton, SkeletonText, Text, VStack } from "../../user-interfaces";

export type PrescriptionAddressCardMobileProps = {
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

export function PrescriptionAddressCardMobile(
  props: PrescriptionAddressCardMobileProps
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
          p={4}
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
              {`${prescription.address} ${prescription.subdistrict} ${prescription.district} ${prescription.city} ${prescription.province} ${prescription.zipCode}`}
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

export function PrescriptionAddressCardSkeletonMobile() {
  return (
    <VStack
      align="start"
      background="white"
      borderRadius="lg"
      boxShadow="base"
      p={4}
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
        <Skeleton width="115px" height="18px" />
        <SkeletonText
          skeletonHeight={4}
          noOfLines={3}
          spacing={1}
          width="296px"
        />
        <Skeleton width="83px" height="16px" />
      </VStack>
    </VStack>
  );
}
