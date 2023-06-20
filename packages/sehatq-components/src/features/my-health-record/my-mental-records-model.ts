import { formatDate, parseToDate } from "@sehatq/utils";

export interface MyMentalRecordsPagination {
  page: number;
  perPage: number;
  maxPage: number;
  total: number;
}

export interface MyMentalRecordsDateRangeData {
  label: string;
  value: string;
}
export interface MyMentalRecordFilterResponse {
  dateRange: MyMentalRecordsDateRangeData[];
}

export interface MyMentalRecordsMeta {
  pagination: MyMentalRecordsPagination;
  filters: MyMentalRecordFilterResponse;
}

export interface MyMentalRecordsData {
  id: number;
  mentalScore: number;
  diagnosisName: string;
  description: string;
  recommendation: string;
  iconUrl: string;
  createdAt: string;
}

export interface MyMentalRecordsResponse {
  meta: MyMentalRecordsMeta;
  data: MyMentalRecordsData[];
}

export function modelMyMentalRecords(data: MyMentalRecordsResponse["data"]) {
  return data.map((myMentalRecord) => ({
    id: myMentalRecord.id,
    mentalScore: myMentalRecord.mentalScore,
    diagnosisName: myMentalRecord.diagnosisName,
    description: myMentalRecord.description,
    recommendation: myMentalRecord.recommendation,
    iconUrl: myMentalRecord.iconUrl,
    createdAt: formatDate(
      parseToDate(myMentalRecord.createdAt, "iso"),
      "d MMM yyyy"
    ),
  }));
}

export function modelMetaMyMentalRecords(
  meta: MyMentalRecordsResponse["meta"]
) {
  return {
    filter: {
      dateRange:
        meta.filters?.dateRange?.map(
          (dateRange: MyMentalRecordsDateRangeData) => ({
            id: dateRange.value,
            label: dateRange.label,
          })
        ) ?? [],
    },
    pagination: meta.pagination,
  };
}

export type MyMentalRecords = ReturnType<typeof modelMyMentalRecords>[number];
export type MetaMyMentalRecords = ReturnType<typeof modelMetaMyMentalRecords>;

export type RemoveMyMentalHealthRecordResponse = {
  data: null;
  meta: {
    message: string;
  };
};
