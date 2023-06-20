import React from "react";

import { ModalInfoDesktop } from "./modal-info-desktop";
import { ModalInfoMobile } from "./modal-info-mobile";

export type ModalInfoGeneralProps = {
  isOpenModalInfo: boolean;
  modalData: {
    image?: string;
    title: string;
    description: string;
    btnText: string;
  };
  onConfrim: () => void;
};

type ModalInfoProps = {
  isMobile: boolean;
} & ModalInfoGeneralProps;

export function ModalInfo(props: ModalInfoProps) {
  const { isMobile, isOpenModalInfo, modalData, onConfrim } = props;

  const newProps = {
    isOpenModalInfo,
    modalData,
    onConfrim,
  };

  if (isMobile) {
    return <ModalInfoMobile {...newProps} />;
  }
  return <ModalInfoDesktop {...newProps} />;
}
