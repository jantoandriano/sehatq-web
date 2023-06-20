import React from "react";
import { AdSlot } from "../google-publisher-tag";
import { Box, PaginationLink, Center } from "../../user-interfaces";
import { HealthCareProfessionalCard } from "./health-care-professional-card";
import { HCPList } from "./health-care-professional-model";

export type HealthCareProfessionalListDesktopProps = {
  data: HCPList[];
  page: number;
  maxPage: number;
  adsMiddle?: ReturnType<typeof AdSlot>[];
};

export function HealthCareProfessionalListDesktop(
  props: HealthCareProfessionalListDesktopProps
) {
  const { data, page, maxPage, adsMiddle } = props;

  return (
    <>
      {data.map((hcp, index) => (
        <React.Fragment key={hcp.id}>
          <Box marginTop={index === 0 ? 0 : 4}>
            <HealthCareProfessionalCard
              isMobile={false}
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
          {index == 2 && adsMiddle && <Box marginTop={4}>{adsMiddle[0]}</Box>}
        </React.Fragment>
      ))}
      <Center mt="24px">
        <PaginationLink
          page={page}
          maxPage={maxPage}
          navigateName="HEALTH_CARE_PROFESIONAL"
          navigateOptions={{ shallow: true, scroll: true }}
        />
      </Center>
    </>
  );
}
