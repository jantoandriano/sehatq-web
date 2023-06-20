import React from "react";
import { ENV, SEO, URLS } from "@sehatq/constants";
import {
  InfiniteTelemedicineDoctorsCache,
  useGetInfiniteTelemedicineDoctors,
  useGetMyLocation,
} from "@sehatq/components";
import { useRouter } from "next/router";
import { slugToName } from "@sehatq/utils";
import { generateSEO, SEOContentProps } from "@utils";
import { HeadContent } from "./head-content";
import { generateTelemedicineHospitalMicrodata } from "./telemedicine-hospital-microdata";
import { generateSeoPaggination } from "./microdata-helpers";

function selectData(cache: InfiniteTelemedicineDoctorsCache) {
  return {
    hospitalName: cache.pages[cache.pages.length - 1].data[0]?.hospital.name,
    pagination: cache.pages[cache.pages.length - 1].meta,
  };
}
export function TelemedicineHospitalHead() {
  const { SEO_DEFAULT } = SEO.SEHATQ;
  const router = useRouter();
  const {
    slugs = [],
    page,
    perPage,
    sort,
    lat,
    long,
    q,
    campaignSlug,
    hospitalSlug,
    city,
    doctorExperience,
    gender,
    price,
  } = router.query;

  let url = `${ENV.SEHATQ_DOMAIN}${URLS.TELEMEDICINES}/faskes/${hospitalSlug}`;

  const { data: location } = useGetMyLocation();
  const [specialitySlug] = slugs as string[];

  const queryFilters = {
    page: (page as string) ?? "1",
    perPage: (perPage as string) ?? "12",
    sort: sort as string,
    userLat: (lat as string) ?? location?.lat,
    userLon: (long as string) ?? location?.long,
    search: q as string,
    campaignSlug: campaignSlug as string,
    city: city as string,
    doctorExperience: doctorExperience as string,
    gender: gender as string,
    price: price as string,
    specialityId: specialitySlug ?? "",
    hospitalId: hospitalSlug as string,
  };

  if (queryFilters.sort != "nearby") {
    queryFilters.userLat = "";
    queryFilters.userLon = "";
  }

  const { data, isSuccess } = useGetInfiniteTelemedicineDoctors(queryFilters, {
    select: selectData,
  });

  if (data && isSuccess) {
    let title = `Chat Dokter dari ${data.hospitalName}`;
    let description = `Tanya dokter dari ${data.hospitalName} melalui layanan Telemedicine SehatQ. Chat dokter spesialis dan dokter umum dengan fitur Video Call dan Chat Dokter.`;

    if (queryFilters.specialityId) {
      url = `${url}/${specialitySlug}`;
      const specialityName = slugToName(queryFilters.specialityId);
      title = `Chat Dokter ${specialityName} - ${data.hospitalName} | SehatQ`;
      description = `Tanya dokter ${specialityName} dari ${data.hospitalName} melalui layanan Telemedicine SehatQ. Chat dokter spesialis dan dokter umum dengan fitur Video Call dan Chat Dokter.`;
    }

    const seoContent: SEOContentProps = {
      ...SEO_DEFAULT,
      title,
      ogTitle: title,
      description,
      keywords:
        "konsultasi dokter, konsultasi dokter online, konsul dokter online, konsultasi dokter kandungan, tanya dokter gratis, tanya dokter online, konsultasi dokter kulit, chat dokter, aplikasi dokter",
      ogType: "website",
    };

    const { next, prev } = generateSeoPaggination(
      data.pagination.page,
      data.pagination.maxPage,
      url
    );

    const seoData = generateSEO({
      ogUrl: url,
      canonicalUrl: url,
      content: seoContent,
      robotIndex: SEO_DEFAULT.robotIndex,
      robotFollow: SEO_DEFAULT.robotFollow,
      microdata: generateTelemedicineHospitalMicrodata(
        data.hospitalName,
        queryFilters.hospitalId,
        queryFilters.specialityId,
        slugToName(queryFilters.specialityId)
      ),
      hasAmp: false,
      prev,
      next,
    });

    return <HeadContent {...seoData} />;
  }

  return <HeadContent {...SEO_DEFAULT} />;
}
