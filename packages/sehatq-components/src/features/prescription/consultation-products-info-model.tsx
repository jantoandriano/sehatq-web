export interface ConsultationProductInfo {
  productId: number;
  name: string;
  quantity: number;
  medicationTimeKey: string;
  medicationTimeName: string;
  dosageDaily: string;
  dosageValue: string;
  dosageTypeKey: string;
  dosageTypeName: string;
  note: string;
}

export interface ConsultationProductsInfoResponse {
  data: ConsultationProductInfo[];
}

export function modelConsultationProductsInfo(
  data: ConsultationProductsInfoResponse["data"]
) {
  return data.map((item) => ({
    id: item.productId,
    name: item.name,
  }));
}

export type ConsultationProductsInfo = ReturnType<
  typeof modelConsultationProductsInfo
>;
