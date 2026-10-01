/* ==========================================================================
   Reveal — animasi muncul saat elemen masuk viewport (pengganti versi <script>
   di index.html lama). Delay bertingkat lewat CSS variable --d.
   ========================================================================== */

import { useEffect, useRef } from "react";

export function Reveal({ as: Tag = "div", variasi = "reveal", delay = 0, className = "", style, children, ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (document.body.classList.contains("reduced") || !("IntersectionObserver" in window)) {
      el.classList.add("in");
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
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`${variasi} ${className}`.trim()}
      style={{ "--d": `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------- TOAST ---------------------------------- */
let toastEl = null;
let toastTimer = null;

export function toast(msg) {
  if (!toastEl) {
    toastEl = document.createElement("div");
    toastEl.style.cssText =
      "position:fixed;left:50%;bottom:26px;transform:translate(-50%,20px);z-index:1000;padding:12px 20px;border-radius:12px;" +
      "background:rgba(10,12,19,.96);border:1px solid var(--line-2);color:var(--ink);font-size:13.5px;box-shadow:var(--shadow);" +
      "opacity:0;transition:all .35s cubic-bezier(.22,.68,0,1);backdrop-filter:blur(12px);max-width:88vw;text-align:center";
    document.body.appendChild(toastEl);
  }
  toastEl.textContent = msg;
  requestAnimationFrame(() => {
    toastEl.style.opacity = "1";
    toastEl.style.transform = "translate(-50%,0)";
  });
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastEl.style.opacity = "0";
    toastEl.style.transform = "translate(-50%,20px)";
  }, 3400);
}

export default Reveal;
