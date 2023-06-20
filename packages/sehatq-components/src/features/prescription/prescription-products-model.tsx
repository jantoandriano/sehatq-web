export interface PrescriptionProducts {
  id: number;
  name: string;
  thumbUrl: string;
  qty: number;
  howToUse: string;
  dosage: string;
  notes: string;
  isReplacement: number;
}

export interface PrescriptionProductsResponse {
  data: PrescriptionProducts[];
}

export function modelPrescriptionProducts(
  data: PrescriptionProductsResponse["data"]
) {
  return data.map((item) => {
    return {
      ...item,
    };
  });
}

export type ModelPrescriptionProducts = ReturnType<
  typeof modelPrescriptionProducts
>[number];
