import React from "react";
import { useNavigation } from "@sehatq/utils";

import { HStack, Link, Button } from "../../user-interfaces";

export interface TelemedicineHCPActionsMobileProps {
  doctor?: {
    id: number;
    indicator: string;
    doctorSlug: string;
    isPrivateChannel: boolean;
    isBookingChannel: boolean;
  };
  onHandleStartConsultation: () => void;
  isLoading: boolean;
  doctorRecommendationId?: string;
}

export function TelemedicineHCPActionsMobile({
  doctor,
  onHandleStartConsultation,
  isLoading,
  doctorRecommendationId,
}: TelemedicineHCPActionsMobileProps) {
  const { Navigate } = useNavigation();

  return (
    <>
      {doctor && (
        <>
          {doctor.indicator === "green" &&
          doctor.isPrivateChannel &&
          doctor.isBookingChannel ? (
            <HStack spacing={4}>
              <Navigate
                name="TELEMED_HCP_SCHEDULES"
                query={{ slug: doctor.doctorSlug, doctorRecommendationId }}
              >
                <Link
                  as="a"
                  variant="outline"
                  color="sea.500"
                  size="md"
                  width="full"
                  p={0}
                >
                  Buat Jadwal Chat
                </Link>
              </Navigate>
              <Button
                variant="solid"
                colorScheme="main"
                size="md"
                width="full"
                p={0}
                onClick={onHandleStartConsultation}
                isLoading={isLoading}
              >
                Mulai Chat
              </Button>
            </HStack>
          ) : doctor.indicator === "green" && doctor.isPrivateChannel ? (
            <Button
              justifyContent="center"
              variant="solid"
              colorScheme="main"
              size="md"
              width="full"
              onClick={onHandleStartConsultation}
              isLoading={isLoading}
            >
              Mulai Chat
            </Button>
          ) : (doctor.isPrivateChannel && doctor.isBookingChannel) ||
            doctor.isBookingChannel ? (
            <Navigate
              name="TELEMED_HCP_SCHEDULES"
              query={{ slug: doctor.doctorSlug, doctorRecommendationId }}
            >
              <Link variant="outline" color="sea.500" size="md" width="full">
                Buat Jadwal Chat
              </Link>
            </Navigate>
          ) : null}
        </>
      )}
    </>
  );
}

export function TelemedicineHCPActionsMobileSkeleton() {
  return (
    <>
      <Button justifyContent="center" size="md" width="full" isLoading>
        Mulai Chat
      </Button>
    </>
  );
}
