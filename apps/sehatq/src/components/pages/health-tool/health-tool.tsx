import React, { useRef } from "react";
import { useRouter } from "next/router";
import { createPopup } from "@typeform/embed";
import "@typeform/embed/build/css/popup.css";

import { FamilySelectedData } from "@sehatq/components";
import { HealthToolMobile } from "./health-tool-mobile";
import { HealthToolDesktop } from "./health-tool-desktop";

export type HealthToolProps = {
  onStartSurvey: (
    surveyId: string,
    familyMember: FamilySelectedData | undefined,
    uuidUser: string
  ) => void;
};

export type HealthToolPageProps = {
  isMobile: boolean;
};

export function HealthToolPage(props: HealthToolPageProps) {
  const { isMobile } = props;
  const router = useRouter();
  const { slug } = router.query as { slug: string };
  const container = useRef<HTMLDivElement | null>(null);

  function onStartSurvey(
    surveyId: string,
    familyMember: FamilySelectedData | undefined,
    uuidUser: string
  ) {
    if (container.current) {
      const iframeProps = { title: "" };
      const { toggle } = createPopup(surveyId, {
        container: container.current,
        hideHeaders: true,
        hideFooter: true,
        medium: "snippet",
        iframeProps,
        hidden: {
          ...(uuidUser && { uuid1: uuidUser }),
          ...(familyMember && {
            uuid2: familyMember.uuid ?? "",
            address: familyMember.address ?? "",
            age: familyMember.age.toString() ?? "",
            gender: familyMember.gender ?? "",
            height: familyMember.height.toString() ?? "",
            identityNumber: familyMember.identityNumber ?? "",
            name: familyMember.name ?? "",
            phone: familyMember.phone ?? "",
            photoUrl: familyMember.photoUrl ?? "",
            relation: familyMember.relation ?? "",
            userId: familyMember.userId.toString() ?? "",
            weight: familyMember.weight.toString() ?? "",
          }),
        },
      });
      toggle();
    }
  }

  const newProps = {
    slug,
    container,
    onStartSurvey,
  };

  if (isMobile) {
    return <HealthToolMobile {...newProps} />;
  }
  return <HealthToolDesktop {...newProps} />;
}
