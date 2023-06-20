import { useQuery, UseQueryOptions } from "react-query";
import { FetchError } from "@sehatq/utils";
import { modelHCPSpecialityLink } from "./health-care-professional-speciality-model";

export const hcpSpecialityKeys = {
  all: ["HCP_SPECIALITY"],
  lists: () => [...hcpSpecialityKeys.all, "LISTS"],
};

export async function getSpecialityLink() {
  return {
    data: modelHCPSpecialityLink([
      {
        id: 8,
        name: "Umum",
        slug: "umum",
        imageUrl: [
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_8.png?v=6",
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_8_active.png?v=6",
        ],
      },
      {
        id: 11,
        name: "Penyakit Dalam",
        slug: "penyakit-dalam",
        imageUrl: [
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_11.png?v=6",
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_11_active.png?v=6",
        ],
      },
      {
        id: 14,
        name: "Saraf",
        slug: "saraf",
        imageUrl: [
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_14.png?v=6",
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_14_active.png?v=6",
        ],
      },
      {
        id: 17,
        name: "Lainnya",
        slug: "lainnya",
        imageUrl: [
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_17.png?v=6",
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_17_active.png?v=6",
        ],
      },
      {
        id: 19,
        name: "Paru",
        slug: "paru",
        imageUrl: [
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_19.png?v=6",
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_19_active.png?v=6",
        ],
      },
      {
        id: 22,
        name: "Jiwa",
        slug: "jiwa",
        imageUrl: [
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_22.png?v=6",
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_22_active.png?v=6",
        ],
      },
      {
        id: 23,
        name: "Akupunktur",
        slug: "akupunktur",
        imageUrl: [
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_23.png?v=6",
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_23_active.png?v=6",
        ],
      },
      {
        id: 25,
        name: "Gizi",
        slug: "gizi",
        imageUrl: [
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_25.png?v=6",
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_25_active.png?v=6",
        ],
      },
      {
        id: 26,
        name: "Fisioterapi",
        slug: "fisioterapi",
        imageUrl: [
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_26.png?v=6",
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_26_active.png?v=6",
        ],
      },
      {
        id: 27,
        name: "Ortopedi",
        slug: "ortopedi",
        imageUrl: [
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_27.png?v=6",
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_27_active.png?v=6",
        ],
      },
      {
        id: 28,
        name: "Endokrin",
        slug: "endokrin",
        imageUrl: [
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_28.png?v=6",
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_28_active.png?v=6",
        ],
      },
      {
        id: 29,
        name: "Ginjal",
        slug: "ginjal",
        imageUrl: [
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_29.png?v=6",
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_29_active.png?v=6",
        ],
      },
      {
        id: 30,
        name: "Kulit",
        slug: "kulit",
        imageUrl: [
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_30.png?v=6",
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_30_active.png?v=6",
        ],
      },
      {
        id: 32,
        name: "Bedah Anak",
        slug: "bedah-anak",
        imageUrl: [
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_32.png?v=6",
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_32_active.png?v=6",
        ],
      },
      {
        id: 35,
        name: "Bedah Plastik",
        slug: "bedah-plastik",
        imageUrl: [
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_35.png?v=6",
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_35_active.png?v=6",
        ],
      },
      {
        id: 36,
        name: "Onkologi",
        slug: "onkologi",
        imageUrl: [
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_36.png?v=6",
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_36_active.png?v=6",
        ],
      },
      {
        id: 38,
        name: "Psikolog",
        slug: "psikolog",
        imageUrl: [
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_38.png?v=6",
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_38_active.png?v=6",
        ],
      },
      {
        id: 40,
        name: "Andrologi",
        slug: "andrologi",
        imageUrl: [
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_40.png?v=6",
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_40_active.png?v=6",
        ],
      },
      {
        id: 42,
        name: "Rehabilitasi Medik",
        slug: "rehabilitasi-medik",
        imageUrl: [
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_42.png?v=6",
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_42_active.png?v=6",
        ],
      },
      {
        id: 41,
        name: "Hematologi",
        slug: "hematologi",
        imageUrl: [
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_41.png?v=6",
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_41_active.png?v=6",
        ],
      },
      {
        id: 13,
        name: "Jantung",
        slug: "jantung",
        imageUrl: [
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_13.png?v=6",
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_13_active.png?v=6",
        ],
      },
      {
        id: 12,
        name: "Urologi",
        slug: "urologi",
        imageUrl: [
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_12.png?v=6",
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_12_active.png?v=6",
        ],
      },
      {
        id: 20,
        name: "Bedah",
        slug: "bedah",
        imageUrl: [
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_20.png?v=6",
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_20_active.png?v=6",
        ],
      },
      {
        id: 15,
        name: "Gigi",
        slug: "gigi",
        imageUrl: [
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_15.png?v=6",
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_15_active.png?v=6",
        ],
      },
      {
        id: 16,
        name: "Mata",
        slug: "mata",
        imageUrl: [
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_16.png?v=6",
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_16_active.png?v=6",
        ],
      },
      {
        id: 18,
        name: "THT",
        slug: "tht",
        imageUrl: [
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_18.png?v=6",
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_18_active.png?v=6",
        ],
      },
      {
        id: 9,
        name: "Kandungan",
        slug: "kandungan",
        imageUrl: [
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_9.png?v=6",
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_9_active.png?v=6",
        ],
      },
      {
        id: 10,
        name: "Anak",
        slug: "anak",
        imageUrl: [
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_10.png?v=6",
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_10_active.png?v=6",
        ],
      },
      {
        id: 43,
        name: "Bedah Saraf",
        slug: "bedah-saraf",
        imageUrl: [
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_43.png?v=6",
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_43_active.png?v=6",
        ],
      },
      {
        id: 44,
        name: "Forensik",
        slug: "forensik",
        imageUrl: [
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_44.png?v=6",
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_44_active.png?v=6",
        ],
      },
      {
        id: 45,
        name: "Kedokteran Olahraga",
        slug: "kedokteran-olahraga",
        imageUrl: [
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_45.png?v=6",
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_45_active.png?v=6",
        ],
      },
      {
        id: 46,
        name: "Bedah Digestif",
        slug: "bedah-digestif",
        imageUrl: [
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_46.png?v=6",
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_46_active.png?v=6",
        ],
      },
      {
        id: 47,
        name: "Bedah Toraks",
        slug: "bedah-toraks",
        imageUrl: [
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_47.png?v=6",
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_47_active.png?v=6",
        ],
      },
      {
        id: 48,
        name: "Anestesi",
        slug: "anestesi",
        imageUrl: [
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_48.png?v=6",
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_48_active.png?v=6",
        ],
      },
      {
        id: 49,
        name: "Gastroenterologi",
        slug: "gastroenterologi",
        imageUrl: [
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_49.png?v=6",
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_49_active.png?v=6",
        ],
      },
      {
        id: 50,
        name: "Patologi",
        slug: "patologi",
        imageUrl: [
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_50.png?v=6",
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_50_active.png?v=6",
        ],
      },
      {
        id: 51,
        name: "Radiologi",
        slug: "radiologi",
        imageUrl: [
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_51.png?v=6",
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_51_active.png?v=6",
        ],
      },
      {
        id: 52,
        name: "Reumatologi",
        slug: "reumatologi",
        imageUrl: [
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_52.png?v=6",
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/revamp_icon/hcp_speciality_icon_52_active.png?v=6",
        ],
      },
    ]),
  };
}

export type SpecialityLinkCache = Awaited<ReturnType<typeof getSpecialityLink>>;

export function useGetSpecialityLink<TData = SpecialityLinkCache>(
  options?: UseQueryOptions<SpecialityLinkCache, FetchError, TData>
) {
  return useQuery<SpecialityLinkCache, FetchError, TData>(
    hcpSpecialityKeys.lists(),
    async () => {
      return getSpecialityLink();
    },
    options
  );
}
