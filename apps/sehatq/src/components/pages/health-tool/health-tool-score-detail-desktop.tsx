import React from "react";

import {
  ArrowBackIcon,
  Box,
  GridBlock,
  GridBlockItem,
  HealthToolScoreDetail,
  HStack,
  Link,
  ProfileSideMenu,
  Text,
  VStack,
} from "@sehatq/components";
import { useNavigation } from "@sehatq/utils";
import { SehatqNavbar } from "@components/ui/sehatq-navbar";

interface Props {
  title: string;
  slug: string;
  userId: string;
  scoreId: string;
}

export function HealthToolScoreDetailPageDesktop({
  title,
  slug,
  userId,
  scoreId,
}: Props) {
  const { Navigate } = useNavigation();
  return (
    <>
      <SehatqNavbar withCompanyPartner />
      <GridBlock mt={6}>
        <GridBlockItem>
          <ProfileSideMenu isMobile={false} />
        </GridBlockItem>
        <GridBlockItem>
          <VStack spacing={6} alignItems="flex-start">
            <Box>
              <Text fontWeight="semibold" fontSize="5xl" noOfLines={2}>
                {title}
              </Text>
              <HStack>
                <Navigate
                  name="PROFILE_HEALTH_TOOL_SCORE_LIST"
                  query={{ healthToolSlug: slug, userId }}
                >
                  <Link display="block" minW="unset">
                    <ArrowBackIcon color="black" w="20px" />
                  </Link>
                </Navigate>
                <Text fontWeight="semibold" fontSize="sm" noOfLines={1}>
                  {title ? `Detail ${title}` : "Kembali"}
                </Text>
              </HStack>
            </Box>
            <Box w="full">
              <HealthToolScoreDetail
                isMobile={false}
                scoreId={scoreId}
                slug={slug}
              />
            </Box>
          </VStack>
        </GridBlockItem>
      </GridBlock>
    </>
  );
}
