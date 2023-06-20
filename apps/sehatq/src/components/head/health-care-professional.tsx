import { HCPDetailCache, useGetHCPDetail } from "@sehatq/components";
import { ENV, SEO } from "@sehatq/constants";
import { useRouter } from "next/router";
import React from "react";
import { subMonths } from "date-fns";
import { formatDate } from "@sehatq/utils";
import { generateSEO, SEOContentProps } from "src/utils";
import { HeadContent } from "./head-content";
import { generateHCPMicrodata } from "./health-care-professional-microdata";

function selectHCPDetail(hcpDetail: HCPDetailCache) {
  return hcpDetail.data;
}
export function HealthCareProfessionalHead() {
  const router = useRouter();
  const { hcpSlug } = router.query;
  const contentUrl = `${ENV.SEHATQ_DOMAIN}/dokter/${hcpSlug}`;

  const { SEO_DEFAULT } = SEO.SEHATQ;

  const { data: hcp, isSuccess } = useGetHCPDetail(
    {
      hcpSlug: hcpSlug as string,
      userLat: "",
      userLong: "",
    },
    { select: selectHCPDetail }
  );

  const robotsIndexFollow = {
    robotFollow: true,
    robotIndex: true,
  };

  if (isSuccess && hcp) {
    const seoContent: SEOContentProps = {
      title: `${hcp.name} | Daftar Dokter Online`,
      description: hcp.meta,
      keywords: hcp.keyword,
      ogType: "article",
      imageUrl: hcp.imageUrl,
      imageAlt: hcp.imageAlt,
      imageWidth: "360",
      imageHeight: "360",
    };

    // last day friday
    const lastMonth = subMonths(new Date(), 1);
    const dateModified = formatDate(lastMonth, "yyyy-MM-dd'T'HH:mm:ss+07:00");

    const calculatedLastFriday =
      new Date().getDate() + (6 - new Date().getDay() - 1) - 7;
    const lastFriday = new Date();
    lastFriday.setDate(calculatedLastFriday);
    const datePublished = formatDate(lastFriday, "yyyy-MM-dd'T'HH:mm:ss+07:00");

    const dataNewsArticle = {
      pageUrl: contentUrl,
      headline: `Booking ${hcp.name}, ${hcp.specialityName} | SehatQ`,
      name: hcp.name,
      url: contentUrl,
      width: "480",
      height: "480",
      datePublished,
      dateModified,
      articleBody: hcp.profile,
      description: hcp.meta,
    };

    const dataPhysician = {
      name: hcp.name,
      url: contentUrl,
      description: hcp.meta,
      medicalSpecialty: hcp.specialityName,
      imageUrl: hcp.imageUrl,
    };

    const microdata = generateHCPMicrodata({
      newsArticle: dataNewsArticle,
      physician: dataPhysician,
    });

    const seoData = generateSEO({
      content: seoContent,
      ogUrl: contentUrl,
      canonicalUrl: contentUrl,
      microdata,
      hasAmp: false,
    });
    return <HeadContent {...seoData} {...robotsIndexFollow} />;
  } else {
    return <HeadContent {...SEO_DEFAULT} {...robotsIndexFollow} />;
  }
}
