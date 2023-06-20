import React from "react";
import {
  Box,
  InternistClinicFastFact,
  InternistClinicInfo,
  InternistClinicArticle,
  InternistClinicHeadline,
  InternistClinicDisease,
  InternistClinicHealthTool,
  InternistClinicBooking,
  InternistClinicHealthService,
  InternistClinicProduct,
  InternistClinicForum,
  ClinicSocialMedia,
  SimpleSehatQFooter,
  InternistClinicTelemedicine,
  NavigationBlock,
  Button,
} from "@sehatq/components";
import { useAssets } from "@sehatq/utils";
import { InternistClinicHead } from "@components/head";

interface InternistClinicDesktopProps {
  navigations: [number, string][];
  logoAlt: string;
}

export function InternistClinicMobile(props: InternistClinicDesktopProps) {
  const ASSETS = useAssets([
    "INTERNIST_NAVIGATION_LOGO",
    "BG_DOT_LEFT",
    "BG_DOT_RIGHT",
  ]);

  return (
    <>
      <style jsx global>{`
        html {
          scroll-padding-top: 70px;
        }
      `}</style>
      <InternistClinicHead />
      <NavigationBlock
        logoAlt={props.logoAlt}
        isMobile
        assetUrl={ASSETS.INTERNIST_NAVIGATION_LOGO}
        stackProps={{
          spacing: 12,
        }}
        navigations={props.navigations}
        initialFontColor="white"
        tailElement={
          <Button
            as="a"
            w="full"
            href="https://wa.me/6281288588167"
            fontFamily="Poppins"
            fontSize="sm"
          >
            Hubungi Kami
          </Button>
        }
        sections={[
          <InternistClinicHeadline key="headline" isMobile />,

          <InternistClinicTelemedicine key="telemedicine" isMobile />,

          <Box key="info" px={4}>
            <InternistClinicInfo isMobile />
          </Box>,

          <Box
            key="health-tool-info"
            bgColor="#EFF3F7"
            paddingTop={10}
            paddingBottom={6}
            px={4}
          >
            <InternistClinicHealthTool isMobile />
          </Box>,

          <Box key="disease" w="full">
            <InternistClinicDisease key="disease" isMobile />
          </Box>,

          <InternistClinicBooking key="booking" isMobile />,

          <Box key="fastfact" px={4}>
            <InternistClinicFastFact key="fastfack" isMobile />
          </Box>,

          <InternistClinicHealthService key="health-service" isMobile />,
          <InternistClinicArticle key="article" isMobile />,
          <InternistClinicProduct key="product" isMobile />,

          <Box key="forum" px={4}>
            <InternistClinicForum isMobile />
          </Box>,

          <Box key="social-media" px={4} paddingBottom={6}>
            <ClinicSocialMedia key="social-media" isMobile />
          </Box>,
        ]}
      />
      <SimpleSehatQFooter isMobile />
    </>
  );
}
