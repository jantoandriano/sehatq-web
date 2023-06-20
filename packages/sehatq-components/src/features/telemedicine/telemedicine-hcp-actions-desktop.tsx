import React from "react";
import { useNavigation } from "@sehatq/utils";

import { VStack, Link, Button } from "../../user-interfaces";

export interface TelemedicineHCPActionsDesktopProps {
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

export function TelemedicineHCPActionsDesktop({
  doctor,
  onHandleStartConsultation,
  isLoading,
  doctorRecommendationId,
}: TelemedicineHCPActionsDesktopProps) {
  const { Navigate } = useNavigation();

  return (
    <>
      {doctor && (
        <>
          {doctor.indicator === "green" &&
          doctor.isPrivateChannel &&
          doctor.isBookingChannel ? (
            <VStack spacing={4}>
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
              <Navigate
                name="TELEMED_HCP_SCHEDULES"
                query={{ slug: doctor.doctorSlug, doctorRecommendationId }}
              >
                <Link
                  as="a"
                  variant="outline"
                  color="sea.500"
                  borderColor="main.500"
                  size="md"
                  width="full"
                  p={0}
                >
                  Buat Jadwal Chat
                </Link>
              </Navigate>
            </VStack>
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
              <Link
                variant="outline"
                color="sea.500"
                borderColor="main.500"
                size="md"
                width="full"
              >
                Buat Jadwal Chat
              </Link>
            </Navigate>
          ) : null}
        </>
      )}
    </>
  );
}

export function TelemedicineHCPActionsDesktopSkeleton() {
  return (
    <>
      <Button justifyContent="center" size="md" width="full" isLoading>
        Mulai Chat
      </Button>
    </>
  );
}
