/* ==========================================================================
   Kerangka halaman: progress bar, navbar, menu mobile, footer,
   panel Tweaks, dan lencana status KroomBase.
   ========================================================================== */

import { useEffect, useRef, useState } from "react";
import { PALET } from "../data/defaults.js";
import { Icon } from "../lib/icons.jsx";
import { Reveal, toast } from "./Reveal.jsx";

/* ------------------------- PROGRESS + NAVBAR ---------------------------- */
export function Chrome({ data, reduced, prefs, kb }) {
  const [menuBuka, setMenuBuka] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [aktif, setAktif] = useState(data.menu?.[0]?.id || "tentang");
  const [sembunyi, setSembunyi] = useState(false);
  const bar = useRef(null);
  const nav = useRef(null);
  const lastY = useRef(0);

  useEffect(() => {
    const menu = data.menu || [];
    const onScroll = () => {
      const h = document.documentElement;
      const pct = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight);
      if (bar.current) bar.current.style.width = pct * 100 + "%";

      const y = h.scrollTop;
      setScrolled(y > 24);
      if (nav.current) nav.current.style.height = y > 640 ? "58px" : "";
      setSembunyi(y > 640 && y > lastY.current + 4 && pct < 0.985);
      lastY.current = y;

      let sekarang = menu[0]?.id;
      menu.forEach((m) => {
        const el = document.getElementById(m.id);
        if (el && el.getBoundingClientRect().top <= 140) sekarang = m.id;
      });
      setAktif(sekarang);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [data.menu]);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", menuBuka);
    const onKey = (e) => { if (e.key === "Escape") setMenuBuka(false); };
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.body.classList.remove("no-scroll"); };
  }, [menuBuka]);

  useEffect(() => {
    document.title = `${data.nama} — ${data.peran}`;
  }, [data.nama, data.peran]);

  const menu = data.menu || [];

  return (
    <>
      <div id="progress" ref={bar} />

      <header
        className={`nav ${scrolled ? "scrolled" : ""}`}
        id="nav"
        ref={nav}
        style={sembunyi ? { transform: "translateY(-100%)" } : undefined}
      >
        <div className="nav-inner">
          <a href="#hero" className="brand" aria-label="Ke atas">
            <span className="brand-mark">LN</span>
            <span>
              <b id="brandName">{data.namaPendek || data.nama}</b>
              <small id="brandRole">{data.peran}</small>
            </span>
          </a>

          <nav className="nav-links" id="navLinks">
            {menu.map((m) => (
              <a key={m.id} href={`#${m.id}`} className={aktif === m.id ? "active" : ""}>
                {m.label}
              </a>
            ))}
            <a href="#kontak" className="nav-cta">Hubungi Saya</a>
          </nav>

          <button
            className={`burger ${menuBuka ? "open" : ""}`}
            aria-label="Buka menu"
            aria-expanded={menuBuka}
            onClick={() => setMenuBuka((v) => !v)}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      <div className={`mobile-menu ${menuBuka ? "open" : ""}`}>
        {menu.map((m, i) => (
          <a
            key={m.id}
            href={`#${m.id}`}
            style={{ transitionDelay: menuBuka ? `${90 + i * 55}ms` : "0ms" }}
            onClick={() => setMenuBuka(false)}
          >
            {m.label}
          </a>
        ))}
        <a href="#kontak" style={{ transitionDelay: menuBuka ? `${90 + menu.length * 55}ms` : "0ms" }} onClick={() => setMenuBuka(false)}>
          Kontak
        </a>
      </div>

      <LencanaKroomBase kb={kb} reduced={reduced} />

      <PanelTweaks prefs={prefs} reduced={reduced} />
    </>
  );
}

