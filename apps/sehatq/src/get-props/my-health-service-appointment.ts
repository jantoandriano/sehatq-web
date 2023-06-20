export type MyHealthServiceAppointmentParams = {
  userId: string;
  bookingId: string;
  cookie: string;
};

export async function getMyHealthServiceAppointmentProps(
  arg: MyHealthServiceAppointmentParams & { isMobile: boolean }
) {
  const { userId = "", bookingId = "", isMobile } = arg;
  return { userId, bookingId, isMobile };
}
