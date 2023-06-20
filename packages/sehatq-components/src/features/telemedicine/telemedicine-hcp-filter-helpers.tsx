export type FilterKeys =
  | "specialitySlug"
  | "price"
  | "city"
  | "campaignSlug"
  | "doctorExperience"
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
  specialityOptions: {
    options: {
      id: number;
      name: string;
      iconUrl: string;
      slug: string;
    }[];
    isLoading?: boolean;
  };
  citiesOptions: {
    options: {
      id: string;
      name: string;
    }[];
    isLoading?: boolean;
  };
  genderOptions: {
    options: {
      id: string;
      name: string;
    }[];
    isLoading?: boolean;
  };
  priceOptions: {
    options: {
      id: string;
      name: string;
    }[];
    isLoading?: boolean;
  };
  experiencesOptions: {
    options: {
      id: string;
      name: string;
    }[];
    isLoading?: boolean;
  };
  campaignsOptions: {
    options: {
      id: string;
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
    priceOptions,
    experiencesOptions,
    campaignsOptions,
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
          return { value: dt.slug, name: dt.name, iconUrl: dt.iconUrl };
        })
        .sort((a, b) => sortOptions(a, b, tempSelectedFilters?.specialitySlug)),
      isLoading: specialityOptions.isLoading,
    },
    {
      filterKey: "price" as const,
      filterName: "Harga",
      selectedValue: tempSelectedFilters?.price ?? "",
      selectedName:
        priceOptions.options.find((ft) => ft.id == tempSelectedFilters?.price)
          ?.name ?? "",
      showSearch: false,
      options: priceOptions.options
        .map((dt) => {
          return { value: dt.id, name: dt.name };
        })
        .sort((a, b) => sortOptions(a, b, tempSelectedFilters?.price)),
      isLoading: priceOptions.isLoading,
    },
    {
      filterKey: "doctorExperience" as const,
      filterName: "Pengalaman",
      selectedValue: tempSelectedFilters?.doctorExperience ?? "",
      selectedName:
        experiencesOptions.options.find(
          (ft) => ft.id == tempSelectedFilters?.doctorExperience
        )?.name ?? "",
      showSearch: false,
      options: experiencesOptions.options
        .map((dt) => {
          return { value: dt.id, name: dt.name };
        })
        .sort((a, b) =>
          sortOptions(a, b, tempSelectedFilters?.doctorExperience)
        ),
      isLoading: experiencesOptions.isLoading,
    },
    {
      filterKey: "city" as const,
      filterName: "Lokasi",
      selectedValue: tempSelectedFilters?.city ?? "",
      selectedName:
        citiesOptions.options.find((ft) => ft.name == tempSelectedFilters?.city)
          ?.name ?? "",
      options: citiesOptions.options
        .map((dt) => {
          return { value: dt.name, name: dt.name };
        })
        .sort((a, b) => sortOptions(a, b, tempSelectedFilters?.city)),
      showSearch: true,
      isLoading: citiesOptions.isLoading,
    },
    {
      filterKey: "gender" as const,
      filterName: "Jenis Kelamin",
      selectedValue: tempSelectedFilters?.gender ?? "",
      selectedName:
        genderOptions.options.find((ft) => ft.id == tempSelectedFilters?.gender)
          ?.name ?? "",
      showSearch: false,
      options: genderOptions.options
        .map((dt) => {
          return { value: dt.id, name: dt.name };
        })
        .sort((a, b) => sortOptions(a, b, tempSelectedFilters?.gender)),
      isLoading: genderOptions.isLoading,
    },
    {
      filterKey: "campaignSlug" as const,
      filterName: "Promo",
      selectedValue: tempSelectedFilters?.campaignSlug ?? "",
      selectedName:
        campaignsOptions.options.find(
          (ft) => ft.id == tempSelectedFilters?.campaignSlug
        )?.name ?? "",
      showSearch: true,
      options: campaignsOptions.options
        .map((dt) => {
          return { value: dt.id, name: dt.name };
        })
        .sort((a, b) => sortOptions(a, b, tempSelectedFilters?.campaignSlug)),
      isLoading: campaignsOptions.isLoading,
    },
  ];
}

export function generateDoctorsQueryParams(
  queries: Record<string, string | string[]>
) {
  const { specialitySlug = "" } = {
    ...queries,
  };

  let newSlugs = [] as string[];

  if (specialitySlug) {
    newSlugs = [...newSlugs, specialitySlug as string];
    delete queries.specialitySlug;
    return { ...queries, slugs: newSlugs, page: "1" };
  } else {
    return { ...queries, page: "1" };
  }
}

export function getQuickFilterKey(paramName: string) {
  switch (paramName) {
    case "specialityId":
      return "slugs";
    case "price":
      return "price";
    default:
      return "sort";
  }
}
