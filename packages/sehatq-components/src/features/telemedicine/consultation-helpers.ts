import { parseToDate } from "@sehatq/utils";
import { MyLatestTelemedicineCache } from "../profile/my-telemedicine-queries";

export function checkActiveConsultation(cache: MyLatestTelemedicineCache) {
  const isPaid = cache.payment === null || cache.payment.status === "paid";
  return (
    cache.status === "active" ||
    (cache.status === "closed" && cache.screen === "rating" && !cache.rated) ||
    (cache.status === "pending" && isPaid && !cache.booking) ||
    (cache.status === "pending" &&
      isPaid &&
      cache.booking &&
      parseToDate(
        cache.booking.bookingStartAt,
        "yyyy-MM-dd HH:mm:ss"
      ).getTime() <= new Date().getTime() &&
      parseToDate(
        cache.booking.bookingEndAt,
        "yyyy-MM-dd HH:mm:ss"
      ).getTime() >= new Date().getTime())
  );
}
