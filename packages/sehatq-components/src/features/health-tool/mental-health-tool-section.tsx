import React, { useState, useEffect } from "react";
import { Text, Box } from "../../user-interfaces";
import { useGetProfile, ProfileCache } from "../profile/profile-queries";
import {
  FamilyMemberSlider,
  FamilyMembersProps,
} from "../profile/family-member-slider";
import { MentalHealthToolSectionDesktop } from "./mental-health-tool-section-desktop";
import { MentalHealthToolSectionMobile } from "./mental-health-tool-section-mobile";

export type MentalHealthToolSectionProps = {
  isMobile: boolean;
  descContent?: React.ReactNode;
  termContent?: React.ReactNode;
};

function selectUserData(user: ProfileCache) {
  return { id: `${user.id}`, uuid: user.uuid };
}

export function MentalHealthToolSection(props: MentalHealthToolSectionProps) {
  const { data: userId = undefined } = useGetProfile({
    select: selectUserData,
  });
  const [stateUserObj, setStateUserObj] = useState<
    FamilyMembersProps | undefined
  >({ id: userId?.id, uuid: userId?.uuid });
  const [isGuest, setIsGuest] = useState<boolean>(false);

  // detect tab Guest or not
  const handleTabsChange = (index: number) => {
    if (index === 1) {
      setIsGuest(true);
    } else {
      setIsGuest(false);
    }
  };

  const { isMobile, descContent, termContent } = props;
  const tabLogin = [
    {
      label: "Anggota Keluarga",
      content: (
        <Box
          marginLeft={isMobile ? -7 : 0}
          width={isMobile ? "calc(100% + 28px)" : "100%"}
        >
          <FamilyMemberSlider
            isMobile={isMobile}
            userId={stateUserObj?.id}
            onChangeProfile={(value: FamilyMembersProps) => {
              setStateUserObj(value);
            }}
          />
        </Box>
      ),
    },
    {
      label: "Guest",
      content: "",
    },
  ];
  const defaultDescContent = (
    <>
      <Text
        as="p"
        mb={6}
        {...(isMobile && { fontFamily: "poppins", fontSize: "xl" })}
      >
        Kuesioner ini membantu mendeteksi potensi depresi. Penilaian dilakukan
        berdasarkan gejala selama dua minggu terakhir, seperti rasa sedih,
        cemas, atau enggan beraktivitas.
      </Text>
      <Text as="p" {...(isMobile && { fontFamily: "poppins", fontSize: "xl" })}>
        Dengan mengetahui kondisi kesehatan mental pribadi, kamu bisa
        mempersiapkan langkah selanjutnya.
      </Text>
    </>
  );
  const defaultTermContent = (
    <Text color="sea.500" fontSize="sm" fontFamily="poppins">
      * pengisian kuisioner ini bisa lebih dari satu kali.
    </Text>
  );

  // set the default stateUserObj
  useEffect(() => {
    if (userId) {
      setStateUserObj({ id: userId.id, uuid: userId.uuid });
    }
  }, [userId]);

  const otherProps = {
    tabItems: tabLogin,
    descContent: descContent || defaultDescContent,
    termContent: termContent || defaultTermContent,
    isLogin: !!userId,
    loginUserUUID: userId?.uuid,
    activeUserUUID: !isGuest ? stateUserObj?.uuid : undefined,
    handleTabsChange,
  };

  if (isMobile) {
    return <MentalHealthToolSectionMobile {...otherProps} />;
  }
  return <MentalHealthToolSectionDesktop {...otherProps} />;
}
