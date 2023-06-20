export interface RelatedForumsResponse {
  data: {
    id: number;
    title: string;
    slug: string;
    answeredBy: string;
  }[];
}

export function modelRelatedForums(data: RelatedForumsResponse["data"]) {
  return data;
}

export type RelatedForums = ReturnType<typeof modelRelatedForums>[0];
