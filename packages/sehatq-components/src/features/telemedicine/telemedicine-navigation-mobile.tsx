import React from "react";
import { useNavigation, useAssets } from "@sehatq/utils";
import {
  Flex,
  VStack,
  LinkBox,
  LinkOverlay,
  useImage,
} from "../../user-interfaces";

export type TelemedicineNavigationMobileProps = {
  activeNavigation?: "explore" | "speciality" | "promo" | "consultation";
};

export function TelemedicineNavigationMobile(
  props: TelemedicineNavigationMobileProps
) {
  const Image = useImage();
  const { Navigate } = useNavigation();
  const { activeNavigation } = props;
  const ASSETS = useAssets([
    "EXPLORE_OFF",
    "EXPLORE_ON",
    "CONSULTATION_OFF",
    "CONSULTATION_ON",
    "PROMO_OFF",
    "PROMO_ON",
    "SPECIALITY_OFF",
    "SPECIALITY_ON",
  ]);
  const brownGrey = "brownGrey.500";
  const sea = "sea.500";

  return (
    <>
      <Flex
        justify="space-around"
        py={2}
        background="white"
        boxShadow="0 -2px 12px 0 rgba(0, 0, 0, 0.15)"
        borderTopRadius="4xl"
        width="full"
      >
        <LinkBox>
          <VStack spacing={1}>
            <Image
              src={
                activeNavigation === "explore"
                  ? ASSETS.EXPLORE_ON
                  : ASSETS.EXPLORE_OFF
              }
              alt="explore"
              height={28}
              width={28}
              layout="fixed"
              priority
            />
            <Navigate name="TELEMEDICINES">
              <LinkOverlay
                color={activeNavigation === "explore" ? sea : brownGrey}
                fontFamily="poppins"
                fontSize="xs"
              >
                Eksplor
              </LinkOverlay>
            </Navigate>
          </VStack>
        </LinkBox>
        <LinkBox>
          <VStack spacing={1}>
            <Image
              src={
                activeNavigation === "speciality"
                  ? ASSETS.SPECIALITY_ON
                  : ASSETS.SPECIALITY_OFF
              }
              alt="speciality"
              height={28}
              width={28}
              layout="fixed"
              priority
            />
            <Navigate name="TELEMED_HCPS">
              <LinkOverlay
                color={activeNavigation === "speciality" ? sea : brownGrey}
                fontFamily="poppins"
                fontSize="xs"
              >
                Spesialisasi
              </LinkOverlay>
            </Navigate>
          </VStack>
        </LinkBox>
        <LinkBox>
          <VStack spacing={1}>
            <Image
              src={
                activeNavigation === "promo"
                  ? ASSETS.PROMO_ON
                  : ASSETS.PROMO_OFF
              }
              alt="promo"
              height={28}
              width={28}
              layout="fixed"
              priority
            />
            <Navigate name="TELEMED_CAMPAIGNS">
              <LinkOverlay
                color={activeNavigation === "promo" ? sea : brownGrey}
                fontFamily="poppins"
                fontSize="xs"
              >
                Promo
              </LinkOverlay>
            </Navigate>
          </VStack>
        </LinkBox>
        <LinkBox>
          <VStack spacing={1}>
            <Image
              src={
                activeNavigation === "consultation"
                  ? ASSETS.CONSULTATION_ON
                  : ASSETS.CONSULTATION_OFF
              }
              alt="consultation"
              height={28}
              width={28}
              layout="fixed"
              priority
            />
            <Navigate name="TELEMED_HISTORIES">
              <LinkOverlay
                color={activeNavigation === "consultation" ? sea : brownGrey}
                fontFamily="poppins"
                fontSize="xs"
              >
                Konsultasi
              </LinkOverlay>
            </Navigate>
          </VStack>
        </LinkBox>
      </Flex>
    </>
  );
}
