import React from "react";
import { useAssets, useNavigation } from "@sehatq/utils";
import {
  useImage,
  Box,
  Link,
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  HStack,
  Text,
} from "../../user-interfaces";

export interface LoginItemProps {
  label: string;
  content: React.ReactNode;
}

export interface MentalHealthToolSectionDesktopProps {
  tabItems: Array<LoginItemProps>;
  descContent: React.ReactNode;
  termContent: React.ReactNode;
  isLogin: boolean;
  loginUserUUID?: string;
  activeUserUUID?: string;
  handleTabsChange: (value: number) => void;
}

export function MentalHealthToolSectionDesktop(
  props: MentalHealthToolSectionDesktopProps
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
    <Box
      backgroundColor="iceBlue.500"
      borderWidth="1px"
      borderColor="veryLightPink"
      borderRadius="xl"
      overflow="hidden"
    >
      {isLogin ? (
        <Tabs onChange={handleTabsChange}>
          <TabList backgroundColor="white">
            {tabItems.map((tab) => (
              <Tab
                py={4}
                px={12}
                key={tab.label}
                borderBottomWidth="3px"
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
              <TabPanel px={3} pt={3} pb={0} key={tab.label}>
                {tab.content}
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      ) : (
        <HStack
          mx={5}
          mt={6}
          backgroundColor="white"
          boxShadow="blue-base"
          borderRadius="xl"
          px={7}
          py={4}
          spacing={14}
        >
          <Image
            src={ASSETS.ILLUSTRATION_LOGIN}
            alt="Login untuk menyimpan catatan"
            width={190}
            height={178}
            layout="fixed"
            priority
          />
          <Box>
            <Text
              fontFamily="poppins"
              fontWeight="semibold"
              fontSize="xl"
              marginBottom={1}
            >
              Sehat Bersama SehatQ
            </Text>
            <Text marginBottom={3}>
              Login untuk menyimpan catatan kesehatan mental seluruh anggota
              keluarga
            </Text>
            <Navigate name="EXTERNAL_LOGIN">
              <Link
                colorScheme="sea"
                variant="outline"
                width="100%"
                maxWidth="300px"
                borderRadius="md"
              >
                Login
              </Link>
            </Navigate>
          </Box>
        </HStack>
      )}
      <Box px={6} pt={6}>
        <Box mb={5}>{descContent}</Box>
        {termContent}
        <Box textAlign="center" py={7}>
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
    </Box>
  );
}
