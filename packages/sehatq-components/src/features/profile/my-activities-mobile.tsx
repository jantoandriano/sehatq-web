import React from "react";
import { Box, HStack, Text } from "../../user-interfaces";
import {
  MyTelemedicineBanner,
  MyTelemedicineBannerProps,
} from "./my-telemedicine-banner";

export interface MyActivitiesMobileProps {
  isMobile: boolean;
  telemedicineItems?: Array<Omit<MyTelemedicineBannerProps, "isMobile">>;
}

export function MyActivitiesMobile(props: MyActivitiesMobileProps) {
  const { telemedicineItems, isMobile } = props;
  return (
    <>
      <Text fontFamily="poppins" fontWeight="semibold" fontSize="lg" px={4}>
        Aktivitas
      </Text>
      <HStack whiteSpace="nowrap" overflow="auto hidden" spacing={3}>
        {telemedicineItems?.map((item, index) => (
          <Box
            minWidth={52}
            ml={index === 0 ? 4 : 0}
            mr={index === telemedicineItems.length - 1 ? 4 : 0}
            key={item.id}
            py={3}
            whiteSpace="normal"
          >
            <MyTelemedicineBanner isMobile={isMobile} {...item} />
          </Box>
        ))}
      </HStack>
    </>
  );
}
