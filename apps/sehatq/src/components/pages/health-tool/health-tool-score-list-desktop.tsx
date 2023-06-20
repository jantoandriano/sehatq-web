import React from "react";
import {
  GridBlock,
  GridBlockItem,
  ProfileSideMenu,
  HealthToolScoreList,
  Text,
  Box,
  FamilyMemberMenu,
  HStack,
} from "@sehatq/components";
import { useRouter } from "next/router";
import { SehatqNavbar } from "@components/ui/sehatq-navbar";

interface Props {
  userId: string;
  healthToolTitle: string;
  healthToolDesc: string;
}

export function HealthToolScoreListDesktop({
  userId,
  healthToolTitle,
  healthToolDesc,
}: Props) {
  const router = useRouter();
  const { healthToolSlug } = router.query;
  return (
    <>
      <SehatqNavbar withCompanyPartner />
      <GridBlock my={6}>
        <GridBlockItem>
          <ProfileSideMenu isMobile={false} />
        </GridBlockItem>
        <GridBlockItem>
          <HStack justifyContent="space-between" alignItems="start">
            <Text
              fontFamily="Poppins"
              fontWeight="semibold"
              fontSize="5xl"
              noOfLines={2}
              maxWidth="65%"
            >
              {healthToolTitle}
            </Text>
            <FamilyMemberMenu
              isMobile={false}
              activeFamily={userId}
              navigationValue={{
                name: "PROFILE_HEALTH_TOOL_SCORE_LIST",
                query: router.query,
                options: { shallow: true, scroll: true },
              }}
            />
          </HStack>
          <Text fontSize="md" noOfLines={2}>
            {healthToolDesc}
          </Text>
          <Box mt={6}>
            <HealthToolScoreList
              isMobile={false}
              userId={userId}
              healthToolSlug={healthToolSlug as string}
            />
          </Box>
        </GridBlockItem>
      </GridBlock>
    </>
  );
}
