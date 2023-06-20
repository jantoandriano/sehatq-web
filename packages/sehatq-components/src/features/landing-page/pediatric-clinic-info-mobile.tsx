import React, { Dispatch, SetStateAction } from "react";

import {
  Box,
  useImage,
  Text,
  Flex,
  Skeleton,
  SkeletonText,
  Button,
  HStack,
} from "../../user-interfaces";

export type PediatricClinicInfoMobileProps = {
  tabs: {
    id: number;
    label: string;
    title: string;
    subTitle: string;
    image: string;
  }[];
  stateTab: number;
  setStateTab: Dispatch<SetStateAction<number>>;
};

export function PediatricClinicInfoMobile(
  props: PediatricClinicInfoMobileProps
) {
  const { tabs, stateTab, setStateTab } = props;
  const Image = useImage();

  return (
    <Box>
      <HStack spacing={1} mb="35px" wrap="wrap">
        {tabs.map((tab) => (
          <Button
            {...(tab.id === stateTab
              ? { color: "white" }
              : { variant: "ghost", color: "charcoalGrey" })}
            onClick={() => setStateTab(tab.id)}
            key={tab.id}
            h="40px"
            w="82px"
            fontFamily="poppins"
            fontSize="sm"
            borderRadius="12px"
            fontWeight="semibold"
          >
            {tab.label}
          </Button>
        ))}
      </HStack>
      {tabs.map((tab) => {
        if (tab.id === stateTab) {
          return (
            <React.Fragment key={tab.id}>
              <Flex justifyContent="center" marginBottom={4}>
                <Image
                  priority
                  src={tab.image}
                  alt="Klinik Online Spesialis Anak"
                  height={145}
                  width={133}
                  layout="fixed"
                />
              </Flex>
              <Text
                fontSize="24px"
                fontFamily="poppins"
                color="charcoalGrey"
                fontWeight="bold"
                mb="16px"
              >
                {tab.title}
              </Text>
              <Text fontSize="sm">{tab.subTitle}</Text>
            </React.Fragment>
          );
        } else {
          return null;
        }
      })}
    </Box>
  );
}

export function PediatricClinicInfoSkeletonMobile() {
  return (
    <>
      <HStack mb="35px">
        <Skeleton width="82px" height="40px" borderRadius="12px" />
        <Skeleton width="82px" height="40px" borderRadius="12px" />
        <Skeleton width="82px" height="40px" borderRadius="12px" />
        <Skeleton width="82px" height="40px" borderRadius="12px" />
      </HStack>
      <Flex justifyContent="center">
        <Skeleton width="133px" height="145px" borderRadius="12px" />
      </Flex>
      <SkeletonText mt="20px" />
    </>
  );
}
