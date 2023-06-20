import React from "react";
import { useNavigation, useAssets } from "@sehatq/utils";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuDivider,
  MenuItem,
  useImage,
  SehatqUserIcon,
} from "../../user-interfaces";

export interface ProfileNavbarMenuDesktopProps {
  logout: () => void;
  src?: string;
  gender?: "f" | "m" | "";
}

export function ProfileNavbarMenuDesktop(props: ProfileNavbarMenuDesktopProps) {
  const { logout, src, gender } = props;
  const { Navigate } = useNavigation();
  const ASSETS = useAssets([
    "PROFILE_PLACEHOLDER_MAN",
    "PROFILE_PLACEHOLDER_WOMAN",
  ]);
  const Image = useImage();
  return (
    <Menu>
      <MenuButton>
        {src ? (
          <Image
            alt="profile"
            src={src}
            errorSrc={
              gender === "m"
                ? ASSETS.PROFILE_PLACEHOLDER_MAN
                : ASSETS.PROFILE_PLACEHOLDER_WOMAN
            }
            sizes="30px"
            layout="fill"
            objectFit="cover"
            wrapperProps={{
              width: "30px",
              height: "30px",
              borderRadius: "15px",
              overflow: "hidden",
            }}
          />
        ) : (
          <SehatqUserIcon w="30px" h="30px" />
        )}
      </MenuButton>
      <MenuList
        bg="white"
        borderRadius="xl"
        boxShadow="sm"
        width="110px"
        px="3.5"
        py="2.5"
        minW="unset"
      >
        <Navigate name="PROFILE">
          <MenuItem
            color="brownGrey.500"
            fontSize="xs"
            justifyContent="normal"
            as="a"
            px="0"
            py="0.5"
            _hover={{ color: "main.500" }}
          >
            Profile
          </MenuItem>
        </Navigate>
        <Navigate name="PROFILE_SETTINGS">
          <MenuItem
            color="brownGrey.500"
            fontSize="xs"
            justifyContent="normal"
            as="a"
            px="0"
            py="0.5"
            _hover={{ color: "main.500" }}
          >
            Settings
          </MenuItem>
        </Navigate>
        <MenuDivider color="veryLightPink" border="0.5px solid" />
        <MenuItem
          onClick={logout}
          color="brownGrey.500"
          fontSize="xs"
          px="0"
          py="0.5"
          _hover={{ color: "main.500" }}
        >
          Sign Out
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
