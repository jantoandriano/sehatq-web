import React from "react";
import { useNavigation } from "@sehatq/utils";
import {
  Link,
  Text,
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

export type HealthCareProfessionalCityDesktopProps = {
  cityData: (RegionProps & {
    district: RegionProps[];
  })[];
  specialitySlug?: string;
  specialityName?: string;
};

export function HealthCareProfessionalCityLinksDesktop(
  props: HealthCareProfessionalCityDesktopProps
) {
  const { cityData, specialitySlug, specialityName } = props;
  const { Navigate } = useNavigation();
  return (
    <Accordion bg="white" w="100%" allowToggle>
      <AccordionItem border="none">
        <AccordionButton
          px={0}
          _hover={{ backgroundColor: "transparent" }}
          _focus={{ boxShadow: "none" }}
        >
          <Box>
            <Text fontSize="sm" fontWeight="semibold" fontFamily="poppins">
              Cari Dokter {specialityName} Berdasarkan Kota:
            </Text>
          </Box>
          <AccordionIcon width="20px" height="20px" marginLeft={2} />
        </AccordionButton>
        <AccordionPanel px={0}>
          <Grid templateColumns="repeat(3, 1fr)">
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
                    fontWeight="semibold"
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
