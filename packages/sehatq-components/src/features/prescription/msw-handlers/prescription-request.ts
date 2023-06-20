import { rest } from "msw";
import deepmerge from "deepmerge";
import { PartialDeep } from "type-fest";
import { queryToString, hashStringToNumber } from "@sehatq/utils";
import { ENV } from "@sehatq/constants";
import { Query } from "@sehatq/types";
import { faker } from "@faker-js/faker/locale/id_ID";
import {
  PrescriptionResponse,
  PrescriptionProductsResponse,
  PrescriptionHistoryResponse,
} from "..";

export function generateFakePrescriptionRequestResponse(
  query: Query,
  previewData?: PartialDeep<PrescriptionResponse>
) {
  const seedKey = hashStringToNumber(queryToString(query));
  faker.seed(seedKey);
  const id = faker.database.collation();
  const doctorName = faker.name.findName();
  const fakeResponse = {
    data: {
      id: faker.datatype.number({ max: 9999 }),
      number: `#${faker.random.alphaNumeric(13)}`,
      createdAt: faker.datatype.datetime().toISOString(),
      expiredAt: faker.datatype.datetime().toISOString(),
      notes: faker.random.words(7),
      rejectionReason: faker.random.words(9),
      images: Array.from(Array(3).keys()).map((_, index) =>
        faker.image.imageUrl(452 + index, 540)
      ),
      shipping: {
        id: faker.datatype.number({ max: 9999 }),
        label: "Alamat Rumah",
        name: faker.name.findName(),
        address: faker.address.streetAddress(),
        subdistrict: faker.address.streetSuffix(),
        district: faker.address.state(),
        city: faker.address.cityName(),
        province: faker.address.county(),
        zipCode: faker.address.zipCode("#####"),
        phone: faker.phone.number("############"),
        note: faker.random.words(7),
      },
      source: {
        id,
        name: faker.name.jobDescriptor(),
      },
      status: {
        id: faker.helpers.arrayElement([
          "created",
          "requested",
          "approved",
          "purchased",
          "request_expired",
          "rejected",
          "expired",
          "cancelled",
        ]) as
          | "created"
          | "requested"
          | "approved"
          | "purchased"
          | "request_expired"
          | "rejected"
          | "expired"
          | "cancelled",
        name: faker.helpers.arrayElement([
          "Resep Baru",
          "Diproses",
          "Siap Ditebus",
          "Ditebus",
          "Batal",
          "Kedaluwarsa",
          "Gagal Diproses",
          "Ditolak",
        ]) as
          | "Resep Baru"
          | "Diproses"
          | "Siap Ditebus"
          | "Ditebus"
          | "Batal"
          | "Kedaluwarsa"
          | "Gagal Diproses"
          | "Ditolak",
        activityMessage: faker.random.words(5),
      },
      patient: {
        name: faker.name.findName(),
        gender: faker.helpers.arrayElement(["F", "M"]),
        age: `${faker.datatype.number({ max: 100 })} Tahun`,
      },
      doctorInfo: {
        name: doctorName,
        slug: faker.helpers.slugify(doctorName),
        speciality: faker.name.jobTitle(),
        image: faker.image.people(80, 80),
      },
      consultationInfo: {
        id: faker.datatype.number({ max: 999999 }),
        channel: {
          id: faker.datatype.number({ max: 9 }),
          name: faker.datatype.string(),
          code: faker.helpers.arrayElement([
            "ConsultationBooking",
            "ConsultationPublic",
            "ConsultationPrivate",
            "ConsultationApp",
          ]) as
            | "ConsultationBooking"
            | "ConsultationPublic"
            | "ConsultationPrivate"
            | "ConsultationApp",
        },
      },
      orders: {
        purchasedAt: faker.datatype.datetime().toISOString(),
        merchantName: faker.company.companyName(),
        merchantOrders: Array.from(Array(3).keys()).map(() => ({
          id: faker.datatype.number(999),
          number: `${faker.random.alphaNumeric(13, { casing: "upper" })}-01`,
          merchantName: faker.company.companyName(),
        })),
      },
    },
  };
  return previewData
    ? (deepmerge(fakeResponse, previewData) as PrescriptionResponse)
    : fakeResponse;
}

