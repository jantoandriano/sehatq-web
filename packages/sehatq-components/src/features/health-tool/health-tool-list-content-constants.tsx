import React from "react";
import {
  Text,
  UnorderedList,
  OrderedList,
  ListItem,
} from "../../user-interfaces";

export function HEALTH_TOOL_LIST_CONTENT({ isMobile }: { isMobile: boolean }) {
  return [
    {
      id: 0,
      title: <p>Pahami Tes Kesehatan dan Fungsinya</p>,
      content: (
        <>
          <Text as="p" fontWeight="semibold" pb={2.5} pt={1.5}>
            Tes kesehatan atau medical check up adalah pemeriksaan kesehatan
            menyeluruh yang perlu dilakukan secara teratur. Apa saja jenis-jenis
            dan fungsinya?
          </Text>
          <Text as="p" pb={2.5} pt={1.5}>
            Tes kesehatan atau medical check up (mcu) adalah pemeriksaan
            kesehatan yang penting dilakukan secara rutin untuk memantau
            kesehatan tubuh Anda. Hasil tes kesehatan berguna untuk mengobati
            gejala penyakit yang timbul sejak dini ataupun mencegah risiko
            penyakit serius dalam tubuh Anda.
          </Text>
          <Text as="p" pb={2.5} pt={1.5}>
            Terdapat berbagai macam pemeriksaan saat Anda memilih untuk
            melakukan tes kesehatan. Cek kesehatan secara berkala dapat
            dilakukan oleh orang yang sehat, penderita kondisi medis tertentu,
            ataupun sesuai dengan kebutuhan.
          </Text>
        </>
      ),
    },
    {
      id: 1,
      title: <p>Jenis-Jenis Tes Kesehatan</p>,
      content: (
        <>
          <Text as="p" pb={2.5} pt={1.5}>
            Selain memahami bahwa tes kesehatan perlu dilakukan secara rutin,
            Anda juga harus memahami jenis-jenis dan fungsi dari tes kesehatan
            yang akan Anda jalani.
          </Text>
          <Text as="p" pb={2.5} pt={1.5}>
            Berikut adalah jenis-jenis tes kesehatan yang direkomendasikan untuk
            Anda beserta rangkuman fungsinya:
          </Text>
          <OrderedList>
            <ListItem>
              <Text as="p" fontFamily="poppins" fontWeight="semibold" py={2}>
                Kalkulator BMI
              </Text>
              <Text as="p" pb={2.5} pt={1.5}>
                Kalkulator BMI adalah pengukuran Body Mass Index (BMI) atau
                Indeks Massa Tubuh (IMT) menggunakan angka yang menjadi
                penilaian standar untuk menentukan apakah berat badan Anda
                tergolong normal, kurang, berlebih, ataupun obesitas.
              </Text>
              <Text as="p" pb={2.5} pt={1.5}>
                Indeks massa tubuh atau yang akrab disebut dengan BMI akan
                membandingkan berat badan dengan tinggi badan Anda, lalu
                dihitung dengan membagi berat badan dalam kilogram dengan tinggi
                badan dalam meter kuadrat.
              </Text>
            </ListItem>
            <ListItem>
              <Text as="p" fontFamily="poppins" fontWeight="semibold" py={2}>
                Kebutuhan kalori
              </Text>
              <Text as="p" pb={2.5} pt={1.5}>
                Kebutuhan kalori harian merupakan jumlah kalori yang dibutuhkan
                oleh tubuh Anda setiap hari. Kalori penting untuk selalu
                terpenuhi jumlahnya agar dapat menjalankan fungsi utama tubuh,
                dan juga membantu Anda saat melakukan aktivitas sehari-hari.
              </Text>
              <Text as="p" pb={2.5} pt={1.5}>
                Kebutuhan kalori harian dapat Anda gunakan sebagai acuan untuk
                menakar seberapa banyak makanan yang harus dikonsumsi dalam
                setiap harinya.
              </Text>
              <Text as="p" pb={2.5} pt={1.5}>
                Kebutuhan kalori harian bisa Anda dapatkan dari angka BMR yang
                dikalikan dengan faktor aktivitas fisik.
              </Text>
              <Text as="p" pb={2.5} pt={1.5}>
                <em>Basal Metabolic Rate</em> (BMR) adalah jumlah kalori yang
                dibutuhkan oleh tubuh untuk dapat menjalankan fungsi jantung,
                otak, ginjal, dan organ-organ lainnya, saat Anda tidak bergerak
                sama sekali.
              </Text>
            </ListItem>
            <ListItem>
              <Text as="p" fontFamily="poppins" fontWeight="semibold" py={2}>
                Kalkulator masa subur
              </Text>
              <Text as="p" pb={2.5} pt={1.5}>
                Kalkulator masa subur merupakan perhitungan yang akan
                mempermudah wanita untuk memeriksa masa subur.
              </Text>
              <Text as="p" pb={2.5} pt={1.5}>
                Tak sulit untuk melakukannya, Anda cukup memasukan tanggal Hari
                Pertama Haid Terakhir (HPHT) dan lama siklus haid rata-rata yang
                Ibu alami pada kalkulator, umumnya ini akan berlangsung selama
                28 hari.
              </Text>
            </ListItem>
            <ListItem>
              <Text as="p" fontFamily="poppins" fontWeight="semibold" py={2}>
                Cek gejala
              </Text>
              <Text as="p" pb={2.5} pt={1.5}>
                Saat Anda mengalami gejala suatu penyakit, sebaiknya cari tahu
                kondisi tersebut untuk menemukan penanganan awalnya di rumah.
              </Text>
              <Text as="p" pb={2.5} pt={1.5}>
                Hasil cek gejala ini hanya dapat digunakan sebagai informasi
                tambahan, tidak dapat menggantikan saran medis, diagnosis,
                ataupun pengobatan dari dokter. Apabila Anda mengalami gejala
                yang serius dan membutuhkan pertolongan medis, segera hubungi
                118 atau pergi ke unit pelayanan gawat darurat terdekat.
              </Text>
            </ListItem>
            <ListItem>
              <Text as="p" fontFamily="poppins" fontWeight="semibold" py={2}>
                Cek kadar alkohol dalam darah
              </Text>
              <Text as="p" pb={2.5} pt={1.5}>
                Jika Anda aktif mengonsumsi minuman atau makanan dengan
                kandungan alkohol, sebaiknya pantau kadarnya melalui cek kadar
                alkohol dalam darah untuk mencegah penyakit yang bisa
                diakibatkannya.
              </Text>
              <Text as="p" pb={2.5} pt={1.5}>
                Mengonsumsi alkohol dalam jumlah yang terlalu banyak dapat
                merusak hati, memicu pankreatitis, mengalami masalah pencernaan,
                menurunkan fungsi otak, risiko terkena penyakit jantung, dan
                meningkatkan risiko kanker.
              </Text>
            </ListItem>
            <ListItem>
              <Text as="p" fontFamily="poppins" fontWeight="semibold" py={2}>
                Kalkulator detak jantung
              </Text>
              <Text as="p" pb={2.5} pt={1.5}>
                Kalkulator detak jantung dapat memperkirakan berapa target detak
                jantung saat olahraga yang perlu Anda capai. Menurut berbagai
                penelitian, lemak akan lebih banyak terbakar dan otot juga lebih
                mudah terbentuk dengan baik saat seseorang mencapai target detak
                jantungnya saat berolahraga.
              </Text>
            </ListItem>
            <ListItem>
              <Text as="p" fontFamily="poppins" fontWeight="semibold" py={2}>
                Hitung pengeluaran untuk rokok
              </Text>
              <Text as="p" pb={2.5} pt={1.5}>
                Merokok mungkin dapat menghilangkan penat Anda, sayangnya efek
                samping dari kebiasaan merokok dapat membahayakan kesehatan
                Anda.
              </Text>
              <Text as="p" pb={2.5} pt={1.5}>
                Selain membahayakan kesehatan Anda, terlalu banyak merokok juga
                bisa memengaruhi keuangan Anda. Anda bisa mencari tahu jumlah
                uang yang Anda keluarkan untuk rokok melalui cara hitung
                pengeluaran rokok ini.
              </Text>
            </ListItem>
            <ListItem>
              <Text as="p" fontFamily="poppins" fontWeight="semibold" py={2}>
                Cek arti warna dan tekstur feses bayi
              </Text>
              <Text as="p" pb={2.5} pt={1.5}>
                Kebanyakan orangtua baru mungkin masih banyak yang bingung
                apakah feses bayi mereka tergolong normal atau tidak. Wajar,
                sebab beragam warna dan tekstur feses yang mungkin belum pernah
                dilihat sebelumnya bisa dialami oleh bayi Anda.
              </Text>
              <Text as="p" pb={2.5} pt={1.5}>
                Sebaiknya lakukan cek arti warna dan tekstur feses bayi secara
                berkala untuk bisa memastikan kondisi kesehatan bayi Anda. Warna
                feses bayi yang cenderung hitam, kemerahan, atau putih bisa jadi
                tanda untuk segera memeriksakan anak Anda ke dokter.
              </Text>
            </ListItem>
            <ListItem>
              <Text as="p" fontFamily="poppins" fontWeight="semibold" py={2}>
                Kalkulator berat badan ideal ibu hamil
              </Text>
              <Text as="p" pb={2.5} pt={1.5}>
                Ibu hamil sangatlah normal jika mengalami kenaikan berat badan.
                Namun, Anda perlu mengetahui batas kenaikan berat badan yang
                sehat bagi ibu dan bayi untuk mencegah komplikasi dikemudian
                hari.
              </Text>
              <Text as="p" pb={2.5} pt={1.5}>
                Ibu hamil dapat menggunakan kalkulator berat badan ideal ibu
                hamil untuk mencari tahu berapa kisaran kenaikan berat badan
                yang sehat berdasarkan berat badan yang dimiliki sebelum hamil.
              </Text>
            </ListItem>
            <ListItem>
              <Text as="p" fontFamily="poppins" fontWeight="semibold" py={2}>
                Buat janji rumah sakit
              </Text>
              <Text as="p" pb={2.5} pt={1.5}>
                Membuat janji dengan rumah sakit kini tak perlu lagi mengantri
                dalam waktu yang lama. Anda sudah bisa buat janji dengan rumah
                sakit menggunakan cara yang lebih efisien, yaitu melalui situs
                SehatQ.
              </Text>
            </ListItem>
            <ListItem>
              <Text as="p" fontFamily="poppins" fontWeight="semibold" py={2}>
                Kalkulator pembakaran kalori
              </Text>
              <Text as="p" pb={2.5} pt={1.5}>
                Kalkulator pembakaran kalori akan menghitung rata-rata jumlah
                kalori yang Anda bakar saat bergerak ataupun berolahraga.
              </Text>
              <Text as="p" pb={2.5} pt={1.5}>
                Perlu diketahui, hasil pembakaran kalori yang ditunjukkan oleh
                kalkulator ini juga dipengaruhi oleh bentuk tubuh Anda,
                peralatan yang Anda gunakan, serta seberapa banyak energi yang
                Anda gunakan selama beraktivitas.
              </Text>
            </ListItem>
            <ListItem>
              <Text as="p" fontFamily="poppins" fontWeight="semibold" py={2}>
                Kalkulator hari perkiraan lahir
              </Text>
              <Text as="p" pb={2.5} pt={1.5}>
                Kalkulator perkiraan lahir berfungsi untuk dapat memperkirakan
                kapan hari persalinan Anda akan berlangsung.
              </Text>
              <Text as="p" pb={2.5} pt={1.5}>
                Anda dapat merencanakan kehamilan sekaligus memperkirakan hari
                lahir dengan memprediksi masa subur. Namun, perhitungan hari
                lahir ini hanyalah perkiraan dan mungkin saja dapat berubah
                tergantung dengan kondisi kehamilan yang Anda alami.
              </Text>
            </ListItem>
            <ListItem>
              <Text as="p" fontFamily="poppins" fontWeight="semibold" py={2}>
                Jadwal imunisasi
              </Text>
              <Text as="p" pb={2.5} pt={1.5}>
                Bayi yang baru lahir harus segera mendapatkan imunisasi sesuai
                jadwalnya. Agar tidak terlupakan, Anda bisa menggunakan
                kalkulator imunisasi ini untuk mengetahui jadwal dan jenis
                vaksin yang dibutuhkan buah hati Anda.
              </Text>
              <Text as="p" pb={2.5} pt={1.5}>
                Perlu diketahui, jadwal imunisasi bisa berbeda tergantung area
                tempat tinggal, kondisi kesehatan anak, dan ketersediaan vaksin.
                Konsultasikan dengan dokter Anda untuk mendapatkan informasi
                terbaru.
              </Text>
            </ListItem>
          </OrderedList>
          <Text as="p" pb={2.5} pt={1.5}>
            Hasil tes kesehatan ini hanya dapat digunakan sebagai informasi
            tambahan, tidak bisa menggantikan saran medis, diagnosis, dan
            pengobatan dari dokter.
          </Text>
        </>
      ),
    },
    {
      id: 2,
      title: <p>Tujuan Tes Kesehatan atau MCU</p>,
      content: (
        <>
          <Text as="p" pb={2.5} pt={1.5}>
            Tes kesehatan biasanya dilakukan untuk mendeteksi gejala atau tanda
            penyakit tertentu. Dengan demikian, saran medis dari hasil tes ini
            akan berguna untuk mencegah kemunculan penyakit serius tertentu dan
            menjaga gaya hidup sehat.
          </Text>
          <Text as="p" pb={2.5} pt={1.5}>
            Dokter di seluruh dunia menyarankan pasien melakukan pemeriksaan
            kesehatan rutin untuk mengetahui status kesehatan mereka. Dokter pun
            menggarisbawahi pentingnya pencegahan, untuk menurunkan risiko
            penyakit serius yang membutuhkan operasi atau terapi medis tertentu.
          </Text>
          <Text as="p" pb={2.5} pt={1.5}>
            Maka dari itu, berikut tujuan dan manfaat dari tes kesehatan
            teratur:
          </Text>
          <UnorderedList>
            <ListItem>Menurunkan risiko penyakit</ListItem>
            <ListItem>
              Deteksi dini kemungkinan kondisi atau penyakit serius
            </ListItem>
            <ListItem>
              Meningkatkan kemungkinan keberhasilan terapi dan pengobatan
            </ListItem>
            <ListItem>
              Membatasi risiko komplikasi dengan memonitor kondisi kesehatan
              sekarang
            </ListItem>
            <ListItem>
              Memperpanjang angka harapan hidup dan meningkatkan kesehatan
            </ListItem>
            <ListItem>Menurunkan biaya kesehatan</ListItem>
            <ListItem>Meningkatkan efisiensi terapi</ListItem>
            <ListItem>
              Mengetahui informasi atau teknologi medis terbaru
            </ListItem>
          </UnorderedList>
          <Text as="p" pb={2.5} pt={3}>
            Mulailah dengan mengenali status kesehatan Anda untuk mengetahui
            status atau masalah kesehatan Anda.
          </Text>
          <Text as="p" pt={1.5}>
            Bila Anda berada di dalam keadaan darurat dan butuh pertolongan
            medis, segera hubungi 118 atau pergi ke unit pelayanan gawat darurat
            terdekat.
          </Text>
        </>
      ),
    },
    {
      id: 3,
      title: (
        <Text as="p" fontSize={isMobile ? "md" : "xl"}>
          Referensi
        </Text>
      ),
      content: (
        <>
          <Text as="p" fontSize={isMobile ? "xs" : "sm"} pb={2.5} pt={1.5}>
            Kementerian Kesehatan RI. <br />
            https://www.depkes.go.id/article/view/18043000011/berikan-anak-imunisasi-rutin-lengkap-ini-rinciannya.html{" "}
            <br />
            Diakses pada 3 Februari 2021
          </Text>
          <Text as="p" fontSize={isMobile ? "xs" : "sm"} pb={2.5} pt={1.5}>
            Stanford Children’s Health. <br />
            https://www.stanfordchildrens.org/en/topic/default?id=calculating-a-due-date-85-P01209{" "}
            <br />
            Diakses pada 3 Februari 2021
          </Text>
          <Text as="p" fontSize={isMobile ? "xs" : "sm"} pb={2.5} pt={1.5}>
            Mayo Clinic. <br />
            https://www.mayoclinic.org/diseases-conditions/obesity/in-depth/bmi-calculator/itt-20084938{" "}
            <br />
            Diakses pada 3 Februari 2021
          </Text>
          <Text as="p" fontSize={isMobile ? "xs" : "sm"} pb={2.5} pt={1.5}>
            MedlinePlus. https://medlineplus.gov/womenshealth.html <br />
            Diakses pada 3 Februari 2021
          </Text>
          <Text as="p" fontSize={isMobile ? "xs" : "sm"} pb={2.5} pt={1.5}>
            PVHC. https://mypvhc.com/importance-regular-check-ups/ <br />
            Diakses pada 6 April 2021
          </Text>
        </>
      ),
    },
  ];
}
