import { formatDate, parseToDate } from "@sehatq/utils";
export interface DiseaseReviewer {
  id: number;
  name: string;
  slug: string;
}
export interface DiseaseListResponse {
  meta: {
    featured: {
      id: number;
      path: string;
      slug: string;
      title: string;
      imageUrl: string;
      imageAlt: string;
      reviewedBy: DiseaseReviewer;
    }[];
    pagination: {
      total: number;
      page: number;
      current: number;
      perPage: number;
      maxPage: number;
      next: string;
      prev: string;
    };
    h1: string;
  };
  data: {
    id: number;
    path: string;
    slug: string;
    title: string;
    imageUrl: string;
    imageAlt: string;
  }[];
}

export interface DiseaseAuthor {
  id: number;
  name: string;
  slug: string;
  imageUrl: string;
  biograph: string;
}

export interface DiseaseCategory {
  id: number;
  name: string;
  slug: string;
}

export interface DiseaseImages {
  url: string;
  caption: string;
  alt: string;
}

export interface DiseaseAndDoctorTags {
  id: number;
  name: string;
  slug: string;
}
export interface DiseaseDetailResponse {
  data: {
    id: number;
    slug: string;
    title: string;
    shareUrl: string;
    reviewedBy: DiseaseReviewer;
    author: DiseaseAuthor;
    category: DiseaseCategory;
    date: string;
    updatedAt: string;
    images: DiseaseImages[];
    reference: string;
    introductionSubtitle: string;
    introduction: string;
    diagnosisSubtitle: string;
    diagnosis: string;
    causeSubtitle: string;
    cause: string;
    treatmentSubtitle: string;
    treatment: string;
    symptomSubtitle: string;
    symptom: string;
    whenSubtitle: string;
    when: string;
    preventionSubtitle: string;
    prevention: string;
    preparationSubtitle: string;
    preparation: string;
    doctorActionSubtitle: string;
    doctorAction: string;
    meta: string;
    bookmarked: string | number;
    tags: DiseaseAndDoctorTags[];
    doctorExpertises: DiseaseAndDoctorTags[];
    keyword: string;
    symptomSummary: string;
    diagnosisSummary: string;
    treatmentSummary: string;
    complication: string;
    risk: string;
    drug: string;
    visitDoctor: string;
  };
}

export function modelDiseaseList({ data, meta }: DiseaseListResponse) {
  return {
    meta,
    data,
  };
}

export function modelDiseaseDetail({ data }: DiseaseDetailResponse) {
  return {
    ...data,
    ...(data?.author
      ? data.author
      : {
          author: {
            id: 0,
            name: "Tim SehatQ",
            slug: "",
            imageUrl:
              "https://static.sehatq.com/web/assets/img/avatar-default.png?v=6",
            biograph:
              "We as a medical expert reviews every contents that's gonna publish in SehatQ to assure that everything come out from us is the most valid and the best health content you can find in Indonesia.",
          },
        }),
    date: data?.date
      ? formatDate(parseToDate(data.date, "yyyy-MM-dd HH:mm:ss"), "d MMM yyyy")
      : "",
    introductionSubtitle: `Pengertian ${data?.title.toLowerCase()}`,
    symptomSubtitle: `Tanda dan gejala ${data?.title.toLowerCase()}`,
    causeSubtitle: `Penyebab ${data?.title.toLowerCase()}`,
    diagnosisSubtitle: `Diagnosis ${data?.title.toLowerCase()}`,
    treatmentSubtitle: `Cara mengobati ${data?.title.toLowerCase()}`,
    preventionSubtitle: `Cara mencegah ${data?.title.toLowerCase()}`,
  };
}

export type DiseaseDetail = ReturnType<typeof modelDiseaseDetail>;
