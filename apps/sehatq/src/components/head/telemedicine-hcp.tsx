import React from "react";
import { ENV, SEO, URLS } from "@sehatq/constants";
import { useRouter } from "next/router";
import {
  TelemedicineDoctorCache,
  useGetTelemedicineDoctor,
} from "@sehatq/components";
import { generateSEO, SEOContentProps } from "src/utils";
import { HeadContent } from "./head-content";

function selectDoctor(cache: TelemedicineDoctorCache) {
  return {
    name: cache.data.name,
    speciality: cache.data.specialityName,
  };
}

export function TelemedicineHCPHead() {
  const { SEO_DEFAULT } = SEO.SEHATQ;
  const router = useRouter();
  const { slug } = router.query;
  const url = `${ENV.SEHATQ_DOMAIN}${URLS.TELEMEDICINES}/dokter/${slug}`;

  const { data: doctor } = useGetTelemedicineDoctor(
    { doctorId: slug as string },
    {
      select: selectDoctor,
    }
  );

  const nonSpeciality = ["umum", "psikolog"];
  const specialityText = nonSpeciality.includes(
    (doctor?.speciality ?? "").toLowerCase()
  )
    ? doctor?.speciality
    : `Spesialis ${doctor?.speciality}`;

  const title = `Konsultasi Dokter: ${doctor?.name} - ${specialityText} | SehatQ`;
  const seoContent: SEOContentProps = {
    title,
    ogTitle: title,
    description: `Konsultasi Dokter ${specialityText} ${doctor?.name}. Tanya dan Chat Dokter Sekarang.`,
    keywords:
      "konsultasi dokter, konsultasi dokter online, konsul dokter online, konsultasi dokter kandungan, tanya dokter gratis, tanya dokter online, konsultasi dokter kulit, chat dokter, aplikasi dokter",
    ogType: "website",
  };

  const seoData = generateSEO({
    ogUrl: url,
    canonicalUrl: url,
    content: seoContent,
    robotIndex: SEO_DEFAULT.robotIndex,
    robotFollow: SEO_DEFAULT.robotFollow,
    hasAmp: false,
  });

  const contentSeo = {
    ...SEO_DEFAULT,
    ...seoData,
  };

  return <HeadContent {...contentSeo} />;
}
