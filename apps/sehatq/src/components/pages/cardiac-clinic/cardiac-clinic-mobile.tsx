import React from "react";
import {
  Box,
  CardiacClinicInfo,
  CardiacClinicArticle,
  CardiacClinicHeadline,
  CardiacClinicHealthTool,
  CardiacClinicBooking,
  CardiacClinicHealthService,
  CardiacClinicProduct,
  CardiacClinicForum,
  ClinicSocialMedia,
  SimpleSehatQFooter,
  CardiacClinicTelemedicine,
  NavigationBlock,
  Button,
} from "@sehatq/components";
import { useAssets } from "@sehatq/utils";
import { CardiacClinicHead } from "@components/head";

interface CardiacClinicDesktopProps {
  navigations: [number, string][];
  logoAlt: string;
}

export function CardiacClinicMobile(props: CardiacClinicDesktopProps) {
  const ASSETS = useAssets(["CARDIAC_NAVIGATION_LOGO"]);

  return (
    <>
      <style jsx global>{`
        html {
          scroll-padding-top: 70px;
        }
      `}</style>
      <CardiacClinicHead />
      <NavigationBlock
        logoAlt={props.logoAlt}
        logoHeight="60px"
        isMobile
        assetUrl={ASSETS.CARDIAC_NAVIGATION_LOGO}
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
          <CardiacClinicHeadline key="headline" isMobile />,

          <CardiacClinicTelemedicine key="telemedicine" isMobile />,

          <Box key="health-tool-info" px={4}>
            <CardiacClinicHealthTool isMobile />
          </Box>,

          <CardiacClinicBooking key="booking" isMobile />,

          <Box key="info" px={4}>
            <CardiacClinicInfo isMobile />
          </Box>,

          <CardiacClinicHealthService key="health-service" isMobile />,

          <CardiacClinicProduct key="product" isMobile />,

          <CardiacClinicArticle key="article" isMobile />,

          <Box key="forum" px={4}>
            <CardiacClinicForum isMobile />
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
