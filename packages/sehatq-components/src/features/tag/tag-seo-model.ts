export interface TagSEOResponse {
  data: {
    id: number;
    domain: string;
    slug: string;
    metaTitle: string;
    metaDescription: string;
    keywords: string;
    contentTitle: string;
    contentDescription: string;
  };
}

export function modelTagSEO(data: TagSEOResponse["data"]) {
  const {
    slug,
    metaTitle,
    metaDescription,
    keywords,
    contentTitle,
    contentDescription,
  } = data;
  return {
    slug,
    metaTitle: metaTitle ?? "",
    metaDescription: metaDescription ?? "",
    keywords: keywords ?? "",
    contentTitle: contentTitle ?? "",
    contentDescription: contentDescription ?? "",
  };
}

export type TagSEO = ReturnType<typeof modelTagSEO>;
