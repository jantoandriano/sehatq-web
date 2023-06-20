import React from "react";
import {
  VStack,
  Box,
  Link,
  SehatQFooter,
  AdSlot,
  ArticlesSection,
  DiseasesSection,
  MedicalProceduresSection,
  ReviewsSection,
  TagContent,
  TagHeadline,
  useImage,
  FloatingTelemedicineBanner,
} from "@sehatq/components";
import { useAssets, useNavigation } from "@sehatq/utils";
import { SehatQHeader } from "@components/ui/sehatq-header";
import { TagHead } from "@components/head";
import { TagGPTProvider } from "@components/gpt-provider/tag";

export type TagMobileProps = {
  isMobile: boolean;
  tagSlug: string;
};

export function TagMobile(props: TagMobileProps) {
  const ASSETS = useAssets(["TELEMED_BANNER"]);
  const { Navigate } = useNavigation();
  const Image = useImage();
  return (
    <>
      <TagHead />
      <TagGPTProvider {...props}>
        <Box background="iceBlue.500">
          <AdSlot divId="div-gpt-ad-megabillboard" variant="billboard" />
          <SehatQHeader variant="search" />
          <Box background="white" p={4}>
            <TagHeadline {...props} />
          </Box>
          <VStack align="normal" spacing={3.5}>
            <ArticlesSection {...props} />
            <AdSlot divId="div-gpt-ad-mr1" />
            <DiseasesSection {...props} />
            <ReviewsSection {...props} />
            <MedicalProceduresSection {...props} />
            <Box background="white" width="100%" py={3}>
              <Navigate name="TELEMEDICINES">
                <Link width="100%">
                  <Image
                    src={ASSETS.TELEMED_BANNER}
                    alt="Chat Dokter Gratis"
                    width={348}
                    height={110}
                  />
                </Link>
              </Navigate>
            </Box>
            <Box background="white" width="100%" p={4}>
              <TagContent {...props} />
            </Box>
          </VStack>

          <Box background="white" p={3} pt={7} align="normal">
            <SehatQFooter {...props} />
          </Box>
          <AdSlot divId="div-gpt-ad-sticky" variant="fixed" />
        </Box>
      </TagGPTProvider>
      <FloatingTelemedicineBanner right="12px" bottom="62px" />
    </>
  );
}
