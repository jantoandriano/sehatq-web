export function isConsultationBusy(date: number | Date) {
  const waitingEnd = new Date(date).getTime();
  return new Date().getTime() >= waitingEnd;
}
