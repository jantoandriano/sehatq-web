import React from "react";
import { useAssets, useNavigation } from "@sehatq/utils";
import { Text, Box, Button, Link, Flex, useImage } from "../../user-interfaces";

import { FamilyInput, FamilySelectedData } from "../profile/family-input";

export type StartHealthToolSurveyMobileProps = {
  state: FamilySelectedData | undefined;
  setState: (state: FamilySelectedData | undefined) => void;
  detailPageButtonText: string;
  onSurvey: () => void;
  setIsNext: (isNext: boolean) => void;
  isNext: boolean;
  isLogin: boolean;
};

export function StartHealthToolSurveyMobile(
  props: StartHealthToolSurveyMobileProps
) {
  const Image = useImage();
  const { Navigate } = useNavigation();
  const ASSETS = useAssets(["ILLUSTRATION_PARK"]);
  return (
    <Box
      boxShadow="sm"
      bg="white"
      w="full"
      py={4}
      borderRadius="8px"
      position="relative"
      px={4}
    >
      {props.isNext ? (
        <>
          <Text fontSize="sm" fontFamily="poppins" fontWeight="semibold" mb={4}>
            Kamu cek untuk siapa?
          </Text>
          {props.isLogin ? (
            <FamilyInput
              value={props.state?.userId}
              labelButton="Ubah"
              onChange={props.setState}
              title="Pilih User"
              hasGuest
              creatable
              isMobile
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
              <Text fontSize="sm" color="brownGrey.500">
                Tanpa simpan profil
              </Text>
            </Box>
          )}

          <Box>
            <Button
              color="white"
              bgColor="main.500"
              variant="solid"
              fontWeight="semibold"
              height="40px"
              width="full"
              mt={4}
              borderRadius={4}
              onClick={(e) => {
                e.preventDefault();
                props.onSurvey();
              }}
            >
              <Text fontSize="sm" fontFamily="openSans">
                {props.detailPageButtonText}
              </Text>
            </Button>
          </Box>
        </>
      ) : (
        <>
          <Flex mb={3}>
            <Image
              src={ASSETS.ILLUSTRATION_PARK}
              alt="ilustrasi-park"
              layout="fixed"
              width={72}
              height={72}
              priority
            />
            <Flex ml={5} flexDirection="column" justifyContent="space-around">
              <Text fontFamily="poppins" fontWeight="semibold" fontSize="md">
                Sehat Bersama SehatQ
              </Text>
              <Text fontSize="sm">
                Login untuk menyimpan catatan seluruh anggota keluarga
              </Text>
            </Flex>
          </Flex>
          <Navigate name="EXTERNAL_LOGIN">
            <Link
              color="white"
              bgColor="main.500"
              variant="solid"
              fontWeight="semibold"
              height="40px"
              width="full"
              borderRadius={4}
              mb={3}
            >
              <Text fontSize="sm">Login</Text>
            </Link>
          </Navigate>
          <Button
            variant="outline"
            fontWeight="semibold"
            height="40px"
            width="full"
            borderRadius={4}
            onClick={(e) => {
              e.preventDefault();
              props.setIsNext(true);
            }}
          >
            <Text fontSize="sm">Lanjut Isi Survey</Text>
          </Button>
        </>
      )}
    </Box>
  );
}
