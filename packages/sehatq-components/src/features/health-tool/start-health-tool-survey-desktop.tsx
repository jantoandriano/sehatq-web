import React from "react";
import { useAssets, useNavigation } from "@sehatq/utils";
import {
  Text,
  Box,
  Divider,
  HStack,
  Button,
  Flex,
  useImage,
  Link,
} from "../../user-interfaces";

import { FamilyInput, FamilySelectedData } from "../profile/family-input";

export type StartHealthToolSurveyDesktopProps = {
  state: FamilySelectedData | undefined;
  setState: (state: FamilySelectedData | undefined) => void;
  detailPageButtonText: string;
  onSurvey: () => void;
  setIsNext: (isNext: boolean) => void;
  isNext: boolean;
  isLogin: boolean;
};

export function StartHealthToolSurveyDesktop(
  props: StartHealthToolSurveyDesktopProps
) {
  const Image = useImage();
  const { Navigate } = useNavigation();
  const ASSETS = useAssets(["ILLUSTRATION_PARK"]);

  return (
    <Box
      minHeight="152px"
      px="30px"
      py="24px"
      boxShadow="sm"
      borderRadius="2xl"
      bg="white"
    >
      {props.isNext ? (
        <>
          <Text fontSize="md" fontFamily="poppins" fontWeight="semibold">
            Kamu cek untuk siapa?
          </Text>

          <Flex justifyContent="space-between" alignItems="center" mt={3}>
            <HStack
              {...(props.isLogin && {
                divider: (
                  <Divider
                    orientation="vertical"
                    height="42px"
                    borderColor="veryLightPink"
                  />
                ),
              })}
              spacing={12}
              w="full"
              display="flex"
              justifyContent="space-between"
            >
              {props.isLogin ? (
                <FamilyInput
                  value={props.state?.userId}
                  labelButton="Ubah"
                  onChange={props.setState}
                  hasGuest
                  creatable
                  title="Pilih User"
                />
              ) : (
                <Box>
                  <Text
                    fontSize="lg"
                    color="charcoalGrey"
                    fontFamily="poppins"
                    fontWeight="semibold"
                  >
                    Masuk sebagai Guest
                  </Text>
                  <HStack>
                    <Text fontSize="sm" color="brownGrey.500">
                      Tanpa simpan profil
                    </Text>
                  </HStack>
                </Box>
              )}
              <Button
                color="white"
                bgColor="main.500"
                variant="solid"
                fontWeight="semibold"
                height="40px"
                width="192px"
                borderRadius={4}
                onClick={(e) => {
                  e.preventDefault();
                  props.onSurvey();
                }}
              >
                <Text fontSize="md">{props.detailPageButtonText}</Text>
              </Button>
            </HStack>
          </Flex>
        </>
      ) : (
        <Flex>
          <Image
            src={ASSETS.ILLUSTRATION_PARK}
            alt="ilustrasi-park"
            layout="fixed"
            width={134}
            height={134}
            priority
          />
          <Flex ml={7} flexDirection="column" justifyContent="space-around">
            <Text fontFamily="poppins" fontWeight="semibold" fontSize="lg">
              Sehat Bersama SehatQ
            </Text>
            <Text fontSize="md">
              Login untuk menyimpan catatan seluruh anggota keluarga
            </Text>
            <Flex>
              <Navigate name="EXTERNAL_LOGIN">
                <Link
                  color="white"
                  bgColor="main.500"
                  variant="solid"
                  fontWeight="semibold"
                  height="40px"
                  width="192px"
                  borderRadius={4}
                >
                  <Text fontSize="md">Login</Text>
                </Link>
              </Navigate>
              <Button
                variant="outline"
                fontWeight="semibold"
                height="40px"
                width="192px"
                ml="24px"
                borderRadius={4}
                onClick={(e) => {
                  e.preventDefault();
                  props.setIsNext(true);
                }}
              >
                <Text fontSize="md">Lanjut Isi Survey</Text>
              </Button>
            </Flex>
          </Flex>
        </Flex>
      )}
    </Box>
  );
}
