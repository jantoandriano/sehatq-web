import React from "react";
import {
  Box,
  PediatricClinicHeadline,
  PediatricClinicInfo,
  PediatricClinicHealthService,
  PediatricClinicArticle,
  PediatricClinicForum,
  PediatricClinicBooking,
  PediatricClinicProduct,
  PediatricClinicTelemedicine,
  NavigationBlock,
  ClinicSocialMedia,
  SimpleSehatQFooter,
  Button,
} from "@sehatq/components";
import { useAssets } from "@sehatq/utils";
import { PediatricClinicHead } from "@components/head";

interface PediatricClinicMobileProps {
  navigations: [number, string][];
  logoAlt: string;
}

export function PediatricClinicMobile(props: PediatricClinicMobileProps) {
  const ASSETS = useAssets([
    "BG_DOT_LEFT",
    "BG_DOT_RIGHT",
    "PEDIATRIC_NAVIGATION_LOGO",
  ]);
  return (
    <>
      <style jsx global>{`
        html {
          scroll-padding-top: 70px;
        }
      `}</style>
      <PediatricClinicHead />
      <NavigationBlock
        isMobile
        assetUrl={ASSETS.PEDIATRIC_NAVIGATION_LOGO}
        stackProps={{
          spacing: 12,
        }}
        logoAlt={props.logoAlt}
        navigations={props.navigations}
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
          <PediatricClinicHeadline key="headline" isMobile />,
          <PediatricClinicTelemedicine key="telemedicine" isMobile />,
          <Box key="info" px={4}>
            <PediatricClinicInfo isMobile />
          </Box>,
          <Box
            key="health-service"
            bgColor="#EFF3F7"
            paddingTop={10}
            paddingBottom={6}
          >
            <PediatricClinicHealthService isMobile />
          </Box>,
          <PediatricClinicBooking key="booking" isMobile />,
          <Box key="article" paddingTop={5}>
            <PediatricClinicArticle isMobile key="article" />
          </Box>,
          <PediatricClinicProduct key="product" isMobile />,
          <Box key="forum" px={4}>
            <PediatricClinicForum key="forum" isMobile />
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
