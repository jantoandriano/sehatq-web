import React from "react";
import { useDisclosure, useToast } from "../../user-interfaces";
import { HealthToolScoreCardDesktop } from "./health-tool-score-card-desktop";
import { HealthToolScoreCardMobile } from "./health-tool-score-card-mobile";
import { useDeleteHealthToolScore } from "./health-tool-queries";

export type HealthToolScoreCardProps = {
  isMobile: boolean;
  title: string;
  description: string;
  descriptionColor: string;
  healthToolSlug: string;
  healthToolName: string;
  healthToolScoreId: number;
  createdAt: string;
  userId: string;
};

export function HealthToolScoreCard(props: HealthToolScoreCardProps) {
  const { isMobile, healthToolScoreId, healthToolSlug, ...others } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate, isLoading: isLoadingDelete } = useDeleteHealthToolScore();
  const toast = useToast();

  function confirmDelete() {
    mutate(
      {
        healthToolScoreId,
        healthToolSlug,
      },
      {
        onSuccess: ({ message }) => {
          onClose();
          toast({
            message,
            status: "success",
            position: isMobile ? "bottom" : "top",
          });
        },
        onError: ({ message }) => {
          onClose();
          toast({
            message,
            status: "error",
            position: isMobile ? "bottom" : "top",
          });
        },
      }
    );
  }

  const otherProps = {
    isOpen,
    onOpen,
    onClose,
    confirmDelete,
    healthToolScoreId,
    healthToolSlug,
    isLoadingDelete,
    ...others,
  };

  if (isMobile) {
    return <HealthToolScoreCardMobile {...otherProps} />;
  }
  return <HealthToolScoreCardDesktop {...otherProps} />;
}
