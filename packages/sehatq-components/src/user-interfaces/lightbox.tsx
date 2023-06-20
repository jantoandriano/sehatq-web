/* eslint-disable import/no-unresolved */
import React from "react";
import { Lightbox } from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

export interface LightBoxProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrls: string[];
}

export function LightBox(props: LightBoxProps) {
  const { isOpen, onClose, imageUrls } = props;

  return (
    <Lightbox
      open={isOpen}
      close={onClose}
      slides={imageUrls.map((imageUrl) => ({
        src: imageUrl,
      }))}
      plugins={[Zoom]}
      render={{
        ...(imageUrls.length === 1 && {
          buttonPrev: () => null,
          buttonNext: () => null,
        }),
      }}
    />
  );
}
