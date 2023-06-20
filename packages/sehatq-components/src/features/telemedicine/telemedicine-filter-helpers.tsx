import { ASSETS } from "@sehatq/constants";

export type FilterKeys =
  | "specialitySlug"
  | "price"
  | "city"
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
}) {
  const {
    tempSelectedFilters,
    specialityOptions,
    citiesOptions,
    genderOptions,
    priceOptions,
    experiencesOptions,
  } = props;

  return [
    {
      filterKey: "specialitySlug" as const,
      filterName: "Spesialisasi",
      selectedValue: tempSelectedFilters?.specialitySlug ?? "",
      selectedName: tempSelectedFilters?.specialitySlug
        ? specialityOptions.options.find(
            (ft) => ft.slug == tempSelectedFilters?.specialitySlug
          )?.name ?? ""
        : "Semua",
      showSearch: true,
      options: [
        { value: "", name: "Semua", iconUrl: ASSETS.ALL_MENU },
        ...specialityOptions.options
          .map((dt) => {
            return { value: dt.slug, name: dt.name, iconUrl: dt.iconUrl };
          })
          .sort((a, b) =>
            sortOptions(a, b, tempSelectedFilters?.specialitySlug)
          ),
      ],
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
  ];
}

export function generateTelemedicineFilterQueryParams(
  queries: Record<string, string | string[]>
) {
  if (queries.campaignSlug) {
    delete queries.campaignSlug;
  }

  return { ...queries, page: "1" };
}

export function getQuickFilterKey(paramName: string) {
  switch (paramName) {
    case "specialityId":
      return "specialitySlug";
    case "price":
      return "price";
    default:
      return "sort";
  }
}
