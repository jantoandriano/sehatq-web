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
  VStack,
} from "../../user-interfaces";

export interface BasicProfileCardMobileProps {
  id: number;
  name: string;
  email: string;
  avatarSrc?: string;
  phone?: string | null;
  onAvatarError?: () => void;
  isUserVerified: boolean;
  profileNavigation?: NavigationValue;
  emailVerified: boolean;
}

export function BasicProfileCardMobile(props: BasicProfileCardMobileProps) {
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
    <VStack align="flex-start">
      <HStack spacing={5}>
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
              <Link
                fontSize="xs"
                fontWeight="semibold"
                color="sea.500"
                fontStyle="italic"
              >
                Lihat Profil
              </Link>
            </Navigate>
          ) : null}
        </Box>
      </HStack>

      {!emailVerified ? (
        <HStack
          alignItems="center"
          bg="squash.50"
          px="4"
          py="3"
          borderRadius="xl"
          w="full"
          justifyContent="space-between"
        >
          <Text fontSize="xs">Email kamu belum terverifikasi</Text>
          <Box>
            <Navigate name="EDIT_PROFILE" query={{ userId: props.id }}>
              <Link fontSize="xxs" color="white" p="2" bg="squash.500">
                Verifikasi Sekarang
              </Link>
            </Navigate>
          </Box>
        </HStack>
      ) : (
        <></>
      )}
    </VStack>
  );
}

export function BasicProfileCardSkeletonMobile() {
  return (
    <HStack spacing={5} align="flex-start">
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