/* --------------------------- LENCANA KROOMBASE -------------------------- */
function LencanaKroomBase({ kb, reduced }) {
  const [buka, setBuka] = useState(false);
  const nyala = kb.status === "kroombase";
  const teks =
    kb.status === "kroombase"
      ? `KroomBase aktif · ${kb.tabelAktif.length} tabel`
      : kb.status === "lokal"
        ? (kb.kbAdaKunci ? "KroomBase tidak terjangkau — data lokal" : "Data lokal (KroomBase belum diisi)")
        : "Menghubungi KroomBase…";

  return (
    <div style={{ position: "fixed", right: 20, bottom: 20, zIndex: 950 }}>
      <button
        onClick={() => setBuka((v) => !v)}
        title={teks}
        aria-label={teks}
        style={{
          display: "flex", alignItems: "center", gap: 9, padding: "9px 14px", borderRadius: 999,
          border: "1px solid var(--line-2)", background: "rgba(10,12,19,.9)", backdropFilter: "blur(12px)",
          color: "var(--muted)", fontFamily: "var(--font-mono)", fontSize: 11.5, boxShadow: "var(--shadow)",
        }}
      >
        <span
          style={{
            width: 7, height: 7, borderRadius: "50%",
            background: nyala ? "var(--accent)" : "var(--faint)",
            boxShadow: nyala ? "0 0 10px var(--glow-1)" : "none",
          }}
        />
        {nyala ? "DB" : kb.status === "memuat" ? "…" : "LOCAL"}
      </button>

      {buka && (
        <div
          className="card"
          style={{ position: "absolute", right: 0, bottom: 52, width: 268, padding: 16, fontSize: 12.5, lineHeight: 1.7 }}
        >
          <b style={{ display: "block", marginBottom: 6, color: "var(--ink)" }}>Sumber isi halaman</b>
          <p style={{ margin: "0 0 10px", color: "var(--muted)" }}>{teks}</p>
          {kb.kbUrl && (
            <p style={{ margin: "0 0 8px", fontFamily: "var(--font-mono)", fontSize: 10.5, color: "var(--faint)", wordBreak: "break-all" }}>
              {kb.kbUrl}
            </p>
          )}
          {kb.tabelAktif.length > 0 && (
            <p style={{ margin: 0, fontFamily: "var(--font-mono)", fontSize: 10.5, color: "var(--faint)" }}>
              tabel: {kb.tabelAktif.join(", ")}
            </p>
          )}
          {kb.galat && (
            <p style={{ margin: "8px 0 0", fontFamily: "var(--font-mono)", fontSize: 10.5, color: "var(--faint)" }}>
              {kb.galat}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

/* ----------------------------- PANEL TWEAKS ----------------------------- */
function PanelTweaks({ prefs, reduced }) {
  const [buka, setBuka] = useState(false);
  const { palet, setPalet, partikel, setPartikel, reduced: kurangiGerak, setReduced } = prefs;

  return (
    <div className="tweaks">
      <div className={`tw-panel ${buka ? "open" : ""}`}>
        <h4>Tweaks</h4>
        <p>Ubah cepat warna aksen &amp; efek gerak.</p>

        <div className="swatches">
          {PALET.map((p, i) => (
            <button
              key={p.nama}
              className={`sw ${i === palet ? "on" : ""}`}
              title={p.nama}
              aria-label={p.nama}
              style={{ background: `linear-gradient(135deg,${p.a},${p.b})`, color: p.a }}
              onClick={() => {
                setPalet(i);
                toast("Warna aksen: " + p.nama);
              }}
            />
          ))}
        </div>

        <div className="tw-row">
          <span>Partikel latar</span>
          <button
            className={`switch ${partikel ? "on" : ""}`}
            aria-label="Aktif/matikan partikel"
            onClick={() => setPartikel(!partikel)}
          >
            <i />
          </button>
        </div>

        <div className="tw-row" style={{ marginTop: 8 }}>
          <span>Kurangi gerak</span>
          <button
            className={`switch ${kurangiGerak ? "on" : ""}`}
            aria-label="Aktif/matikan animasi"
            onClick={() => setReduced(!kurangiGerak)}
          >
            <i />
          </button>
        </div>
      </div>

      <button className="tw-toggle" aria-label="Buka panel tweaks" onClick={() => setBuka((v) => !v)}>
        <Icon name="link" size={19} strokeWidth={1.8} />
      </button>
    </div>
  );
}

/* -------------------------------- FOOTER -------------------------------- */
export function Footer({ data, kb }) {
  return (
    <footer className="site">
      <div className="wrap foot-inner">
        <p>
          © <span>{new Date().getFullYear()}</span> <b>{data.nama}</b>. Dibangun dengan React + Vite
          {kb.status === "kroombase" ? " · data dari KroomBase" : ""}.
        </p>
        <a href="#hero" className="to-top">
          Kembali ke atas
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </a>
      </div>
    </footer>
  );
}

export { Reveal };
