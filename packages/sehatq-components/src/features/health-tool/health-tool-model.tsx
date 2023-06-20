export interface HealthToolDetailResponse {
  data: {
    id: number;
    formCode: string;
    name: string;
    slug: string;
    title: string;
    description: string;
    iconUrl: string;
    priority: string;
    type: string;
    sectionPageTitle: string;
    info: string;
    userPageButtonText: string;
    typeform?: {
      backgroundImage: string;
      backgroundImageMobile: string;
      leftImage: string;
      leftImageUrl: string;
      rightImage: string;
      rightImageUrl: string;
      detailPageButtonText: string;
      resultItems: {
        id: number;
        name: string;
        title: string;
        scoreMin: number;
        scoreMax: number;
        description: string;
        descriptionColor: string;
        recommendation: string;
        recommendationSlug: string;
        recommendationButtonText: string;
        imageUrl: string;
      }[];
    };
  };
}

export interface HealthToolSEOResponse {
  data: {
    id: number;
    domain: string;
    slug: string;
    metaTitle: string;
    metaDescription: string;
    keywords: string;
    contentTitle: string;
    contentDescription: string;
    accordions: {
      title: string;
      description: string;
    }[];
  };
}

export interface HealthToolRecordDetailResponse {
  data: {
    id: number;
    healthToolName: string;
    iconUrl: string;
    diagnosisTitle: string;
    descriptionColor: string;
    diagnosisName: string;
    description: string;
    recommendation: string;
    recommendationSlug: string;
    recommendationButtonText: string;
  };
}

export function modelHealthToolRecordDetail(
  data: HealthToolRecordDetailResponse["data"]
) {
  return {
    id: data.id || 0,
    healthToolName: data.healthToolName || "",
    iconUrl: data.iconUrl || "",
    diagnosisTitle: data.diagnosisTitle || "",
    descriptionColor: data.descriptionColor || "black",
    diagnosisName: data.diagnosisName || "",
    description: data.description || "",
    recommendation: data.recommendation || "",
    recommendationSlug: data.recommendationSlug || "",
    recommendationButtonText: data.recommendationButtonText || "Click here",
  };
}

export function modelHealthToolDetail({ data }: HealthToolDetailResponse) {
  return {
    id: data.id,
    formCode: data.formCode,
    name: data.name,
    slug: data.slug,
    title: data.title,
    description: data.description,
    iconUrl: data.iconUrl,
    priority: data.priority,
    type: data.type,
    sectionPageTitle: data.sectionPageTitle,
    info: data.info,
    userPageButtonText: data.userPageButtonText,
    typeform: data.typeform,
  };
}

export function modelHealthToolSEO(data: HealthToolSEOResponse["data"]) {
  const {
    slug,
    metaTitle,
    metaDescription,
    keywords,
    contentTitle,
    contentDescription,
    accordions,
  } = data;
  return {
    slug,
    metaTitle,
    metaDescription,
    keywords,
    contentTitle,
    contentDescription,
    accordions,
  };
}

export type RemoveHealthToolScoreResponse = {
  data: null;
  meta: {
    message: string;
  };
};
