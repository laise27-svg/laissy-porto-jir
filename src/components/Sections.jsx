/* ==========================================================================
   Seluruh bagian halaman: Hero, Tentang, Keahlian, Proyek, Perjalanan,
   Sertifikat, Kontak. Kelas CSS-nya sama persis dengan desain sebelumnya.
   ========================================================================== */

import { useEffect, useRef, useState } from "react";
import { Icon, svgIco } from "../lib/icons.jsx";
import { Reveal, toast } from "./Reveal.jsx";

const esc = (s = "") =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* --------------------------------- HERO --------------------------------- */
function EfekKetik({ kata, reduced }) {
  const [teks, setTeks] = useState(reduced ? kata[0] : "");

  useEffect(() => {
    if (reduced) { setTeks(kata[0]); return; }
    let w = 0, c = 0, hapus = false, timer;
    const loop = () => {
      const k = kata[c % kata.length];
      w += hapus ? -1 : 1;
      setTeks(k.slice(0, w));
      let jeda = hapus ? 45 : 95;
      if (!hapus && w === k.length) { jeda = 1700; hapus = true; }
      else if (hapus && w === 0) { hapus = false; c++; jeda = 380; }
      timer = setTimeout(loop, jeda);
    };
    timer = setTimeout(loop, 300);
    return () => clearTimeout(timer);
  }, [kata, reduced]);

  return <span className="typed" id="typed">{teks}</span>;
}

