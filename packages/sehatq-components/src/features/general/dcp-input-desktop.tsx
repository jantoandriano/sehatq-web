import React from "react";
import {
  CloseIcon,
  Divider,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  Text,
  Skeleton,
  Box,
  FormControl,
  FormLabel,
  VisuallyHiddenInput,
  FormErrorMessage,
} from "../../user-interfaces";

export type DCPInputGeneralProps = {
  value: string;
  onSelect: (value: {
    subdistrict: string;
    district: string;
    city: string;
    province: string;
    zipCode: string;
  }) => void;
  clearInputSearch: () => void;
  onChangeSearchValue: React.ChangeEventHandler<HTMLInputElement>;
  showSearchResult: () => void;
  hideSearchResult: () => void;
  isShowSearchResult: boolean;
  suggestion:
    | {
        subdistrict: string;
        district: string;
        city: string;
        province: string;
        zipCode: string;
      }[]
    | undefined;
  errorMessage?: string;
};

export function DCPInputDesktop(props: DCPInputGeneralProps) {
  return (
    <Box position="relative" width="full">
      <FormControl variant="floating" isInvalid={Boolean(props.errorMessage)}>
        {props.value ? <VisuallyHiddenInput value={props.value} /> : null}
        <InputGroup
          background="white"
          borderRadius="base"
          border="0.5px solid"
          borderColor="veryLightPink"
        >
          <Input
            pr={10}
            value={props.value}
            placeholder="Kelurahan / Kecamatan / Kota / Provinsi"
            borderRadius="base"
            fontSize="md"
            autoComplete="off"
            focusBorderColor="sea.500"
            borderColor="gray.500"
            onChange={props.onChangeSearchValue}
            onFocus={props.showSearchResult}
            onBlur={props.hideSearchResult}
            _placeholder={{ color: "brownGrey.500", fontSize: "md" }}
          />
          {props.value ? (
            <InputRightElement pointerEvents="stroke">
              <IconButton
                variant="fit"
                aria-label="clear"
                onClick={props.clearInputSearch}
                icon={<CloseIcon w="3" h="3" color="gray" />}
              />
            </InputRightElement>
          ) : null}
        </InputGroup>
        <FormLabel fontSize="md">
          Kelurahan / Kecamatan / Kota / Provinsi
        </FormLabel>
        <FormErrorMessage fontSize="xxs" fontStyle="italic">
          {props.errorMessage}
        </FormErrorMessage>
      </FormControl>

      {props.isShowSearchResult && props.suggestion ? (
        <VStack
          zIndex="popover"
          position="absolute"
          top={12}
          cursor="pointer"
          onMouseDown={(e) => e.preventDefault()}
          spacing={0}
          align="start"
          width="full"
          background="white"
          borderRadius="base"
          boxShadow="base"
          divider={
            <Divider
              width="96.5%"
              alignSelf="center"
              border="0.5px solid"
              borderColor="veryLightPink"
            />
          }
        >
          {props.suggestion.length > 0 ? (
            props.suggestion.map((sugges) => (
              <Text
                width="full"
                p={3}
                fontSize="xs"
                color="charcoalGrey"
                key={sugges.zipCode}
                _hover={{ background: "veryLightPink" }}
                onClick={() => props.onSelect(sugges)}
              >
                {`${sugges.subdistrict}, ${sugges.district}, ${sugges.city}, ${sugges.province}`}
              </Text>
            ))
          ) : (
            <Text width="full" p={3} fontSize="xs" color="charcoalGrey">
              Lokasi tidak diemukan
            </Text>
          )}
        </VStack>
      ) : null}
    </Box>
  );
}

export function DCPInputDesktopSkeleton() {
  return <Skeleton width="full" height="46px" borderRadius="base" />;
}
