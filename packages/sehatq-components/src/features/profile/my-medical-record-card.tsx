import React from "react";
import { MyMedicalRecordCardDesktop } from "./my-medical-record-card-desktop";
import { MyMedicalRecordCardMobile } from "./my-medical-record-card-mobile";

export type MyMedicalRecordCardProps = { isMobile: boolean; textLabel: string };

export function MyMedicalRecordCard(props: MyMedicalRecordCardProps) {
  const { isMobile, ...otherProps } = props;
  const medicalRecordNavigation = {
    name: "HEALTH_TOOLS" as const,
    query: {
      utm_source: "homebanner",
      utm_campaign: "profile",
    },
  };
  if (isMobile) {
    return (
      <MyMedicalRecordCardMobile
        {...otherProps}
        medicalRecordNavigation={medicalRecordNavigation}
      />
    );
  }
  return (
    <MyMedicalRecordCardDesktop
      {...otherProps}
      medicalRecordNavigation={medicalRecordNavigation}
    />
  );
}
