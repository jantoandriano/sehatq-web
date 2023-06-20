import React from "react";

import { useNavigation } from "@sehatq/utils";
import { Link } from "../../user-interfaces";
import { HealthCareProfessionalFaqMobile } from "./health-care-professional-faq-mobile";
import { HealthCareProfessionalFaqDesktop } from "./health-care-professional-faq-desktop";
import { HCPList } from "./health-care-professional-model";
import {
  InfiniteHCPListCache,
  useGetInfiniteHCPList,
} from "./health-care-professional-queries";
import {
  SpecialityLinkCache,
  useGetSpecialityLink,
} from "./health-care-professional-speciality-queries";

export type HealthCareProfessionalFaqProps = {
  isMobile: boolean;
  page: number;
  perPage?: number;
  userLat?: string;
  userLong?: string;
  query?: string;
  procedureId?: string;
  scheduleDayId?: string;
  citySlug?: string;
  districtSlug?: string;
  gender?: string;
  specialitySlug?: string;
  sortBy?: string;
  hcfId?: string;
};

export function selectHCPList(hcpList: InfiniteHCPListCache) {
  return hcpList.pages.reduce<HCPList[]>(
    (oldItems, page) => [...oldItems, ...page.data],
    []
  );
}

export function selectHCPListMeta(hcpList: InfiniteHCPListCache) {
  return hcpList.pages[0].meta;
}

function selectSpecialityLink(hcpSpeciality: SpecialityLinkCache) {
  return hcpSpeciality.data;
}

export function HealthCareProfessionalFaq(
  props: HealthCareProfessionalFaqProps
) {
  const {
    isMobile,
    page = 1,
    perPage = 9,
    userLat = "",
    userLong = "",
    query = "",
    procedureId = "",
    scheduleDayId = "",
    citySlug = "",
    districtSlug = "",
    gender = "",
    specialitySlug = "",
    sortBy = "",
    hcfId = "",
  } = props;

  const queryFilter = {
    page: `${page}`,
    perPage: `${perPage}`,
    userLat,
    userLong,
    query,
    procedureId,
    scheduleDayId,
    citySlug,
    districtSlug,
    gender,
    specialitySlug,
    sortBy,
    hcfId,
  };
  const { Navigate } = useNavigation();

  const { data: hcpData = [] } = useGetInfiniteHCPList(queryFilter, {
    select: selectHCPList,
  });

  const { data: hcpMeta } = useGetInfiniteHCPList(queryFilter, {
    select: selectHCPListMeta,
  });

  const { data: specialityList } = useGetSpecialityLink({
    select: selectSpecialityLink,
  });

  // not showing when there's no data
  if (hcpData.length === 0) {
    return null;
  }

  const foundSpeciality = specialityList?.find(
    (item) => item.slug === specialitySlug
  );
  const speciality = foundSpeciality
    ? `Dokter ${foundSpeciality.name}`
    : "dokter";

  const foundCity = hcpMeta?.cities.find((city) => city.slug === citySlug);
  const city = foundCity ? foundCity.name : undefined;

  let district;
  if (foundCity) {
    const foundDistrict = foundCity.district.find(
      (district) => district.slug === districtSlug
    );
    district = foundDistrict?.name;
  }

  const doctors = hcpData
    ? hcpData
        .slice(0, 5)
        .map((item) => item.name)
        .join(", ")
    : "";

  const location = city ? (district ? ` di ${district}` : ` di ${city}`) : "";
  const mobileFontSize = isMobile ? { fontSize: "xs" } : {};

  const faqContent = [
    {
      id: 0,
      title: (
        <>
          Siapa saja {speciality}
          {location} yang melayani pendaftaran pasien secara online?
        </>
      ),
      content: (
        <>
          {doctors} merupakan beberapa contoh dari puluhan ribuan dokter partner
          SehatQ yang melayani pendaftaran pasien secara online tanpa harus
          mengantri.
        </>
      ),
    },
    {
      id: 1,
      title: (
        <>
          Mengapa melakukan pendaftaran online dokter{" "}
          {location ? `${location} melalui SehatQ` : "di SehatQ?"}
        </>
      ),
      content: (
        <>
          SehatQ merupakan penyedia platform penghubung antara Anda (pasien)
          dengan{" "}
          <Navigate name="HEALTH_CARE_PROFESIONALS">
            <Link {...mobileFontSize}>dokter</Link>
          </Navigate>{" "}
          dan/atau{" "}
          <Navigate name="HEALTH_CARE_FACILITIES">
            <Link {...mobileFontSize}>fasilitas pelayanan kesehatan</Link>
          </Navigate>{" "}
          terkait. SehatQ mendukung layanan pembuatan janji temu dengan{" "}
          {speciality} yang tersebar di seluruh Indonesia.
        </>
      ),
    },
    {
      id: 2,
      title: <>Bagaimana cara menjadi partner SehatQ?</>,
      content: (
        <>
          Lakukan pendaftaran menjadi partner atau mitra SehatQ dengan memeriksa
          tautan link berikut:{" "}
          <Navigate name="PARTNER_HCF">
            <Link {...mobileFontSize}>Mitra Faskes</Link>
          </Navigate>{" "}
          dan{" "}
          <Navigate name="PARTNER_CORPORATE">
            <Link {...mobileFontSize}>Mitra Perusahaan</Link>
          </Navigate>
          .
        </>
      ),
    },
  ];

  const otherProps = {
    content: faqContent,
  };

  if (isMobile) {
    return <HealthCareProfessionalFaqMobile {...otherProps} />;
  }
  return <HealthCareProfessionalFaqDesktop {...otherProps} />;
}
