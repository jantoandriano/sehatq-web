import React, { useReducer, useState } from "react";
import { getIdDay, priceFormat } from "@sehatq/utils";
import { SHECEDULE_DAYS } from "@sehatq/constants";
import {
  HCFHCPScheduleDaysCache,
  HCFServicePackCache,
  SpecialitySearchCache,
  useGetHCFHCPScheduleDays,
  useGetHCFServicePack,
  useGetSpecialitySearch,
} from "./related-health-care-facility-search-query";
import {
  RelatedHealthCareFacilitySearchDesktop,
  RelatedHealthCareFacilitySearchDesktopSkeleton,
} from "./related-health-care-facility-search-desktop";
import {
  RelatedHealthCareFacilitySearchMobile,
  RelatedHealthCareFacilitySearchMobileSkeleton,
} from "./related-health-care-facility-search-mobile";
import {
  HCFServicesCache,
  useGetHCFServices,
} from "./health-care-facility-services-queries";

export type RelatedHealthCareFacilitySearchProps = {
  isMobile?: boolean;
  hcfId: string;
  hcfSlug: string;
};

const initialStateForm = {
  values: {
    speciality: undefined,
    date: undefined,
    service: undefined,
    package: undefined,
  },
};

export interface PayloadValues {
  speciality: { value: string; slug: string; label: string } | undefined;
  date: Date | undefined;
  service: { value: string; label: string } | undefined;
  package: { value: string; label: string } | undefined;
}

function formReducer(
  state: { values: PayloadValues },
  payload: {
    name: string;
    value: { value: string; slug?: string; label: string } | Date | undefined;
  }
) {
  const values = {
    ...state.values,
    [payload.name]: payload.value,
  };

  return {
    ...state,
    values,
  };
}

function selectSpecialities(cache: SpecialitySearchCache) {
  return cache.data.map((speciality) => ({
    value: `${speciality.id}`,
    slug: speciality.slug,
    label: speciality.name,
    imageUrl: speciality.imageUrl,
  }));
}

function getExcludeDay(days: number[]) {
  return SHECEDULE_DAYS.filter((f) => !days.includes(f.id)).map((m) => m.id);
}

function selectScheduleDays(cache: HCFHCPScheduleDaysCache) {
  return cache.data.map((d) => getIdDay(d.day)).filter(Boolean);
}

function selectServices(cache: HCFServicesCache) {
  return cache.data.map((service) => ({
    value: service.slug,
    label: service.name,
  }));
}

function selectPackages(cache: HCFServicePackCache) {
  return cache.data.map((service) => ({
    value: `${service.id}`,
    label: service.name,
    desc: priceFormat(service.price),
  }));
}

export function RelatedHealthCareFacilitySearch(
  props: RelatedHealthCareFacilitySearchProps
) {
  const [stateForm, dispatchStateForm] = useReducer(
    formReducer,
    initialStateForm
  );

  const [showModal, setShowModal] = useState(false);
  const [showSpecialities, setShowSpecialities] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [showPackages, setShowPackages] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  function clearInputSearch() {
    setSearchValue("");
  }

  function onChangeSearchValue(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setSearchValue(e.target.value);
  }

  function onChangeInput(
    name: string,
    value: { value: string; slug?: string; label: string } | Date | undefined
  ) {
    dispatchStateForm({
      name,
      value,
    });
    if (name == "speciality") {
      dispatchStateForm({
        name: "date",
        value: undefined,
      });
    } else if (name == "service") {
      dispatchStateForm({
        name: "package",
        value: undefined,
      });
    }
    setShowSpecialities(false);
    setShowServices(false);
    setShowPackages(false);
  }

  function clearValues() {
    Object.keys(initialStateForm.values).forEach((key: string) => {
      dispatchStateForm({
        name: key,
        value: undefined,
      });
    });
  }

  function onShowHideModal() {
    setShowModal(!showModal);
    setShowSpecialities(false);
    setShowServices(false);
    setShowPackages(false);
    clearValues();
  }

  function onShowHideSpecialities() {
    setShowSpecialities(!showSpecialities);
  }

  function onShowHideServices() {
    setSearchValue("");
    setShowServices(!showServices);
  }

  function onShowHidePackages() {
    setSearchValue("");
    setShowPackages(!showPackages);
  }

  const { data: specialities, isLoading } = useGetSpecialitySearch(
    { hospitalId: props.hcfId },
    { select: selectSpecialities, enabled: Boolean(props.hcfId) }
  );

  const { data: scheduleDays } = useGetHCFHCPScheduleDays(
    {
      hospitalId: props.hcfId,
      specialityId: stateForm.values.speciality?.value ?? "",
    },
    {
      select: selectScheduleDays,
      enabled: Boolean(stateForm.values.speciality?.value),
    }
  );

  const { data: services } = useGetHCFServices(
    { hcfSlug: props.hcfSlug },
    { select: selectServices }
  );

  const { data: packages } = useGetHCFServicePack(
    {
      hcfSlug: props.hcfSlug,
      procedureSlug: stateForm.values.service?.value ?? "",
    },
    {
      select: selectPackages,
      enabled: Boolean(stateForm.values.service?.value),
    }
  );

  if (isLoading) {
    return (
      <RelatedHealthCareFacilitySearchSkeleton isMobile={props.isMobile} />
    );
  }

  if (services?.length == 0 && specialities?.length == 0) {
    return null;
  }

  const otherProps = {
    specialities: specialities ?? [],
    values: stateForm.values,
    onChangeInput,
    hcfId: props.hcfId,
    services: services ?? [],
    packages: packages ?? [],
    hcfSlug: props.hcfSlug,
    showSpecialities,
    onShowHideSpecialities,
    showServices,
    onShowHideServices,
    showPackages,
    onShowHidePackages,
    onChangeSearchValue,
    searchValue,
    clearInputSearch,
    disableDays: scheduleDays
      ? getExcludeDay(scheduleDays.map((d) => Number(d)))
      : [],
  };

  if (props.isMobile) {
    const mobileProps = { ...otherProps, showModal, onShowHideModal };
    return <RelatedHealthCareFacilitySearchMobile {...mobileProps} />;
  }

  return <RelatedHealthCareFacilitySearchDesktop {...otherProps} />;
}

export type RelatedHealthCareFacilitySearchSkeletonProps = {
  isMobile?: boolean;
};

export function RelatedHealthCareFacilitySearchSkeleton(
  props: RelatedHealthCareFacilitySearchSkeletonProps
) {
  if (props.isMobile) {
    return <RelatedHealthCareFacilitySearchMobileSkeleton />;
  }
  return <RelatedHealthCareFacilitySearchDesktopSkeleton />;
}
