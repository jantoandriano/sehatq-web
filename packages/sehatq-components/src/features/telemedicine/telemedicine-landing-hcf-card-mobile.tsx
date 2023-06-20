import { useNavigation } from "@sehatq/utils";
import React from "react";
import { useImage, Skeleton, Link } from "../../user-interfaces";

export type TelemedicineLandingHCFCardMobileProps = {
  logoUrl: string;
  slug: string;
};

export function TelemedicineLandingHCFCardMobile(
  props: TelemedicineLandingHCFCardMobileProps
) {
  const Image = useImage();
  const { Navigate } = useNavigation();
  return (
    <Navigate name="TELEMED_FASKES_DETAIL" query={{ hospitalSlug: props.slug }}>
      <Link>
        <Image
          sizes="100px"
          layout="fill"
          objectFit="contain"
          src={props.logoUrl}
          alt={props.slug}
          wrapperProps={{
            width: "100px",
            height: "100px",
            borderRadius: "base",
            overflow: "hidden",
            background: "white",
          }}
        />
      </Link>
    </Navigate>
  );
}

export function TelemedicineLandingHCFCardMobileSkeleton() {
  return <Skeleton width="100px" height="100px" borderRadius="base" />;
}
