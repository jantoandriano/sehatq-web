import React from "react";
import {
  Box,
  Flex,
  Text,
  SocialShare,
  SehatQFooter,
  DiseaseHeadline,
  DiseaseContent,
  DiseaseTags,
  DiseaseReference,
  AdSlot,
  HealthCareProfessionalWidget,
  RelatedDiseases,
  RelatedArticles,
} from "@sehatq/components";
import { SehatQHeader } from "@components/ui/sehatq-header";
import { DiseaseHead } from "@components/head";
import { DiseaseGPTProvider } from "@components/gpt-provider/disease";

type DiseaseMobileProps = {
  tagId: string;
  doctorExpertises: string[];
  diseaseSlug: string;
};

export function DiseaseMobile(props: DiseaseMobileProps) {
  const { tagId, doctorExpertises, diseaseSlug } = props;
  return (
    <>
      <DiseaseHead />
      <DiseaseGPTProvider isMobile>
        <>
          <SehatQHeader variant="search" />
          <Box mx={4} marginTop={3} marginBottom={6}>
            <Box mb="18px">
              <DiseaseHeadline isMobile slug={diseaseSlug} />
            </Box>
            <DiseaseContent
              isMobile
              slug={diseaseSlug}
              adsTop={
                <AdSlot
                  divId="div-gpt-ad-flyingcarpet"
                  variant="flying-carpet"
                />
              }
              adsMiddle={<AdSlot divId="div-gpt-ad-mr1" />}
              adsBottom={<AdSlot divId="div-gpt-ad-mr2" />}
            />
            <Box my={3}>
              <AdSlot divId="div-gpt-ad-leaderboard" />
            </Box>
            <Box mb="32px">
              <DiseaseTags isMobile slug={diseaseSlug} />
            </Box>
            <Box mb="24px">
              <DiseaseReference isMobile slug={diseaseSlug} />
            </Box>
            <Box my={3}>
              <AdSlot divId="div-gpt-ad-bot-leaderboard" />
            </Box>
            <Box my={3}>
              <AdSlot divId="div-gpt-ad-bot-leaderboard" />
            </Box>
            <SocialShare
              isMobile={true}
              px={4}
              py={3}
              spacing={3}
              sizeIcon="38"
              url={`/penyakit/${diseaseSlug}`}
              hideTitleShare={true}
              hideTitleSocial={true}
            />
          </Box>
          {doctorExpertises.length > 0 ? (
            <Box marginBottom={4}>
              <Text
                marginBottom={2}
                paddingX={4}
                fontFamily="poppins"
                fontWeight="semibold"
              >
                Dokter Terkait
              </Text>
              {doctorExpertises.length > 1 ? (
                <Flex overflow="auto" maxWidth="100%" paddingX={4} paddingY={2}>
                  {doctorExpertises.map((doctorExpertise, index) => (
                    <Box
                      key={doctorExpertise}
                      minWidth="320px"
                      marginLeft={index === 0 ? 0 : 4}
                    >
                      <HealthCareProfessionalWidget
                        key={doctorExpertise}
                        specialitySlug={doctorExpertise}
                      />
                    </Box>
                  ))}
                </Flex>
              ) : (
                <Box paddingX={4}>
                  <HealthCareProfessionalWidget
                    specialitySlug={doctorExpertises[0]}
                  />
                </Box>
              )}
            </Box>
          ) : null}
          {tagId ? (
            <>
              <Box marginBottom={4}>
                <Text
                  marginBottom={2}
                  paddingX={4}
                  fontFamily="poppins"
                  fontWeight="semibold"
                >
                  Penyakit Terkait
                </Text>
                <Flex overflow="auto" maxWidth="100%" paddingY={2}>
                  <Box minWidth={4} />
                  <RelatedDiseases isMobile tagId={tagId} />
                  <Box minWidth={4} />
                </Flex>
              </Box>
              <Box marginBottom={6} paddingX={4}>
                <Text
                  marginBottom={4}
                  fontFamily="poppins"
                  fontWeight="semibold"
                >
                  Artikel Terkait
                </Text>
                <RelatedArticles isMobile tagId={tagId} />
              </Box>
            </>
          ) : null}
          <AdSlot divId="div-gpt-ad-sticky" variant="sticky" />
          <Box background="white" p={3} pt={7} align="normal">
            <SehatQFooter isMobile />
          </Box>
        </>
      </DiseaseGPTProvider>
    </>
  );
}
