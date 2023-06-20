import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  Text,
  Skeleton,
  SkeletonCircle,
  HStack,
  Flex,
  Container,
  ChevronDownIcon,
  ChevronUpIcon,
  OrderedList,
  ListItem,
  Divider,
  useImage,
} from "@sehatq/components";

type PaymentGuidanceData = {
  id: string;
  title: string;
  description: string;
};

type PaymentGuidanceDesktopProps = {
  data: PaymentGuidanceData[];
  isLoading: boolean;
  error: string | null;
  qrCodeUrl: string;
  paymentName: string;
  deepLinkUrl: string;
  paymentMethodId: string;
  isEWallet?: boolean;
  isMobile?: boolean;
};

type GopayPaymentGuidanceProps = {
  qrCodeUrl: string;
};

type VirtualAccountPaymentGuidanceProps = {
  data: PaymentGuidanceData[];
};

type ShopeePayPaymentGuidanceProps = {
  qrCodeUrl: string;
};

export function PaymentGuidanceDesktop(props: PaymentGuidanceDesktopProps) {
  const { data, isLoading, paymentMethodId, qrCodeUrl } = props;

  if (isLoading) {
    return (
      <>
        <PaymentGuidanceDesktopSkeleton />
      </>
    );
  }

  return (
    <Container maxW="3xl">
      <Text
        fontFamily="poppins"
        color="charcoalGrey"
        fontWeight="bold"
        fontSize="md"
        textAlign="left"
      >
        Panduan Pembayaran
      </Text>
      <Box
        paddingX="4"
        paddingY="2"
        borderWidth="1px"
        borderRadius="lg"
        borderColor="gray.800"
        marginTop="5"
      >
        {Number(paymentMethodId) === 9 && (
          <ShopeePayPaymentGuidance qrCodeUrl={qrCodeUrl} />
        )}

        {Number(paymentMethodId) === 6 && (
          <GopayPaymentGuidance qrCodeUrl={qrCodeUrl} />
        )}

        {Number(paymentMethodId) <= 4 && (
          <VirtualAccountPaymentGuidance data={data || []} />
        )}

        {Number(paymentMethodId) === 8 && <OvoPaymentGuidance />}
      </Box>
    </Container>
  );
}

function ShopeePayPaymentGuidance(props: ShopeePayPaymentGuidanceProps) {
  const Image = useImage();

  const { qrCodeUrl } = props;

  return (
    <>
      <Accordion defaultIndex={0} allowToggle>
        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <Text
                borderBottom={isExpanded ? "1px solid" : ""}
                borderColor={isExpanded ? "veryLightPink" : ""}
              >
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <Text fontFamily="poppins" color="charcoalGrey">
                      Melalui Aplikasi
                    </Text>
                  </Box>
                  {isExpanded ? (
                    <ChevronDownIcon fontSize="lg" />
                  ) : (
                    <ChevronUpIcon fontSize="lg" />
                  )}
                </AccordionButton>
              </Text>
              <AccordionPanel pb={4}>
                <OrderedList>
                  <ListItem>Klik Place Order</ListItem>
                  <ListItem>Aplikasi Shopee akan terbuka</ListItem>
                  <ListItem>
                    Periksa kembali detail pembayaran kamu di aplikasi Shopee
                    dan tekan Pay
                  </ListItem>
                  <ListItem> Transaksi kamu selesai</ListItem>
                </OrderedList>
              </AccordionPanel>
            </>
          )}
        </AccordionItem>

        <Divider borderColor="veryLightPink" />

        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <Text
                borderBottom={isExpanded ? "1px solid" : ""}
                borderColor={isExpanded ? "veryLightPink" : ""}
              >
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <Text fontFamily="poppins" color="charcoalGrey">
                      Melalui Qrcode
                    </Text>
                  </Box>
                  {isExpanded ? (
                    <ChevronDownIcon fontSize="lg" />
                  ) : (
                    <ChevronUpIcon fontSize="lg" />
                  )}
                </AccordionButton>
              </Text>
              <AccordionPanel pb={4}>
                <OrderedList>
                  <ListItem>
                    Pastikan kamu sudah login di aplikasi SHOPEEPAY
                  </ListItem>
                  <ListItem>
                    Buka aplikasi SHOPEE di smartphone kamu, pilih Pay
                  </ListItem>
                  <ListItem>Arahkan kamera ke Kode QR</ListItem>
                  <ListItem>
                    Periksa kembali detail pembayaran Anda di aplikasi SHOPEE
                    dan pilih Pay
                  </ListItem>
                  <ListItem> Transaksi kamu selesai</ListItem>
                </OrderedList>

                <Flex justifyContent="center">
                  <Image
                    src={qrCodeUrl || ""}
                    width={180}
                    height={180}
                    alt="qr_code"
                  />
                </Flex>
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      </Accordion>
    </>
  );
}