export const generateGetPrescriptionRequest = (
  previewData?: PartialDeep<PrescriptionResponse>
) =>
  rest.get<never, { prescriptionNo: string }, PrescriptionResponse>(
    `${ENV.API_V2}/tcore/prescription-requests/:prescriptionNo`,
    (req, res, ctx) => {
      const prescriptionNo = req.params;
      return res(
        ctx.json(
          generateFakePrescriptionRequestResponse(prescriptionNo, previewData)
        )
      );
    }
  );

export function generateFakePrescriptionProductsResponse(query: Query) {
  const seedKey = hashStringToNumber(queryToString(query));
  faker.seed(seedKey);
  const formatProduct = {
    Strip: "Tablet",
    Kotak: "Pcs",
    Botol: "Kapsul",
    Paket: "Kaplet",
    Dus: "Bungkus",
  };
  const qty = faker.datatype.number({ max: 9 });
  const productName = (index: number) =>
    `${faker.commerce.productName()} (${index} ${faker.helpers.objectKey(
      formatProduct
    )} @${faker.datatype.number({ max: 99 })} ${faker.helpers.objectValue(
      formatProduct
    )})`;
  return {
    data: Array.from(Array(5)).map((_, index) => {
      return {
        id: faker.datatype.number({ max: 9999 }),
        name: productName(index + 2),
        thumbUrl: faker.image.imageUrl(452 + index, 540),
        qty,
        howToUse: faker.random.words(10),
        dosage: `${faker.datatype.number({ max: 2 })} x ${faker.datatype.number(
          { max: 3 }
        )}`,
        notes: faker.random.words(7),
        isReplacement: faker.helpers.arrayElement([0, 1]),
      };
    }),
  };
}

export const generateGetPrescriptionProducts = rest.get<
  never,
  { prescriptionNo: string },
  PrescriptionProductsResponse
>(
  `${ENV.API_V2}/tcore/prescription-requests/:prescriptionNo/products`,
  (req, res, ctx) => {
    const prescriptionNo = req.params;
    return res(
      ctx.json(generateFakePrescriptionProductsResponse(prescriptionNo))
    );
  }
);

export function generateFakePrescriptionHistoryRequestResponse(
  query: Query,
  previewData?: PartialDeep<PrescriptionHistoryResponse>
) {
  const seedKey = hashStringToNumber(queryToString(query));
  faker.seed(seedKey);
  const id = faker.helpers.arrayElement([
    "created",
    "requested",
    "approved",
    "purchased",
    "request_expired",
    "rejected",
    "expired",
    "cancelled",
  ]) as
    | "created"
    | "requested"
    | "approved"
    | "purchased"
    | "request_expired"
    | "rejected"
    | "expired"
    | "cancelled";
  const name = faker.helpers.arrayElement([
    "Resep Baru",
    "Diproses",
    "Siap Ditebus",
    "Ditebus",
    "Batal",
    "Kedaluwarsa",
    "Gagal Diproses",
    "Ditolak",
  ]) as
    | "Resep Baru"
    | "Diproses"
    | "Siap Ditebus"
    | "Ditebus"
    | "Batal"
    | "Kedaluwarsa"
    | "Gagal Diproses"
    | "Ditolak";
  const fakeResponse = {
    data: {
      id: faker.datatype.number({ max: 9999 }),
      status: {
        id,
        name,
        activityMessage: faker.random.words(5),
      },
      histories: [],
    },
  };
  return previewData
    ? (deepmerge(fakeResponse, previewData) as PrescriptionHistoryResponse)
    : fakeResponse;
}

export const generateGetPrescriptionHistoryRequest = (
  previewData?: PartialDeep<PrescriptionHistoryResponse>
) =>
  rest.get<never, { prescriptionNo: string }, PrescriptionHistoryResponse>(
    `${ENV.API_V2}/tcore/prescription-requests/:prescriptionNo/histories`,
    (req, res, ctx) => {
      const prescriptionNo = req.params;
      return res(
        ctx.json(
          generateFakePrescriptionHistoryRequestResponse(
            prescriptionNo,
            previewData
          )
        )
      );
    }
  );
