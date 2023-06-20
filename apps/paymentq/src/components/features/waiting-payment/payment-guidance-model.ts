type PaymentGuidanceData = {
  id: string;
  title: string;
  description: string;
  paymentMethodId: string;
  paymentMethodName: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
};

export type PaymentGuidanceResponse = {
  data: PaymentGuidanceData[];
};

export function modelPaymentGuidance(data: PaymentGuidanceData[]) {
  return data.map((val: PaymentGuidanceData) => ({
    id: val.id || "",
    title: val.title || "",
    description: val.description || "",
  }));
}
