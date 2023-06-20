import React from "react";

import { IconButton, Text, Wrap, Flex } from "../../user-interfaces";
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
} from "../icons";

export type ClinicSocialMediaProps = {
  isMobile: boolean;
};

export function ClinicSocialMedia({ isMobile }: ClinicSocialMediaProps) {
  return (
    <Flex flexDirection="column" justifyContent="space-between" height="155px">
      <Text
        fontSize={isMobile ? "24px" : "32px"}
        fontFamily="poppins"
        fontWeight="bold"
        lineHeight="36px"
      >
        Mau Tahu Informasi Menarik Lainnya?
      </Text>
      <Text fontSize={isMobile ? "12px" : "20px"}>
        Yuk, ikuti akun media sosial SehatQ
      </Text>
      <Wrap spacing="4">
        <IconButton
          as="a"
          href="https://www.facebook.com/SehatQIndonesia"
          bgColor="#EFF3F7"
          aria-label="facebook"
          width="50px"
          height="50px"
          icon={<FacebookIcon fill="#269090" width="30px" height="30px" />}
        />
        <IconButton
          as="a"
          href="https://www.instagram.com/sehatq_id"
          bgColor="#EFF3F7"
          aria-label="instagram"
          width="50px"
          height="50px"
          icon={<InstagramIcon fill="#269090" width="30px" height="30px" />}
        />
        <IconButton
          as="a"
          href="https://www.youtube.com/channel/UCOK2bObQGpy2RUMSQejSj5g"
          bgColor="#EFF3F7"
          aria-label="instagram"
          width="50px"
          height="50px"
          icon={<YoutubeIcon fill="#269090" width="30px" height="30px" />}
        />
        <IconButton
          as="a"
          href="https://twitter.com/sehatq"
          bgColor="#EFF3F7"
          aria-label="instagram"
          width="50px"
          height="50px"
          icon={<TwitterIcon fill="#269090" width="30px" height="30px" />}
        />
      </Wrap>
    </Flex>
  );
}