function GopayPaymentGuidance(props: GopayPaymentGuidanceProps) {
  const Image = useImage();

  const { qrCodeUrl } = props;

  return (
    <>
      <Accordion defaultIndex={0} allowToggle>
        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <Text
                borderBottom={isExpanded ? "1px solid" : ""}
                borderColor={isExpanded ? "veryLightPink" : ""}
              >
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <Text fontFamily="poppins" color="charcoalGrey">
                      Melalui Aplikasi
                    </Text>
                  </Box>
                  {isExpanded ? (
                    <ChevronDownIcon fontSize="lg" />
                  ) : (
                    <ChevronUpIcon fontSize="lg" />
                  )}
                </AccordionButton>
              </Text>
              <AccordionPanel pb={4}>
                <OrderedList>
                  <ListItem>Klik ‘Bayar dengan Gopay’</ListItem>
                  <ListItem>Aplikasi Gojek akan terbuka</ListItem>
                  <ListItem>
                    Periksa kembali total tagihan Anda dan klik Bayar
                  </ListItem>
                  <ListItem>Masukkan PIN Gopay dan transaksi selesai</ListItem>
                </OrderedList>
              </AccordionPanel>
            </>
          )}
        </AccordionItem>

        <Divider borderColor="veryLightPink" />

        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <Text
                borderBottom={isExpanded ? "1px solid" : ""}
                borderColor={isExpanded ? "veryLightPink" : ""}
              >
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <Text fontFamily="poppins" color="charcoalGrey">
                      Melalui Qrcode
                    </Text>
                  </Box>
                  {isExpanded ? (
                    <ChevronDownIcon fontSize="lg" />
                  ) : (
                    <ChevronUpIcon fontSize="lg" />
                  )}
                </AccordionButton>
              </Text>
              <AccordionPanel pb={4}>
                <OrderedList>
                  <ListItem>Buka aplikasi Gojek</ListItem>
                  <ListItem>Klik Bayar dan scan kode QR</ListItem>
                  <ListItem>
                    Periksa kembali total tagihan Anda dan klik Bayar
                  </ListItem>
                  <ListItem>Masukkan PIN Gopay dan transaksi selesai</ListItem>
                </OrderedList>

                <Flex justifyContent="center">
                  <Image
                    src={qrCodeUrl || ""}
                    width={180}
                    height={180}
                    alt="qr_code"
                  />
                </Flex>
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      </Accordion>
    </>
  );
}

function VirtualAccountPaymentGuidance(
  props: VirtualAccountPaymentGuidanceProps
) {
  const { data } = props;
  return (
    <>
      {data.length !== 0 && (
        <Accordion defaultIndex={0} allowToggle>
          {data.map((v: PaymentGuidanceData) => (
            <AccordionItem key={v.id}>
              {({ isExpanded }) => (
                <>
                  <Text
                    borderBottom={isExpanded ? "1px solid" : ""}
                    borderColor={isExpanded ? "veryLightPink" : ""}
                  >
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        <Text fontFamily="poppins" color="charcoalGrey">
                          {v.title}
                        </Text>
                      </Box>
                      {isExpanded ? (
                        <ChevronDownIcon fontSize="lg" />
                      ) : (
                        <ChevronUpIcon fontSize="lg" />
                      )}
                    </AccordionButton>
                  </Text>
                  <AccordionPanel pb={4}>
                    <div dangerouslySetInnerHTML={{ __html: v.description }} />
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </>
  );
}

function OvoPaymentGuidance() {
  return (
    <>
      <Accordion defaultIndex={0} allowToggle>
        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <Text
                borderBottom={isExpanded ? "1px solid" : ""}
                borderColor={isExpanded ? "veryLightPink" : ""}
              >
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <Text fontFamily="poppins" color="charcoalGrey">
                      Pembayaran menggunakan OVO
                    </Text>
                  </Box>
                  {isExpanded ? (
                    <ChevronDownIcon fontSize="lg" />
                  ) : (
                    <ChevronUpIcon fontSize="lg" />
                  )}
                </AccordionButton>
              </Text>
              <AccordionPanel pb={4}>
                <OrderedList>
                  <ListItem>Buka aplikasi OVO</ListItem>
                  <ListItem>Tap lonceng di bagian kanan atas</ListItem>
                  <ListItem>
                    Pilih notifikasi tagihan pembayaran SehatQ
                  </ListItem>
                  <ListItem>Tap bayar</ListItem>
                  <ListItem> Selesai! Pesananmu segera diproses</ListItem>
                </OrderedList>
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      </Accordion>
    </>
  );
}

export function PaymentGuidanceDesktopSkeleton() {
  return (
    <>
      <Container maxW="3xl">
        <Skeleton width="200px" height="16px" />
        <Box
          maxW="3xl"
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
    </>
  );
}
