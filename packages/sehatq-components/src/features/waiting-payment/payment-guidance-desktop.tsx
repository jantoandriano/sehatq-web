import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  Text,
  Skeleton,
  SkeletonCircle,
  HStack,
  Flex,
  Container,
  useImage,
} from "../../user-interfaces";

type PaymentGuidanceData = {
  id: string;
  title: string;
  description: string;
};

type PaymentGuidanceDesktopProps = {
  isLoading: boolean;
  error: string;
  data: PaymentGuidanceData[];
  isEWallet?: boolean;
};

export function PaymentGuidanceDesktop(props: PaymentGuidanceDesktopProps) {
  const { data, isLoading, error, isEWallet } = props;

  const Image = useImage();

  if (isLoading || !data.length) {
    return <PaymentGuidanceDesktopSkeleton />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <Container maxW="2xl">
      <Text fontFamily="poppins" color="charcoalGrey" fontWeight="bold">
        Panduan Pembayaran
      </Text>
      <Box
        maxW="2xl"
        paddingX="4"
        paddingY="2"
        borderWidth="1px"
        borderRadius="lg"
        borderColor="gray.800"
        marginTop="5"
      >
        {data.map((v) => (
          <Accordion key={v.id} defaultIndex={[0]} allowMultiple>
            <AccordionItem>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  <Text fontFamily="poppins" color="charcoalGrey">
                    {v.title}
                  </Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <div dangerouslySetInnerHTML={{ __html: v.description }} />
                {isEWallet && (
                  <Flex justifyContent="center">
                    <Image
                      src="https://api.sandbox.midtrans.com/v2/gopay/02407ebf-78e5-4a1a-a682-0433f313d3b7/qr-code"
                      width={180}
                      height={180}
                      alt="qr_code"
                    />
                  </Flex>
                )}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
}

export function PaymentGuidanceDesktopSkeleton() {
  return (
    <Container maxW="2xl">
      <Skeleton width="200px" height="16px" />
      <Box
        maxW="2xl"
        paddingX="4"
        paddingY="2"
        borderWidth="1px"
        borderRadius="lg"
        borderColor="gray.800"
        marginTop="5"
      >
        <Skeleton width="200px" height="16px" />

        <Flex flexDir="column" gap="5" marginTop="3">
          <HStack>
            <SkeletonCircle width="10px" height="10px" />
            <Skeleton width="70%" height="16px" />
          </HStack>
          <HStack>
            <SkeletonCircle width="10px" height="10px" />
            <Skeleton width="30%" height="16px" />
          </HStack>
          <HStack>
            <SkeletonCircle width="10px" height="10px" />
            <Skeleton width="40%" height="16px" />
          </HStack>
          <HStack>
            <SkeletonCircle width="10px" height="10px" />
            <Skeleton width="50%" height="16px" />
          </HStack>
          <HStack>
            <SkeletonCircle width="10px" height="10px" />
            <Skeleton width="60%" height="16px" />
          </HStack>
          <HStack>
            <SkeletonCircle width="10px" height="10px" />
            <Skeleton width="50%" height="16px" />
          </HStack>
          <HStack>
            <SkeletonCircle width="10px" height="10px" />
            <Skeleton width="60%" height="16px" />
          </HStack>
          <HStack>
            <SkeletonCircle width="10px" height="10px" />
            <Skeleton width="50%" height="16px" />
          </HStack>
          <HStack>
            <SkeletonCircle width="10px" height="10px" />
            <Skeleton width="50%" height="16px" />
          </HStack>
        </Flex>
      </Box>
    </Container>
  );
}
