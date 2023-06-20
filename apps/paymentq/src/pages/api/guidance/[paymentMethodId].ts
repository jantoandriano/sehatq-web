// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type PaymentGuidanceResponse = {
  data: PaymentGuidanceData[];
};

type PaymentGuidanceData = {
  id: number;
  title: string;
  description: string;
  paymentMethodName: string;
  paymentMethodId: number;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<PaymentGuidanceResponse>
) {
  const BNI = "BNI Virtual Account";
  const BCA = "BCA Virtual Account";
  const PERMATA = "Permata Virtual Account";
  const MANDIRI = "Mandiri Virtual Account";

  if (req.query.paymentMethodId === "1") {
    return res.status(200).json({
      data: [
        {
          id: 1,
          paymentMethodId: 1,
          paymentMethodName: BNI,
          title: "ATM BNI",
          description:
            '<ol class="ak-ol">\n<li>Pada menu utama, pilih Lainnya</li>\n<li>Pilih Transfer</li>\n<li>Pilih Saving Account</li>\n<li>Pilih ke BNI Account</li>\n<li>Masukkan nomor Virtual Account dan pilih Ya</li>\n<li>Jumlah tagihan akan ditampilkan di halaman konfirmasi pembayaran, jika informasi sudah benar, pilih Ya</li>\n</ol>',
        },
        {
          id: 2,
          paymentMethodId: 1,
          paymentMethodName: BNI,
          title: "Internet Banking",
          description:
            '<ol class="ak-ol">\n<li>Kunjungi <a href="https://ibank.bni.co.id">https://ibank.bni.co.id</a> dan Login</li>\n<li>Pilih transfer lalu pilih Add Favorite Account dan pilih Antar Rekening BNI</li>\n<li>Masukkan nama dan nomor akun dan email, lalu pilih Lanjutkan</li>\n<li>Masukkan Authentication Code dari token Anda dan pilih Lanjutkan</li>\n<li>Kembali ke menu utama dan pilih Transfer dan pilih Transfer Antar Rekening BNI</li>\n<li>Pilih account yang sudah dibuat pada langkah sebelumnya sebagai Rekening Tujuan dan isi lainnya sebelum pilih Lanjutkan</li>\n<li>Cek kembali apakah detail sudah sesuai jika sudah maka masukkan Authentication Code dan pilih Lanjutkan</li>\n</ol>',
        },
        {
          id: 3,
          paymentMethodId: 1,
          paymentMethodName: BNI,
          title: "Mobile Banking",
          description:
            '<ol class="ak-ol">\n<li>Buka aplikasi BNI Mobile Banking dan Login</li>\n<li>Pilih menu Transfer</li>\n<li>Pilih menu Virtual Account Billing</li>\n<li>Pilih akun yang akan digunakan</li>\n<li>Masukkan 16 digit nomor Virtual Account</li>\n<li>Jumlah tagihan akan ditampilkan di halaman konfirmasi pembayaran, jika informasi sudah benar, pilih Ya</li>\n</ol>',
        },
        {
          id: 4,
          paymentMethodId: 1,
          paymentMethodName: BNI,
          title: "Outlet BNI (Teller)",
          description:
            '<ol class="ak-ol">\n<li>Kunjungi Kantor Cabang/outlet BNI terdekat</li>\n<li>Informasikan kepada Teller, bahwa ingin melakukan pembayaran "Virtual Account Billing"</li>\n<li>Serahkan nomor Virtual Account Anda kepada Teller</li>\n<li>Teller melakukan konfirmasi kepada Anda</li>\n<li>Teller memproses Transaksi</li>\n<li>Apabila transaksi Sukses anda akan menerima bukti pembayaran dari Teller tersebut</li>\n</ol>',
        },
        {
          id: 5,
          paymentMethodId: 1,
          paymentMethodName: BNI,
          title: "Agen46",
          description:
            '<ol class="ak-ol">\n<li>Kunjungi Agen46 terdekat (warung/toko/kios dengan tulisan Agen46)</li>\n<li>Informasikan kepada Agen46, bahwa ingin melakukan pembayaran "Virtual Account Billing"</li>\n<li>Serahkan nomor Virtual Account Anda kepada Agen46</li>\n<li>Agen46 melakukan konfirmasi kepada Anda</li>\n<li>Agen46 Proses Transaksi</li>\n<li>Apabila transaksi Sukses anda akan menerima bukti pembayaran dari Agen46 tersebut</li>\n</ol>',
        },
        {
          id: 6,
          paymentMethodId: 1,
          paymentMethodName: BNI,
          title: "SMS Banking",
          description:
            '<ol class="ak-ol">\n<li>Buka aplikasi SMS Banking BNI</li>\n<li>Pilih menu Transfer</li>\n<li>Pilih menu Trf rekening BNI</li>\n<li>Masukkan nomor rekening tujuan dengan 16 digit Nomor Virtual Account (contoh: 8277081234567890)</li>\n<li>Masukkan nominal transfer sesuai tagihan atau kewajiban Anda. Nominal yang berbeda tidak dapat diproses</li>\n<li>Pilih "Proses" kemudian "Setuju"</li>\n<li>Reply sms dengan ketik pin sesuai perintah</li>\n<li>Transaksi Berhasil</li>\n"<li>Atau Dapat juga langsung mengetik sms dengan format: \nTRF[SPASI]NomorVA[SPASI]NOMINAL dan kemudian kirim ke 3346 \nContoh : TRF 8277081234567890</li>"\n</ol>',
        },
        {
          id: 7,
          paymentMethodId: 1,
          paymentMethodName: BNI,
          title: "Bank Lain",
          description:
            '<ol class="ak-ol">\n<li>Pilih menu “Transfer antar bank” atau “Transfer online antarbank”</li>\n<li>Masukkan kode BNI (009) atau pilih bank yang dituju yaitu BNI</li>\n<li>Masukkan 16 digit Nomor Virtual Account pada kolom rekening tujuan</li>\n<li>Masukkan nominal transfer sesuai tagihan. Nominal yang berbeda tidak dapat diproses</li>\n<li>Masukkan jumlah pembayaran</li>\n<li>Konfirmasi rincian Anda akan tampil di layar, cek dan apabila sudah sesuai silakan lanjutkan transaksi sampai dengan selesai</li>\n<li>Transaksi berhasil</li>\n</ol>',
        },
      ],
    });
  }
  if (req.query.paymentMethodId === "2") {
    return res.status(200).json({
      data: [
        {
          id: 8,
          paymentMethodId: 2,
          paymentMethodName: BCA,
          title: "ATM BCA",
          description:
            '<ol class="ak-ol">\n<li>Pada menu utama, pilih Transaksi lainnya</li>\n<li>Pilih Transfer</li>\n<li>Pilih Transfer ke BCA Virtual Account</li>\n<li>Masukkan kode pembayaran Anda (11 digit kode) dan pilih Benar</li>\n<li>Jumlah tagihan akan ditampilkan di halaman konfirmasi pembayaran, jika informasi sudah benar, pilih Ya</li>\n</ol>',
        },
        {
          id: 9,
          paymentMethodId: 2,
          paymentMethodName: BCA,
          title: "Klik BCA",
          description:
            '<ol class="ak-ol">\n<li>Pilih menu Transfer Dana</li>\n<li>Pilih Transfer ke BCA Virtual Account</li>\n<li>Masukkan nomor BCA Virtual Account atau pilih dari Daftar Transfer and pilih Lanjutkan</li>\n<li>Jumlah tagihan, nomor account dan nama merchant akan ditampilkan di halaman konfirmasi pembayaran, jika informasi sudah benar, pilih Lanjutkan</li>\n<li>Ambil BCA token Anda dan masukkan respon KEYBCA saat pilih APPLI1 dan pilih Submit</li>\n</ol>',
        },
        {
          id: 10,
          paymentMethodId: 2,
          paymentMethodName: BCA,
          title: "m-BCA",
          description:
            '<ol class="ak-ol">\n<li>Masuk ke aplikasi BCA Mobile Anda</li>\n<li>Pilih m-BCA, lalu masukkan kode akses m-BCA Anda</li>\n<li>Pilih m-Transfer, lalu pilih BCA Virtual Acccount</li>\n<li>Masukkan nomor Virtual Account atau pilih dari Daftar Transfer</li>\n<li>Jumlah tagihan akan ditampilkan di halaman konfirmasi pembayaran, jika informasi sudah benar, pilih Ya</li>\n<li>Masukkan pin m-BCA Anda</li>\n</ol>',
        },
      ],
    });
  }
  if (req.query.paymentMethodId === "3") {
    return res.status(200).json({
      data: [
        {
          id: 11,
          paymentMethodId: 3,
          paymentMethodName: PERMATA,
          title: "ATM",
          description:
            '<ol class="ak-ol">\n<li>Pada menu utama, pilih Transaksi Lainnya</li>\n<li>Pilih Pembayaran</li>\n<li>Pilih Pembayaran Lainnya</li>\n<li>Pilih Virtual Account</li>\n<li>Masukkan 16 digit nomor Virtual Account dan pilih Benar</li>\n<li>Jumlah tagihan akan ditampilkan di halaman konfirmasi pembayaran, jika informasi sudah benar, pilih Ya</li>\n</ol>',
        },
        {
          id: 12,
          paymentMethodId: 3,
          paymentMethodName: PERMATA,
          title: "PermataNet",
          description:
            '<ol class="ak-ol">\n<li>Pilih “Pembayaran Bayar Tagihan”</li>\n<li>Pilih Virtual Account</li>\n<li>Masukkan nomor Virtual Account</li>\n<li>Pilih Lanjutkan</li>\n<li>Jumlah tagihan akan ditampilkan di halaman konfirmasi pembayaran, jika informasi merchant dan total tagihan sudah benar, pilih Selanjutnya</li>\n<li>Masukkan kode respon Anda, kemudian pilih Lanjutkan</li>\n</ol>',
        },
        {
          id: 13,
          paymentMethodId: 3,
          paymentMethodName: PERMATA,
          title: "Permata Mobile X",
          description:
            '<ol class="ak-ol">\n<li>Pilih “Pembayaran Bayar Tagihan”</li>\n<li>Pilih Virtual Account</li>\n<li>Masukkan nomor Virtual Account, kemudian pilih OK</li>\n<li>Jumlah tagihan akan ditampilkan di halaman konfirmasi pembayaran, jika informasi merchant dan total tagihan sudah benar, pilih Selanjutnya</li>\n<li>Pilih nomor rekening yang akan digunakan</li>\n<li>Masukkan PIN, kemudian pilih Selanjutnya</li>\n</ol>',
        },
      ],
    });
  }
  if (req.query.paymentMethodId === "4") {
    return res.status(200).json({
      data: [
        {
          id: 14,
          paymentMethodId: 4,
          paymentMethodName: MANDIRI,
          title: "ATM Mandiri",
          description:
            '<ol class="ak-ol">\n<li>Pada menu utama, pilih Bayar</li>\n<li>Pilih Lainnya</li>\n<li>Pilih Multi Payment</li>\n<li>Masukkan 70012 dan pilih Benar</li>\n<li>Masukkan kode pembayaran Anda <b>TANPA 70012</b> dan pilih Benar</li>\n<li>Jumlah tagihan akan ditampilkan di halaman konfirmasi pembayaran, jika informasi sudah benar, pilih Ya</li>\n</ol>',
        },
        {
          id: 15,
          paymentMethodId: 4,
          paymentMethodName: MANDIRI,
          title: "Internet Banking",
          description:
            '<ol class="ak-ol">\n<li>Kunjungi <a href="https://ib.bankmandiri.co.id">https://ib.bankmandiri.co.id</a> dan Login</li>\n<li>Dari menu utama, pilih Pembayaran, lalu pilih Multi Payment</li>\n<li>Pilih akun Anda di From Account, pada Billing Name pilih Midtrans</li>\n<li>Masukkan kode pembayaran <b>TANPA 70012</b> dan detail pembayaran akan ditampilkan</li>\n<li>Konfirmasi pembayaran Anda dengan menggukan Token Mandiri</li>\n</ol>',
        },
        {
          id: 16,
          paymentMethodId: 4,
          paymentMethodName: MANDIRI,
          title: "m-Banking (Mandiri Online)",
          description:
            '<ol class="ak-ol">\n<li>Login Mandiri Online dengan memasukkan username dan password</li>\n<li>Pilih menu “Bayar”</li>\n<li>Pilih “Buat Pembayaran Baru”</li>\n<li>Pilih menu “Multipayment”</li>\n<li>Pilih penyedia jasa “Midtrans”</li>\n<li>Masukkan Nomor Virtual Account TANPA 70012</li>\n<li>Pilih Lanjut</li>\n<li>Pilih Jumlah Tagihan kemudian pilih Lanjut</li>\n<li>Setelah muncul tagihan, pilih Konfirmasi</li>\n<li>Masukkan MPIN</li>\n</ol>',
        },
      ],
    });
  }
  if (req.query.paymentMethodId === "5") {
    return res.status(200).json({
      data: [
        {
          id: 17,
          paymentMethodId: 5,
          paymentMethodName: "Ovo",
          title: "Aplikasi Ovo",
          description:
            "<ol><li>Buka aplikasi OVO Pilih notifikasi tagihan pembayaran SehatQ</li><li> Tap lonceng di bagian kanan atas</li><li> Tap bayar Selesai!</li> <li> Pesananmu segera diproses</li></ol>",
        },
      ],
    });
  }
  if (req.query.paymentMethodId === "6") {
    return res.status(200).json({
      data: [
        {
          id: 18,
          paymentMethodId: 6,
          paymentMethodName: "Shopee Pay",
          title: "Aplikasi Shopee",
          description:
            "<ol class='ak-lol'><li>Pastikan kamu sudah login di aplikasi SHOPEEPAY</li><li>Arahkan kamera ke Kode QR</li><li>Buka aplikasi SHOPEE di smartphone kamu, pilih Pay</li><li>Periksa kembali detail pembayaran Anda di aplikasi SHOPEE dan pilih Pay</li><li>Transaksi kamu selesai</li></ol>",
        },
      ],
    });
  }

  if (req.query.paymentMethodId === "7") {
    return res.status(200).json({
      data: [
        {
          id: 19,
          paymentMethodId: 7,
          paymentMethodName: "Gopay",
          title: "Aplikasi Gojek",
          description:
            "<ol><li> Buka aplikasi Gojek</li><li>Klik Bayar dan scan kode QR</li><li>Periksa kembali total tagihan Anda dan klik Bayar</li><li>Masukkan PIN Gopay dan transaksi selesai</li></ol>",
        },
      ],
    });
  }
}
