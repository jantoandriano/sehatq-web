import React from "react";
import { useNavigation } from "@sehatq/utils";
import { Slider, Link } from "../../user-interfaces";
import { PrescriptionStatusFlag } from "../prescription";

export type MyPrescriptionsFiltersDesktopProps = {
  statusFlag: PrescriptionStatusFlag | "";
  myPrescriptionsFiltersByStatus: {
    id: string;
    name: number;
    statuses: string[];
  }[];
};

export function MyPrescriptionsFiltersDesktop(
  props: MyPrescriptionsFiltersDesktopProps
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
          renderSlide={({ slide: myPrescriptionsStatus }) => (
            <Navigate
              name="PROFILE_PRESCRIPTIONS"
              query={{ statusFlag: myPrescriptionsStatus.id }}
            >
              <Link
                variant="chip"
                colorScheme="paleBlue"
                size="md"
                fontSize="sm"
                fontWeight="semibold"
                height="36px"
                isActive={statusFlag === myPrescriptionsStatus.id}
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
