/* ==========================================================================
   useContent — ambil isi portofolio dari KroomBase, fallback ke data lokal.
   --------------------------------------------------------------------------
   Satu permintaan per tabel, dijalankan paralel. Tabel yang gagal/tidak ada
   cukup dilewati: bagian itu tetap memakai isi lokal. Jadi halaman selalu
   tampil, bahkan tanpa KroomBase.

   Nama tabel di KroomBase  ->  kunci di DATA (bentuk yang dipakai UI)
     profil      ->  { nama, peran, heroDesc, ... }   (tabel key-value)
     tentang     ->  tentangParagraf[]
     statistik   ->  statistik[]
     keahlian    ->  keahlian[]  (dikelompokkan per kolom `grup`)
     proyek      ->  proyek[]
     pengalaman  ->  pengalaman[]
     pendidikan  ->  pendidikan[]
     sertifikat  ->  sertifikat[]
     kontak      ->  kontak[]
     sosial      ->  sosial[]
     tools       ->  tools[]
   Tabel tidak perlu ada semua — yang ada saja yang dipakai.
   ========================================================================== */

import { useEffect, useState } from "react";
import { DATA as LOKAL } from "../data/defaults.js";
import { kbGet, kbSiap, KB_URL, KB_KEY } from "../lib/kroombase.js";

const pisah = (v) =>
  Array.isArray(v)
    ? v
    : String(v || "")
        .split(/\s*[|,]\s*/)
        .filter(Boolean);

const angka = (v) => {
  const n = parseInt(v, 10);
  return Number.isFinite(n) ? n : 0;
};

const urut = (a, b) => angka(a.urutan) - angka(b.urutan);
const barisOk = (rows) => Array.isArray(rows) && rows.length > 0;

/* --------------------- pemetaan baris database -> UI --------------------- */

const AMBIL_PROFIL = {
  nama: "nama",
  nama_pendek: "namaPendek",
  panggilan: "panggilan",
  peran: "peran",
  lokasi: "lokasi",
  status: "status",
  hero_desc: "heroDesc",
  tentang_lead: "tentangLead",
  foto: "foto",
  cv_url: "cvUrl",
};

function profilDari(rows) {
  if (!barisOk(rows)) return null;
  const out = {};
  rows.forEach((r) => {
    const kunci = AMBIL_PROFIL[r.kunci];
    if (kunci && r.nilai !== undefined && r.nilai !== null && r.nilai !== "") out[kunci] = r.nilai;
    if (r.kunci === "peran_typed") out.peranTyped = pisah(r.nilai);
  });
  return Object.keys(out).length ? out : null;
}

const tentangDari = (rows) => (barisOk(rows) ? [...rows].sort(urut).map((r) => r.isi).filter(Boolean) : null);

const statistikDari = (rows) =>
  barisOk(rows)
    ? [...rows].sort(urut).map((r) => ({ angka: angka(r.angka), sufiks: r.sufiks || "", label: r.label || "" }))
    : null;

function keahlianDari(rows) {
  if (!barisOk(rows)) return null;
  const grup = new Map();
  [...rows].sort(urut).forEach((r) => {
    const g = r.grup || "Lainnya";
    if (!grup.has(g)) grup.set(g, []);
    grup.get(g).push({ nama: r.nama || "", nilai: angka(r.nilai) });
  });
  return Array.from(grup, ([judul, isi]) => ({ judul, isi }));
}

const proyekDari = (rows) =>
  barisOk(rows)
    ? [...rows].sort(urut).map((r) => ({
        judul: r.judul || "",
        deskripsi: r.deskripsi || "",
        kategori: r.kategori || "Lainnya",
        tags: pisah(r.tags),
        gambar: r.gambar || "",
        linkDemo: r.link_demo || "",
        linkKode: r.link_kode || "",
        unggulan: r.unggulan === true || r.unggulan === "true" || r.unggulan === "t",
      }))
    : null;

