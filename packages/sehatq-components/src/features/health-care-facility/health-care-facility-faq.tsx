import React from "react";

import { useNavigation } from "@sehatq/utils";
import { HCF_TYPES } from "@sehatq/constants";
import { Link } from "../../user-interfaces";
import { HealthCareFacilityFaqMobile } from "./health-care-facility-faq-mobile";
import { HealthCareFacilityFaqDesktop } from "./health-care-facility-faq-desktop";
import { HCFList } from "./health-care-facility-model";
import {
  InfiniteHCFListCache,
  useGetInfiniteHCFList,
} from "./health-care-facility-queries";

export type HealthCareFacilityFaqProps = {
  isMobile?: boolean;
  page: string;
  perPage: string;
  sortBy?: string;
  userLat?: string;
  userLong?: string;
  query?: string;
  partner?: string;
  hcfTypeSlug?: string;
  procedureId?: string;
  facility?: string;
  citySlug?: string;
  districtSlug?: string;
};

function selectHCFList(cache: InfiniteHCFListCache) {
  return cache.pages.reduce<HCFList[]>(
    (oldItems, page) => [...oldItems, ...page.data],
    []
  );
}

function selectHCFListMeta(cache: InfiniteHCFListCache) {
  return cache.pages[0].meta.cities;
}

function getHCFNames(hcfs = [] as HCFList[], length = 2, start = 0) {
  const end = start + length;
  const itemList = hcfs.slice(start, end - 1).map((item) => item.name);
  const items = hcfs.slice(start, end);

  let last = "";
  if (items.length > 1) {
    const item = items[items.length - 1];
    last = ` dan ${item.name}`;
  }
  return `${itemList.join(", ")}${last}`;
}

export function HealthCareFacilityFaq(props: HealthCareFacilityFaqProps) {
  const {
    page = "1",
    perPage = "16",
    sortBy = "",
    userLat = "",
    userLong = "",
    query = "",
    partner = "",
    hcfTypeSlug = "",
    procedureId = "",
    facility = "",
    citySlug = "",
    districtSlug = "",
    isMobile,
  } = props;

  const queryFilter = {
    page,
    perPage,
    sortBy,
    userLat,
    userLong,
    query,
    partner,
    hcfTypeSlug,
    procedureId,
    medicalFacilityId: facility,
    citySlug,
    districtSlug,
  };

  const { Navigate } = useNavigation();

  const { data: hcfs } = useGetInfiniteHCFList(queryFilter, {
    select: selectHCFList,
  });

  const { data: cities } = useGetInfiniteHCFList(queryFilter, {
    select: selectHCFListMeta,
  });

  // not showing when there's no data
  if (!hcfs || hcfs.length === 0) {
    return null;
  }

  const hcfTypeName = HCF_TYPES.find(
    (f) => f.slug == queryFilter.hcfTypeSlug
  )?.name;
  const city = cities?.find((city) => city.slug === citySlug);
  const cityName = city?.name;

  let districtName;
  if (city) {
    districtName = city.district.find(
      (district) => district.slug === districtSlug
    )?.name;
  }

  const location = districtName || cityName;

  const hcfTypeDesc =
    hcfTypeName !== "Puskesmas" ? hcfTypeName : `fasilitas kesehatan (faskes)`;
  const hcfType = hcfTypeName !== "Puskesmas" ? hcfTypeName : `faskes`;
  const area = location ? `di ${location} ` : "";
  const linkStyle = isMobile ? { fontSize: "xs" } : {};

  const faqContent = [
    {
      id: 0,
      title: (
        <>
          Apa saja {hcfTypeDesc} {area}yang melayani pendaftaran pasien secara
          online?
        </>
      ),
      content: (
        <>
          Fasilitas kesehatan di {getHCFNames(hcfs, 3)} mendapatkan penilaian
          terbaik dari para pengguna layanannya. {getHCFNames(hcfs, 2, 3)}{" "}
          merupakan beberapa contoh dari ribuan {hcfType} partner SehatQ {area}
          yang melayani pendaftaran pasien secara online tanpa harus mengantri.
        </>
      ),
    },
    {
      id: 1,
      title: (
        <>
          Apa saja {hcfType} {area}yang memiliki penilaian terbaik?
        </>
      ),
      content: (
        <>
          {getHCFNames(hcfs, 4)} merupakan {hcfType} dengan penilaian terbaik.
        </>
      ),
    },
    {
      id: 2,
      title: <>Di mana {hcfType} yang buka pada akhir pekan?</>,
      content: (
        <>
          {getHCFNames(hcfs, 2)} memiliki layanan kesehatan yang buka di akhir
          pekan.
        </>
      ),
    },
    {
      id: 3,
      title: <>Apakah ada {hcfType} yang punya layanan 24 jam?</>,
      content: <>{getHCFNames(hcfs, 2)} memiliki layanan darurat 24 jam.</>,
    },
    {
      id: 4,
      title: "Mengapa melakukan pendaftaran online faskes di SehatQ?",
      content: (
        <>
          SehatQ merupakan penyedia platform penghubung antara Anda (pasien)
          dengan{" "}
          <Navigate name="HEALTH_CARE_PROFESIONALS">
            <Link {...linkStyle}>dokter</Link>
          </Navigate>{" "}
          dan/atau{" "}
          <Navigate name="HEALTH_CARE_FACILITIES">
            <Link {...linkStyle}>fasilitas pelayanan kesehatan</Link>
          </Navigate>{" "}
          terkait. SehatQ mendukung layanan pembuatan janji temu di faskes yang
          tersebar di seluruh Indonesia.
        </>
      ),
    },
    {
      id: 5,
      title: "Bagaimana cara menjadi partner SehatQ?",
      content: (
        <>
          Lakukan pendaftaran menjadi partner atau mitra SehatQ dengan memeriksa
          tautan link berikut:{" "}
          <Navigate name="PARTNER_HCF">
            <Link {...linkStyle}>Mitra Faskes</Link>
          </Navigate>{" "}
          dan{" "}
          <Navigate name="PARTNER_CORPORATE">
            <Link {...linkStyle}>Mitra Perusahaan</Link>
          </Navigate>
        </>
      ),
    },
  ];

  const otherProps = {
    content: faqContent,
  };

  if (isMobile) {
    return <HealthCareFacilityFaqMobile {...otherProps} />;
  }
  return <HealthCareFacilityFaqDesktop {...otherProps} />;
}
