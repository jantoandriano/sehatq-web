import React from "react";
import { ENV, SEO } from "@sehatq/constants";
import { useRouter } from "next/router";
import {
  TelemedicineCampaignCache,
  useGetTelemedCampaign,
} from "@sehatq/components";
import { generateSEO, SEOContentProps } from "@utils";
import { HeadContent } from "./head-content";
import { telemedicineCampaignMicrodata } from "./telemedicine-campaign-microdata";

function selectCampaign(cache: TelemedicineCampaignCache) {
  return cache.data.title;
}

export function TelemedicineCampaignHead() {
  const router = useRouter();
  let contentUrl = `${ENV.SEHATQ_DOMAIN}/campaign`;
  const { slug = "" } = router.query;
  const { SEO_DEFAULT } = SEO.SEHATQ;
  const campaignSlug = (slug as string) ?? "";

  const { data: campaignTitle = "" } = useGetTelemedCampaign(
    { campaignSlug: campaignSlug },
    { select: selectCampaign }
  );

  if (slug) {
    contentUrl = `${contentUrl}/${campaignSlug}`;
  }

  const title = `Tanya Dokter dan Chat Dokter Spesialis ${campaignTitle} | SehatQ`;

  const description = `Tanya dokter spesialis ${campaignTitle} mengenai gejala penyakit melalui layanan Telemedicine SehatQ. Chat dokter umum dengan fitur Video Call dan Chat Dokter.`;

  const seoContent: SEOContentProps = {
    ...SEO_DEFAULT,
    ogType: "website",
    title,
    ogTitle: title,
    ogTwitterTitle: title,
    description,
    ogTwitterDesc: description,
    keywords:
      "konsultasi dokter, konsultasi dokter online, konsul dokter online, konsultasi dokter kandungan, tanya dokter gratis, tanya dokter online, konsultasi dokter kulit, chat dokter, aplikasi dokter",
    imageAlt: "SehatQ sebagai asisten kesehatan keluarga Anda",
  };

  const seoData = generateSEO({
    ogUrl: contentUrl,
    content: seoContent,
    canonicalUrl: contentUrl,
    robotIndex: SEO_DEFAULT.robotIndex,
    robotFollow: SEO_DEFAULT.robotFollow,
    microdata: telemedicineCampaignMicrodata(campaignSlug, campaignTitle),
  });

  return <HeadContent {...seoData} />;
}
