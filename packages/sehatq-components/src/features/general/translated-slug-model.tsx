export interface SlugTranslatorResponse {
  data: {
    feature: string;
    type: string;
    path: string;
    params: {
      city:
        | {
            code: string;
            name: string;
            slug: string;
          }
        | null
        | undefined;
      district:
        | {
            code: string;
            name: string;
            slug: string;
          }
        | null
        | undefined;
      category:
        | {
            id: number;
            slug: string;
          }
        | null
        | undefined;
      hcpSpeciality:
        | {
            id: number;
            slug: string;
          }
        | null
        | undefined;
      procedure:
        | {
            id: number;
            name: string;
            slug: string;
          }
        | null
        | undefined;
    };
  };
}

export function modelTranslatedSlug(
  params: SlugTranslatorResponse["data"]["params"]
) {
  return {
    specialitySlug: params.hcpSpeciality?.slug ?? "",
    citySlug: params.city?.slug ?? "",
    districtSlug: params.district?.slug ?? "",
    procedureId: params.procedure?.slug ?? "",
    categorySlug: params.category?.slug ?? "",
  };
}

export type TranslatedSlug = ReturnType<typeof modelTranslatedSlug>;
