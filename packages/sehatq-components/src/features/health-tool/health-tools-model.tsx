export interface HealthToolDataList {
  id: number;
  name: string;
  slug: string;
  title: string;
  description: string;
  iconUrl: string;
  type: "Native" | "Typeform";
}

export interface HealthToolDataScoreList {
  id: number;
  healthToolId: number;
  healthToolName: string;
  score: number;
  diagnosisName: string;
  diagnosisTitle: string;
  description: string;
  descriptionColor: string;
  createdAt: string;
}

export interface HealthToolsPagination {
  page: number;
  perPage: number;
  maxPage: number;
  total: number;
}
export interface HealthToolsFilter {
  dateRange: Array<{ label: string; value: string }>;
}

export interface HealthToolScoreListMeta {
  pagination: HealthToolsPagination;
  filters: HealthToolsFilter;
  healthTool: HealthToolDataList;
}
export interface HealthToolsMeta {
  pagination: HealthToolsPagination;
}

export interface HealthToolsResponse {
  meta: HealthToolsMeta;
  data: HealthToolDataList[];
}
export interface HealthToolScoreListResponse {
  meta: HealthToolScoreListMeta;
  data: HealthToolDataScoreList[];
}

export function modelHealthTools(data: HealthToolsResponse["data"]) {
  return data.map((dataHealthTools) => ({
    id: dataHealthTools.id,
    name: dataHealthTools.name,
    slug: dataHealthTools.slug,
    title: dataHealthTools.title,
    description: dataHealthTools.description,
    iconUrl: dataHealthTools.iconUrl,
    type: dataHealthTools.type,
  }));
}

export function modelHealthToolScoreList(
  data: HealthToolScoreListResponse["data"]
) {
  return data.map((dataHealthTools) => ({
    id: dataHealthTools.id,
    healthToolId: dataHealthTools.healthToolId,
    createdAt: dataHealthTools.createdAt,
    title: dataHealthTools.diagnosisName,
    description: dataHealthTools.description,
    descriptionColor: dataHealthTools.descriptionColor,
    healthToolName: dataHealthTools.healthToolName,
    healthToolScoreId: dataHealthTools.id,
  }));
}

export function modelMetaScoreList(meta: HealthToolScoreListResponse["meta"]) {
  return {
    healthTool: meta.healthTool,
    pagination: meta.pagination,
    filters: meta.filters,
  };
}

export type HealthTools = ReturnType<typeof modelHealthTools>[number];
export type HealthToolScores = ReturnType<
  typeof modelHealthToolScoreList
>[number];
