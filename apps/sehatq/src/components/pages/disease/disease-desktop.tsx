import React from "react";
import {
  Text,
  Box,
  HealthCareProfessionalWidget,
  RelatedDiseases,
  RelatedArticles,
  SehatQFooter,
  GridBlock,
  GridBlockItem,
  DiseaseHeadline,
  DiseaseContent,
  DiseaseTags,
  DiseaseReference,
  VStack,
  SimpleGrid,
  AdSlot,
  SocialShare,
} from "@sehatq/components";
import { DiseaseHead } from "@components/head";
import { SehatqNavbar } from "@components/ui/sehatq-navbar";
import { DiseaseGPTProvider } from "@components/gpt-provider/disease";

type DiseaseDesktopProps = {
  tagId: string;
  doctorExpertises: string[];
  diseaseSlug: string;
};

export function DiseaseDesktop(props: DiseaseDesktopProps) {
  const { tagId, diseaseSlug, doctorExpertises } = props;
  return (
    <>
      <DiseaseHead />
      <DiseaseGPTProvider isMobile={false}>
        <>
          <SehatqNavbar withCompanyPartner />
          <GridBlock my={6} isReverse>
            <GridBlockItem>
              <Box mb={30}>
                <DiseaseHeadline isMobile={false} slug={diseaseSlug} />
              </Box>
              <DiseaseContent
                isMobile={false}
                slug={diseaseSlug}
                adsMiddle={<AdSlot divId="div-gpt-ad-leaderboard" />}
              />
              <Box my={4}>
                <AdSlot divId="div-gpt-ad-middleleaderboard" />
              </Box>
              <Box mb="32px">
                <DiseaseTags isMobile={false} slug={diseaseSlug} />
              </Box>
              <Box mb="24px">
                <DiseaseReference isMobile={false} slug={diseaseSlug} />
              </Box>
              <SocialShare
                isMobile={false}
                px={6}
                py={4}
                spacing={5}
                sizeIcon="38"
                url={`/penyakit/${diseaseSlug}`}
                hideTitleSocial={true}
              />
              {tagId || doctorExpertises.length > 0 ? (
                <VStack marginTop={12} spacing={12}>
                  {doctorExpertises.length > 0 ? (
                    <Box width="full">
                      <Text
                        marginBottom={5}
                        fontFamily="poppins"
                        fontWeight="semibold"
                        fontSize="3xl"
                      >
                        Dokter Terkait
                      </Text>
                      <SimpleGrid columns={2} spacing={5}>
                        {doctorExpertises.map((doctorExpertise) => (
                          <HealthCareProfessionalWidget
                            key={doctorExpertise}
                            specialitySlug={doctorExpertise}
                          />
                        ))}
                      </SimpleGrid>
                    </Box>
                  ) : null}
                  {tagId ? (
                    <>
                      <Box width="full">
                        <Text
                          marginBottom={5}
                          fontFamily="poppins"
                          fontWeight="semibold"
                          fontSize="3xl"
                        >
                          Penyakit Terkait
                        </Text>
                        <RelatedDiseases tagId={tagId} />
                      </Box>
                      <Box width="full">
                        <Text
                          marginBottom={5}
                          fontFamily="poppins"
                          fontWeight="semibold"
                          fontSize="3xl"
                        >
                          Artikel Terkait
                        </Text>
                        <RelatedArticles tagId={tagId} />
                      </Box>
                    </>
                  ) : null}
                </VStack>
              ) : null}
            </GridBlockItem>
            <GridBlockItem>
              <Box position="sticky" top="144px">
                <VStack spacing={4}>
                  <AdSlot divId="div-gpt-ad-mr1" />
                </VStack>
              </Box>
            </GridBlockItem>
          </GridBlock>
          <Box marginBottom={10} marginTop={32}>
            <SehatQFooter isMobile={false} />
          </Box>
        </>
      </DiseaseGPTProvider>
    </>
  );
}
