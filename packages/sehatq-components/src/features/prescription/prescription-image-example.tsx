import React, { useState } from "react";
import { PrescriptionImageExampleDesktop } from "./prescription-image-example-desktop";
import { PrescriptionImageExampleMobile } from "./prescription-image-example-mobile";

export type PrescriptionImageExampleProps = {
  isMobile?: boolean;
};

export function PrescriptionImageExample(props: PrescriptionImageExampleProps) {
  const [isShowExample, setShowExample] = useState(false);
  function onShowHideExample() {
    setShowExample(!isShowExample);
  }

  const tutorials = [
    "Resep yang diupload harus dari dokter.",
    "Upload resep dengan informasi lengkap pasien, dokter, dan tanggal konsultasi.",
    "Pastikan foto resep dapat terbaca jelas.",
    "Format foto yang dapat diupload JPEG, JPG.",
  ];

  if (props.isMobile) {
    return (
      <PrescriptionImageExampleMobile
        tutorials={tutorials}
        isShowExample={isShowExample}
        onShowHideExample={onShowHideExample}
      />
    );
  }
  return <PrescriptionImageExampleDesktop tutorials={tutorials} />;
}
