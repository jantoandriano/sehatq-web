import React from "react";
import { useAssets, useNavigation } from "@sehatq/utils";
import {
  useImage,
  Box,
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  HStack,
  Text,
  Link,
} from "../../user-interfaces";

export interface LoginItemProps {
  label: string;
  content: React.ReactNode;
}

export interface MentalHealthToolSectionMobileProps {
  tabItems: Array<LoginItemProps>;
  descContent: React.ReactNode;
  termContent: React.ReactNode;
  isLogin: boolean;
  loginUserUUID?: string;
  activeUserUUID?: string;
  handleTabsChange: (value: number) => void;
}

export function MentalHealthToolSectionMobile(
  props: MentalHealthToolSectionMobileProps
) {
  const {
    tabItems,
    descContent,
    termContent,
    isLogin,
    loginUserUUID,
    activeUserUUID,
    handleTabsChange,
  } = props;
  const Image = useImage();
  const ASSETS = useAssets(["ILLUSTRATION_LOGIN"]);
  const { Navigate } = useNavigation();
  return (
    <Box backgroundColor="iceBlue.500">
      {isLogin ? (
        <Tabs onChange={handleTabsChange}>
          <TabList backgroundColor="white">
            {tabItems.map((tab) => (
              <Tab
                py={3}
                px={1}
                key={tab.label}
                borderBottomWidth="3px"
                width="50%"
                fontSize="sm"
                _selected={{
                  color: "sea.500",
                  borderColor: "main.500",
                  fontWeight: "semibold",
                }}
              >
                {tab.label}
              </Tab>
            ))}
          </TabList>
          <TabPanels
            borderTopWidth="1px"
            borderColor="veryLightPink"
            marginTop="-1px"
          >
            {tabItems.map((tab) => (
              <TabPanel px={0} pt={5} ml={7} key={tab.label}>
                {tab.content}
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      ) : (
        <Box px={4} pt={6} pb={1}>
          <HStack
            backgroundColor="white"
            borderRadius="xl"
            p={4}
            spacing={4}
            alignItems="top"
          >
            <Image
              src={ASSETS.ILLUSTRATION_LOGIN}
              alt="Login untuk menyimpan catatan"
              width={84}
              height={78}
              layout="fixed"
              priority
            />
            <Box>
              <Text fontFamily="poppins" fontWeight="semibold">
                Sehat Bersama SehatQ
              </Text>
              <Text marginBottom={3} fontSize="xs">
                Login untuk menyimpan catatan kesehatan mental seluruh anggota
                keluarga
              </Text>
              <Navigate name="EXTERNAL_LOGIN">
                <Link
                  colorScheme="sea"
                  variant="outline"
                  size="xs"
                  borderRadius="base"
                >
                  Login
                </Link>
              </Navigate>
            </Box>
          </HStack>
        </Box>
      )}
      <Box px={7} mt={4}>
        <Box mb={7}>{descContent}</Box>
        {termContent}
      </Box>
      <Box textAlign="center" px={4} pb={7} pt={5}>
        <Navigate
          name="HEALTH_TOOLS_MENTAL_FORM"
          query={{
            uuid1: loginUserUUID,
            uuid2: activeUserUUID,
          }}
        >
          <Link
            colorScheme="main"
            variant="solid"
            boxShadow="blue-base"
            width="100%"
            maxWidth="360px"
          >
            Lanjut
          </Link>
        </Navigate>
      </Box>
    </Box>
  );
}
