// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export type WaitingPaymentResponse = {
  meta: {
    message: string;
  };
  data: {
    status: string;
    detail: WaitingPaymentData[];
    serverTime: string;
    callbackURL: string;
  };
};

type WaitingPaymentData = {
  coNumber: string;
  paymentTimeout: string;
  paymentType: string;
  grandTotal: string;
  vaNumbers: string | null;
  currency: string;
  iconUrl: string | null;
  name: string | null;
  paymentMethodId: string | null;
  deepLinkUrl: string | null;
  qrCodeUrl: string | null;
  transactionStatus: string;
  maskedCard: string | null;
  permataVaNumber: string | null;
  billerCode: string | null;
  billKey: string | null;
  transactionId: string | null;
  transactionTime: string | null;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<WaitingPaymentResponse>
) {
  const time = "2022-12-21T11:00:00.000+08:00";
  const paymentTimeout = "2022-12-21T10:59:00.000+08:00";

  res.status(200).json({
    meta: {
      message: "success",
    },
    data: {
      status: "unpaid",
      serverTime: time,
      callbackURL: "https://localhost:8000/thank-you",
      detail: [
        {
          paymentMethodId: "0",
          coNumber: "TQ0720DMAGWP",
          paymentType: "insurance",
          paymentTimeout,
          transactionStatus: "fail",
          vaNumbers: null,
          maskedCard: null,
          permataVaNumber: null,
          currency: "IDR",
          billerCode: null,
          billKey: null,
          iconUrl: null,
          name: null,
          grandTotal: "10000",
          transactionId: "OVOTEST00105202007291833471985",
          transactionTime: time,
          deepLinkUrl: null,
          qrCodeUrl: null,
        },
        {
          paymentMethodId: "1",
          coNumber: "TQ0720DMAGWP",
          paymentType: "bank_transfer",
          paymentTimeout,
          transactionStatus: "fail",
          vaNumbers: "123123123123",
          maskedCard: null,
          permataVaNumber: null,
          currency: "IDR",
          billerCode: null,
          billKey: null,
          iconUrl: "",
          name: "BNI Virtual Account",
          grandTotal: "10000",
          transactionId: "OVOTEST00105202007291833471985",
          transactionTime: time,
          deepLinkUrl: null,
          qrCodeUrl: null,
        },
        {
          paymentMethodId: "2",
          coNumber: "TQ0720DMAGWP",
          paymentType: "bank_transfer",
          paymentTimeout,
          transactionStatus: "fail",
          vaNumbers: "123123123123",
          maskedCard: null,
          permataVaNumber: null,
          currency: "IDR",
          billerCode: null,
          billKey: null,
          iconUrl: "",
          name: "BCA Virtual Account",
          grandTotal: "10000",
          transactionId: "OVOTEST00105202007291833471985",
          transactionTime: time,
          deepLinkUrl: null,
          qrCodeUrl: null,
        },
        {
          paymentMethodId: "3",
          coNumber: "TQ0720DMAGWP",
          paymentType: "bank_transfer",
          paymentTimeout,
          transactionStatus: "fail",
          vaNumbers: "123123123123",
          maskedCard: null,
          permataVaNumber: null,
          currency: "IDR",
          billerCode: null,
          billKey: null,
          iconUrl: "",
          name: "Permata Virtual Account",
          grandTotal: "10000",
          transactionId: "OVOTEST00105202007291833471985",
          transactionTime: time,
          deepLinkUrl: null,
          qrCodeUrl: null,
        },
        {
          paymentMethodId: "4",
          coNumber: "TQ0720DMAGWP",
          paymentType: "bank_transfer",
          paymentTimeout,
          transactionStatus: "fail",
          vaNumbers: "123123123123",
          maskedCard: null,
          permataVaNumber: null,
          currency: "IDR",
          billerCode: null,
          billKey: null,
          iconUrl: "",
          name: "Mandiri Virtual Account",
          grandTotal: "10000",
          transactionId: "OVOTEST00105202007291833471985",
          transactionTime: time,
          deepLinkUrl: null,
          qrCodeUrl: null,
        },
        {
          paymentMethodId: "5",
          coNumber: "TQ0720DMAGWP",
          paymentType: "nicepay_ewallet_ovo",
          paymentTimeout,
          transactionStatus: "fail",
          vaNumbers: null,
          maskedCard: null,
          permataVaNumber: null,
          currency: "IDR",
          billerCode: null,
          billKey: null,
          name: "Ovo",
          grandTotal: "10000",
          transactionId: "OVOTEST00105202007291833471985",
          transactionTime: time,
          iconUrl:
            "https://static.sehatq.com/tokoq/payments/pembayaran_ovo.png",
          deepLinkUrl: null,
          qrCodeUrl: null,
        },
        {
          paymentMethodId: "6",
          coNumber: "TQ0720DMAGWP",
          paymentType: "mt_shopeepay",
          paymentTimeout,
          transactionStatus: "fail",
          vaNumbers: null,
          maskedCard: null,
          permataVaNumber: null,
          currency: "IDR",
          billerCode: null,
          billKey: null,
          name: "Shopee Pay",
          grandTotal: "10000",
          transactionId: "OVOTEST00105202007291833471985",
          transactionTime: time,
          iconUrl:
            "https://static.sehatq.com/tokoq/payments/pembayaran_shopeepay.png",
          deepLinkUrl:
            "https://simulator.sandbox.midtrans.com/gopay/partner/app/payment-pin?id=d7e2764e-014c-40a3-8057-ed90f8641ca0",
          qrCodeUrl:
            "https://api.sandbox.midtrans.com/v2/gopay/6c080a51-86de-4410-b2ce-db735c09d01b/qr-code",
        },
        {
          paymentMethodId: "7",
          coNumber: "TQ0720DMAGWP",
          paymentType: "mt_gopay",
          paymentTimeout,
          transactionStatus: "fail",
          vaNumbers: null,
          maskedCard: null,
          permataVaNumber: null,
          currency: "IDR",
          billerCode: null,
          billKey: null,
          name: "Gopay",
          grandTotal: "10000",
          transactionId: "OVOTEST00105202007291833471985",
          transactionTime: time,
          iconUrl:
            "https://sehatqstatic.s3-ap-southeast-1.amazonaws.com/tokoq/payments/pembayaran_gopay.png",
          deepLinkUrl:
            "https://simulator.sandbox.midtrans.com/gopay/partner/app/payment-pin?id=d7e2764e-014c-40a3-8057-ed90f8641ca0",
          qrCodeUrl:
            "https://api.sandbox.midtrans.com/v2/gopay/6c080a51-86de-4410-b2ce-db735c09d01b/qr-code",
        },
      ],
    },
  });
}
