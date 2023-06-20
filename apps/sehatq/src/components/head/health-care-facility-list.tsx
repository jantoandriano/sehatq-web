import {
  HCFList,
  InfiniteHCFListCache,
  useGetHCFListQuery,
  useGetInfiniteHCFList,
} from "@sehatq/components";
import { ENV, HCF_TYPES } from "@sehatq/constants";
import { slugToName } from "@sehatq/utils";

import { useRouter } from "next/router";
import React from "react";
import { generateSEO, SEOContentProps } from "src/utils";
import { HeadContent } from "./head-content";
import { generateHCFsMicrodata } from "./health-care-facility-list-microdata";

export function selectHCFList(hcpList: InfiniteHCFListCache) {
  return hcpList.pages.reduce<HCFList[]>(
    (oldItems, page) => [...oldItems, ...page.data],
    []
  );
}

export function selectHCFListMeta(hcpList: InfiniteHCFListCache) {
  return hcpList.pages[0].meta;
}

function generateSEOByFilter(
  title: string,
  description: string,
  keyword: string,
  area: string,
  hcfTypeName: string | undefined,
  procedure:
    | {
        id: number;
        slug: string;
        name: string;
      }
    | undefined,
  districtName: string,
  cityName: string
) {
  const hcfFilterKeyword =
    "rumah sakit, rumah sakit terdekat, rs jakarta, rumah sakit umum, rumah sakit jakarta, rumah sehat, nomor telepon rumah sakit, logo di rumah sakit, dirawat di rumah sakit, pasien rumah sakit";

  // seo with hcf type filter
  if (hcfTypeName) {
    title = `Buat Janji ${hcfTypeName} Terdekat`;
    keyword = hcfFilterKeyword;
  }

  // seo with area filter
  if (area) {
    title = `Buat Janji ${
      hcfTypeName ?? "Fasilitas Kesehatan"
    } Terdekat ${area}`;

    description = `Cari ${
      hcfTypeName ?? "Fasilitas Kesehatan"
    } terdekat ${area}. Daftar online dokter, alamat, dokter yang berpraktik, fasilitas dan tarif kamar rawat inap, serta informasi layanan kesehatan lain hanya di SehatQ.`;

    keyword = hcfFilterKeyword;
  }

  // seo with procedure filter

  if (procedure) {
    const location = districtName || cityName;
    title = `Buat Janji dengan ${procedure.name}${
      area ? " di " + location : ""
    }`;

    description = `Pilih jadwal, buat janji, dan cek biaya ${
      procedure.name
    } di ${hcfTypeName ?? "fasilitas kesehatan"} terdekat${
      area ? " dari " + location : ""
    } dengan mudah dan cepat. Temukan informasi layanan kesehatan lainnya hanya di SehatQ.`;

    keyword = hcfFilterKeyword;
  }

  return { title, description, keyword };
}

export function HealthCareFacilityListHead() {
  const router = useRouter();
  const { slugs = [] } = router.query;
  const slug = (slugs as string[]).join("/");
  let contentUrl = `${ENV.SEHATQ_DOMAIN}/faskes${slug ? "/" + slug : ""}`;
  const hcfListQuery = useGetHCFListQuery(
    router.query as Record<string, string | string[]>
  );

  const { data: hcfs, isSuccess } = useGetInfiniteHCFList(hcfListQuery, {
    select: selectHCFList,
  });

  const { data: meta } = useGetInfiniteHCFList(hcfListQuery, {
    select: selectHCFListMeta,
  });

  // set default
  let title = "Buat Janji Rumah Sakit, Klinik, Lab, dan Puskesmas";
  let description =
    "Daftar online dan cari jadwal kunjungan, alamat, dokter yang berpraktik, fasilitas dan tarif kamar rawat inap, serta informasi layanan kesehatan lain hanya di SehatQ.";
  let keyword =
    "jadwal praktek dokter, tarif dokter, konsultasi dokter, tanya jawab dokter, jadwal praktek, praktek dokter hari libur dan minggu, nama dokter spesialis, alamat dokter spesialis, tempat praktek dokter, tanya dokter anak";
  let microdata = undefined;

  const districtName = hcfListQuery.districtSlug
    ? slugToName(hcfListQuery.districtSlug)
    : "";
  const cityName = hcfListQuery.citySlug
    ? slugToName(hcfListQuery.citySlug)
    : "";

  if (isSuccess && hcfs && meta) {
    const hcfTypeName = HCF_TYPES.find(
      (f) => f.slug == hcfListQuery.hcfTypeSlug
    )?.name;

    const area =
      hcfListQuery?.districtSlug || hcfListQuery?.citySlug
        ? `di ${districtName}${
            hcfListQuery?.districtSlug && hcfListQuery?.citySlug ? ", " : ""
          }${cityName} `
        : "";

    const procedure = meta.procedures.find(
      (f) => f.slug == hcfListQuery.procedureId
    );

    const {
      title: customTitle,
      description: customDescription,
      keyword: customKeyword,
    } = generateSEOByFilter(
      title,
      description,
      keyword,
      area,
      hcfTypeName,
      procedure,
      districtName,
      cityName
    );

    title = customTitle;
    description = customDescription;
    keyword = customKeyword;

    if (meta.page > 1) {
      title = `${title} - Page ${meta.page}`;
      description = `${description} - Page ${meta.page}`;
      contentUrl = `${contentUrl}?page=${meta.page}`;
    }

    microdata = generateHCFsMicrodata({
      contentUrl,
      hcfTypeSlug: hcfListQuery.hcfTypeSlug,
      hcfTypeName: hcfTypeName ?? "",
      hcfs,
      procedure,
      city: cityName,
      district: districtName,
    });
  }

  title = `${title} | SehatQ`;

  const seoContent: SEOContentProps = {
    title,
    description,
    keywords: keyword,
    ogType: "article",
    ogTitle: title,
    ogTwitterDesc: description,
    ogTwitterTitle: title,
    imageAlt:
      "Cari fasilitas kesehatan dan jadwal praktek dokter spesialis terdekat hanya di SehatQ",
  };

  const seoData = generateSEO({
    content: seoContent,
    ogUrl: contentUrl,
    canonicalUrl: contentUrl,
    microdata,
    hasAmp: false,
  });
  return <HeadContent {...seoData} robotFollow={true} robotIndex={true} />;
}
