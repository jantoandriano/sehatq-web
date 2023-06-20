import React from "react";
import { useGetMyLocation } from "../profile/my-location-queries";
import { EmptyHealthCareProfessionalListDesktop } from "./empty-health-care-professional-list-desktop";
import { EmptyHealthCareProfessionalListMobile } from "./empty-health-care-professional-list-mobile";

export type EmptyHealthCareProfessionalListProps = {
  isMobile: boolean;
};

export function EmptyHealthCareProfessionalList(
  props: EmptyHealthCareProfessionalListProps
) {
  const { isMobile } = props;
  const { data } = useGetMyLocation();
  const childProps = {
    userLat: data?.lat,
    userLong: data?.long,
  };
  if (isMobile) {
    return <EmptyHealthCareProfessionalListMobile {...childProps} />;
  }
  return <EmptyHealthCareProfessionalListDesktop {...childProps} />;
}
