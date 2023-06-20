import React from "react";
import { useAssets } from "@sehatq/utils";
import {
  useImage,
  Box,
  PediatricClinicHeadline,
  PediatricClinicInfo,
  PediatricClinicHealthService,
  PediatricClinicArticle,
  PediatricClinicForum,
  PediatricClinicBooking,
  PediatricClinicProduct,
  PediatricClinicTelemedicine,
  ClinicSocialMedia,
  SimpleSehatQFooter,
  SimpleBlock,
  NavigationBlock,
  Button,
} from "@sehatq/components";
import { PediatricClinicHead } from "@components/head";

interface PediatricClinicDesktopProps {
  navigations: [number, string][];
  logoAlt: string;
}

export function PediatricClinicDesktop(props: PediatricClinicDesktopProps) {
  const Image = useImage();
  const ASSETS = useAssets([
    "BG_DOT_LEFT",
    "BG_DOT_RIGHT",
    "PEDIATRIC_NAVIGATION_LOGO",
  ]);

  function renderImageBG({ flag }: { flag: "left" | "right" }) {
    return (
      <Image
        alt=""
        src={flag === "left" ? ASSETS.BG_DOT_LEFT : ASSETS.BG_DOT_RIGHT}
        layout="fixed"
        width={160}
        height={220}
        wrapperProps={{
          position: "absolute",
          ...(flag === "left" ? { left: "17px" } : { right: "11px" }),
          bottom: flag === "left" ? "40px" : "186px",
          zIndex: 1,
          overflow: "hidden",
        }}
      />
    );
  }

  return (
    <>
      <style jsx global>{`
        html {
          scroll-padding-top: 90px;
        }
      `}</style>
      <PediatricClinicHead />
      <NavigationBlock
        assetUrl={ASSETS.PEDIATRIC_NAVIGATION_LOGO}
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
          <PediatricClinicHeadline key="headline" isMobile={false} />,
          <SimpleBlock key="telemedicine">
            <PediatricClinicTelemedicine isMobile={false} />
          </SimpleBlock>,
          <SimpleBlock key="info">
            <PediatricClinicInfo isMobile={false} />
          </SimpleBlock>,
          <Box
            key="health-service"
            position="relative"
            bgColor="#EFF3F7"
            w="full"
            py={16}
          >
            <SimpleBlock>
              {renderImageBG({ flag: "left" })}
              <PediatricClinicHealthService isMobile={false} />
              {renderImageBG({ flag: "right" })}
            </SimpleBlock>
          </Box>,
          <SimpleBlock key="booking">
            <PediatricClinicBooking isMobile={false} />
          </SimpleBlock>,
          <SimpleBlock key="article" paddingTop={10}>
            <PediatricClinicArticle isMobile={false} />
          </SimpleBlock>,
          <SimpleBlock key="product">
            <PediatricClinicProduct isMobile={false} />
          </SimpleBlock>,
          <SimpleBlock key="forum">
            <PediatricClinicForum isMobile={false} />
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
