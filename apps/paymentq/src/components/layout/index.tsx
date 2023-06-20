import React, { ReactNode } from "react";
import { HeadContent } from "@components/head/head-content";

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout = (props: MainLayoutProps) => {
  const headData = {
    title: "Sehatq | Tanya Dokter dan Tips Keluarga Sehat",
    desc: "Tersedia info kesehatan untuk pencegahan, pengobatan, dan perawatan penyakit, serta fitur tanya dan booking dokter untuk mempermudah akses pasien ke layanan kesehatan",
    keywords:
      "tanya dokter online, dokter online tanya jawab, cek kesehatan, solusi kesehatan, jadwal praktek dokter, rumah sakit terdekat, praktek dokter terdekat, kesehatan keluarga, jaga kesehatan, aplikasi kesehatan",
  };

  return (
    <>
      <HeadContent {...headData} />
      {props.children}
    </>
  );
};

export default MainLayout;
