import React from "react";
import { addDays } from "date-fns";
import { formatDate, useNavigation } from "@sehatq/utils";

import {
  Button,
  ChevronDownIcon,
  DatePicker,
  FormControl,
  FormLabel,
  Link,
  Text,
  useImage,
  VStack,
  Grid,
  GridItem,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  DrawerHeader,
  Skeleton,
} from "../../user-interfaces";
import { RelatedHealthCareFacilityHCPSearchGeneralProps } from "./related-health-care-facility-hcp-search-desktop";

export type RelatedHealthCareFacilityHCPSearchMobileProps =
  RelatedHealthCareFacilityHCPSearchGeneralProps;

export function RelatedHealthCareFacilityHCPSearchMobile(
  props: RelatedHealthCareFacilityHCPSearchMobileProps
) {
  const { Navigate } = useNavigation();
  const Image = useImage();
  const { values, onChangeInput } = props;

  return (
    <VStack spacing={4} align="start">
      <Text
        fontSize="sm"
        color="charcoalGrey"
        fontWeight="semibold"
        fontFamily="poppins"
      >
        Temukan Dokter dari Faskes ini
      </Text>
      <FormControl variant="floating">
        <Button
          variant="outline"
          colorScheme="whiteAlpha"
          borderRadius="base"
          height="40px"
          width="full"
          fontWeight="normal"
          fontSize="sm"
          borderColor="veryLightPink"
          color={!values?.speciality ? "veryLightPink" : "charcoalGrey"}
          textAlign="left"
          background="white"
          _hover={{
            borderColor: "main.500",
          }}
          rightIcon={<ChevronDownIcon color="brownGrey.500" />}
          {...(values?.speciality
            ? {
                value: values?.speciality.value,
              }
            : null)}
          justifyContent="space-between"
          onClick={props.onShowHideSpecialities}
        >
          {values?.speciality?.label ?? "Pilih Spesialisasi"}
        </Button>
        <Drawer
          placement="bottom"
          onClose={props.onShowHideSpecialities}
          isOpen={props.showSpecialities}
        >
          <DrawerOverlay zIndex="modal" />
          <DrawerContent zIndex="popover" borderTopRadius="lg">
            <DrawerHeader>
              <Text fontSize="sm" fontWeight="semibold" fontFamily="poppins">
                Temukan Dokter dari Faskes ini
              </Text>
            </DrawerHeader>
            <DrawerBody>
              <Grid templateColumns="repeat(3, 1fr)" gap={1}>
                {props.specialities.length > 0 &&
                  props.specialities.map((speciality) => (
                    <GridItem key={speciality.value}>
                      <VStack
                        cursor="pointer"
                        onClick={() => onChangeInput("speciality", speciality)}
                      >
                        <Image
                          width={60}
                          height={60}
                          layout="fixed"
                          src={speciality.imageUrl}
                          alt={`${speciality.value}-icon`}
                        />
                        <Text
                          color="charcoalGrey"
                          marginLeft="2"
                          pb="2"
                          fontSize="sm"
                          align="center"
                        >
                          {speciality.label}
                        </Text>
                      </VStack>
                    </GridItem>
                  ))}
              </Grid>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
        <FormLabel>
          {values?.speciality ? "Spesialisasi" : "Pilih Spesialisasi"}
        </FormLabel>
      </FormControl>
      <FormControl variant="floating">
        <DatePicker
          isMobile
          variant="input"
          value={values?.date}
          onChange={(value) => onChangeInput("date", value)}
          inputProps={{
            boxShadow: "none",
            fontSize: "sm",
            disabled: !values?.speciality,
          }}
          placeholder="Tanggal"
          pickerProps={{
            disabled: [
              {
                before: addDays(new Date(), 1),
              },
              {
                dayOfWeek: props.disableDays,
              },
            ],
          }}
        />
        <FormLabel>Tanggal</FormLabel>
      </FormControl>
      <Navigate
        name="HEALTH_CARE_PROFESIONAL"
        query={{
          ...(values?.speciality ? { slugs: [values?.speciality.slug] } : null),
          hcfId: props.hcfId,
          ...(values?.date
            ? { date: formatDate(values?.date, "yyyy-MM-dd") }
            : null),
        }}
      >
        <Link
          variant="solid"
          background="main.500"
          fontSize="sm"
          fontWeight="semibold"
          width="full"
          borderRadius="base"
        >
          Lihat Jadwal Dokter
        </Link>
      </Navigate>
      <Navigate name="HEALTH_CARE_PROFESIONAL" query={{ hcfId: props.hcfId }}>
        <Link
          color="sea.500"
          fontSize="sm"
          fontWeight="semibold"
          width="full"
          borderRadius="base"
        >
          Lihat Semua Dokter
        </Link>
      </Navigate>
    </VStack>
  );
}

export function RelatedHealthCareFacilityHCPSearchMobileSkeleton() {
  return (
    <VStack spacing={4} align="start">
      <Text
        fontSize="sm"
        color="charcoalGrey"
        fontWeight="semibold"
        fontFamily="poppins"
      >
        Temukan Dokter dari Faskes ini
      </Text>
      <Skeleton width="full" borderRadius="base" height="40px" />
      <Skeleton width="full" borderRadius="base" height="40px" />
      <Skeleton width="full" borderRadius="base" height="40px" />
      <Skeleton width="full" borderRadius="base" height="40px" />
    </VStack>
  );
}
