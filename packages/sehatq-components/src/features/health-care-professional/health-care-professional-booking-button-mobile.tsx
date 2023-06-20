import { useNavigation } from "@sehatq/utils";
import React from "react";
import { Box, Button, Link, Skeleton } from "../../user-interfaces";

export type HCPBookingButtonMobileProps = {
  queries?: Record<string, string>;
};

export function HCPBookingButtonMobile(props: HCPBookingButtonMobileProps) {
  const { queries } = props;
  const { Navigate } = useNavigation();
  return (
    <Box position="sticky" bottom="0" p={4} background="white">
      {queries ? (
        <Navigate name="BOOKING_ONLINE" query={queries}>
          <Link
            variant="solid"
            width="full"
            height="10"
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
          width="full"
          height="10"
          background="main.500"
          fontSize="md"
          fontWeight="semibold"
          borderRadius="base"
        >
          Booking
        </Button>
      )}
    </Box>
  );
}

export function HCPBookingButtonMobileSkeleton() {
  return (
    <Box position="sticky" bottom="0" p={4} background="white">
      <Skeleton width="full" height="10" borderRadius="base" />
    </Box>
  );
}
