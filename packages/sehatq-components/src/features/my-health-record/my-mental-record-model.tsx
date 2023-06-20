import { formatDate, parseToDate } from "@sehatq/utils";

export interface MyMentalRecordDetail {
  id: number;
  mentalScore: number;
  diagnosisName: string;
  description: string;
  recommendation: string;
  iconUrl: string;
  createdAt: string;
}

export interface MyMentalRecordResponse {
  data: MyMentalRecordDetail;
}

export function modelMyMentalRecord(
  myMentalRecord: MyMentalRecordResponse["data"]
) {
  return {
    id: myMentalRecord.id,
    mentalScore: myMentalRecord.mentalScore,
    diagnosisName: myMentalRecord.diagnosisName,
    telemedSpecialityId:
      myMentalRecord.diagnosisName === "Depresi Berat" ||
      myMentalRecord.diagnosisName === "Depresi Sedang Berat"
        ? "13"
        : "23",
    description: myMentalRecord.description,
    recommendation: myMentalRecord.recommendation,
    iconUrl: myMentalRecord.iconUrl,
    createdAt: formatDate(
      parseToDate(myMentalRecord.createdAt, "iso"),
      "d MMM yyyy"
    ),
  };
}

export type MyMentalRecord = ReturnType<typeof modelMyMentalRecord>;
