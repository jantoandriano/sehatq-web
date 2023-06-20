import React from "react";
import {
  HCPList,
  InfiniteHCPListCache,
  useGetHCPListQuery,
  useGetInfiniteHCPList,
} from "@sehatq/components";
import { ENV, SEO } from "@sehatq/constants";
import { useRouter } from "next/router";
import { slugToName } from "@sehatq/utils";
import { generateSEO, SEOContentProps } from "@utils";
import { HeadContent } from "./head-content";
import { hcpsMicrodata } from "./health-care-professionals-microdata";

function selectHCPList(hcpList: InfiniteHCPListCache) {
  return hcpList.pages.reduce<HCPList[]>(
    (oldItems, page) => [...oldItems, ...page.data],
    []
  );
}

export function HCPListHead() {
  const router = useRouter();
  let contentUrl = `${ENV.SEHATQ_DOMAIN}/dokter`;
  const { slugs = [] } = router.query;

  const hcpListQuery = useGetHCPListQuery(
    router.query as Record<string, string | string[]>
  );

  const { data: hcpData } = useGetInfiniteHCPList(hcpListQuery, {
    select: selectHCPList,
  });

  const { citySlug, districtSlug, specialitySlug } = hcpListQuery;

  // set default
  const { SEO_DEFAULT } = SEO.SEHATQ;
  let title = "Buat Janji Dokter dan Tenaga Kesehatan Lain | SehatQ";
  let description =
    "Daftar Dokter terdekat, cari jadwal dan lokasi praktek dengan mudah dan cepat. Gunakan fitur buat janji dan cek biaya konsultasi terbaru di SehatQ";

  if (Number(hcpListQuery.page) > 1) {
    title = `Buat Janji Dokter dan Tenaga Kesehatan Lain - Page ${hcpListQuery.page} | SehatQ`;
    description = `${description} - Page ${hcpListQuery.page}`;
    contentUrl = `${contentUrl}?page=${hcpListQuery.page}`;
  }
  let keywords =
    "jadwal praktek dokter, tarif dokter, konsultasi dokter, tanya jawab dokter, jadwal praktek, praktek dokter hari libur dan minggu, nama dokter spesialis, alamat dokter spesialis, tempat praktek dokter, tanya dokter anak";

  if (specialitySlug || districtSlug || citySlug) {
    const seoDataSlugs = generateSeoHCPSlugs(
      hcpListQuery,
      slugs as string[],
      Number(hcpListQuery.page)
    );
    title = seoDataSlugs.title;
    description = seoDataSlugs.description;
    keywords = seoDataSlugs.keywords;
    contentUrl = seoDataSlugs.contentUrl;
  }

  const seoContent: SEOContentProps = {
    ...SEO_DEFAULT,
    ogType: "website",
    title,
    ogTitle: title,
    ogTwitterTitle: Number(hcpListQuery.page) > 1 ? description : title,
    description,
    ogTwitterDesc: Number(hcpListQuery.page) > 1 ? title : description,
    keywords,
    imageAlt:
      "Cari fasilitas kesehatan dan jadwal praktek dokter spesialis terdekat hanya di SehatQ",
  };

  const seoData = generateSEO({
    content: seoContent,
    ogUrl: contentUrl,
    canonicalUrl: contentUrl,
    microdata: hcpsMicrodata(hcpData, hcpListQuery),
  });

  return <HeadContent {...seoData} robotFollow={true} robotIndex={true} />;
}

function generateSeoHCPSlugs(
  hcpSlugs: {
    specialitySlug: string;
    citySlug: string;
    districtSlug: string;
    procedureId: string;
  },
  paramSlugs: string[],
  page: number
) {
  const specialityName = slugToName(hcpSlugs.specialitySlug) ?? "";
  const districtName = slugToName(hcpSlugs.districtSlug) ?? "";
  const cityName = slugToName(hcpSlugs.citySlug) ?? "";
  const area =
    hcpSlugs.districtSlug || hcpSlugs.citySlug
      ? `di ${districtName}${
          hcpSlugs.districtSlug && hcpSlugs.citySlug ? ", " : ""
        }${cityName} `
      : "";
  let contentUrl = `${ENV.SEHATQ_DOMAIN}/dokter/${paramSlugs.join("/")}`;

  const speciality = specialityName ? ` ${specialityName}` : "";
  let title = `Buat Janji Dokter${speciality} Terdekat ${area}| SehatQ`;
  let description = `Daftar Dokter${speciality} ${area}. Cari jadwal dan lokasi praktek dengan mudah dan cepat. Gunakan fitur buat janji dan cek biaya konsultasi terbaru di SehatQ.`;
  if (page > 1) {
    title = `Buat Janji Dokter${speciality} Terdekat ${area}- Page ${page} | SehatQ`;
    description = `${description} - Page ${page}`;
    contentUrl = `${contentUrl}?page=${page}`;
  }
  const keywords =
    "rumah sakit, rumah sakit terdekat, rs jakarta, rumah sakit umum, rumah sakit jakarta, rumah sehat, nomor telepon rumah sakit, logo di rumah sakit, dirawat di rumah sakit, pasien rumah sakit";

  return {
    title,
    description,
    keywords,
    contentUrl,
  };
}
