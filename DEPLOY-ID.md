# Panduan Upload Portofolio Sandi Rahman

## 1. Coba di komputer
Ekstrak ZIP dan buka `index.html` di Chrome / Edge. Seluruh website dapat dijalankan tanpa PHP atau database.

## 2. Upload di GitHub Pages
1. Buat repositori baru (misalnya `sandi-rahman-portfolio`), **jangan** menggunakan repositori milik Sabit.
2. Upload **seluruh isi** ZIP ke root repositori. Pastikan `index.html` berada di root, berdampingan dengan `styles.css`, `script.js`, dan folder `assets`.
3. Buka Settings → Pages → Build and deployment → Deploy from a branch.
4. Pilih Branch: `main`, Folder: `/ (root)`, kemudian Save.
5. Setelah website terbit, periksa kembali foto, tautan LinkedIn, email, dan tombol Download CV.

## 3. Mengubah informasi
- Teks profil, judul, dan pengalaman: ubah `index.html`.
- Gaya warna, ukuran dan mobile: ubah `styles.css`.
- Interaksi filter, galeri dan zoom: ubah `script.js`.
- Foto: ganti file `.webp` di folder `assets` menggunakan nama sama agar referensi tidak putus.
- CV: ganti `assets/CV-Sandi-Rahman.pdf` bila ada versi baru.

## 4. Catatan penting sebelum website dibuat publik
Foto dan slide yang diberikan memuat merek serta area/proses produksi. Walau barcode atau identitas order tertentu telah disamarkan, **izin publikasi perusahaan tetap perlu diperiksa**, termasuk ketentuan kerahasiaan (NDA) dan persetujuan orang yang tampak pada foto. Jika belum diizinkan, sebaiknya lepaskan / ganti foto sebelum upload.

Pendidikan ditampilkan sebagai **sedang berlangsung** sesuai CV, bukan sebagai gelar yang sudah diperoleh. Ilustrasi sistem digital bukan screenshot aplikasi asli.
