/* ==========================================================================
   ISI PORTOFOLIO — versi bawaan (fallback lokal).
   --------------------------------------------------------------------------
   Data ini dipakai kalau KroomBase belum dikonfigurasi / sedang tidak bisa
   diakses. Kalau KroomBase aktif, isi dari database yang menang.

   Semua yang di bawah ini jujur apa adanya: proyeknya proyek latihan &
   tugas kuliah, bukan klien fiktif. Silakan sunting di KroomBase.
   ========================================================================== */

export const DATA = {
  /* ---------- IDENTITAS ---------- */
  nama: "Ahmad Al Laitsi Nasrulloh",
  namaPendek: "Ahmad Al Laitsi N.",
  panggilan: "Lais",
  peran: "Front-End Developer",
  lokasi: "Indonesia",
  status: "Terbuka untuk magang & kolaborasi",
  peranTyped: ["Front-End Developer", "Mahasiswa Telkom University", "Web Developer", "Problem Solver"],
  heroDesc:
    "Mahasiswa Telkom University yang membangun antarmuka web — rapi, cepat, dan nyaman dipakai. Belajar lewat proyek nyata: HTML, CSS, JavaScript, React, dan database.",
  cvUrl: "", // isi: "assets/CV-Ahmad-Al-Laitsi.pdf" kalau filenya sudah ada
  foto: "",  // isi: "foto.jpg" (ditaruh di folder public/) kalau fotonya sudah ada

  /* ---------- TENTANG ---------- */
  tentangLead:
    "Saya membangun antarmuka yang tidak hanya enak dilihat, tapi juga rapi secara struktur dan mudah dirawat.",
  tentangParagraf: [
    "Halo, saya <strong>Ahmad Al Laitsi Nasrulloh</strong> — biasa dipanggil <strong>Lais</strong>. Saya mahasiswa <strong>Telkom University</strong> yang menekuni pengembangan web sisi depan: mengubah desain menjadi halaman yang hidup, rapi secara struktur, dan konsisten di setiap ukuran layar.",
    "Fokus saya ada di <strong>HTML, CSS, dan JavaScript</strong>, lalu berkembang ke <strong>React</strong>. Saya percaya detail kecil — spacing, kontras, durasi animasi, dan kecepatan muat — yang membedakan website biasa dengan website yang terasa profesional.",
    "Saya sedang aktif mengerjakan proyek latihan dan tugas kuliah untuk mengasah kemampuan ini, termasuk merancang basis data dan menulis dokumentasi teknis. Terbuka untuk magang, kolaborasi, atau proyek kecil.",
  ],
  statistik: [
    { angka: 1, sufiks: "+", label: "Tahun Belajar & Berkarya" },
    { angka: 4, sufiks: "", label: "Proyek Latihan" },
    { angka: 6, sufiks: "+", label: "Teknologi Dipakai" },
    { angka: 100, sufiks: "%", label: "Fokus ke Detail" },
  ],

  /* ---------- KEAHLIAN ---------- */
  keahlian: [
    {
      judul: "Front-End",
      isi: [
        { nama: "HTML & Semantic Markup", nilai: 85 },
        { nama: "CSS / Responsive Layout", nilai: 78 },
        { nama: "JavaScript (ES6+)", nilai: 72 },
        { nama: "React (dasar & komponen)", nilai: 62 },
      ],
    },
    {
      judul: "Tools & Alur Kerja",
      isi: [
        { nama: "Figma → Code", nilai: 70 },
        { nama: "Git & GitHub", nilai: 66 },
        { nama: "REST API & Fetch", nilai: 60 },
        { nama: "Perancangan Database (ERD)", nilai: 68 },
      ],
    },
    {
      judul: "Soft Skill",
      isi: [
        { nama: "Belajar Cepat", nilai: 90 },
        { nama: "Problem Solving", nilai: 76 },
        { nama: "Komunikasi & Kerja Tim", nilai: 78 },
        { nama: "Manajemen Waktu", nilai: 70 },
      ],
    },
  ],
  tools: [
    "HTML", "CSS", "JavaScript", "React", "Vite", "Tailwind CSS",
    "Node.js", "Git", "GitHub", "Figma", "draw.io", "REST API",
    "Laravel (dasar)", "JavaFX (kuliah)", "KroomBase",
  ],

  /* ---------- PROYEK ---------- */
  proyek: [
    {
      judul: "Website Portofolio Ini",
      deskripsi:
        "Portofolio pribadi yang dibangun ulang dengan React + Vite. Isi halaman (proyek, keahlian, sertifikat) dibaca dari database KroomBase lewat REST API, dengan fallback lokal saat offline.",
      kategori: "Web",
      tags: ["React", "Vite", "KroomBase", "REST API"],
      gambar: "assets/proyek-portofolio.png",
      linkDemo: "",
      linkKode: "",
      unggulan: true,
    },
    {
      judul: "Perancangan Database “Joybite”",
      deskripsi:
        "Tugas kuliah: memodelkan kebutuhan data aplikasi pemesanan makanan — ERD, tabel relasional, sampai aturan relasi antar entitas.",
      kategori: "Kuliah",
      tags: ["ERD", "draw.io", "Perancangan DB"],
      gambar: "assets/proyek-joybite-erd.png",
      linkDemo: "",
      linkKode: "",
    },
    {
      judul: "Latihan Aplikasi Web Laravel",
      deskripsi:
        "Latihan membangun halaman web dengan Laravel: routing, controller, dan Blade view untuk beberapa halaman contoh.",
      kategori: "Latihan",
      tags: ["Laravel", "PHP", "Blade", "MVC"],
      gambar: "",
      linkDemo: "",
      linkKode: "",
    },
    {
      judul: "Latihan Aplikasi Desktop JavaFX",
      deskripsi:
        "Tugas kuliah Framework JavaFX: menyusun antarmuka desktop dengan SceneBuilder lalu menghubungkannya ke logika program lewat controller.",
      kategori: "Kuliah",
      tags: ["Java", "JavaFX", "SceneBuilder"],
      gambar: "",
      linkDemo: "",
      linkKode: "",
    },
  ],

  /* ---------- PENGALAMAN ---------- */
  pengalaman: [
    {
      periode: "2025 — Sekarang",
      posisi: "Kolaborator Proyek Kuliah",
      tempat: "Telkom University",
      deskripsi:
        "Mengerjakan tugas kelompok: perancangan sistem (APSI), pemodelan proses bisnis dengan BPMN, perancangan basis data, dan dokumentasi teknis.",
    },
    {
      periode: "2024 — Sekarang",
      posisi: "Proyek Pribadi & Latihan Mandiri",
      tempat: "Mandiri",
      deskripsi:
        "Membangun website latihan dan proyek pribadi untuk mengasah HTML, CSS, JavaScript, dan React — termasuk portofolio ini.",
    },
  ],

  /* ---------- PENDIDIKAN ---------- */
  pendidikan: [
    {
      periode: "2025 — Sekarang",
      posisi: "S1 — (jurusan belum diisi)",
      tempat: "Telkom University",
      deskripsi: "Fokus pada dasar rekayasa perangkat lunak, pemrograman, dan perancangan sistem.",
    },
    {
      periode: "2022 — 2025",
      posisi: "Sekolah Menengah",
      tempat: "(nama sekolah belum diisi)",
      deskripsi: "Mulai belajar dasar pemrograman dan desain web secara mandiri.",
    },
  ],

  /* ---------- SERTIFIKAT ---------- */
  sertifikat: [
    {
      judul: "Google Agile Essentials",
      penerbit: "Google Career Certificates · Jun 2026",
      gambar: "assets/sertifikat-agile.jpg",
      link: "https://coursera.org/verify/specialization/D2LLUX8PF7E8",
    },
    {
      judul: "Google AI",
      penerbit: "Google Career Certificates · Jun 2026",
      gambar: "assets/sertifikat-ai.jpg",
      link: "https://coursera.org/verify/professional-cert/YC108K21QO60",
    },
  ],

  /* ---------- KONTAK & SOSIAL ---------- */
  kontak: [
    { label: "Email",    nilai: "ahmadallaitsi44@gmail.com", link: "mailto:ahmadallaitsi44@gmail.com", ikon: "mail" },
    { label: "WhatsApp", nilai: "+62 87748393298",           link: "https://wa.me/6287748393298",       ikon: "chat" },
    { label: "Lokasi",   nilai: "Indonesia",                 link: "",                                  ikon: "pin" },
  ],
  // Kosong = ikon sosial tidak ditampilkan. Isi dari tabel `sosial` di KroomBase.
  sosial: [],

  /* ---------- MENU ---------- */
  menu: [
    { id: "tentang",    label: "Tentang" },
    { id: "keahlian",   label: "Keahlian" },
    { id: "proyek",     label: "Proyek" },
    { id: "pengalaman", label: "Pengalaman" },
    { id: "sertifikat", label: "Sertifikat" },
    { id: "kontak",     label: "Kontak" },
  ],
};

/* Aksen warna — dipakai panel Tweaks */
export const PALET = [
  { nama: "Mint Neon",    a: "#2fe6bd", b: "#ffcc66", rgb: "47,230,189" },
  { nama: "Cyan Cyber",   a: "#38d6ff", b: "#a97bff", rgb: "56,214,255" },
  { nama: "Violet Pulse", a: "#9b8cff", b: "#ff7ad5", rgb: "155,140,255" },
  { nama: "Solar Amber",  a: "#ffc861", b: "#7ce3ff", rgb: "255,200,97" },
];

export default DATA;
