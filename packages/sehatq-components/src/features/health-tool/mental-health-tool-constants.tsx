import React from "react";
import { Text, UnorderedList, ListItem } from "../../user-interfaces";

export function MENTAL_HEALTH_TOOL_FAQ({ isMobile }: { isMobile: boolean }) {
  return [
    {
      id: 0,
      title: (
        <h2>Kapan Seseorang Dinyatakan Mengalami Gangguan Kesehatan Mental?</h2>
      ),
      content: (
        <>
          <Text as="p" mb={6}>
            Tidak dipungkiri kesehatan mental mengacu pada perilaku dan
            emosional yang lebih menjurus ke hal negatif. Seseorang yang
            memiliki gangguan kesehatan mental, bisa dilihat dari perilaku dan
            pemikiran yang berbeda dari orang normal pada umumnya.
          </Text>
          <Text as="p" mb={6}>
            Namun, ada banyak faktor yang menyebabkan kesehatan mental seseorang
            terganggu, diantaranya kekerasan dalam rumah tangga, pelecehan
            seksual, pelecehan terhadap anak di bawah umur, faktor biologis, dan
            peristiwa yang membuat stres atau trauma berkepanjangan.
          </Text>
          <Text as="p" mb={6}>
            Jika seseorang mengalami kesehatan mental, mungkin bisa langsung
            ditangani dengan cepat, namun, jika kesehatan mental tersebut
            menimbulkan gangguan mental atau penyakit mental, akan membutuhkan
            waktu yang cukup lama untuk bisa sembuh dan kembali kehidupan yang
            normal. Sebab, gangguan mental bisa mengubah cara seseorang dalam
            mengatasi stres, berinteraksi dengan orang lain, membuat pilihan,
            dan juga munculnya ingin menyakiti diri sendiri.
          </Text>
          <Text as="p" mb={3}>
            Adapun beberapa jenis gangguan mental yang paling sering dijumpai,
            yaitu:
          </Text>
          <UnorderedList>
            <ListItem>Bipolar</ListItem>
            <ListItem>Kecemasan</ListItem>
            <ListItem>Depresi</ListItem>
            <ListItem>psikosis gangguan obsesif kompulsif (OCD)</ListItem>
            <ListItem>Gangguan stres pasca trauma (PTSD)</ListItem>
          </UnorderedList>
        </>
      ),
    },
    {
      id: 1,
      title: <h3>Tanda mengalami gangguan kesehatan mental</h3>,
      content: (
        <>
          <Text as="p" mb={3}>
            Agar memudahkan dalam mendeteksi seseorang sebelum melakukan
            pemeriksaan lebih lanjut ke dokter, berikut ini beberapa gejala yang
            umum dialami seseorang mengidap gangguan kesehatan mental.
          </Text>
          <UnorderedList>
            <ListItem>
              Makan dan tidur terlalu banyak atau terlalu sedikit (tidak
              teratur)
            </ListItem>
            <ListItem>
              Menarik diri dari orang-orang dan aktivitas sehari-hari
            </ListItem>
            <ListItem>Merasa mati rasa</ListItem>
            <ListItem>
              Memiliki rasa sakit dan nyeri yang tidak dapat dijelaskan
            </ListItem>
            <ListItem>Merasa tidak berdaya atau putus asa</ListItem>
            <ListItem>
              Merokok, minum, atau menggunakan narkoba lebih dari biasanya
            </ListItem>
            <ListItem>Memiliki rasa kebingungan yang cukup parah</ListItem>
            <ListItem>mudah lupa suatu hal atau kejadian</ListItem>
            <ListItem>gelisah atau cemas berlebihan</ListItem>
            <ListItem>mudah marah</ListItem>
            <ListItem>merasa ketakutan yang berlebihan</ListItem>
            <ListItem>
              Berteriak atau berkelahi dengan keluarga dan teman
            </ListItem>
            <ListItem>
              Mengalami perubahan suasana hati yang parah yang menyebabkan
              masalah dalam hubungan
            </ListItem>
            <ListItem>
              Memiliki pengalaman yang negatif atau buruk yang tidak bisa
              dilupakan
            </ListItem>
            <ListItem>
              Mendengar suara atau mempercayai hal-hal yang tidak benar
            </ListItem>
            <ListItem>
              Berpikir untuk menyakiti diri sendiri atau orang lain
            </ListItem>
            <ListItem>Kehilangan konsentrasi dalam melakukan kegiatan</ListItem>
            <ListItem>Berhalusinasi</ListItem>
          </UnorderedList>
        </>
      ),
    },
    {
      id: 2,
      title: <h3>Penyebab timbulnya masalah kesehatan mental</h3>,
      content: (
        <>
          <Text as="p" mb={3}>
            Kesehatan mental tidak hadir dalam diri seseorang tanpa adanya
            faktor atau penyebab. Berikut ini beberapa penyebab umum yang bisa
            menimbulkan masalah kesehatan mental.
          </Text>
          <UnorderedList>
            <ListItem>Pernah mengalami cedera kepala yang cukup parah</ListItem>
            <ListItem>
              Faktor genetik atau riwayat keluarga mengidap gangguan mental
            </ListItem>
            <ListItem>
              Pernah atau sering mengalami kekerasan dalam rumah tangga
            </ListItem>
            <ListItem>
              Pernah atau sering mengalami kekerasan pada anak
            </ListItem>
            <ListItem>
              Memiliki penyakit gangguan pada otak atau kelainan senyawa kimia
              otak
            </ListItem>
            <ListItem>Pernah merasakan terdiskriminasi</ListItem>
            <ListItem>
              Mengalami kehilangan yang cukup mendalam akibat kematian seseorang
              yang sangat dekat
            </ListItem>
            <ListItem>
              Trauma akibat suatu kejadian (kecelakaan atau kejahatan)
            </ListItem>
            <ListItem>Diasingkan oleh orang-orang sekitar</ListItem>
            <ListItem>
              Mengonsumsi zat beracun, alkohol, atau obat-obatan yang dapat
              merusak otak secara berlebihan
            </ListItem>
            <ListItem>Kehilangan mata pencaharian secara mendadak</ListItem>
            <ListItem>Stres berat dalam kurung waktu yang cukup lama</ListItem>
            <ListItem>
              Memiliki masalah utang piutang yang sulit terselesaikan
            </ListItem>
          </UnorderedList>
        </>
      ),
    },
    {
      id: 3,
      title: <h3>Proses diagnosis kesehatan mental</h3>,
      content: (
        <>
          <Text as="p" mb={6}>
            Dalam mendiagnosis seseorang mengidap gangguan mental, biasanya para
            dokter ahli kejiwaan atau psikiater melakukan suatu wawancara
            mengenai riwayat perjalanan gejala, riwayat penyakit pada keluarga,
            dan kemudian dilanjutkan dengan pemeriksaan fisik yang menyeluruh
            untuk mendeteksi kemungkinan adanya penyakit lain.
          </Text>
          <Text as="p">
            Pemeriksaan fisik meliputi pemeriksaan fungsi tiroid, skrining
            alkohol atau obat-obatan,CT Scan pada bagian otak. Setelah
            mengetahui penyebab dari gangguan mental tersebut, dokter akan
            merencanakan terapi dan juga memberikan obat-obat yang sesuai.
          </Text>
        </>
      ),
    },
    {
      id: 4,
      title: <h3>Pengobatan untuk pengidap kesehatan mental</h3>,
      content: (
        <>
          <Text as="p" mb={6}>
            Untuk mengobati seseorang yang mengidap kesehatan mental, berikut
            ini beberapa pilihan pengobatan yang akan dilakukan dokter.
          </Text>
          <Text
            as="h4"
            fontSize={isMobile ? "base" : "xl"}
            fontWeight="semibold"
          >
            1. Psikoterapi
          </Text>
          <Text as="p" mb={6}>
            Psikoterapi adalah jenis perawatan berupa terapi bicara yang
            mengambil pendekatan psikologis sebagai sarana pengobatan penyakit
            mental. Psikoterapi juga menjadikan saran untuk pengidap dalam
            mengungkapkan perasaan yang mungkin selama ini dipendam.
          </Text>
          <Text as="p" mb={6}>
            Pengobatan ini dilakukan oleh seorang psikiater untuk membimbing
            pengidap dalam mengontrol perasaannya. Adapun beberapa contoh dari
            psikoterapi, yaitu exposure therapy, cognitive behavioral therapy,
            dialectical behavior therapy, dan sebagainya.
          </Text>
          <Text
            as="h4"
            fontSize={isMobile ? "base" : "xl"}
            fontWeight="semibold"
          >
            2. Obat-obatan
          </Text>
          <Text as="p" mb={6}>
            Selain psikoterapi, mengonsumsi obat-obatan juga menjadi salah satu
            cara untuk mengobati seseorang yang mengidap penyakit mental. Tujuan
            mengonsumsi obat-obatan ini untuk mengubah kelainan senyawa kimia
            yang ada di otak.
          </Text>
          <Text as="p" mb={6}>
            Ada beberapa obat-obatan khusus untuk pengidap penyakit mental,
            seperti serotonin-norepinephrine reuptake inhibitor (SNRIs),
            golongan selective serotonin reuptake inhibitor (SSRI), dan
            antidepresan trisiklik. Jenis obat-obatan tersebut biasanya
            digunakan juga oleh psikiater sebagai pengobatan kombinasi dengan
            psikoterapi untuk mendapatkan hasil yang lebih efektif.
          </Text>
          <Text
            as="h4"
            fontSize={isMobile ? "base" : "xl"}
            fontWeight="semibold"
          >
            3. Stimulasi otak
          </Text>
          <Text as="p" mb={6}>
            Pengobatan ini berupa terapi elektrokonvulsif, stimulasi saraf
            vagus, stimulasi magnetik transkranial, dan pengobatan eksperimental
            yang disebut stimulasi otak dalam. Pengobatan ini dilakukan bagi
            pengidap yang disebabkan oleh ketergantungan akibat penyalahgunaan
            zat-zat terlarang.
          </Text>
          <Text
            as="h4"
            fontSize={isMobile ? "base" : "xl"}
            fontWeight="semibold"
          >
            4. Rawat inap
          </Text>
          <Text as="p" mb={6}>
            Untuk pengobatan yang ini, sangat dianjurkan untuk pengidap yang
            memiliki gejala cukup berat. Pengobatan rawat inap ini dilakukan
            supaya dokter bisa lebih memantau secara intens terhadap
            gejala-gejala yang timbul sehingga proses pengobatannya lebih
            maksimal. Pasalnya, jika pengidap sudah memasuki gejala yang cukup
            berat, kemungkinan besar bisa menyakiti diri sendiri bahkan
            percobaan bunuh diri.
          </Text>
          <Text
            as="h4"
            fontSize={isMobile ? "base" : "xl"}
            fontWeight="semibold"
          >
            5. Mengubah gaya hidup
          </Text>
          <Text as="p">
            Jenis pengobatan ini mungkin untuk pengidap yang memiliki gejala
            sangat ringan. Setelah melakukan konsultasi dengan psikiater, Anda
            bisa membuat rencana bagi diri sendiri dengan mengatur pola hidup
            dan kebiasaan sehari-hari yang bisa melawan penyakit mental
            tersebut.
          </Text>
        </>
      ),
    },
    {
      id: 5,
      title: <h3>Pencegah gangguan kesehatan mental</h3>,
      content: (
        <>
          <Text as="p" mb={3}>
            Ada banyak cara untuk mencegah gangguan mental terjadi yang bisa
            Anda lakukan, yaitu:
          </Text>
          <UnorderedList>
            <ListItem>Mengedepankan pikiran yang positif</ListItem>
            <ListItem>Menjaga hubungan baik dengan semua orang</ListItem>
            <ListItem>Melakukan aktivitas fisik dengan aktif</ListItem>
            <ListItem>Mengatasi masalah dengan kemampuan yang positif</ListItem>
            <ListItem>Menjaga kualitas tidur yang benar</ListItem>
          </UnorderedList>
        </>
      ),
    },
  ];
}
