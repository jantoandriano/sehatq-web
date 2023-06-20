import React from "react";
import {
  Text,
  PublicMentalHealthToolFaq,
  MentalHealthToolSection,
  GridBlock,
  GridBlockItem,
  Box,
  VStack,
  SehatQFooter,
  AdSlot,
  FloatingTelemedicineBanner,
  SimpleBlock,
} from "@sehatq/components";
import { SehatqNavbar } from "@components/ui/sehatq-navbar";
import { MentalHealthToolHead } from "@components/head";
import { MentalHealthToolGPTProvider } from "@components/gpt-provider/mental-health-tool";

export type MentalHealthToolDesktopProps = {
  isMobile: boolean;
  isLogin: boolean;
};

export function MentalHealthToolDesktop(props: MentalHealthToolDesktopProps) {
  const { isLogin } = props;
  return (
    <>
      <MentalHealthToolHead />
      <MentalHealthToolGPTProvider {...props}>
        <>
          <SehatqNavbar withCompanyPartner />
          <GridBlock
            my={6}
            isReverse
            {...(isLogin && {
              templateColumns: "100%",
            })}
          >
            <GridBlockItem>
              <VStack align="normal" spacing={5} width={isLogin ? "100%" : 760}>
                <Text
                  as="h1"
                  fontFamily="poppins"
                  fontSize="3xl"
                  fontWeight="semibold"
                >
                  {isLogin
                    ? "Kamu cek kesehatan mental untuk siapa?"
                    : "Cek Kesehatan Mental"}
                </Text>
                <MentalHealthToolSection {...props} />
              </VStack>
            </GridBlockItem>
            {isLogin ? null : (
              <GridBlockItem>
                <Box position="sticky" top="144px">
                  <AdSlot divId="div-gpt-ad-mr1" />
                </Box>
              </GridBlockItem>
            )}
          </GridBlock>
          <SimpleBlock>
            <PublicMentalHealthToolFaq {...props} />
          </SimpleBlock>
          <Box marginBottom={10} marginTop={32}>
            <SehatQFooter {...props} />
          </Box>
          <FloatingTelemedicineBanner right="30px" bottom="30px" />
        </>
      </MentalHealthToolGPTProvider>
    </>
  );
}
