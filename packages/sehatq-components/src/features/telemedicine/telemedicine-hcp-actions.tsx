import React from "react";
import { useNavigation } from "@sehatq/utils";
import { useGetProfile } from "../profile";
import {
  useGetMyLatestTelemedicine,
  MyLatestTelemedicineCache,
} from "../profile/my-telemedicine-queries";
import { useToast } from "../../user-interfaces";
import { useSubmitConsultationCheckout } from "./consultation-queries";
import { checkActiveConsultation } from "./consultation-helpers";
import {
  TelemedicineHCPActionsMobile,
  TelemedicineHCPActionsMobileSkeleton,
} from "./telemedicine-hcp-actions-mobile";
import {
  TelemedicineHCPActionsDesktop,
  TelemedicineHCPActionsDesktopSkeleton,
} from "./telemedicine-hcp-actions-desktop";
import {
  TelemedicineDoctorCache,
  useGetTelemedicineDoctor,
} from "./doctor-queries";

export type TelemedicineHCPActionsProps = {
  isMobile?: boolean;
  doctorSlug: string;
  doctorRecommendationId?: string;
};

function selectTelemedicineDoctor(doctor: TelemedicineDoctorCache) {
  const { indicator, slug, isPrivateChannel, isBookingChannel, id } =
    doctor.data;
  return {
    id,
    indicator,
    doctorSlug: slug,
    isPrivateChannel,
    isBookingChannel,
  };
}

function selectHasActiveConsultation(cache: MyLatestTelemedicineCache) {
  return checkActiveConsultation(cache);
}

export function TelemedicineHCPActions(props: TelemedicineHCPActionsProps) {
  const { isMobile, doctorSlug, doctorRecommendationId } = props;

  const toast = useToast();
  const submitConsultationRatingMutation = useSubmitConsultationCheckout();
  const { isSuccess } = useGetProfile();
  const {
    data: hasActiveConsultation,
    isLoading: isMyLatestTelemedicineLoading,
  } = useGetMyLatestTelemedicine({
    staleTime: 0,
    cacheTime: 0,
    enabled: isSuccess,
    select: selectHasActiveConsultation,
  });
  const { data: doctor, isLoading } = useGetTelemedicineDoctor(
    { doctorId: `${doctorSlug}` },
    { select: selectTelemedicineDoctor }
  );
  const { navigate } = useNavigation();

  function onHandleStartConsultation() {
    if (isSuccess && doctor?.id && !hasActiveConsultation) {
      const body = {
        doctorId: doctor.id,
        doctorRecommendationId,
      };
      submitConsultationRatingMutation.mutate(body, {
        onSuccess: (data) => {
          const { paymentPageUrl } = data.data;
          navigate(paymentPageUrl);
        },
      });
    } else if (hasActiveConsultation) {
      toast({
        status: "error",
        id: "has-active-consultation",
        message:
          "Tidak dapat melakukan konsultasi karena sedang ada konsultasi yang berlangsung",
      });
    } else {
      navigate("EXTERNAL_LOGIN");
    }
  }

  if (isLoading) return <TelemedicineHCPActionsSkeleton isMobile={isMobile} />;

  const newProps = {
    doctor,
    onHandleStartConsultation,
    isLoading:
      isMyLatestTelemedicineLoading ||
      submitConsultationRatingMutation.isLoading,
    doctorRecommendationId,
  };

  if (isMobile) {
    return <TelemedicineHCPActionsMobile {...newProps} />;
  }
  return <TelemedicineHCPActionsDesktop {...newProps} />;
}

export type TelemedicineHCPActionsSkeletonProps = {
  isMobile?: boolean;
};

export function TelemedicineHCPActionsSkeleton(
  props: TelemedicineHCPActionsSkeletonProps
) {
  if (props.isMobile) return <TelemedicineHCPActionsMobileSkeleton />;
  return <TelemedicineHCPActionsDesktopSkeleton />;
}
