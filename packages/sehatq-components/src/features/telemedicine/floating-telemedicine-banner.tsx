import React, { useEffect } from "react";
import { useAssets, useNavigation } from "@sehatq/utils";
import { useAtom } from "jotai";
import { LinkOverlay, Flex, LinkBox, useImage } from "../../user-interfaces";
import { showFloatingTelemedicineAtom } from "./telemedicine-atoms";

export interface FloatingTelemedicineBannerProps {
  bottom: string;
  right: string;
}

export function FloatingTelemedicineBanner(
  props: FloatingTelemedicineBannerProps
) {
  const { bottom, right } = props;
  const Image = useImage();
  const { Navigate } = useNavigation();
  const ASSETS = useAssets(["REGULAR_TELEMED_BANNER"]);
  const [showFloatingTelemedicine, setShowFloatingTelemedicine] = useAtom(
    showFloatingTelemedicineAtom
  );
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowFloatingTelemedicine(true);
    }, 30000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [setShowFloatingTelemedicine]);
  return showFloatingTelemedicine ? (
    <LinkBox position="fixed" zIndex="banner" bottom={bottom} right={right}>
      <Flex align="center" justify="center">
        <Navigate name="TELEMEDICINES">
          <LinkOverlay
            fontSize="xxs"
            fontFamily="poppins"
            fontWeight="semibold"
            backgroundColor="sea.500"
            color="white"
            borderRadius="xl"
            border="3px solid"
            borderColor="white"
            marginRight={-4}
            paddingY={1.5}
            paddingLeft={2}
            paddingRight={5}
            boxShadow="base"
            letterSpacing="wide"
          >
            Chat dengan <br />
            Dokter
          </LinkOverlay>
        </Navigate>
        <Image
          priority
          src={ASSETS.REGULAR_TELEMED_BANNER}
          alt="Regular Telemedicine Banner"
          layout="fixed"
          height={70}
          width={70}
          wrapperProps={{
            overflow: "hidden",
            borderRadius: "full",
            border: "3px solid",
            borderColor: "white",
            boxShadow: "base",
          }}
        />
      </Flex>
    </LinkBox>
  ) : null;
}
