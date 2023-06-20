import React from "react";
import { useNavigation } from "@sehatq/utils";
import {
  Text,
  Link,
  Grid,
  GridItem,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from "../../user-interfaces";

type RegionProps = {
  code: string;
  name: string;
  slug: string;
};

export type HealthCareProfessionalCityMobileProps = {
  cityData: (RegionProps & {
    district: RegionProps[];
  })[];
  specialitySlug?: string;
  specialityName?: string;
};

export function HealthCareProfessionalCityLinksMobile(
  props: HealthCareProfessionalCityMobileProps
) {
  const { cityData, specialitySlug, specialityName } = props;
  const { Navigate } = useNavigation();
  return (
    <Accordion bg="white" w="100%" allowToggle>
      <AccordionItem>
        <AccordionButton px={0} justifyContent="space-between">
          <Box>
            <Text fontSize="sm" fontWeight="semibold" fontFamily="poppins">
              Cari Dokter {specialityName} Berdasarkan Kota:
            </Text>
          </Box>
          <AccordionIcon width="20px" height="20px" marginLeft={2} />
        </AccordionButton>
        <AccordionPanel px={0}>
          <Grid templateColumns="repeat(2, 1fr)">
            {cityData.map((item) => (
              <GridItem key={item.code} lineHeight="none">
                <Navigate
                  name="HEALTH_CARE_PROFESIONAL"
                  query={{
                    slugs: specialitySlug
                      ? [specialitySlug, item.slug]
                      : [item.slug],
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
                    <Text as="h3">
                      Dokter {specialityName} di {item.name}
                    </Text>
                  </Link>
                </Navigate>
              </GridItem>
            ))}
          </Grid>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
