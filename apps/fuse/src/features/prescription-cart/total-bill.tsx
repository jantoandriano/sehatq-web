import React from "react";
import { useRouter } from "next/router";
import { Box, Button, Center, Flex, Spinner, Text } from "@sehatq/components";
import { useAuth } from "src/contexts/auth";
import { useCreateClaim } from "./prescription-cart-queries";

export type TotalBillProps = {
  cartId: string;
  total: string;
  isLoading: boolean;
};

export function TotalBill(props: TotalBillProps) {
  const { cartId, total, isLoading } = props;
  const router = useRouter();
  const {
    user: { token },
  } = useAuth();
  const { mutate: createClaim, isLoading: isCreatingClaim } = useCreateClaim();

  function handleCreateClaim() {
    createClaim(
      { cartId },
      {
        onSuccess: () =>
          router.push({
            pathname: "/claim/[id]/thank-you",
            query: {
              id: token,
            },
          }),
      }
    );
  }

  return (
    <Box
      position="fixed"
      bottom={0}
      width="full"
      bgColor="white"
      boxShadow="0px 6px 16px 0px rgba(0,0,0,0.5)"
      p="16px"
    >
      <Flex justifyContent="space-between">
        <Box>
          <Text color="brownGrey.500" fontFamily="openSans" fontSize="xs">
            Total Tagihan
          </Text>
          {isLoading ? (
            <Center mt={3}>
              <Spinner />
            </Center>
          ) : (
            <Text
              color="sea.500"
              fontFamily="openSans"
              fontWeight="700"
              fontSize="md"
            >
              {total || "-"}
            </Text>
          )}
        </Box>
        <Button
          isDisabled={!total || isLoading}
          isLoading={isCreatingClaim}
          width="125px"
          onClick={handleCreateClaim}
        >
          Klaim
        </Button>
      </Flex>
    </Box>
  );
}
