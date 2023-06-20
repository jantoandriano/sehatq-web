import { URLS } from "@sehatq/constants";
import React from "react";
import { Center, PaginationLink, SimpleGrid } from "../../user-interfaces";
import {
  TelemedicineHCPCard,
  TelemedicineHCPCardProps,
  TelemedicineHCPCardSkeleton,
} from "./telemedicine-hcp-card";
export type TelemedicineHCPListDesktopProps = {
  data: TelemedicineHCPCardProps[];
  page: number;
  maxPage: number;
  navigateName?: keyof typeof URLS;
};

export function TelemedicineHCPListDesktop(
  props: TelemedicineHCPListDesktopProps
) {
  const { data } = props;
  return (
    <>
      <SimpleGrid columns={2} spacing={3}>
        {data.map((doctor) => (
          <TelemedicineHCPCard {...doctor} key={doctor.doctorId} />
        ))}
      </SimpleGrid>
      <Center mt={12}>
        <PaginationLink
          page={props.page}
          maxPage={props.maxPage}
          navigateName={props.navigateName ?? "TELEMED_HCPS"}
          navigateOptions={{ shallow: true, scroll: true }}
          background="white"
        />
      </Center>
    </>
  );
}

export function TelemedicineHCPListDesktopSkeleton() {
  return (
    <SimpleGrid columns={2} spacing={3}>
      {Array.from(Array(12).keys()).map((index) => {
        return <TelemedicineHCPCardSkeleton key={index} />;
      })}
    </SimpleGrid>
  );
}
