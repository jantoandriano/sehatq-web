import { parseToDate } from "@sehatq/utils";
import { useEffect, useState } from "react";

export type SetTimerParam = { hours: number; minutes: number; seconds: number };

export function useGetHourMinSec(serverTime: string, expiredTime: string) {
  const [currentCount, setCurrentCount] = useState(0);
  const [expired, setExpired] = useState(false);

  function setTimer({ hours, minutes, seconds }: SetTimerParam) {
    return {
      hours: String(hours).padStart(2, "0"),
      minutes: String(minutes).padStart(2, "0"),
      seconds: String(seconds).padStart(2, "0"),
    };
  }

  useEffect(() => {
    const server = parseToDate(
      serverTime ?? "",
      "yyyy-MM-dd HH:mm:ss"
    ).getTime();
    const expired = parseToDate(expiredTime ?? "", "iso").getTime();
    const startCount = expired - server;
    setCurrentCount(startCount > 0 ? +startCount : 0);
  }, [serverTime, expiredTime]);

  useEffect(() => {
    const timerInterval = setInterval(function () {
      if (currentCount > 0) {
        setCurrentCount(currentCount - 1000);
      } else {
        setExpired(!expired);
        setCurrentCount(0);
        clearTimeout(timerInterval);
      }
    }, 1000);

    return () => {
      clearTimeout(timerInterval);
    };
  }, [currentCount]);

  return {
    ...setTimer({
      hours: Math.floor(
        (currentCount % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      ),
      minutes: Math.floor((currentCount % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((currentCount % (1000 * 60)) / 1000),
    }),
    expired,
  };
}
