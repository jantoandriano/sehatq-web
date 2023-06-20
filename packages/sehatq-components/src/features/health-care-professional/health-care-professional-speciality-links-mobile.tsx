import React from "react";
import { useNavigation } from "@sehatq/utils";
import { Text, Link, Grid, GridItem, Box } from "../../user-interfaces";

import { HCPSpecialityLink } from "./health-care-professional-speciality-model";

export type HealthCareProfessionalSpecialityMobileProps = {
  specialityLink: HCPSpecialityLink;
};

export function HealthCareProfessionalSpecialityLinksMobile(
  props: HealthCareProfessionalSpecialityMobileProps
) {
  const { specialityLink } = props;
  const { Navigate } = useNavigation();
  return (
    <Box width="full">
      <Text
        fontSize="sm"
        fontWeight="semibold"
        marginBottom={2}
        fontFamily="poppins"
      >
        Cari Dokter berdasarkan kategori
      </Text>
      <Grid templateColumns="repeat(2, 1fr)">
        {specialityLink.map((item) => (
          <GridItem key={item.id} lineHeight="none">
            <Navigate
              name="HEALTH_CARE_PROFESIONAL"
              query={{
                slugs: [item.slug],
              }}
              options={{ shallow: true, scroll: true }}
            >
              <Link
                minW="auto"
                color="main.500"
                fontSize="xs"
                _hover={{
                  textDecoration: "none",
                  color: "charcoalGrey",
                }}
              >
                {item.name}
              </Link>
            </Navigate>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
}
