export interface PopularTagsResponse {
  data: {
    query: string;
    totalHits: number;
  }[];
}

function modelPopularTag(data: PopularTagsResponse["data"][number]) {
  return {
    name: data.query,
    totalHits: data.totalHits,
  };
}

export function modelPopularTags(data: PopularTagsResponse["data"]) {
  return data.map(modelPopularTag);
}