const timelineDari = (rows) =>
  barisOk(rows)
    ? [...rows].sort(urut).map((r) => ({
        periode: r.periode || "",
        posisi: r.posisi || "",
        tempat: r.tempat || "",
        deskripsi: r.deskripsi || "",
      }))
    : null;

const sertifikatDari = (rows) =>
  barisOk(rows)
    ? [...rows].sort(urut).map((r) => ({
        judul: r.judul || "",
        penerbit: r.penerbit || "",
        gambar: r.gambar || "",
        link: r.link || "",
      }))
    : null;

const kontakDari = (rows) =>
  barisOk(rows)
    ? [...rows].sort(urut).map((r) => ({
        label: r.label || "",
        nilai: r.nilai || "",
        link: r.link || "",
        ikon: r.ikon || "link",
      }))
    : null;

const sosialDari = (rows) =>
  barisOk(rows)
    ? [...rows]
        .sort(urut)
        .filter((r) => r.link && r.link !== "#")
        .map((r) => ({ nama: r.nama || "", link: r.link, ikon: r.ikon || "link" }))
    : null;

const toolsDari = (rows) => (barisOk(rows) ? [...rows].sort(urut).map((r) => r.nama).filter(Boolean) : null);

/* tabel KroomBase -> { kunci DATA, pemeta } */
const PETA = {
  profil:     { kunci: null,              peta: profilDari },
  tentang:    { kunci: "tentangParagraf", peta: tentangDari },
  statistik:  { kunci: "statistik",       peta: statistikDari },
  keahlian:   { kunci: "keahlian",        peta: keahlianDari },
  proyek:     { kunci: "proyek",          peta: proyekDari },
  pengalaman: { kunci: "pengalaman",      peta: timelineDari },
  pendidikan: { kunci: "pendidikan",      peta: timelineDari },
  sertifikat: { kunci: "sertifikat",      peta: sertifikatDari },
  kontak:     { kunci: "kontak",          peta: kontakDari },
  sosial:     { kunci: "sosial",          peta: sosialDari },
  tools:      { kunci: "tools",           peta: toolsDari },
};

/* ------------------------------- hook ----------------------------------- */

export function useContent() {
  const [data, setData] = useState(LOKAL);
  const [tabelAktif, setTabelAktif] = useState([]);
  const [galat, setGalat] = useState("");
  const [status, setStatus] = useState(() => (kbSiap() ? "memuat" : "lokal"));

  useEffect(() => {
    if (!kbSiap()) return;
    let batal = false;

    (async () => {
      const hasil = await Promise.all(
        Object.entries(PETA).map(async ([tabel, { peta }]) => {
          try {
            const rows = await kbGet(tabel, { limit: 200 });
            return { tabel, nilai: peta(rows), ok: true };
          } catch (e) {
            return { tabel, nilai: null, ok: false, pesan: e.message };
          }
        })
      );
      if (batal) return;

      const tambalan = {};
      const aktif = [];
      const gagal = [];

      hasil.forEach(({ tabel, nilai, ok, pesan }) => {
        if (ok && nilai) {
          const kunci = PETA[tabel].kunci;
          if (kunci) tambalan[kunci] = nilai;
          else Object.assign(tambalan, nilai); // tabel profil
          aktif.push(tabel);
        } else if (!ok) {
          gagal.push(`${tabel}: ${pesan}`);
        }
      });

      setData((d) => ({ ...d, ...tambalan }));
      setTabelAktif(aktif);
      setStatus(aktif.length ? "kroombase" : "lokal");
      setGalat(aktif.length ? "" : gagal.join(" · ") || "KroomBase tidak menjawab — memakai data lokal.");
    })();

    return () => { batal = true; };
  }, []);

  return {
    data,
    status,
    tabelAktif,
    galat,
    kbUrl: KB_URL,
    kbAdaKunci: Boolean(KB_KEY),
  };
}

export default useContent;
