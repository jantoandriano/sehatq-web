import { URLS } from "@sehatq/constants";
import { priceFormat } from "@sehatq/utils";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { TelemedicineDoctorList } from "./doctor-model";
import {
  InfiniteTelemedicineDoctorsCache,
  useGetInfiniteTelemedicineDoctors,
} from "./doctor-queries";
import {
  TelemedicineHCPListDesktop,
  TelemedicineHCPListDesktopSkeleton,
} from "./telemedicine-hcp-list-desktop";
import {
  TelemedicineHCPListMobile,
  TelemedicineHCPListMobileSkeleton,
} from "./telemedicine-hcp-list-mobile";

export type TelemedicineHCPListProps = {
  isMobile?: boolean;
  page: string;
  perPage: string;
  sortBy?: string;
  userLat?: string;
  userLong?: string;
  query?: string;
  campaignSlug?: string;
  city?: string;
  doctorExperience?: string;
  gender?: string;
  price?: string;
  specialitySlug?: string;
  navigateName?: keyof typeof URLS;
  hospitalSlug?: string;
};

function selectDoctors(cache: InfiniteTelemedicineDoctorsCache) {
  return cache.pages
    .reduce<TelemedicineDoctorList[]>(
      (oldItems, page) => [...oldItems, ...page.data],
      []
    )
    .map((doctor) => ({
      doctorId: doctor.id,
      doctorName: doctor.name,
      doctorSlug: doctor.slug,
      speciality: doctor.specialityName,
      hcfName: doctor.hospital?.name ?? "",
      photoUrl: doctor.photoUrl,
      experience: doctor.experience,
      indicator: doctor.indicator,
      consultationFee: priceFormat(doctor.consultationFee),
      consultationStrikeFee: priceFormat(doctor.consultationStrikeFee),
      ratingAvg: doctor.rating?.average,
      totalReview: doctor.rating?.count,
      isPrivateChannel:
        doctor.channels.findIndex((f) => f.code == "ConsultationPrivate") >= 0,
      isBookingChannel:
        doctor.channels.findIndex((f) => f.code == "ConsultationBooking") >= 0,
    }));
}

function selectMeta(cache: InfiniteTelemedicineDoctorsCache) {
  return cache.pages[cache.pages.length - 1].meta;
}

export function TelemedicineHCPList(props: TelemedicineHCPListProps) {
  const { ref: refInView, inView } = useInView();
  const {
    page = "1",
    perPage = "12",
    sortBy = "",
    userLat = "",
    userLong = "",
    query = "",
    campaignSlug = "",
    city = "",
    doctorExperience = "",
    gender = "",
    price = "",
    specialitySlug = "",
    isMobile,
    hospitalSlug = "",
  } = props;

  const filters = {
    page,
    perPage,
    sort: sortBy,
    userLat,
    userLon: userLong,
    search: query,
    campaignSlug,
    city,
    doctorExperience,
    gender,
    price,
    specialityId: specialitySlug,
    hospitalId: hospitalSlug,
  };

  if (sortBy != "nearby") {
    filters.userLat = "";
    filters.userLon = "";
  }

  const {
    fetchNextPage,
    isFetchingNextPage,
    data: doctors,
    isLoading,
  } = useGetInfiniteTelemedicineDoctors(filters, {
    select: selectDoctors,
  });

  const { data: meta } = useGetInfiniteTelemedicineDoctors(filters, {
    select: selectMeta,
  });

  const isMaxPage = meta?.total == 0 || meta?.page == meta?.maxPage;

  useEffect(() => {
    if (inView && !isFetchingNextPage && !isMaxPage && isMobile) {
      fetchNextPage();
    }
  }, [inView, isFetchingNextPage, isMaxPage, fetchNextPage, isMobile]);

  if (isLoading) {
    if (isMobile) return <TelemedicineHCPListMobileSkeleton />;
    return <TelemedicineHCPListDesktopSkeleton />;
  }

  if (isMobile) {
    return (
      <TelemedicineHCPListMobile
        data={doctors ?? []}
        refInView={refInView}
        isMaxPage={isMaxPage}
      />
    );
  }
  return (
    <TelemedicineHCPListDesktop
      data={doctors ?? []}
      page={meta ? meta.page : 1}
      maxPage={meta ? meta?.maxPage : 1}
      navigateName={props.navigateName}
    />
  );
}
