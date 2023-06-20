export interface MyAppointmentCancelationOptionsResponse {
  data: {
    id: number;
    name: string;
  }[];
}

export function modelMyAppointmentCancelationOptions(
  data: MyAppointmentCancelationOptionsResponse["data"]
) {
  return data.map((item) => {
    return {
      id: item.id,
      name: item.name,
    };
  });
}
