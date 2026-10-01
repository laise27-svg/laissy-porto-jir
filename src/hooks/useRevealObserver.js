/* ==========================================================================
   Pengamat reveal: memberi kelas "in" ke setiap elemen .reveal / .reveal-x /
   .scale-in yang masuk viewport — sama seperti skrip di index.html lama,
   tapi ikut memantau elemen yang baru muncul (hasil filter & data KroomBase).
   ========================================================================== */

import { useEffect } from "react";

const SELEKTOR = ".reveal:not(.in), .reveal-x:not(.in), .scale-in:not(.in)";

export function useRevealObserver(deps = []) {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(SELEKTOR).forEach((el) => el.classList.add("in"));
      return;
    }
    if (document.body.classList.contains("reduced")) {
      document.querySelectorAll(SELEKTOR).forEach((el) => el.classList.add("in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -40px 0px" }
    );

    const amati = (root = document) => {
      root.querySelectorAll(SELEKTOR).forEach((el) => io.observe(el));
    };
    amati();

    const mo = new MutationObserver(() => amati());
    mo.observe(document.body, { childList: true, subtree: true });

    // jaring pengaman: apa pun yang sudah terlihat, tampilkan
    const timer = setTimeout(() => {
      document.querySelectorAll(SELEKTOR).forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("in");
      });
    }, 500);

    return () => { io.disconnect(); mo.disconnect(); clearTimeout(timer); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export default useRevealObserver;
