import React from "react";
import { AdSlot } from "../google-publisher-tag";
import { Box } from "../../user-interfaces";
import { HealthCareProfessionalCard } from "./health-care-professional-card";
import { HealthCareProfessionalCardMobileSkeleton } from "./health-care-professional-card-mobile";
import { HCPList } from "./health-care-professional-model";

export type HealthCareProfessionalListMobileProps = {
  data: HCPList[];
  refInView?: (node?: Element | null) => void;
  isMaxPage?: boolean;
  adsMiddle?: ReturnType<typeof AdSlot>[];
};

export function HealthCareProfessionalListMobile(
  props: HealthCareProfessionalListMobileProps
) {
  const { data, refInView, isMaxPage, adsMiddle } = props;
  return (
    <>
      {data.map((hcp, index) => (
        <React.Fragment key={hcp.id}>
          <Box marginTop={index === 0 ? 0 : 4}>
            <HealthCareProfessionalCard
              isMobile={true}
              doctorName={hcp.name}
              doctorSlug={hcp.slug}
              hcfName={hcp.hcfName}
              imageUrl={hcp.imageUrl}
              imageAlt={hcp.imageUrl}
              imagePriority={index < 4}
              speciality={hcp.specialityHcp.name}
              hcfAddress={hcp.location}
            />
          </Box>
          {index == 3 && adsMiddle && <Box marginTop={4}>{adsMiddle[0]}</Box>}
          {index == 9 && adsMiddle && <Box marginTop={4}>{adsMiddle[1]}</Box>}
        </React.Fragment>
      ))}
      {!isMaxPage && (
        <Box ref={refInView} marginTop={4}>
          <HealthCareProfessionalCardMobileSkeleton />
        </Box>
      )}
    </>
  );
}
