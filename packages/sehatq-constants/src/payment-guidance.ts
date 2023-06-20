export const PAYMENT_GUIDANCE = {
  gopay: [
    "Buka aplikasi gojek",
    "Klik bayar dan scan QR code",
    "Periksa kembali total tagihan anda dan klik bayar",
    "Masukan PIN Gopay dan transaksi selesai",
  ],
  mandiri: [
    "Login Mandiri Online dengan memasukan username dan password",
    'Pilih menu "Bayar"',
    'Pilih "Buat Pembayaran Baru"',
    'Pilih menu "Multipayment"',
    'Pilih penyedia jasa "Midtrans"',
    "Masukan nomor virtual account tanpa 70012",
    "Pilih lanjut",
    "Pilih jumlah tagihan kemudian pilih lanjut",
    "Setelah muncul tagihan, pilih konfirmasi",
    "Masukan MPIN",
  ],
  ovo: [
    "Buka aplikasi OVO",
    "Tap lonceng di bagian kanan atas",
    "Pilih notifikasi tagihan pembayaran SehatQ",
    "Tap bayar",
    "Selesai! Pesananmu segera diproses",
  ],
} as const;
