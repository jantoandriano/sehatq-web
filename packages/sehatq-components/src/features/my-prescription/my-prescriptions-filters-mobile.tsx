import React from "react";
import { useNavigation } from "@sehatq/utils";
import { Slider, Link } from "../../user-interfaces";
import { PrescriptionStatusFlag } from "../prescription";

export type MyPrescriptionsFiltersMobileProps = {
  statusFlag: PrescriptionStatusFlag | "";
  myPrescriptionsFiltersByStatus: {
    id: string;
    name: number;
    statuses: string[];
  }[];
};

export function MyPrescriptionsFiltersMobile(
  props: MyPrescriptionsFiltersMobileProps
) {
  const { statusFlag, myPrescriptionsFiltersByStatus } = props;
  const { Navigate } = useNavigation();
  return (
    <>
      {myPrescriptionsFiltersByStatus?.length ? (
        <Slider
          slides={myPrescriptionsFiltersByStatus}
          slideGap={2.5}
          startSlideIndex={myPrescriptionsFiltersByStatus.findIndex(
            (myPrescriptionsStatus) => myPrescriptionsStatus.id === statusFlag
          )}
          hideArrowButton
          renderSlide={({ slide: myPrescriptionsStatus }) => (
            <Navigate
              name="PROFILE_PRESCRIPTIONS"
              query={{ statusFlag: myPrescriptionsStatus.id }}
            >
              <Link
                variant="chip"
                colorScheme="paleBlue"
                size="xs"
                isActive={statusFlag === myPrescriptionsStatus.id}
                height="24px"
                fontWeight="semibold"
              >
                {myPrescriptionsStatus.name}
              </Link>
            </Navigate>
          )}
        />
      ) : null}
    </>
  );
}
