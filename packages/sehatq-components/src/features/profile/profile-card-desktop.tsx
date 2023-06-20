import React from "react";
import {
  useNavigation,
  NavigationValue,
  formatDate,
  useAssets,
} from "@sehatq/utils";
import {
  HStack,
  VStack,
  Avatar,
  Box,
  Text,
  Link,
  Flex,
  CheckCircleIcon,
  SkeletonCircle,
  Skeleton,
  useImage,
} from "../../user-interfaces";

export interface ProfileCardDesktopProps {
  name: string;
  age: {
    years?: number;
    months?: number;
    days?: number;
  } | null;
  height?: number | null;
  weight?: number | null;
  birthDate?: string | null;
  gender: string;
  email: string;
  phone?: string | null;
  address?: string | null;
  avatarSrc?: string;
  onAvatarError?: () => void;
  isUserVerified: boolean;
  profileNavigation?: NavigationValue;
  idType: string | null;
  emailVerified: boolean;
}

export function ProfileCardDesktop({
  name,
  age,
  height,
  weight,
  birthDate,
  gender,
  email,
  phone,
  address,
  avatarSrc,
  onAvatarError,
  isUserVerified,
  profileNavigation,
  idType,
  emailVerified,
}: ProfileCardDesktopProps) {
  const { Navigate } = useNavigation();
  const ASSETS = useAssets(["PROFILE_VERIFIED"]);
  const Image = useImage();

  return (
    <HStack
      background="iceBlue.500"
      borderRadius="10px"
      align="flex-start"
      py={8}
      px={7}
      spacing={10}
    >
      <VStack spacing={2} flex={1}>
        <Avatar
          src={avatarSrc}
          boxSize="170px"
          name={name}
          onError={onAvatarError}
        />
        <Box textAlign="center">
          <Text fontFamily="poppins" fontWeight="semibold" fontSize="2xl">
            {name}
          </Text>
          <Text fontSize="sm" color="brownGrey.500">
            Profil Utama
          </Text>
        </Box>
        <HStack spacing={2.5}>
          <Box textAlign="center">
            <Flex align="baseline" justify="center">
              <Text
                fontSize="4xl"
                color="main.500"
                fontFamily="poppins"
                fontWeight="bold"
              >
                {age?.years || "-"}
              </Text>
              <Text
                fontSize="2xl"
                color="main.500"
                fontFamily="poppins"
                fontWeight="bold"
              >
                &nbsp;{age?.months}
              </Text>
            </Flex>
            <Text fontSize="xs" color="brownGrey.500" whiteSpace="nowrap">
              Usia (Thn Bln)
            </Text>
          </Box>
          <Box textAlign="center">
            <Text
              fontSize="4xl"
              color="main.500"
              fontFamily="poppins"
              fontWeight="bold"
            >
              {height ?? "-"}
            </Text>
            <Text fontSize="xs" color="brownGrey.500" whiteSpace="nowrap">
              Tinggi (cm)
            </Text>
          </Box>
          <Box textAlign="center">
            <Text
              fontSize="4xl"
              color="main.500"
              fontFamily="poppins"
              fontWeight="bold"
            >
              {weight ?? "-"}
            </Text>
            <Text fontSize="xs" color="brownGrey.500" whiteSpace="nowrap">
              Berat (kg)
            </Text>
          </Box>
        </HStack>
      </VStack>
      <Flex
        flexDirection="column"
        justify="space-between"
        height="100%"
        flex={2}
        bg="white"
        p="4"
        borderRadius="xl"
        boxShadow="0 2px 12px rgba(0, 0, 0, 0.1)"
        minH="xs"
      >
        <VStack spacing={6} align="flex-start" mb="2">
          {idType ? (
            <Flex
              padding={2}
              marginBottom={2}
              bg="main.50"
              w="full"
              borderRadius="md"
            >
              <Image
                src={ASSETS.PROFILE_VERIFIED}
                alt="user verified"
                width={4}
                height={4}
                layout="responsive"
                wrapperProps={{
                  width: "40px",
                }}
              />
              <Box ml="2">
                <Text fontSize="sm" fontWeight="semibold">
                  Data Diri Terverifikasi
                </Text>
                <Text fontSize="xs">
                  Yey! Datamu valid dan berhasil diverifikasi.
                </Text>
              </Box>
            </Flex>
          ) : (
            <></>
          )}
          <Flex width="100%">
            <Box flex={1}>
              <Text color="brownGrey.500" fontSize="xs">
                Tanggal Lahir
              </Text>
              <Text fontSize="md" fontWeight="semibold">
                {birthDate && formatDate(new Date(birthDate), "d MMMM yyyy")}
              </Text>
            </Box>
            <Box flex={1}>
              <Text color="brownGrey.500" fontSize="xs">
                Jenis Kelamin
              </Text>
              <Text fontSize="md" fontWeight="semibold">
                {gender === "m" ? "Laki-laki" : "Perempuan"}
              </Text>
            </Box>
          </Flex>
          <Flex width="100%">
            <Box flex={1}>
              <Text color="brownGrey.500" fontSize="xs">
                Email
              </Text>
              <Text fontSize="md" fontWeight="semibold">
                {email}&nbsp;&nbsp;
                {emailVerified ? (
                  <CheckCircleIcon boxSize="14px" color="main.500" />
                ) : null}
              </Text>
            </Box>
            <Box flex={1}>
              <Text color="brownGrey.500" fontSize="xs">
                No. Telepon
              </Text>
              <Flex align="center">
                <Text fontSize="md" fontWeight="semibold">
                  {phone ?? "-"}&nbsp;&nbsp;
                </Text>
                {isUserVerified ? (
                  <CheckCircleIcon boxSize="14px" color="main.500" />
                ) : null}
              </Flex>
            </Box>
          </Flex>
          <Box width="100%">
            <Text color="brownGrey.500" fontSize="xs">
              Alamat
            </Text>
            <Text fontSize="md" fontWeight="semibold" noOfLines={3}>
              {address ?? "-"}
            </Text>
          </Box>
        </VStack>
        {profileNavigation ? (
          <Navigate
            name={profileNavigation.name}
            query={profileNavigation.query}
          >
            <Link
              fontSize="sm"
              color="sea.500"
              variant="outline"
              bgColor="white"
              borderColor="main.500"
              width="170px"
              height="40px"
            >
              Edit Profil
            </Link>
          </Navigate>
        ) : null}
      </Flex>
    </HStack>
  );
}

