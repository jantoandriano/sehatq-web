import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
  HealthCareFacilityHorizontalListProps,
  HealthCareFacilityHorizontalList,
} from "..";
import { Box } from "../../../user-interfaces";

export default {
  title:
    "Features / Health Care Facility / Health Care Facility Horizontal List",
  component: HealthCareFacilityHorizontalList,
} as Meta;

type HealthCareFacilityHorizontalListStory =
  StoryObj<HealthCareFacilityHorizontalListProps>;

export const Desktop: HealthCareFacilityHorizontalListStory = {
  render: (args) => (
    <Box width="760px">
      <HealthCareFacilityHorizontalList {...args} />
    </Box>
  ),
  args: {
    healthCareFacilities: [
      {
        hcfName: "Bintaro Woman Children Clinic Jagakarsa",
        imageUrl:
          "https://cms-dev.sehatq.com/cdn-cgi/image/f=auto/public/img/hospital_thumb/yua-medical-HCFC00001553.jpg",
        slug: "klinik-kulit-kecantikan-yua-medical-aesthetic-clinic",
        partner: 2,
        hcfType: "Klinik Kulit & Kecantikan",
        district: "Kembangan",
        city: "Jakarta Barat",
      },
      {
        hcfName: "Klinik Gigi Stephanie Sentra Medika",
        imageUrl:
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/hospital_thumb/stephanie-sentra-medika-HCFC00001253.jpg",
        slug: "klinik-gigi-stephanie-sentra-medika",
        partner: 0,
        hcfType: "Klinik Gigi",
        district: "Ciputat",
        city: "Tangerang Selatan",
      },
      {
        hcfName: "Sentra Vaksinasi Covid 19 Gratis Untuk Umum (Booster)",
        imageUrl:
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/hospital_thumb/sentra-vaksinasi-covid-19-usia6-11-tahun-gratis-untuk-umum-HCFC00003016.jpg",
        slug: "klinik-sentra-vaksinasi-covid-19-usia-6-11-tahun-gratis-untuk-umum",
        partner: 1,
        hcfType: "Klinik",
        district: "Pasar Minggu",
        city: "Jakarta Selatan",
      },
      {
        hcfName: "RS Risa Sentra Medika",
        imageUrl:
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/hospital_thumb/rs-risa-sentra-medika-HCFH00000962.jpg",
        slug: "rumah-sakit-risa-sentra-medika",
        partner: 0,
        hcfType: "Rumah Sakit",
        district: "Cakranegara",
        city: "Mataram",
      },
      {
        hcfName: "Sentra Vaksinasi Covid-19 Gratis [Daftar Online]",
        imageUrl:
          "https://cms.sehatq.com/cdn-cgi/image/f=auto/public/img/hospital_thumb/1080x1080px-sentra-vaksin-home-credit (1)_16273551751.jpg",
        slug: "lab-sentra-vaksinasi-covid-19-gratis-daftar-online",
        partner: 1,
        hcfType: "Klinik",
        district: "Pasar Minggu",
        city: "Jakarta Selatan",
      },
    ],
  },
};

export const Mobile: HealthCareFacilityHorizontalListStory = {
  render: (args) => (
    <Box width="360px">
      <HealthCareFacilityHorizontalList {...args} />
    </Box>
  ),
  args: {
    ...Desktop.args,
    isMobile: true,
  },
};
