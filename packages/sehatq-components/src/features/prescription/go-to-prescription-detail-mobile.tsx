import React from "react";
import { useAssets } from "@sehatq/utils";
import {
  HStack,
  Text,
  ChevronRightIcon,
  Button,
  useImage,
} from "../../user-interfaces";

export type GoToPrescriptionDetailMobileProps = {
  isLoading: boolean;
  onClickPrescriptionDetail: () => void;
};

export function GoToPrescriptionDetailMobile(
  props: GoToPrescriptionDetailMobileProps
) {
  const { isLoading, onClickPrescriptionDetail } = props;
  const Image = useImage();
  const ASSETS = useAssets(["PRESCRIPTION_RECOMMENDATION"]);
  return (
    <>
      <Button
        isFullWidth
        rightIcon={<ChevronRightIcon boxSize={5} color="charcoalGrey" />}
        variant="fit"
        color="charcoalGrey"
        justifyContent="space-between"
        onClick={onClickPrescriptionDetail}
        isLoading={isLoading}
        height="24px"
        p={0}
      >
        <HStack>
          <Image
            src={ASSETS.PRESCRIPTION_RECOMMENDATION}
            alt="Doctor Note"
            width={24}
            height={24}
            layout="fixed"
            priority
          />
          <Text
            fontSize="sm"
            color="charcoalGrey"
            fontWeight="semibold"
            lineHeight="4"
          >
            Rekomendasi Resep
          </Text>
        </HStack>
      </Button>
    </>
  );
}
