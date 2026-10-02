# 🧭 Kompas Ip (IP Address Tracker)

> Aplikasi pelacak alamat IP dan domain interaktif yang menyajikan data geolokasi akurat dengan visualisasi peta dinamis.

[![Live Demo](https://img.shields.io/badge/Live_Demo-kompas--ip.vercel.app-brightgreen?style=for-the-badge&logo=vercel)](https://kompas-ip.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-14+-202022?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Zustand](https://img.shields.io/badge/Zustand-5.0+-4C202D?style=for-the-badge&logo=react&logoColor=white)](https://zustand.docs.pmnd.rs/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0+-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9+-199900?style=for-the-badge&logo=leaflet&logoColor=white)](https://leafletjs.com/)

---

## 📸 Preview

![Kompas Ip Desktop Preview](https://raw.githubusercontent.com/Fikri-Ramadan/ip-finder/main/public/og-image.png)

---

## 🌟 Fitur Utama

- 🔍 **Smart IP & Domain Search**: Pencarian cerdas yang mendeteksi format alamat IP (IPv4/IPv6) atau nama Domain secara otomatis.
- 🗺️ **Interactive Dynamic Map**: Visualisasi lokasi pengguna di atas peta interaktif menggunakan LeafletJS dengan kustomisasi *marker* khusus.
- 📊 **Real-Time Geolocation Data**: Menampilkan rincian Alamat IP, Lokasi detail (Kota, Negara, Kode Pos), Zona Waktu, dan penyedia layanan internet (ISP).
- 📱 **Mobile-First Responsive Layout**: Antarmuka yang teroptimasi secara sempurna untuk berbagai ukuran layar (Desktop, Tablet, Mobile).
- 🛡️ **Error Handling & Validation**: Memvalidasi input pengguna secara *real-time* sebelum melakukan pemanggilan API untuk mencegah pemborosan *request* akibat format tidak valid.
- 🎯 **Auto-Locate on Load**: Mendeteksi dan memetakan alamat IP publik pengguna secara otomatis saat halaman pertama kali dimuat.

---

## ⚡️ Optimasi & Arsitektur Teknis

Tantangan utama dalam aplikasi pemetaan interaktif yang bergantung pada API eksternal adalah **mencegah render ulang (re-rendering) peta yang berat** dan **mengefisienkan pengiriman parameter API** berdasarkan jenis input pengguna.

### 🧠 Solusi: Smart Regex Routing & Map Instance Persistence

1. **Regex Pattern Identification**: Aplikasi tidak memerlukan *dropdown* dari pengguna untuk memilih tipe pencarian. Menggunakan algoritma *Regular Expression* (Regex), aplikasi secara otomatis mendeteksi apakah *query* berupa IP Address (`192.168...`) atau Domain (`google.com`), apabila domain maka akan dikonversi menjadi IP Address lalu pada endpoint IPWhoIs.
2. **Map Instance Mutability & Smooth Transitions**: Daripada merender ulang keseluruhan elemen `MapContainer` setiap kali kordinat baru diterima, aplikasi mendelegasikan pembaruan lokasi ke komponen pengontrol khusus (`MapFlyController`). Komponen ini memanfaatkan hook `useMap()` untuk mengakses *instance* peta yang sudah ada di memori secara langsung.
3. **Smart Viewport Offset**: Saat lokasi berpindah menggunakan `map.flyTo()`, aplikasi mengkalkulasi proyeksi matriks (`map.project` & `map.unproject`) untuk memberikan *offset* vertikal dinamis (110px di *mobile*, 70px di *desktop*). Hal ini memastikan posisi *marker* selalu berada di area yang terlihat nyaman tanpa tertutup oleh antarmuka bilah pencarian yang mengambang di atas peta.

> 💡 **Dampak**: Menghindari *memory leaks* pada browser, menghemat kuota *rate-limit* dari API pihak ketiga, dan menyajikan transisi pergerakan lokasi yang sangat instan dan *smooth* layaknya aplikasi *native*.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **State Management**: [Zustand](https://zustand.docs.pmnd.rs/) (Client-side state & global store)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Interactive Mapping**: [Leaflet.js](https://leafletjs.com/)
- **Data Source**: [IP Geolocation API by IPWhoIs](https://ipwhois.io/)
- **Deployment**: [Vercel](https://vercel.app/)

---

## 🚀 Memulai (Local Development)

Untuk menjalankan proyek ini secara lokal di komputer Anda, ikuti langkah-langkah berikut:

### Prasyarat
- Node.js versi 18.x atau lebih baru
- npm / pnpm / yarn

### Langkah-langkah

1. **Clone repository ini:**
   ```bash
   git clone https://github.com/Fikri-Ramadan/ip-finder.git
   cd ip-finder
   npm install
   npm run dev
