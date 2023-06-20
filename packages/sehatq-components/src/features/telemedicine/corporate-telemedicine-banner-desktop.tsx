import React from "react";
import { useNavigation, useAssets } from "@sehatq/utils";
import { Link, useImage } from "../../user-interfaces";

export function CorporateTelemedicineBannerDesktop() {
  const { Navigate } = useNavigation();
  const Image = useImage();
  const ASSETS = useAssets(["TELEMED_CORPORATE_MCU"]);
  return (
    <Navigate name="PARTNER_CORPORATE">
      <Link width="full">
        <Image
          priority
          src={ASSETS.TELEMED_CORPORATE_MCU}
          alt="telemed-corporate-mcu"
          layout="fill"
          objectFit="cover"
          wrapperProps={{
            cursor: "pointer",
            width: "1086px",
            height: "203px",
            overflow: "hidden",
            position: "absolute",
            borderRadius: "xl",
          }}
        />
      </Link>
    </Navigate>
  );
}
