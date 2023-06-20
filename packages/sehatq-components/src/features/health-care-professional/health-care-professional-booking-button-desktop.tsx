import { useNavigation } from "@sehatq/utils";
import React from "react";
import { Button, Link, Skeleton } from "../../user-interfaces";

export type HCPBookingButtonDesktopProps = {
  queries?: Record<string, string>;
};

export function HCPBookingButtonDesktop(props: HCPBookingButtonDesktopProps) {
  const { queries } = props;
  const { Navigate } = useNavigation();
  return queries ? (
    <Navigate name="BOOKING_ONLINE" query={queries}>
      <Link
        variant="solid"
        width="300px"
        height="50px"
        background="main.500"
        fontSize="md"
        fontWeight="semibold"
        borderRadius="base"
      >
        Booking
      </Link>
    </Navigate>
  ) : (
    <Button
      disabled={true}
      variant="solid"
      width="300px"
      height="50px"
      background="main.500"
      fontSize="md"
      fontWeight="semibold"
      borderRadius="base"
    >
      Booking
    </Button>
  );
}

export function HCPBookingButtonDesktopSkeleton() {
  return <Skeleton width="300px" height="50px" borderRadius="base" />;
}
