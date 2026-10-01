/* ==========================================================================
   KROOMBASE — konfigurasi & klien REST
   --------------------------------------------------------------------------
   Semua nilai diambil dari environment Vite (.env / .env.local):

     VITE_KROOMBASE_URL      contoh: https://kroombase.kroombox.com
     VITE_KROOMBASE_API_KEY  API key milik project (header `apikey`)

   API key di aplikasi statis memang ikut terkirim ke browser — karena itu
   tabel yang boleh dibaca publik hanya berisi data yang memang untuk publik.
   ========================================================================== */

export const KB_URL = (import.meta.env.VITE_KROOMBASE_URL || "").replace(/\/+$/, "");
export const KB_KEY = (import.meta.env.VITE_KROOMBASE_API_KEY || "");

export const kbSiap = () => Boolean(KB_URL && KB_KEY);

async function kbFetch(path, options = {}) {
  if (!kbSiap()) throw new Error("KroomBase belum dikonfigurasi");
  const res = await fetch(`${KB_URL}/rest${path}`, {
    ...options,
    headers: {
      apikey: KB_KEY,
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...(options.headers || {}),
    },
  });
  const teks = await res.text();
  let data = null;
  try { data = teks ? JSON.parse(teks) : null; } catch { data = teks; }
  if (!res.ok) {
    const pesan = (data && data.error) || `HTTP ${res.status}`;
    throw new Error(pesan);
  }
  return data;
}

export const kbGet = (tabel, params = {}) => {
  const q = new URLSearchParams(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== "")
  ).toString();
  return kbFetch(`/${tabel}${q ? `?${q}` : ""}`);
};

export const kbPost = (tabel, baris) =>
  kbFetch(`/${tabel}`, { method: "POST", body: JSON.stringify(baris) });
