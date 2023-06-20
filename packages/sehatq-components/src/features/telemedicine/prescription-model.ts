export interface DrugRecommendationResponse {
  data: {
    id: number;
    prescriptionNo: string;
    requestDate: string;
    lastUpdate: string;
    expiredAt: string;
    purchasedAt: string;
    status: string;
    redeemType: string;
    latestHistoryNotes: string;
    coId: number;
    coNumber: string;
    customerPrescriptionPdf: string;
    consultation: {
      id: number;
      startTime: string;
      endTime: string;
    };
    doctor: {
      name: string;
      specialist: string;
      image: string;
      registrationNumber: string;
    };
    customer: {
      name: string;
      phone: string;
      address: string;
      gender: string;
    };
    patient: {
      name: string;
      dob: string;
      gender: string;
      age: string;
    };
    merchant: {
      name: string;
      districtAddress: string;
    };
    prescriptionUrl: string[];
    products: {
      id: number;
      name: string;
      thumbUrl: string;
      qty: number;
      howToUse: string;
      dosage: string;
      notes: string;
      isReplacement: number;
    }[];
  };
}

export type CreateDrugRecommendationResponse = {
  data: {
    nextScreen: string;
  };
  meta: {
    message: string;
  };
};
