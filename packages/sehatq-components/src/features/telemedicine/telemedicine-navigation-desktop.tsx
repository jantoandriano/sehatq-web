import React from "react";
import { useAssets, useNavigation } from "@sehatq/utils";
import {
  Text,
  HStack,
  VStack,
  Box,
  LinkBox,
  Link,
  LinkOverlay,
  IconButton,
  ArrowForwardIcon,
  useImage,
} from "../../user-interfaces";

export function TelemedicineNavigationDesktop() {
  const Image = useImage();
  const { Navigate } = useNavigation();
  const ASSETS = useAssets([
    "SPESIALIST_ICON",
    "CONSULTATION_ICON",
    "NAVIGATION_BG",
    "CAMPAIGN_BANNER",
  ]);

  return (
    <>
      <HStack spacing={6} justify="center">
        <LinkBox
          p={4}
          align="flex-start"
          boxShadow="xl"
          borderRadius="lg"
          backgroundColor="white"
          width="254px"
          backgroundImage={ASSETS.NAVIGATION_BG}
          backgroundRepeat="no-repeat"
          justifyContent="flex-start"
          backgroundPosition="right top"
          position="relative"
          overflow="hidden"
        >
          <Box
            p={2.5}
            width="60px"
            height="60px"
            borderRadius="full"
            boxShadow="xl"
            mb={2}
          >
            <Image
              src={ASSETS.SPESIALIST_ICON}
              alt="spesialisasi"
              height={40}
              width={40}
              layout="fixed"
              priority
            />
          </Box>
          <VStack spacing={1} align="flex-start">
            <Navigate name="TELEMED_HCPS">
              <LinkOverlay
                fontSize="lg"
                fontWeight="semibold"
                fontFamily="poppins"
                color="charcoalGrey"
                lineHeight="9"
              >
                Spesialisasi
              </LinkOverlay>
            </Navigate>
            <Text
              lineHeight="6"
              fontSize="sm"
              width="172px"
              color="charcoalGrey"
            >
              Chat dokter umum atau spesialis pilihanmu di sini
            </Text>
          </VStack>
          <IconButton
            key="next-page"
            aria-label="next button"
            backgroundColor="main"
            size="md"
            isRound
            position="absolute"
            right="-8px"
            bottom="-8px"
            icon={
              <ArrowForwardIcon
                boxSize="24px"
                color="white"
                mb="5px"
                mr="5px"
              />
            }
          />
        </LinkBox>
        <LinkBox
          p={4}
          align="flex-start"
          boxShadow="xl"
          borderRadius="lg"
          backgroundColor="white"
          width="254px"
          backgroundImage={ASSETS.NAVIGATION_BG}
          backgroundRepeat="no-repeat"
          justifyContent="flex-start"
          backgroundPosition="right top"
          position="relative"
          overflow="hidden"
        >
          <Box
            p={2.5}
            width="60px"
            height="60px"
            borderRadius="full"
            boxShadow="xl"
            mb={2}
          >
            <Image
              src={ASSETS.CONSULTATION_ICON}
              alt="konsultasi"
              height={40}
              width={40}
              layout="fixed"
              priority
            />
          </Box>
          <VStack spacing={1} align="flex-start">
            <Navigate name="TELEMED_HISTORIES">
              <LinkOverlay
                fontSize="lg"
                fontWeight="semibold"
                fontFamily="poppins"
                color="charcoalGrey"
                lineHeight="9"
              >
                Konsultasi
              </LinkOverlay>
            </Navigate>
            <Text
              lineHeight="6"
              fontSize="sm"
              width="172px"
              color="charcoalGrey"
            >
              Cek konsultasi yang akan datang dan telah selesai
            </Text>
          </VStack>
          <IconButton
            key="next-page"
            aria-label="next button"
            backgroundColor="main"
            size="md"
            isRound
            position="absolute"
            right="-8px"
            bottom="-8px"
            icon={
              <ArrowForwardIcon
                boxSize="24px"
                color="white"
                mb="5px"
                mr="5px"
              />
            }
          />
        </LinkBox>
        <Navigate name="TELEMED_CAMPAIGNS">
          <Link>
            <Image
              src={ASSETS.CAMPAIGN_BANNER}
              alt="campaign"
              height={176}
              width={531}
              layout="fixed"
              priority
            />
          </Link>
        </Navigate>
      </HStack>
    </>
  );
}
