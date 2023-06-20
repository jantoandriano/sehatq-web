export interface RelatedDiseasesResponse {
  data: {
    id: number;
    slug: string;
    title: string;
    imageUrl: string;
    imageAlt: string;
    meta: string;
  }[];
}

export function modelRelatedDiseases(data: RelatedDiseasesResponse["data"]) {
  return data.map((disease) => ({
    ...disease,
    introduction: disease.meta,
  }));
}

export type RelatedDiseases = ReturnType<typeof modelRelatedDiseases>[0];
