import React from "react";
import { useNavigation } from "@sehatq/utils";
import {
  IconButton,
  Text,
  ArrowBackIcon,
  MoreIconSlim,
  Flex,
  Link,
} from "../../user-interfaces";

export interface ProfileHeaderMobileProps {
  headerLabel: string;
}

export function ProfileHeaderMobile(props: ProfileHeaderMobileProps) {
  const { headerLabel } = props;
  const { Navigate, navigate } = useNavigation();
  function goBack() {
    navigate("HOME");
  }
  return (
    <Flex align="center" background="white" p={2}>
      <IconButton
        aria-label="back button"
        onClick={goBack}
        variant="fit"
        colorScheme="sea"
        icon={<ArrowBackIcon w={7} h={7} color="sea.600" />}
      />
      <Text
        flex="1"
        marginLeft={3}
        fontFamily="poppins"
        fontWeight="semibold"
        fontSize="sm"
      >
        {headerLabel}
      </Text>
      <Navigate name="PROFILE_MORE">
        <Link borderRadius="full" minWidth={0}>
          <MoreIconSlim boxSize={5} />
        </Link>
      </Navigate>
    </Flex>
  );
}
