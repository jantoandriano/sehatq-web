import React from "react";
import { useAssets } from "@sehatq/utils";
import {
  Box,
  NavigationBlock,
  CardiacClinicArticle,
  CardiacClinicHeadline,
  CardiacClinicForum,
  CardiacClinicHealthTool,
  CardiacClinicProduct,
  CardiacClinicBooking,
  CardiacClinicHealthService,
  CardiacClinicTelemedicine,
  CardiacClinicInfo,
  ClinicSocialMedia,
  SimpleSehatQFooter,
  Button,
  SimpleBlock,
} from "@sehatq/components";
import { CardiacClinicHead } from "@components/head";
interface CardiacClinicDesktopProps {
  navigations: [number, string][];
  logoAlt: string;
}

export function CardiacClinicDesktop(props: CardiacClinicDesktopProps) {
  const ASSETS = useAssets([
    "CARDIAC_NAVIGATION_LOGO",
    "ILLUSTRATION_CARDIAC_HEALTH_TOOL",
  ]);

  return (
    <>
      <style jsx global>{`
        html {
          scroll-padding-top: 118px;
        }
      `}</style>
      <CardiacClinicHead />
      <NavigationBlock
        assetUrl={ASSETS.CARDIAC_NAVIGATION_LOGO}
        stackProps={{
          spacing: 16,
        }}
        initialFontColor="#ffffff"
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
        logoAlt={props.logoAlt}
        navigations={props.navigations}
        sections={[
          <CardiacClinicHeadline key="headline" isMobile={false} />,

          <SimpleBlock key="telemedicine">
            <CardiacClinicTelemedicine isMobile={false} />
          </SimpleBlock>,

          <Box key="health-tool" w="full" overflow="hidden">
            <SimpleBlock position="relative" py="104px">
              <CardiacClinicHealthTool isMobile={false} />
              <Box
                position="absolute"
                bgColor="#EFF3F7"
                borderLeftRadius="4xl"
                top={0}
                h="full"
                w="50vw"
                zIndex={-1}
                left="calc(100% - 270px)"
              ></Box>
            </SimpleBlock>
          </Box>,

          <SimpleBlock key="booking">
            <CardiacClinicBooking isMobile={false} />
          </SimpleBlock>,

          <SimpleBlock key="info">
            <CardiacClinicInfo isMobile={false} />
          </SimpleBlock>,

          <SimpleBlock key="health-service">
            <CardiacClinicHealthService isMobile={false} />
          </SimpleBlock>,

          <SimpleBlock key="product">
            <CardiacClinicProduct isMobile={false} />
          </SimpleBlock>,

          <SimpleBlock key="article">
            <CardiacClinicArticle isMobile={false} />
          </SimpleBlock>,

          <SimpleBlock key="forum">
            <CardiacClinicForum isMobile={false} />
          </SimpleBlock>,

          <SimpleBlock key="social-media">
            <ClinicSocialMedia isMobile={false} />
          </SimpleBlock>,
        ]}
      />
      <Box marginTop={16}>
        <SimpleSehatQFooter isMobile={false} />
      </Box>
    </>
  );
}
