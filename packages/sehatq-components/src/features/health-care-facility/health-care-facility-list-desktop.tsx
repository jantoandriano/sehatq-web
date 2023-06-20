import React from "react";
import { Center, PaginationLink, SimpleGrid, Box } from "../../user-interfaces";
import { AdSlot } from "../google-publisher-tag";
import {
  HealthCareFacilityCard,
  HealthCareFacilityCardProps,
  HealthCareFacilityCardSkeleton,
} from "./health-care-facility-card";
export type HealthCareFacilityListDesktopProps = {
  data: HealthCareFacilityCardProps[];
  page: number;
  maxPage: number;
  adsMiddle?: ReturnType<typeof AdSlot>[];
};

export function HealthCareFacilityListDesktop(
  props: HealthCareFacilityListDesktopProps
) {
  const { data, adsMiddle } = props;
  return (
    <>
      <SimpleGrid columns={2} spacing={3}>
        {data.slice(0, 6).map((hcf) => (
          <HealthCareFacilityCard {...hcf} key={hcf.hcfSlug} />
        ))}
      </SimpleGrid>
      {data.length > 6 && adsMiddle && <Box my={4}>{adsMiddle[0]}</Box>}
      <SimpleGrid columns={2} spacing={3}>
        {data.slice(6, data.length).map((hcf) => (
          <HealthCareFacilityCard {...hcf} key={hcf.hcfSlug} />
        ))}
      </SimpleGrid>
      <Center mt={12}>
        <PaginationLink
          page={props.page}
          maxPage={props.maxPage}
          navigateName="HEALTH_CARE_FACILITIES"
          navigateOptions={{ shallow: true, scroll: true }}
          background="white"
        />
      </Center>
    </>
  );
}

export function HealthCareFacilityListDesktopSkeleton() {
  return (
    <SimpleGrid columns={2} spacing={3}>
      {Array.from(Array(12).keys()).map((index) => {
        return <HealthCareFacilityCardSkeleton key={index} />;
      })}
    </SimpleGrid>
  );
}
