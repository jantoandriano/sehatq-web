import React from "react";
import {
  BasicProfileCard,
  Box,
  FamilyMembersCard,
  MyMedicalRecordCard,
  MyVoucherBanner,
  ProfileHeader,
  MyActivities,
  MyMenu,
  Text,
} from "@sehatq/components";

export function ProfileMobile() {
  const isMobile = true;
  const profileHeaderProps = {
    headerLabel: "Profil Saya",
  };
  const myVoucherBannerProps = {
    textLabel: "Cek Voucher Yang Kamu Miliki",
  };
  const familyMembersProps = {
    title: "Anggota Keluarga",
    desc: "Lihat profil semua anggota keluargamu di sini.",
  };
  const myMedicalRecordProps = {
    textLabel: "Ayo Cek Kesehatanmu Secara Rutin",
  };

  return (
    <Box background="iceBlue.500" pb={4}>
      <Box position="fixed" top={0} left={0} w="100%" zIndex={2}>
        <ProfileHeader {...profileHeaderProps} isMobile={isMobile} />
      </Box>
      <Box px={4} pt={14} background="white">
        <BasicProfileCard isMobile={isMobile} />
      </Box>
      <Box px={4} pt={4} background="white">
        <MyVoucherBanner {...myVoucherBannerProps} isMobile={isMobile} />
      </Box>
      <Box position="relative">
        <Box
          position="absolute"
          w="100%"
          h="65px"
          top={0}
          left={0}
          background="white"
        />
      </Box>
      <Box pt={4} zIndex={1} position="relative">
        <FamilyMembersCard {...familyMembersProps} isMobile={isMobile} />
      </Box>
      <Box px={4} mt={5}>
        <Text fontFamily="poppins" fontWeight="semibold" fontSize="lg" mb={2}>
          Rekam Medis
        </Text>
        <MyMedicalRecordCard {...myMedicalRecordProps} isMobile={isMobile} />
      </Box>
      <Box mt={5}>
        <MyActivities isMobile={isMobile} />
      </Box>
      <Box px={4} mt={3}>
        <Text fontFamily="poppins" fontWeight="semibold" fontSize="lg" mb={4}>
          Menu
        </Text>
        <MyMenu isMobile={isMobile} />
      </Box>
    </Box>
  );
}
