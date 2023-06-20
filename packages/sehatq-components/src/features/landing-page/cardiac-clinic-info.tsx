import React from "react";

import { CardiacClinicInfoDesktop } from "./cardiac-clinic-info-desktop";
import { CardiacClinicInfoMobile } from "./cardiac-clinic-info-mobile";

export type CardiacClinicInfoProps = { isMobile: boolean };
export type CardiacClinicInfoSkeletonProps = { isMobile: boolean };

export function CardiacClinicInfo(props: CardiacClinicInfoProps) {
  const { isMobile } = props;
  const contents = [
    {
      id: 1,
      title: "Penyakit jantung itu apa, sih?",
      description: `Penyakit jantung adalah kondisi medis yang ditandai dengan adanya kelainan
      jantung. Penyakit jantung yang umum dikenal adalah penyakit kardiovaskular.
      Penyakit kardiovaskular adalah kondisi penyumbatan atau penyempitan pembuluh
      darah yang dapat menyebabkan serangan jantung, nyeri di bagian dada, atau
      stroke`,
    },
    {
      id: 2,
      title: "Apa saja gejala umum penyakit jantung?",
      description: `Nyeri dada seperti tertindih atau ditekan, sesak napas, dan detak jantung
      lebih cepat atau lambat dari normalnya.`,
    },
    {
      id: 3,
      title: "Apa penyebab penyakit jantung?",
      description: `Pada umumnya terdapat dua faktor risiko yang menjadi penyebab penyakit
      jantung yaitu faktor risiko yang tidak dapat diubah dan dapat diubah. Faktor
      risiko yang tidak dapat diubah antara lain usia, jenis kelamin, serta
      genetik atau keturunan. Sedangkan faktor risiko yang dapat diubah adalah
      hipertensi, kolesterol tinggi, obesitas, diabetes, kurang aktifitas fisik,
      dan konsumsi alkohol berlebih.`,
    },
    {
      id: 4,
      title: "Bagaimana cara mencegah penyakit jantung?",
      description: `Berhenti merokok, batasi minum alkohol, atur pola makan yang sehat agar
      berat badan normal, serta jangan lupa untuk rajin aktivitas fisik, tidur
      cukup, kendalikan stres, dan cek kesehatan jantung berkala.`,
    },
  ];

  if (isMobile) {
    return <CardiacClinicInfoMobile contents={contents} />;
  }
  return <CardiacClinicInfoDesktop contents={contents} />;
}
