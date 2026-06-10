# SQL Coffee — CMS Setup (Sanity) untuk Halaman Journal/Artikel

Halaman **Journal** (`/artikel` + `/artikel/:id`) dibuat **CMS-driven** pakai
[Sanity](https://www.sanity.io). Artikel dikelola lewat **Sanity Studio**
(dashboard CMS), lalu otomatis tampil di website.

> Kalau `.env` belum diisi, website tetap jalan memakai data lokal
> (`src/data/dummyData.js`) sebagai fallback. Jadi aman dikerjakan bertahap.

---

## Bagian A — Bikin project & Studio Sanity (sekali saja)

1. **Daftar/login** di https://www.sanity.io (bisa pakai Google/GitHub).

2. Di terminal mana saja (di luar folder project ini juga boleh), buat Studio baru:
   ```bash
   npm create sanity@latest -- --template clean --create-project "SQL Coffee CMS" --dataset production
   ```
   - Pilih **TypeScript: No** (biar gampang), output path misal `sql-coffee-cms`.
   - Setelah jadi, catat **Project ID** (muncul di terminal & di sanity.io/manage).

3. **Tambahkan schema Article.** Di folder Studio, buat file
   `schemaTypes/article.js` dengan isi berikut:
   ```js
   export default {
     name: 'article',
     title: 'Article',
     type: 'document',
     fields: [
       {
         name: 'id',
         title: 'ID (angka, unik — dipakai untuk URL)',
         type: 'number',
         validation: (Rule) => Rule.required(),
       },
       { name: 'title', title: 'Title', type: 'string', validation: (R) => R.required() },
       { name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3 },
       {
         name: 'body',
         title: 'Body (pisahkan paragraf dengan baris kosong)',
         type: 'text',
         rows: 12,
       },
       { name: 'category', title: 'Category', type: 'string' },
       { name: 'date', title: 'Date', type: 'date' },
       { name: 'image', title: 'Image URL', type: 'url' },
     ],
     preview: { select: { title: 'title', subtitle: 'category' } },
   };
   ```

4. Daftarkan schema itu di `schemaTypes/index.js`:
   ```js
   import article from './article';
   export const schemaTypes = [article];
   ```

5. Jalankan Studio:
   ```bash
   npm run dev
   ```
   Buka http://localhost:3333 → **+ Create → Article** → isi beberapa artikel.
   - **id**: isi angka unik (1, 2, 3, ...) — ini dipakai untuk link `/artikel/<id>`.
   - **image**: tempel URL gambar (boleh dari Unsplash).
   - **body**: tulis isi artikel, pisahkan tiap paragraf dengan **satu baris kosong**.
   - Klik **Publish** tiap artikel.

6. **Izinkan website membaca data (CORS).** Buka
   https://www.sanity.io/manage → pilih project → **API → CORS origins → Add**:
   - `http://localhost:5173` (untuk dev Vite)
   - URL hosting kamu nanti (kalau di-deploy)

   Pastikan dataset **production** bersifat *public* (default) supaya bisa dibaca
   tanpa token.

---

## Bagian B — Sambungkan ke project React ini

1. Di root project ini, salin `.env.example` jadi `.env`:
   ```bash
   cp .env.example .env
   ```
2. Isi nilainya:
   ```
   VITE_SANITY_PROJECT_ID=xxxxxx     # Project ID dari Sanity
   VITE_SANITY_DATASET=production
   ```
3. **Restart** dev server (env hanya terbaca saat start):
   ```bash
   npm run dev
   ```
4. Buka halaman **Journal** → artikel sekarang datang dari Sanity. 🎉
   Tambah/edit artikel di Sanity Studio → refresh web → langsung berubah.

---

## Cara kerja di kode (yang sudah aku siapkan)

- `src/lib/sanity.js` — bikin client & query GROQ, plus flag `isSanityConfigured`.
- `src/context/DataContext.jsx` — kalau Sanity aktif, `articles` di-fetch dari
  Sanity saat load; kalau tidak, pakai dummyData (fallback). Semua halaman yang
  menampilkan artikel (Journal, Detail, teaser di Landing) otomatis ikut.
- Struktur data dipetakan agar **sama persis** dengan format lama
  (`{ id, title, excerpt, content, category, date, image }`) — jadi tidak ada
  perubahan tampilan, hanya sumber datanya yang pindah ke CMS.

## Catatan penting

- Sumber kebenaran artikel = **Sanity Studio**. Halaman admin lokal
  *Manage Articles* tetap ada, tapi edit di situ **tidak** dikirim balik ke
  Sanity (hanya mengubah tampilan sementara). Untuk demo CMS, kelola artikel
  lewat **Sanity Studio**.
- `.env` jangan di-commit (berisi config-mu). `.env.example` aman di-commit.