export function ProfileCardSkeletonDesktop() {
  return (
    <HStack
      background="iceBlue.500"
      borderRadius="10px"
      align="flex-start"
      py={8}
      px={7}
      spacing={10}
      height="360px"
    >
      <VStack spacing={2} flex={1}>
        <SkeletonCircle size="170px" />
        <Box textAlign="center">
          <Skeleton width="150px" height="30px" />
          <Text fontSize="sm" color="brownGrey.500">
            Profil Utama
          </Text>
        </Box>
        <HStack spacing={2.5}>
          <Box textAlign="center">
            <Flex align="baseline" justify="center">
              <Skeleton width="50px" height="35px" />
            </Flex>
            <Text fontSize="xs" color="brownGrey.500" whiteSpace="nowrap">
              Usia (Thn Bln)
            </Text>
          </Box>
          <Box textAlign="center">
            <Skeleton width="39px" height="35px" />
            <Text fontSize="xs" color="brownGrey.500" whiteSpace="nowrap">
              Tinggi (cm)
            </Text>
          </Box>
          <Box textAlign="center">
            <Skeleton width="34px" height="35px" />
            <Text fontSize="xs" color="brownGrey.500" whiteSpace="nowrap">
              Berat (kg)
            </Text>
          </Box>
        </HStack>
      </VStack>
      <Flex
        flexDirection="column"
        justify="space-between"
        height="100%"
        flex={2}
      >
        <VStack spacing={6} align="flex-start">
          <Flex width="100%">
            <Box flex={1}>
              <Text color="brownGrey.500" fontSize="xs">
                Tanggal Lahir
              </Text>
              <Skeleton width="93px" height="22px" />
            </Box>
            <Box flex={1}>
              <Text color="brownGrey.500" fontSize="xs">
                Jenis Kelamin
              </Text>
              <Skeleton width="65px" height="22px" />
            </Box>
          </Flex>
          <Flex width="100%">
            <Box flex={1}>
              <Text color="brownGrey.500" fontSize="xs">
                Email
              </Text>
              <Skeleton width="195px" height="22px" />
            </Box>
            <Box flex={1}>
              <Text color="brownGrey.500" fontSize="xs">
                No. Telepon
              </Text>
              <Skeleton width="130px" height="22px" />
            </Box>
          </Flex>
          <Box width="100%">
            <Text color="brownGrey.500" fontSize="xs">
              Alamat
            </Text>
            <Skeleton width="430px" height="30px" />
          </Box>
        </VStack>
        <Skeleton width="170px" height="40px" />
      </Flex>
    </HStack>
  );
}
