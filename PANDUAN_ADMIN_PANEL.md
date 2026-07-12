# Panduan Admin Panel Java Origins

**Admin Panel URL:** https://admin.javaorigins.co.nz/admin/login

**Kredensial Login:**
- Email: `admin@javaroyale.com`
- Password: `admin123`

---

## 📝 Cara Mengelola Artikel

### Membuat Artikel Baru

1. Login ke admin panel → klik menu **"Articles"** di sidebar
2. Klik tombol **"+ New Article"** (pojok kanan atas)
3. Isi form artikel:

#### **Konten Artikel**

**Judul*** (wajib)
- Masukkan judul artikel (contoh: "5 Manfaat Jamu untuk Kesehatan")

**Slug** (opsional)
- Kosongkan saja, sistem akan auto-generate dari judul
- Slug adalah URL artikel (contoh: `5-manfaat-jamu-untuk-kesehatan`)

**Kategori*** (wajib)
- Pilih salah satu dari dropdown:
  - `health-tips` → Tips Kesehatan
  - `export-insights` → Wawasan Ekspor
  - `recipes` → Resep
  - `news` → Berita
- Atau ketik kategori baru sesuai kebutuhan

**Konten*** (wajib)
- Gunakan editor rich text (seperti Word)
- Toolbar tersedia: **Bold**, *Italic*, Heading, List, Link, dll.
- **Cara sisipkan gambar di dalam konten:**
  1. Klik icon gambar di toolbar editor
  2. Pilih gambar dari komputer
  3. Gambar akan otomatis muncul di dalam konten

#### **Publikasi** (sidebar kanan)

**Publish artikel**
- Centang checkbox jika ingin artikel langsung tayang di website
- Jangan centang jika masih draft

**Tanggal Publish** (opsional)
- Pilih tanggal & waktu publish
- Kosongkan = otomatis pakai waktu sekarang

#### **Featured Image** (sidebar kanan)

- Klik **"Choose File"** → pilih gambar utama artikel
- **Format:** JPG, PNG, WebP
- **Ukuran maksimal:** 10MB (sudah dinaikkan dari 5MB)
- Gambar ini akan muncul di card artikel di homepage & halaman blog

4. Klik tombol **"Buat Artikel"** (biru, di sidebar kanan)

---

### Edit / Hapus Artikel

**Edit:**
1. Halaman Articles → klik icon **pensil** di kolom "Actions"
2. Ubah data → klik **"Simpan Perubahan"**

**Hapus:**
1. Halaman Articles → klik icon **tempat sampah** (merah)
2. Konfirmasi penghapusan

---

## 🛒 Cara Mengelola Produk

### Membuat Produk Baru

1. Login → menu **"Products"** → klik **"+ New Product"**
2. Isi form produk:

#### **Informasi Produk**

**Nama Produk*** (wajib)
- Contoh: "Java Drink Original"

**Slug** (opsional)
- Kosongkan = auto-generate dari nama produk

**Deskripsi** (opsional)
- Deskripsi singkat produk (plain text, tanpa formatting)

**Keunggulan (Advantages)** (opsional)
- Isi 3 poin keunggulan produk
- Contoh: "100% Natural Ingredients", "No Added Sugar", "Rich in Antioxidants"

#### **Ingredients (Bahan-Bahan)**

Klik **"+ Tambah Ingredient"** untuk menambah bahan:
- **Nama:** contoh "Ginger"
- **Persentase:** contoh "30"
- **Deskripsi:** contoh "Fresh organic ginger from Java highlands"

Ulangi untuk setiap bahan. Klik **"× Hapus"** jika salah.

#### **Nutrition Facts (Informasi Gizi)**

Klik **"+ Tambah Nutrition"** untuk menambah item gizi:
- **Nama:** contoh "Calories"
- **Nilai:** contoh "120"
- **Unit:** contoh "kcal"

Contoh lengkap:
- Calories → 120 → kcal
- Protein → 2 → g
- Total Fat → 0.5 → g
- Carbohydrates → 28 → g
- Sugar → 22 → g

#### **Gambar Produk** (sidebar kanan)