function FotoOrPlaceholder({ src, nama }) {
  const inisial = (nama || "")
    .split(" ")
    .filter((w) => /^[A-Za-z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  const [gagal, setGagal] = useState(!src);

  if (gagal) {
    return (
      <div className="photo-ph">
        <div className="ph-inisial">{inisial || "AA"}</div>
        <span className="ph-judul">Letakkan fotomu di sini</span>
        <span className="ph-kode">DATA profil → foto = "foto.jpg"</span>
      </div>
    );
  }
  return <img src={src} alt={`Foto ${nama}`} onError={() => setGagal(true)} />;
}

export function Hero({ data, reduced }) {
  const [tilt, setTilt] = useState({});
  const socials = (data.sosial || []).filter((s) => s.link && s.link !== "#");

  const magnet = (e) => {
    if (reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.14}px, ${(e.clientY - r.top - r.height / 2) * 0.24}px)`;
  };
  const lepas = (e) => { e.currentTarget.style.transform = ""; };

  return (
    <section id="hero">
      <div className="wrap hero-grid">
        <div>
          <Reveal className="status-pill">
            <span className="dot-live" />
            <span id="heroStatus">{data.status}</span>
          </Reveal>

          <Reveal as="h1" variasi="reveal" delay={80} className="hero-name">
            Halo, saya <span className="grad" id="heroName">{data.nama}</span>
          </Reveal>

          <Reveal as="p" delay={160} className="hero-role">
            <span>&gt;_</span>
            <EfekKetik kata={data.peranTyped?.length ? data.peranTyped : [data.peran]} reduced={reduced} />
            <span className="caret" />
          </Reveal>

          <Reveal as="p" delay={240} className="hero-desc" id="heroDesc">
            {data.heroDesc}
          </Reveal>

          <Reveal delay={320} className="hero-actions">
            <a href="#proyek" className="btn btn-primary" onMouseMove={magnet} onMouseLeave={lepas}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              Lihat Karya
            </a>
            {data.cvUrl ? (
              <a href={data.cvUrl} download className="btn btn-ghost" onMouseMove={magnet} onMouseLeave={lepas}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 3v12M7 11l5 5 5-5M5 20h14" /></svg>
                Unduh CV
              </a>
            ) : (
              <button
                className="btn btn-ghost"
                onMouseMove={magnet}
                onMouseLeave={lepas}
                onClick={() => toast("Belum ada file CV. Taruh di public/ lalu isi cv_url di tabel profil.")}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 3v12M7 11l5 5 5-5M5 20h14" /></svg>
                Unduh CV
              </button>
            )}
            {socials.length > 0 && (
              <div className="hero-socials" style={{ marginLeft: 6 }}>
                {socials.map((s) => (
                  <a key={s.nama} className="soc" href={s.link} target="_blank" rel="noopener" aria-label={s.nama} title={s.nama}>
                    <Icon name={s.ikon} size={19} />
                  </a>
                ))}
              </div>
            )}
          </Reveal>
        </div>

        <Reveal delay={200} className="photo-wrap">
          <div className="photo-glow" />
          <div
            className="frame"
            onMouseMove={(e) => {
              if (reduced) return;
              const r = e.currentTarget.getBoundingClientRect();
              setTilt({
                transform: `perspective(900px) rotateY(${((e.clientX - r.left) / r.width - 0.5) * 5}deg) rotateX(${-((e.clientY - r.top) / r.height - 0.5) * 5}deg)`,
              });
            }}
            onMouseLeave={() => setTilt({})}
            style={tilt}
          >
            <div className={`frame-inner ${data.foto ? "" : "kosong"}`} id="fotoSlot">
              <FotoOrPlaceholder src={data.foto} nama={data.nama} />
            </div>
          </div>
          <div className="photo-chip chip-1"><b id="chipRole">{data.peran.split(" ")[0]}</b><br />React · Vite</div>
          <div className="photo-chip chip-2"><b>Lokasi</b><br />{data.lokasi}</div>
        </Reveal>
      </div>
      <div className="scroll-hint"><i />scroll</div>
    </section>
  );
}

/* -------------------------------- MARQUEE -------------------------------- */
export function Marquee({ tools }) {
  const isi = (tools || []).map((t) => <span className="marquee-item" key={t}>{t}</span>);
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">{[...isi, ...isi.map((el, i) => ({ ...el, key: `b${i}` }))]}</div>
    </div>
  );
}

/* -------------------------------- TENTANG -------------------------------- */
function Statistik({ item }) {
  const [nilai, setNilai] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (document.body.classList.contains("reduced") || !("IntersectionObserver" in window)) {
      setNilai(item.angka); return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const t0 = performance.now();
        const dur = 1500;
        const step = (t) => {
          const k = Math.min(1, (t - t0) / dur);
          const e = 1 - Math.pow(1 - k, 3);
          setNilai(Math.round(item.angka * e));
          if (k < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        io.unobserve(en.target);
      });
    }, { threshold: 0.6 });
    io.observe(el);
    return () => io.disconnect();
  }, [item.angka]);

  return (
    <div className="stat reveal in" ref={ref}>
      <b>{nilai.toLocaleString("id-ID")}{nilai === item.angka ? item.sufiks : ""}</b>
      <span>{item.label}</span>
    </div>
  );
}

export function About({ data }) {
  return (
    <section id="tentang">
      <div className="wrap">
        <div className="sec-head reveal in">
          <div className="sec-tag">Tentang Saya</div>
          <h2 className="sec-title">Bukan cuma <em>tampilan</em>, tapi pengalaman pakai.</h2>
          <p className="sec-desc" id="aboutLead">{data.tentangLead}</p>
        </div>
        <div className="about-grid">
          <div className="about-text reveal-x in" id="aboutText">
            {(data.tentangParagraf || []).map((p, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
            ))}
          </div>
          <div className="stats">
            {(data.statistik || []).map((s) => (
              <Statistik key={s.label} item={s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- KEAHLIAN -------------------------------- */
function BarKeahlian({ item }) {
  const [lebar, setLebar] = useState(0);
  const ref = useRef(null);
  const kurangiGerak = typeof document !== "undefined" && document.body.classList.contains("reduced");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (document.body.classList.contains("reduced") || !("IntersectionObserver" in window)) {
      setLebar(item.nilai); return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        setLebar(item.nilai);
        io.unobserve(en.target);
      });
    }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, [item.nilai]);

  return (
    <div className="skill">
      <div className="skill-top"><b>{item.nama}</b><span>{item.nilai}%</span></div>
      <div className="bar" ref={ref}><i style={{ width: `${lebar}%`, transitionDelay: kurangiGerak ? "0ms" : "0ms" }} /></div>
    </div>
  );
}

export function Skills({ data }) {
  return (
    <section id="keahlian">
      <div className="wrap">
        <div className="sec-head reveal in">
          <div className="sec-tag">Keahlian</div>
          <h2 className="sec-title">Alat &amp; <em>kemampuan</em> yang saya pakai.</h2>
          <p className="sec-desc">Kombinasi teknis dan non-teknis yang saya bawa ke setiap proyek.</p>
        </div>
        <div className="skill-groups">
          {(data.keahlian || []).map((g, gi) => (
            <div className="card skill-panel reveal in" key={g.judul} style={{ "--d": `${gi * 110}ms` }}>
              <h3><i />{g.judul}</h3>
              {g.isi.map((s) => <BarKeahlian key={s.nama} item={s} />)}
            </div>
          ))}
        </div>
        <div className="tools">
          {(data.tools || []).map((t) => <span className="tool" key={t}>{t}</span>)}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- PROYEK --------------------------------- */
function Thumb({ gambar, judul, tagKode }) {
  const [gagal, setGagal] = useState(!gambar);
  if (gagal) {
    return (
      <div className="thumb-missing">
        <b>Screenshot menyusul</b>
        <i>{tagKode}</i>
      </div>
    );
  }
  return <img src={gambar} alt={judul} loading="lazy" onError={() => setGagal(true)} />;
}

export function Projects({ data, reduced }) {
  const proyek = data.proyek || [];
  const kategori = ["Semua", ...Array.from(new Set(proyek.map((p) => p.kategori)))];
  const [filter, setFilter] = useState("Semua");

  const tampil = proyek.filter((p) => filter === "Semua" || p.kategori === filter);

  const tilt = (e) => {
    if (reduced) return;
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(900px) rotateY(${px * 5}deg) rotateX(${-py * 5}deg) translateY(-5px)`;
    card.style.setProperty("--mx", `${e.clientX - r.left}px`);
    card.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section id="proyek">
      <div className="wrap">
        <div className="sec-head reveal in">
          <div className="sec-tag">Proyek</div>
          <h2 className="sec-title">Karya yang pernah saya <em>kerjakan</em>.</h2>
          <p className="sec-desc">Proyek latihan, tugas kuliah, dan proyek pribadi — dari halaman web sampai perancangan basis data.</p>
        </div>

        <div className="filters reveal in">
          {kategori.map((k) => (
            <button key={k} className={`filter ${k === filter ? "active" : ""}`} onClick={() => setFilter(k)}>
              {k}
            </button>
          ))}
        </div>

        <div className="projects">
          {tampil.map((p, i) => (
            <article
              className="card proj reveal in"
              key={p.judul + i}
              data-kat={p.kategori}
              style={{ "--d": `${(i % 3) * 100}ms` }}
              onMouseMove={tilt}
              onMouseLeave={(e) => { e.currentTarget.style.transform = ""; }}
            >
              <div className="proj-thumb">
                <Thumb gambar={p.gambar} judul={p.judul} tagKode={`DATA.proyek[${i}].gambar`} />
              </div>
              <div className="proj-body">
                <h3>{p.judul}</h3>
                <p>{p.deskripsi}</p>
                <div className="tags">{(p.tags || []).map((t) => <span className="tag" key={t}>{t}</span>)}</div>
                <div className="proj-links">
                  {p.linkDemo && (
                    <a href={p.linkDemo} target="_blank" rel="noopener">
                      Demo langsung
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M7 17L17 7M9 7h8v8" /></svg>
                    </a>
                  )}
                  {p.linkKode && (
                    <a className="sec" href={p.linkKode} target="_blank" rel="noopener">
                      Kode sumber
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6" /></svg>
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------ PENGALAMAN & PENDIDIKAN ------------------------ */
export function Timeline({ data }) {
  const item = (d, i) => (
    <div className="tl-item reveal-x in" key={d.posisi + i} style={{ "--d": `${i * 110}ms` }}>
      <div className="tl-date">{d.periode}</div>
      <h3>{d.posisi}</h3>
      <div className="place">{d.tempat}</div>
      <p>{d.deskripsi}</p>
    </div>
  );

  return (
    <section id="pengalaman">
      <div className="wrap">
        <div className="sec-head reveal in">
          <div className="sec-tag">Perjalanan</div>
          <h2 className="sec-title">Pengalaman &amp; <em>pendidikan</em>.</h2>
        </div>
        <div className="tl-cols">
          <div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 15, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--faint)", margin: "0 0 22px", fontWeight: 500 }}>
              Pengalaman
            </h3>
            <div className="tl">{(data.pengalaman || []).map(item)}</div>
          </div>
          <div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 15, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--faint)", margin: "0 0 22px", fontWeight: 500 }}>
              Pendidikan
            </h3>
            <div className="tl">{(data.pendidikan || []).map(item)}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ SERTIFIKAT ------------------------------- */
function KartuSertifikat({ c, i }) {
  const [gagal, setGagal] = useState(!c.gambar);
  const pdf = (c.gambar || "").toLowerCase().endsWith(".pdf");
  const badge = (c.penerbit || "").split("·")[1] || "Sertifikat";

  let isi;
  if (gagal) {
    isi = <div className="thumb-missing"><b>Scan sertifikat menyusul</b><i>DATA.sertifikat[{i}].gambar</i></div>;
  } else if (pdf) {
    isi = <iframe src={`${c.gambar}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`} style={{ width: "100%", height: "100%", border: "none", pointerEvents: "none" }} title={c.judul} />;
  } else {
    isi = <img src={c.gambar} alt={c.judul} loading="lazy" onError={() => setGagal(true)} />;
  }

  return (
    <article className="card cert reveal in" style={{ "--d": `${(i % 3) * 100}ms` }}>
      <div className="cert-img">{isi}<span className="cert-badge">{badge}</span></div>
      <div className="cert-body">
        <h3>{c.judul}</h3>
        <div className="issuer">{c.penerbit}</div>
        {c.link && (
          <a href={c.link} target="_blank" rel="noopener">
            Lihat kredensial
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M7 17L17 7M9 7h8v8" /></svg>
          </a>
        )}
      </div>
    </article>
  );
}

export function Certificates({ data }) {
  return (
    <section id="sertifikat">
      <div className="wrap">
        <div className="sec-head reveal in">
          <div className="sec-tag">Sertifikat &amp; Penghargaan</div>
          <h2 className="sec-title">Bukti <em>pembelajaran</em> yang berkelanjutan.</h2>
          <p className="sec-desc">
            Dua sertifikat pilihan — <strong style={{ color: "var(--ink)", fontWeight: 600 }}>Agile</strong> dan{" "}
            <strong style={{ color: "var(--ink)", fontWeight: 600 }}>AI</strong> — sebagai bukti pembelajaran yang berkelanjutan.
          </p>
        </div>
        <div className="certs">
          {(data.sertifikat || []).map((c, i) => <KartuSertifikat key={c.judul + i} c={c} i={i} />)}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- KONTAK --------------------------------- */
export function Contact({ data, kb }) {
  const [catatan, setCatatan] = useState("Form ini membuka aplikasi email kamu (tanpa server).");
  const [mengirim, setMengirim] = useState(false);

  const kirim = (e) => {
    e.preventDefault();
    const f = e.target;
    const tujuan = (data.kontak || []).find((k) => k.label.toLowerCase() === "email")?.nilai || "";
    const subjek = `[Portofolio] ${f.subjek.value || "Pesan baru"} — ${f.nama.value}`;
    const isi = `Nama: ${f.nama.value}\nEmail: ${f.email.value}\n\n${f.pesan.value}`;
    window.location.href = `mailto:${tujuan}?subject=${encodeURIComponent(subjek)}&body=${encodeURIComponent(isi)}`;
    setCatatan(`Aplikasi email kamu dibuka. Kalau tidak terbuka, kirim manual ke ${tujuan}.`);
  };

  return (
    <section id="kontak">
      <div className="wrap">
        <div className="sec-head reveal in">
          <div className="sec-tag">Kontak</div>
          <h2 className="sec-title">Punya proyek? <em>Ayo ngobrol.</em></h2>
          <p className="sec-desc">Isi form di samping, atau hubungi langsung lewat kontak di bawah.</p>
        </div>

        <div className="contact-grid">
          <div className="reveal-x in">
            <div className="ct-list">
              {(data.kontak || []).map((k) => {
                const luar = /^https?:/.test(k.link || "");
                return (
                  <a
                    className="ct-item"
                    key={k.label}
                    href={k.link || "#"}
                    target={luar ? "_blank" : undefined}
                    rel={luar ? "noopener" : undefined}
                    onClick={(e) => { if (!k.link) e.preventDefault(); }}
                  >
                    <span className="ct-ic" dangerouslySetInnerHTML={{ __html: svgIco(k.ikon) }} />
                    <span><small>{k.label}</small><b>{k.nilai}</b></span>
                  </a>
                );
              })}
            </div>
          </div>

          <form className="cf reveal in" onSubmit={kirim}>
            <div className="f-row">
              <div className="fg">
                <label htmlFor="cfName">Nama</label>
                <input id="cfName" name="nama" type="text" placeholder="Nama kamu" required />
              </div>
              <div className="fg">
                <label htmlFor="cfEmail">Email</label>
                <input id="cfEmail" name="email" type="email" placeholder="nama@email.com" required />
              </div>
            </div>
            <div className="fg">
              <label htmlFor="cfSubject">Subjek</label>
              <input id="cfSubject" name="subjek" type="text" placeholder="Misal: Kolaborasi proyek" />
            </div>
            <div className="fg">
              <label htmlFor="cfMsg">Pesan</label>
              <textarea id="cfMsg" name="pesan" placeholder="Ceritakan kebutuhanmu…" required />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }} disabled={mengirim}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
              Kirim Pesan
            </button>
            <p className="form-note">{catatan}</p>
          </form>
        </div>
      </div>
    </section>
  );
}

export { esc };
