import React from "react";
import { HealthToolListHeadlineDesktop } from "./health-tool-list-headline-desktop";
import { useGetHealthToolSEO } from "./health-tool-queries";

export type HealthToolListHeadlineProps = {
  isMobile?: boolean;
};

export function HealthToolListHeadline(props: HealthToolListHeadlineProps) {
  const { data } = useGetHealthToolSEO({ slug: "tes-kesehatan" });
  const newProps = {
    title: data?.contentTitle ?? "Tes Kesehatan",
    content:
      data?.contentDescription ??
      "Cek kesehatan kamu dengan tes kesehatan online SehatQ tanpa harus repot dengan rumus hitung manual, GRATIS!",
  };
  if (props.isMobile) return null;
  return <HealthToolListHeadlineDesktop {...newProps} />;
}
