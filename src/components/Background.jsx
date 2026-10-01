/* ==========================================================================
   Latar: orb, grid, noise, kanvas partikel — dan kursor kustom.
   Perilakunya sama dengan index.html versi lama (partikel berhenti saat tab
   tidak aktif, menghormati mode "kurangi gerak", kursor mati di layar sentuh).
   ========================================================================== */

import { useEffect, useRef } from "react";

export function Background({ partikel = true, reduced = false, warnaAksen = "47,230,189" }) {
  const cvs = useRef(null);
  const state = useRef({ raf: null, parts: [], mouse: { x: -9999, y: -9999 } });
  const aksen = useRef(warnaAksen);
  aksen.current = warnaAksen;

  useEffect(() => {
    const aktif = partikel && !reduced;
    const canvas = cvs.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const s = state.current;

    const ukuran = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const jml = Math.min(110, Math.round((w * h) / 16000));
      s.parts = Array.from({ length: jml }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() * 1.5 + 0.5,
      }));
    };

    const gambar = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const acc = aksen.current;
      ctx.clearRect(0, 0, w, h);
      const parts = s.parts;
      for (let i = 0; i < parts.length; i++) {
        const p = parts[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        const dx = p.x - s.mouse.x;
        const dy = p.y - s.mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 16000) {
          const f = (16000 - d2) / 16000;
          p.x += dx * 0.006 * f;
          p.y += dy * 0.006 * f;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${acc},.5)`;
        ctx.fill();

        for (let j = i + 1; j < parts.length; j++) {
          const q = parts[j];
          const gx = p.x - q.x;
          const gy = p.y - q.y;
          const g = gx * gx + gy * gy;
          if (g < 13000) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(${acc},${(1 - g / 13000) * 0.16})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }
      s.raf = requestAnimationFrame(gambar);
    };

    const mulai = () => {
      if (s.raf || document.hidden) return;
      ukuran();
      s.raf = requestAnimationFrame(gambar);
    };
    const stop = () => {
      if (s.raf) cancelAnimationFrame(s.raf);
      s.raf = null;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    };

    const onResize = () => { if (s.raf) ukuran(); };
    const onMove = (e) => { s.mouse.x = e.clientX; s.mouse.y = e.clientY; };
    const onOut = () => { s.mouse.x = s.mouse.y = -9999; };
    const onVis = () => (document.hidden ? stop() : (aktif ? mulai() : stop()));

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onOut);
    document.addEventListener("visibilitychange", onVis);

    if (aktif) mulai();
    else stop();

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onOut);
      document.removeEventListener("visibilitychange", onVis);
      stop();
    };
  }, [partikel, reduced]);

  return (
    <>
      <div className="bg-grid" />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <canvas id="particles" ref={cvs} style={{ display: partikel ? "" : "none" }} />
      <div className="bg-noise" />
    </>
  );
}

/* ---------------------------- KURSOR KUSTOM ----------------------------- */
export function CustomCursor({ reduced = false }) {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia("(hover:hover) and (pointer:fine)").matches) return;

    const d = dot.current;
    const r = ring.current;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = null;
    document.body.classList.add("has-cursor");

    const lerp = (a, b, t) => a + (b - a) * t;
    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      d.style.transform = `translate(${mx - 3}px,${my - 3}px)`;
      const t = e.target.closest("a,button,.card,.tool,.sw,input,textarea,.tst-dots i");
      r.classList.toggle("is-hover", !!t);
    };
    const follow = () => {
      rx = lerp(rx, mx, 0.16);
      ry = lerp(ry, my, 0.16);
      r.style.transform = `translate(${rx - 18}px,${ry - 18}px)`;
      raf = requestAnimationFrame(follow);
    };
    const sembunyi = () => { d.style.opacity = r.style.opacity = "0"; };
    const tampil = () => { d.style.opacity = r.style.opacity = "1"; };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", sembunyi);
    window.addEventListener("mouseenter", tampil);
    raf = requestAnimationFrame(follow);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", sembunyi);
      window.removeEventListener("mouseenter", tampil);
      if (raf) cancelAnimationFrame(raf);
      document.body.classList.remove("has-cursor");
    };
  }, [reduced]);

  return (
    <>
      <div className="cur-ring" ref={ring} />
      <div className="cur-dot" ref={dot} />
    </>
  );
}

export default Background;
