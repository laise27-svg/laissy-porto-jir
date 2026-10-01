/* ==========================================================================
   usePreferences — palet warna, partikel, dan mode "kurangi gerak".
   Disimpan di localStorage supaya pilihanmu bertahan.
   ========================================================================== */

import { useCallback, useEffect, useState } from "react";
import { PALET } from "../data/defaults.js";
import { toast } from "../components/Reveal.jsx";

const baca = (k, bawaan) => {
  try {
    const v = localStorage.getItem("porto-" + k);
    return v === null ? bawaan : v;
  } catch {
    return bawaan;
  }
};
const simpan = (k, v) => {
  try { localStorage.setItem("porto-" + k, v); } catch { /* mode privat */ }
};

export function usePreferences() {
  const [palet, setPalet]       = useState(() => parseInt(baca("palet", "0"), 10) || 0);
  const [partikel, setPartikel] = useState(() => baca("partikel", "1") !== "0");
  const [reduced, setReduced]   = useState(() => {
    if (baca("gerak", "0") === "1") return true;
    return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion:reduce)").matches;
  });

  const aksen = PALET[palet] || PALET[0];

  /* aksen warna -> CSS variables (dipakai canvas partikel & seluruh CSS) */
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--accent", aksen.a);
    root.style.setProperty("--accent-2", aksen.b);
    root.style.setProperty("--accent-rgb", aksen.rgb);
    simpan("palet", String(palet));
  }, [palet, aksen]);

  /* mode kurangi gerak -> kelas di <body> (aturannya ada di portfolio.css) */
  useEffect(() => {
    document.body.classList.toggle("reduced", reduced);
    simpan("gerak", reduced ? "1" : "0");
    if (reduced) {
      document.querySelectorAll(".reveal,.reveal-x,.scale-in").forEach((el) => el.classList.add("in"));
    }
  }, [reduced]);

  useEffect(() => { simpan("partikel", partikel ? "1" : "0"); }, [partikel]);

  const pilihPalet = useCallback((i) => {
    setPalet(i);
    const p = PALET[i];
    if (p) toast("Warna aksen: " + p.nama);
  }, []);

  return {
    palet,
    setPalet: pilihPalet,
    partikel,
    setPartikel,
    reduced,
    setReduced,
    aksenRgb: aksen.rgb,
  };
}

export default usePreferences;
