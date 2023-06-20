import { TranslatedSlugCache, useGetTranslatedSlug } from "../general";
import { useGetMyLocation } from "../profile";
import { validateHCPSSlugs } from "./health-care-professional-filters-helpers";

function selectTranslatedSlug(slugs: TranslatedSlugCache) {
  return slugs.data;
}

export function useGetHCPListQuery(query: Record<string, string | string[]>) {
  const {
    q,
    slugs = [],
    page,
    perPage,
    gender,
    schedule,
    lat,
    long,
    sort,
    hcfId,
    date,
  } = query;

  const { data: location } = useGetMyLocation();
  const { data: hcpSlugs } = useGetTranslatedSlug(
    {
      featureName: "dokter",
      slugs: slugs as string[],
    },
    {
      select: selectTranslatedSlug,
      enabled: slugs.length > 0,
    }
  );

  const isValidSlugs = validateHCPSSlugs(slugs as string[], hcpSlugs);

  const { citySlug, districtSlug, procedureId, specialitySlug } =
    isValidSlugs.slugs;

  return {
    page: (page as string) ?? "1",
    perPage: (perPage as string) ?? "9",
    userLat: (lat as string) ?? location?.lat ?? "",
    userLong: (long as string) ?? location?.long ?? "",
    query: (q as string) ?? "",
    procedureId,
    scheduleDayId: (schedule as string) ?? "",
    citySlug,
    districtSlug,
    gender: (gender as string) ?? "",
    hcfId: (hcfId as string) ?? "",
    specialitySlug,
    sortBy: (sort as string) ?? "terdekat",
    date,
  };
}
