import { HCF_TYPES } from "@sehatq/constants";
import { TranslatedSlugCache, useGetTranslatedSlug } from "../general";
import { useGetMyLocation } from "../profile";

export type FilterKeys =
  | "partner"
  | "hcfTypeSlug"
  | "procedureId"
  | "citySlug"
  | "districtSlug"
  | "facility";

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
  partnerOptions: {
    options: { key: string; value: string }[];
    isLoading?: boolean;
  };
  hcfTypesOptions: {
    options: { slug: string; name: string }[];
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
  medicalFacilitiesOptions: {
    options: {
      id: number;
      name: string;
      slug: string;
    }[];
    isLoading?: boolean;
  };
}) {
  const {
    tempSelectedFilters,
    partnerOptions,
    hcfTypesOptions,
    proceduresOptions,
    citiesOptions,
    medicalFacilitiesOptions,
  } = props;

  return [
    {
      filterKey: "partner" as const,
      filterName: "Jenis Faskes",
      selectedValue: tempSelectedFilters?.partner ?? "",
      selectedName:
        partnerOptions.options.find(
          (ft) => ft.value == tempSelectedFilters?.partner
        )?.key ?? "",
      showSearch: false,
      options: partnerOptions.options
        .map((dt) => {
          return { value: dt.value, name: dt.key };
        })
        .sort((a, b) => sortOptions(a, b, tempSelectedFilters?.partner)),
      isLoading: partnerOptions.isLoading,
    },
    {
      filterKey: "hcfTypeSlug" as const,
      filterName: "Tipe Faskes",
      selectedValue: tempSelectedFilters?.hcfTypeSlug ?? "",
      selectedName:
        hcfTypesOptions.options.find(
          (ft) => ft.slug == tempSelectedFilters?.hcfTypeSlug
        )?.name ?? "",
      options: [
        { value: "", name: "Semua" },
        ...hcfTypesOptions.options
          .map((dt) => {
            return { value: dt.slug, name: dt.name };
          })
          .sort((a, b) => sortOptions(a, b, tempSelectedFilters?.hcfTypeSlug)),
      ],
      showSearch: false,
      isResetQuery: true,
      isLoading: hcfTypesOptions.isLoading,
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
      filterKey: "facility" as const,
      filterName: "Fasilitas",
      selectedValue: tempSelectedFilters?.facility ?? "",
      selectedName:
        medicalFacilitiesOptions.options
          .filter((ft) =>
            tempSelectedFilters?.facility?.split(",").includes(`${ft.id}`)
          )
          ?.map((dt) => dt.name)
          .join(", ") ?? "",
      showSearch: true,
      options: medicalFacilitiesOptions.options
        .map((dt) => {
          return { value: `${dt.id}`, name: dt.name };
        })
        .sort((a, b) => sortOptions(a, b, tempSelectedFilters?.facility)),
      isLoading: medicalFacilitiesOptions.isLoading,
      isMultiple: true,
    },
  ];
}

export function generateHCFQueryParams(
  queries: Record<string, string | string[]>,
  hcfSlugs: Record<string, string> | undefined
) {
  const {
    hcfTypeSlug = "",
    citySlug = "",
    districtSlug = "",
    procedureId = "",
  } = {
    ...hcfSlugs,
    ...queries,
  };

  let newSlugs = [] as string[];

  if (hcfTypeSlug) {
    newSlugs = [...newSlugs, hcfTypeSlug as string];
    delete queries.hcfTypeSlug;
  }

  if (hcfTypeSlug == "") {
    delete queries.hcfTypeSlug;
  }

  if (citySlug) {
    newSlugs = [...newSlugs, citySlug as string];
    delete queries.citySlug;
  }

  if (citySlug && districtSlug) {
    newSlugs = [...newSlugs, districtSlug as string];
  }
  delete queries.districtSlug;

  if (procedureId) {
    newSlugs = [...newSlugs, procedureId as string];
    delete queries.procedureId;
  }

  return { ...queries, slugs: newSlugs, page: "1" };
}

export function validateHCFSSlugs(
  paramSlugs: string[],
  hcfSlugs: Record<string, string> | undefined
) {
  const hcfTypeSlug = HCF_TYPES.find((f) => f.slug == paramSlugs[0])?.slug;
  const validSlugs = [
    hcfTypeSlug,
    hcfSlugs?.citySlug,
    hcfSlugs?.districtSlug,
    hcfSlugs?.procedureId,
  ].filter(Boolean);
  const valid =
    paramSlugs.length == 0 ? true : validSlugs.length >= paramSlugs.length;
  return {
    valid,
    slugs: {
      hcfTypeSlug: (valid ? hcfTypeSlug || "" : paramSlugs[0]) || "",
      citySlug: (valid ? hcfSlugs?.citySlug || "" : paramSlugs[1]) || "",
      districtSlug:
        (valid ? hcfSlugs?.districtSlug || "" : paramSlugs[2]) || "",
      procedureId: (valid ? hcfSlugs?.procedureId || "" : paramSlugs[3]) || "",
    },
  };
}

function selectTranslatedSlug(slugs: TranslatedSlugCache) {
  return slugs.data;
}

export function useGetHCFListQuery(query: Record<string, string | string[]>) {
  const {
    q,
    slugs = [],
    page,
    perPage,
    partner,
    facility,
    lat,
    long,
    sort,
  } = query;

  const { data: location } = useGetMyLocation();
  const { data: hcpSlugs } = useGetTranslatedSlug(
    {
      featureName: "faskes",
      slugs: slugs as string[],
    },
    {
      select: selectTranslatedSlug,
      enabled: slugs.length > 0,
    }
  );

  const isValidSlugs = validateHCFSSlugs(slugs as string[], hcpSlugs);

  const { citySlug, districtSlug, procedureId, hcfTypeSlug } =
    isValidSlugs.slugs;

  return {
    page: (page as string) ?? "1",
    perPage: (perPage as string) ?? "16",
    userLat: (lat as string) ?? location?.lat ?? "",
    userLong: (long as string) ?? location?.long ?? "",
    query: (q as string) ?? "",
    procedureId,
    citySlug,
    districtSlug,
    partner: (partner as string) ?? "",
    medicalFacilityId: (facility as string) ?? "",
    hcfTypeSlug,
    sortBy: (sort as string) ?? "terdekat",
  };
}
