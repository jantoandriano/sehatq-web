import React from "react";
import { useRouter } from "next/router";
import { useGetDiseaseDetail, DiseaseDetailCache } from "@sehatq/components";
import { DiseaseDesktop } from "./disease-desktop";
import { DiseaseMobile } from "./disease-mobile";

export type DiseaseProps = {
  isMobile: boolean;
};

export function selectTagId(cache: DiseaseDetailCache) {
  return cache.data.tags.map((tag) => tag.id).join(",");
}
export function selectDoctorExpertises(cache: DiseaseDetailCache) {
  return cache.data.doctorExpertises.map(
    (doctorExpertise) => doctorExpertise.slug
  );
}

export function Disease(props: DiseaseProps) {
  const { isMobile } = props;
  const router = useRouter();
  const { slug } = router.query;
  const { data: tagId = "" } = useGetDiseaseDetail(
    {
      diseaseSlug: slug as string,
    },
    {
      select: selectTagId,
    }
  );
  const { data: doctorExpertises = [] } = useGetDiseaseDetail(
    {
      diseaseSlug: slug as string,
    },
    {
      select: selectDoctorExpertises,
    }
  );

  const newProps = {
    tagId,
    doctorExpertises,
    diseaseSlug: slug as string,
  };
  if (isMobile) {
    return <DiseaseMobile {...newProps} />;
  }
  return <DiseaseDesktop {...newProps} />;
}
