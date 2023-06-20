import { useNavigation } from "@sehatq/utils";
import React from "react";
import { useImage, Skeleton, Link } from "../../user-interfaces";

export type TelemedicineLandingHCFCardDesktopProps = {
  logoUrl: string;
  slug: string;
};

export function TelemedicineLandingHCFCardDesktop(
  props: TelemedicineLandingHCFCardDesktopProps
) {
  const Image = useImage();
  const { Navigate } = useNavigation();
  return (
    <Navigate name="TELEMED_FASKES_DETAIL" query={{ hospitalSlug: props.slug }}>
      <Link>
        <Image
          layout="fill"
          objectFit="contain"
          src={props.logoUrl}
          alt={props.slug}
          sizes="180px"
          wrapperProps={{
            width: "180px",
            height: "180px",
            borderRadius: "base",
            overflow: "hidden",
            background: "white",
          }}
        />
      </Link>
    </Navigate>
  );
}

export function TelemedicineLandingHCFCardDesktopSkeleton() {
  return <Skeleton width="180px" height="180px" borderRadius="base" />;
}
