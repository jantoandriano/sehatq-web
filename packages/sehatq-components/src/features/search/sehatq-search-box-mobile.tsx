import React from "react";

import { useAssets } from "@sehatq/utils";
import {
  InputGroup,
  Input,
  InputLeftElement,
  InputRightElement,
  CloseIcon,
  Box,
  HStack,
  IconButton,
  ArrowBackIcon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  useImage,
} from "../../user-interfaces";
import { MainMenu } from "../general";
import { PopularTags } from "./popular-tags";
import { SearchHistories } from "./search-histories";
import { SearchAutoComplete } from "./search-auto-complete";

export type SehatqSearchBoxMobileProps = {
  stateInputSearch: string;
  isShowSearchAutcomplete: boolean;
  onSubmit: React.FormEventHandler<HTMLDivElement>;
  placeholderSearch: string;
  changeInputSearch: React.ChangeEventHandler<HTMLInputElement>;
  clearInputSearch: () => void;
  leftElement: React.ReactNode;
  isShowModal: boolean;
  showModal: () => void;
  hideModal: () => void;
};
export function SehatqSearchBoxMobile(props: SehatqSearchBoxMobileProps) {
  const ASSETS = useAssets(["SEHATQ_SM"]);
  const Image = useImage();
  const {
    stateInputSearch,
    isShowSearchAutcomplete,
    onSubmit,
    placeholderSearch,
    changeInputSearch,
    clearInputSearch,
    leftElement = (
      <Image
        alt="SehatQ Logo"
        src={ASSETS.SEHATQ_SM}
        width={32}
        height={32}
        layout="fixed"
        priority
        wrapperProps={{
          height: "32px",
        }}
      />
    ),
    isShowModal,
    showModal,
    hideModal,
  } = props;

  const formSearchInput = () => {
    return (
      <InputGroup
        as="form"
        onSubmit={onSubmit}
        variant="outline"
        background="white"
        borderRadius="xl"
        boxShadow="lg"
        width="100%"
      >
        <InputLeftElement pointerEvents="none">{leftElement}</InputLeftElement>
        <Input
          value={stateInputSearch}
          placeholder={placeholderSearch}
          pl="10"
          autoComplete="off"
          {...(isShowModal && {
            autoFocus: true,
          })}
          focusBorderColor="main.500"
          borderColor="gray.500"
          onChange={changeInputSearch}
          onClick={showModal}
          _placeholder={{ color: "brownGrey.500", fontSize: "sm" }}
        />
        <InputRightElement>
          <CloseIcon
            display={stateInputSearch ? "block" : "none"}
            w="2"
            h="2"
            color="gray"
            cursor="pointer"
            onClick={clearInputSearch}
          />
        </InputRightElement>
      </InputGroup>
    );
  };

  return (
    <Box position="relative" width="100%">
      {formSearchInput()}
      <Modal isOpen={isShowModal} onClose={hideModal} size="full">
        <ModalOverlay />
        <ModalContent borderRadius="none">
          <ModalHeader
            p={2}
            position="sticky"
            zIndex="sticky"
            top={0}
            bgColor="white"
          >
            <HStack spacing={3}>
              <IconButton
                aria-label="back button"
                onClick={hideModal}
                variant="fit"
                colorScheme="sea"
                autoFocus={false}
                icon={<ArrowBackIcon boxSize="28px" color="main.600" />}
              />
              {formSearchInput()}
            </HStack>
          </ModalHeader>
          <ModalBody p={4}>
            <Box
              backgroundColor="white"
              onMouseDown={(e) => e.preventDefault()}
            >
              {isShowSearchAutcomplete ? (
                <Box ml="2" px="5" pb="3">
                  <SearchAutoComplete />
                </Box>
              ) : (
                <>
                  <Box pb="6" _empty={{ pb: "0" }}>
                    <SearchHistories />
                  </Box>
                  <Box pb="6">
                    <PopularTags />
                  </Box>
                  <Box pb="6">
                    <MainMenu />
                  </Box>
                </>
              )}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