**Upload Gambar Utama:**
- Klik **"Choose File"** → pilih 1 atau beberapa gambar
- Bisa upload multiple gambar sekaligus
- Format: JPG, PNG, WebP
- Gambar ini akan tampil di homepage & halaman detail produk

**Catatan:** Jika ada gambar lama dan upload gambar baru, gambar lama akan **terhapus otomatis**.

#### **Product Variants (Varian Produk)** (opsional)

Jika produk punya varian (ukuran/rasa berbeda), klik **"+ Tambah Varian"**:

**Nama Varian*** (wajib)
- Contoh: "330ml Can" atau "Original Flavor"

**SKU** (opsional)
- Kode unik varian (contoh: "JD-330-ORI")

**Harga** (opsional)
- Contoh: "25000"

**Harga Coret** (opsional)
- Harga sebelum diskon (jika ada)

**Stok** (opsional)
- Jumlah stok tersedia

**Upload Gambar Varian** (opsional)
- Gambar khusus untuk varian ini (jika berbeda dari gambar utama)

Klik **"× Hapus Varian"** jika tidak diperlukan.

#### **Publikasi** (sidebar kanan)

**Published**
- Centang = produk tayang di website
- Jangan centang = produk disembunyikan (draft)

3. Klik tombol **"Buat Produk"** (biru, di sidebar kanan)

---

### Edit / Hapus Produk

**Edit:**
1. Halaman Products → klik icon **pensil**
2. Ubah data → **"Simpan Perubahan"**

**Hapus:**
1. Klik icon **tempat sampah** (merah)
2. Konfirmasi penghapusan

---

## 🔍 Tips Penting

### Upload Gambar
- **Artikel:** maksimal **10MB** per gambar
- **Produk:** tidak ada batasan jumlah gambar, tapi usahakan gambar berkualitas tinggi
- Format yang direkomendasikan: **JPG** atau **WebP** (lebih kecil ukurannya)
- Gambar akan otomatis tersimpan di folder `storage/app/public/`

### Featured Image vs Gambar di Konten
- **Featured Image:** gambar utama yang muncul di card listing (homepage, blog list)
- **Gambar di dalam konten:** gambar yang disisipkan melalui editor rich text (hanya untuk artikel)

### Slug Auto-Generate
- Jika Anda kosongkan field **"Slug"**, sistem akan otomatis buat dari judul/nama:
  - "5 Manfaat Jamu" → `5-manfaat-jamu`
  - "Java Drink Original" → `java-drink-original`
- Slug digunakan di URL produk/artikel (contoh: `javaorigins.co.nz/articles/5-manfaat-jamu`)

### Publish vs Draft
- **Centang "Publish"** → langsung tayang di website untuk publik
- **Tidak dicentang** → tersimpan sebagai draft, hanya admin yang bisa lihat di admin panel

### Kategori Artikel
Gunakan kategori yang konsisten agar artikel terorganisir:
- `health-tips` → artikel tentang kesehatan & wellness
- `export-insights` → artikel tentang ekspor & bisnis
- `recipes` → resep minuman/makanan
- `news` → berita terbaru perusahaan

---

## 📱 Responsive Mobile

Admin panel **sudah responsive** untuk mobile:
- Sidebar otomatis jadi **hamburger menu** di layar kecil
- Semua tabel bisa **di-scroll horizontal** jika terlalu lebar
- Form tetap nyaman diisi dari smartphone

---

## ❓ Troubleshooting

### Gambar tidak muncul di website
1. Pastikan gambar sudah di-upload dan tersimpan
2. Cek ukuran file tidak melebihi batas (10MB untuk artikel)
3. Pastikan produk/artikel sudah di-**publish** (checkbox dicentang)

### Error saat upload gambar
- Periksa format file (harus JPG/PNG/WebP, bukan PDF/DOCX)
- Compress gambar jika terlalu besar (gunakan tools online seperti TinyPNG)

### Slug sudah digunakan
- Ganti slug manual dengan nama yang unik
- Atau hapus produk/artikel lama yang pakai slug sama

---

## 📞 Kontak Support

Jika ada kendala teknis atau pertanyaan:
- **Email:** javaroyalenusantara@gmail.com
- **WhatsApp:** +62 821-3061-3460

---

**Terakhir diupdate:** Juli 2026  
**Versi Admin Panel:** 1.0
