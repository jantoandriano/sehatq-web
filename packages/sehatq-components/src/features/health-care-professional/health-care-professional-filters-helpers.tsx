import { HCPSSpecialityData } from "./health-care-professional-speciality-model";

export type FilterKeys =
  | "specialitySlug"
  | "procedureId"
  | "citySlug"
  | "districtSlug"
  | "schedule"
  | "gender";

type Option = {
  value: string;
  name: string;
};

function sortOptions(
  optionA: Option,
  optionB: Option,
  selectedOptionValue?: string
) {
  if (optionA.value === selectedOptionValue) {
    return -1;
  }
  if (optionB.value === selectedOptionValue) {
    return 1;
  }
  return optionA.name < optionB.name ? -1 : 1;
}

export function generateFilters(props: {
  tempSelectedFilters:
    | Partial<Record<FilterKeys, string | undefined>>
    | undefined;
  specialityOptions: { options: HCPSSpecialityData[]; isLoading?: boolean };
  citiesOptions: {
    options: {
      code: string;
      name: string;
      slug: string;
      district: {
        code: string;
        slug: string;
        name: string;
      }[];
    }[];
    isLoading?: boolean;
  };
  genderOptions: {
    options: {
      code: string;
      name: string;
    }[];
    isLoading?: boolean;
  };
  scheduleOptions: {
    options: {
      id: string;
      name: string;
    }[];
    isLoading?: boolean;
  };
  proceduresOptions: {
    options: {
      id: number;
      slug: string;
      name: string;
    }[];
    isLoading?: boolean;
  };
}) {
  const {
    tempSelectedFilters,
    specialityOptions,
    citiesOptions,
    genderOptions,
    scheduleOptions,
    proceduresOptions,
  } = props;

  return [
    {
      filterKey: "specialitySlug" as const,
      filterName: "Spesialisasi",
      selectedValue: tempSelectedFilters?.specialitySlug ?? "",
      selectedName:
        specialityOptions.options.find(
          (ft) => ft.slug == tempSelectedFilters?.specialitySlug
        )?.name ?? "",
      showSearch: true,
      options: specialityOptions.options
        .map((dt) => {
          return { value: dt.slug, name: dt.name };
        })
        .sort((a, b) => sortOptions(a, b, tempSelectedFilters?.specialitySlug)),
      isLoading: specialityOptions.isLoading,
      isResetQuery: true,
    },
    {
      filterKey: "procedureId" as const,
      filterName: "Layanan Pemeriksaan",
      selectedValue: tempSelectedFilters?.procedureId ?? "",
      selectedName:
        proceduresOptions.options.find(
          (ft) => ft.slug == tempSelectedFilters?.procedureId
        )?.name ?? "",
      options: proceduresOptions.options
        .map((dt) => {
          return { value: dt.slug, name: dt.name };
        })
        .sort((a, b) => sortOptions(a, b, tempSelectedFilters?.procedureId)),
      showSearch: true,
      isLoading: proceduresOptions.isLoading,
    },
    {
      filterKey: "citySlug" as const,
      filterName: "Kota",
      selectedValue: tempSelectedFilters?.citySlug ?? "",
      selectedName:
        citiesOptions.options.find(
          (ft) => ft.slug == tempSelectedFilters?.citySlug
        )?.name ?? "",
      options: citiesOptions.options
        .map((dt) => {
          return { value: dt.slug, name: dt.name };
        })
        .sort((a, b) => sortOptions(a, b, tempSelectedFilters?.citySlug)),
      showSearch: true,
      isLoading: citiesOptions.isLoading,
    },
    {
      filterKey: "schedule" as const,
      filterName: "Hari Praktik",
      selectedValue: tempSelectedFilters?.schedule ?? "",
      selectedName:
        scheduleOptions.options.find(
          (ft) => ft.id == tempSelectedFilters?.schedule
        )?.name ?? "",
      showSearch: false,
      options: scheduleOptions.options
        .map((dt) => {
          return { value: dt.id, name: dt.name };
        })
        .sort((a, b) => sortOptions(a, b, tempSelectedFilters?.schedule)),
      isLoading: scheduleOptions.isLoading,
    },
    {
      filterKey: "gender" as const,
      filterName: "Jenis Kelamin",
      selectedValue: tempSelectedFilters?.gender ?? "",
      selectedName:
        genderOptions.options.find(
          (ft) => ft.code == tempSelectedFilters?.gender
        )?.name ?? "",
      showSearch: false,
      options: genderOptions.options
        .map((dt) => {
          return { value: dt.code, name: dt.name };
        })
        .sort((a, b) => sortOptions(a, b, tempSelectedFilters?.gender)),
      isLoading: genderOptions.isLoading,
    },
  ];
}

export function validateHCPSSlugs(
  paramSlugs: string[],
  hcpSlugs:
    | {
        specialitySlug: string;
        citySlug: string;
        districtSlug: string;
        procedureId: string;
      }
    | undefined
) {
  const validSlugs = [
    hcpSlugs?.specialitySlug,
    hcpSlugs?.citySlug,
    hcpSlugs?.districtSlug,
    hcpSlugs?.procedureId,
  ].filter(Boolean);
  const valid =
    paramSlugs.length == 0 ? true : validSlugs.length >= paramSlugs.length;
  return {
    valid,
    slugs: {
      specialitySlug:
        (valid ? hcpSlugs?.specialitySlug || "" : paramSlugs[0]) || "",
      citySlug: (valid ? hcpSlugs?.citySlug || "" : paramSlugs[1]) || "",
      districtSlug:
        (valid ? hcpSlugs?.districtSlug || "" : paramSlugs[2]) || "",
      procedureId: (valid ? hcpSlugs?.procedureId || "" : paramSlugs[3]) || "",
    },
  };
}

export function generateHCPQueryParams(
  queries: Record<string, string | string[]>,
  hcpSlugs:
    | {
        specialitySlug: string;
        citySlug: string;
        procedureId: string;
      }
    | undefined
) {
  const { specialitySlug, citySlug, procedureId } = {
    ...hcpSlugs,
    ...queries,
  };

  let newSlugs = [] as string[];

  if (specialitySlug) {
    newSlugs = [...newSlugs, specialitySlug as string];
    delete queries.specialitySlug;
  }

  if (citySlug) {
    newSlugs = [...newSlugs, citySlug as string];
    delete queries.citySlug;
  }

  if (procedureId) {
    newSlugs = [...newSlugs, procedureId as string];
    delete queries.procedureId;
  }

  return { ...queries, slugs: newSlugs, page: "1" };
}

export const defaultQueryFilter = {
  page: "1",
  perPage: "9",
  userLat: "",
  userLong: "",
  query: "",
  procedureId: "",
  scheduleDayId: "",
  citySlug: "",
  gender: "",
  specialitySlug: "",
  sortBy: "terdekat",
};
