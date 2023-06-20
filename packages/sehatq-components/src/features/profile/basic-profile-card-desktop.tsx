import React from "react";
import { NavigationValue, useNavigation } from "@sehatq/utils";
import {
  Box,
  Avatar,
  HStack,
  CheckCircleIcon,
  Text,
  Link,
  SkeletonCircle,
  Skeleton,
} from "../../user-interfaces";

export interface BasicProfileCardDesktopProps {
  id: number;
  name: string;
  email: string;
  avatarSrc?: string;
  onAvatarError?: () => void;
  phone?: string | null;
  isUserVerified: boolean;
  profileNavigation?: NavigationValue;
  emailVerified: boolean;
}

export function BasicProfileCardDesktop(props: BasicProfileCardDesktopProps) {
  const {
    name,
    email,
    phone,
    avatarSrc,
    onAvatarError,
    isUserVerified,
    profileNavigation,
    emailVerified,
  } = props;
  const { Navigate } = useNavigation();

  return (
    <>
      <HStack spacing={5} w="100%">
        <Avatar src={avatarSrc} name={name} size="xl" onError={onAvatarError} />
        <Box>
          <Text fontFamily="poppins" fontWeight="semibold" fontSize="lg">
            {name}
          </Text>
          <Text fontSize="xxs" mt={0} mb={1}>
            {email}
          </Text>
          <HStack spacing={2} mb={1}>
            <Text fontSize="xs" fontWeight="semibold">
              {phone}
            </Text>
            {isUserVerified ? (
              <CheckCircleIcon w={3} h={3} color="main.500" />
            ) : null}
          </HStack>
          {profileNavigation ? (
            <Navigate
              name={profileNavigation.name}
              query={profileNavigation.query}
            >
              <Link fontSize="xs" fontWeight="semibold" color="sea.500">
                Lihat Profil
              </Link>
            </Navigate>
          ) : null}
        </Box>
      </HStack>

      {!emailVerified ? (
        <HStack alignItems="center" bg="squash.50" p="2.5" borderRadius="xl">
          <Text fontSize="xs">Email kamu belum terverifikasi</Text>
          <Box>
            <Navigate name="EDIT_PROFILE" query={{ userId: props.id }}>
              <Link
                w="105px"
                fontSize="xxs"
                color="white"
                p="2"
                bg="squash.500"
              >
                Verifikasi Sekarang
              </Link>
            </Navigate>
          </Box>
        </HStack>
      ) : (
        <></>
      )}
    </>
  );
}

export function BasicProfileCardSkeletonDesktop() {
  return (
    <HStack spacing={5} align="flex-start" w="100%">
      <SkeletonCircle size="96px" />
      <Box flex={1}>
        <Skeleton width="80%" height="27px" mb={1} />
        <Skeleton width="90%" height="15px" mb={1} />
        <Skeleton width="80%" height="18px" mb={2} />
        <Skeleton width="64px" height="17px" />
      </Box>
    </HStack>
  );
}
