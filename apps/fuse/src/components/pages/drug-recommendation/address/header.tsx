import React from "react";
import { Flex, Text, ArrowBackIcon } from "@sehatq/components";

type HeaderProps = {
  title: string;
  onClickBack?: () => void;
};

const Header = ({ title, onClickBack = () => history.back() }: HeaderProps) => {
  return (
    <Flex height="40px" alignItems="center" background="#fff">
      <ArrowBackIcon
        ml="12px"
        cursor="pointer"
        boxSize="24px"
        color="main.600"
        onClick={onClickBack}
      />
      <Text ml="8px" fontSize="sm" fontFamily="poppins" fontWeight="semibold">
        {title}
      </Text>
    </Flex>
  );
};

export default Header;
