import { HCFDetailCache, useGetHCFDetail } from "@sehatq/components";
import { ENV, SEO, SHECEDULE_DAYS } from "@sehatq/constants";
import { convertDayNameIdToEn, toPascalCase } from "@sehatq/utils";
import { useRouter } from "next/router";
import React from "react";
import { generateSEO, SEOContentProps } from "src/utils";
import { HeadContent } from "./head-content";
import { generateHCFMicrodata } from "./health-care-facility-microdata";

function selectHCFDetail(cache: HCFDetailCache) {
  return cache.data;
}

export function generateHCFOperationalTime(operationalTime: string) {
  if (!operationalTime) return null;
  const dayName = SHECEDULE_DAYS.map((day) => toPascalCase(day.name));

  return operationalTime
    .replace(/<(.|\n)*?>/g, "|")
    .split("|")
    .map((item) => {
      const schedule = item.split(" ").filter((f) => f != "-");

      // select hours
      const hours = schedule.filter((f) => !convertDayNameIdToEn(f));
      const startHour = hours[0];
      const endHour = hours[1];

      // select days
      const dayData = schedule.filter((f) => convertDayNameIdToEn(f));
      const startDay = dayData[0];
      const endDay = dayData[1];
      const indexStartDay = dayName.indexOf(startDay);
      const indexEndDay = dayName.indexOf(endDay);
      let days = [convertDayNameIdToEn(startDay)];
      if (endDay && indexEndDay !== -1) {
        days = dayName
          .slice(indexStartDay, indexEndDay + 1)
          .map((d) => convertDayNameIdToEn(d));
      }

      return { days, startHour, endHour };
    });
}

export function HealthCareFacilityHead() {
  const router = useRouter();
  const { hcfSlug } = router.query;
  const contentUrl = `${ENV.SEHATQ_DOMAIN}/faskes/${hcfSlug}`;

  const { SEO_DEFAULT } = SEO.SEHATQ;

  const { data: hcf, isSuccess } = useGetHCFDetail(
    {
      hcfSlug: hcfSlug as string,
      userLat: "",
      userLong: "",
    },
    { select: selectHCFDetail }
  );

  const robotsIndexFollow = {
    robotFollow: true,
    robotIndex: true,
  };

  if (isSuccess && hcf) {
    const title = `${hcf.name} | Daftar Online`;
    const description = hcf.metadesc;

    const seoContent: SEOContentProps = {
      title,
      description,
      keywords: hcf.keyword,
      ogType: "article",
      ogTitle: title,
      ogTwitterDesc: description,
      ogTwitterTitle: title,
      imageUrl: hcf.imageUrl,
      imageAlt: hcf.name,
      imageWidth: "300",
      imageHeight: "400",
    };

    const localBusiness = {
      name: hcf.name,
      imageUrl: hcf.imageUrl,
      imageWidth: "780",
      imageHeight: "390",
      areaServed: hcf.city,
      openingHours: hcf.operationalHours,
      addressLocality: hcf.district,
      addressRegion: hcf.city,
      streetAddress: hcf.address,
      latitude: hcf.latitude,
      longitude: hcf.longitude,
      hasMap: hcf.mapsUrl,
      priceRange: "0",
      telephone: hcf.phone,
      offers: hcf.medicalFacility ?? [],
      catalogOfferName: hcf.type,
      hcfType: hcf.type,
    };

    const hospital = {
      image: hcf.imageUrl,
      url: contentUrl,
      name: hcf.name,
      streetAddress: hcf.address,
      addressLocality: hcf.district,
      regionId: "ID",
      ratingValue: hcf.rating,
      latitude: hcf.latitude,
      longitude: hcf.longitude,
      telephone: hcf.phone,
      openingHoursSpecification: generateHCFOperationalTime(
        hcf.operationalHours
      ),
    };

    const microdata = generateHCFMicrodata({
      contentUrl,
      hcfName: hcf.name,
      localBusiness,
      hospital,
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
