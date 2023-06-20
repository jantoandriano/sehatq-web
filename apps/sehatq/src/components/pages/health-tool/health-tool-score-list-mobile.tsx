import React from "react";
import { HealthToolScoreList, FamilyMemberMenu } from "@sehatq/components";
import { useRouter } from "next/router";
import { SehatQHeader } from "@components/ui/sehatq-header";

interface Props {
  userId: string;
  healthToolTitle: string;
}

export function HealthToolScoreListMobile({ userId, healthToolTitle }: Props) {
  const router = useRouter();
  const { healthToolSlug } = router.query;

  return (
    <>
      <SehatQHeader
        variant="text"
        text={healthToolTitle}
        rightElement={
          <FamilyMemberMenu
            isMobile
            activeFamily={userId}
            popUpTitle="Pilih Anggota Keluarga"
            navigationValue={{
              name: "PROFILE_HEALTH_TOOL_SCORE_LIST",
              query: router.query,
              options: { shallow: true, scroll: true },
            }}
          />
        }
      />

      <HealthToolScoreList
        isMobile
        userId={userId}
        healthToolSlug={healthToolSlug as string}
      />
    </>
  );
}
