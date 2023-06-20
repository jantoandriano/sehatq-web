import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Box, Center, Flex, Image, Text } from "@sehatq/components";
import { ASSETS } from "@sehatq/constants";
import { trackMobile } from "src/utils/payment";
import { useGetWaitingPaymentStatus } from "@components/features/waiting-payment/waiting-payment-queries";
import { ENV } from "src/constants";

const trackingObjMessage = "will be redirect to thank you page";

function CallbackPaymentPage() {
  const router = useRouter();
  const { callbackUrl, coNumber, status, paymentId } = router.query;

  const { data: getStatus } = useGetWaitingPaymentStatus(
    {
      coNumber: coNumber as string,
    },
    {
      enabled: Boolean(coNumber && !callbackUrl && Number(paymentId) !== 5),
    }
  );

  const trackingObj = {
    eventType: "purchase",
    status: "redirect",
    message: trackingObjMessage,
    state: "",
    coNumber: "",
    link: "",
  };

  useEffect(() => {
    const isCreditCard = coNumber && callbackUrl && Number(paymentId) === 5;
    const isOtherPayment = coNumber && !callbackUrl && Number(paymentId) !== 5;

    if (isCreditCard) {
      setTimeout(() => {
        trackingObj.state = "success";
        trackingObj.coNumber = `${coNumber}` || "";
        trackingObj.link = `${callbackUrl}?coNumber=${coNumber}`;

        trackMobile(trackingObj);
        router.replace(`${callbackUrl}?coNumber=${coNumber}`);
      }, 2000);
    }

    if (isOtherPayment) {
      if (status === "success") {
        setTimeout(() => {
          trackingObj.state = "success";
          trackingObj.coNumber = `${coNumber}` || "";
          trackingObj.link = `${getStatus?.callbackURL}?coNumber=${coNumber}`;

          trackMobile(trackingObj);
          router.replace(`${getStatus?.callbackURL}?coNumber=${coNumber}`);
        }, 2000);
      }
      if (status === "failed") {
        setTimeout(() => {
          trackingObj.state = "failed";
          trackingObj.coNumber = `${coNumber}` || "";
          trackingObj.link = `${getStatus?.backUrl}`;

          trackMobile(trackingObj);
          router.replace(getStatus?.backUrl as string);
        }, 2000);
      }
    }

    if (!coNumber) {
      window.location.href = ENV.HOME_URL;
    }
  }, [paymentId, callbackUrl, coNumber]);

  return (
    <>
      <Box>
        <Center mt={47}>
          <Image
            src={ASSETS.DELAY_PAYMENT}
            width={334}
            height={334}
            alt="icon"
          />
        </Center>

        <Box>
          <Flex justifyContent="center" alignItems="center" flexDir="column">
            <Text fontWeight={600} fontFamily="poppins">
              Tunggu sebentar, ya...
            </Text>
            <Text>Pembayaranmu sedang kami proses</Text>
          </Flex>
        </Box>
      </Box>
    </>
  );
}

export default CallbackPaymentPage;
