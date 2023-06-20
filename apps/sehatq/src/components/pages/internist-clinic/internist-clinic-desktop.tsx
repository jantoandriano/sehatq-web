import React from "react";
import { useAssets } from "@sehatq/utils";
import {
  useImage,
  Box,
  NavigationBlock,
  InternistClinicFastFact,
  InternistClinicTelemedicine,
  InternistClinicInfo,
  InternistClinicBooking,
  InternistClinicArticle,
  InternistClinicHeadline,
  InternistClinicDisease,
  InternistClinicProduct,
  InternistClinicHealthTool,
  InternistClinicForum,
  InternistClinicHealthService,
  ClinicSocialMedia,
  SimpleSehatQFooter,
  SimpleBlock,
  Button,
} from "@sehatq/components";
import { InternistClinicHead } from "@components/head";
interface InternistClinicDesktopProps {
  navigations: [number, string][];
  logoAlt: string;
}

export function InternistClinicDesktop(props: InternistClinicDesktopProps) {
  const Image = useImage();
  const ASSETS = useAssets(["INTERNIST_NAVIGATION_LOGO", "BG_DOT_RIGHT"]);

  return (
    <>
      <style jsx global>{`
        html {
          scroll-padding-top: 118px;
        }
      `}</style>
      <InternistClinicHead />
      <NavigationBlock
        initialFontColor="#ffffff"
        assetUrl={ASSETS.INTERNIST_NAVIGATION_LOGO}
        stackProps={{
          spacing: 16,
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
          <InternistClinicHeadline key="headline" isMobile={false} />,

          <SimpleBlock key="telemedicine">
            <InternistClinicTelemedicine isMobile={false} />
          </SimpleBlock>,

          <SimpleBlock key="info">
            <InternistClinicInfo isMobile={false} />
          </SimpleBlock>,

          <Box
            pt="73px"
            pb="76px"
            w="full"
            key="health-tool-info"
            position="relative"
            bgColor="#EFF3F7"
            py={16}
          >
            <SimpleBlock>
              <SimpleBlock position="relative" zIndex={1}>
                <InternistClinicHealthTool isMobile={false} />
              </SimpleBlock>
              <Image
                alt=""
                src={ASSETS.BG_DOT_RIGHT}
                layout="fixed"
                width={160}
                height={220}
                wrapperProps={{
                  position: "absolute",
                  bottom: "40px",
                  zIndex: 0,
                  overflow: "hidden",
                  right: 0,
                }}
              />
            </SimpleBlock>
          </Box>,

          <SimpleBlock key="disease">
            <InternistClinicDisease isMobile={false} />
          </SimpleBlock>,

          <SimpleBlock key="booking">
            <InternistClinicBooking isMobile={false} />
          </SimpleBlock>,

          <SimpleBlock key="fast-fact">
            <InternistClinicFastFact isMobile={false} />
          </SimpleBlock>,

          <SimpleBlock key="health-service">
            <InternistClinicHealthService isMobile={false} />
          </SimpleBlock>,

          <SimpleBlock key="article">
            <InternistClinicArticle isMobile={false} />
          </SimpleBlock>,

          <SimpleBlock key="product">
            <InternistClinicProduct isMobile={false} />
          </SimpleBlock>,

          <SimpleBlock key="forum">
            <InternistClinicForum isMobile={false} />
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
