import "./styles/portfolio.css";
import { useContent } from "./hooks/useContent.js";
import { usePreferences } from "./hooks/usePreferences.js";
import { useRevealObserver } from "./hooks/useRevealObserver.js";
import { Background, CustomCursor } from "./components/Background.jsx";
import { Chrome, Footer } from "./components/Chrome.jsx";
import {
  Hero, Marquee, About, Skills, Projects, Timeline, Certificates, Contact,
} from "./components/Sections.jsx";

export default function App() {
  const kb = useContent();
  const prefs = usePreferences();
  const { data } = kb;

  useRevealObserver([kb.status, data]);

  return (
    <>
      <Background partikel={prefs.partikel} reduced={prefs.reduced} warnaAksen={prefs.aksenRgb} />
      <CustomCursor reduced={prefs.reduced} />

      <Chrome data={data} reduced={prefs.reduced} prefs={prefs} kb={kb} />

      <main>
        <Hero data={data} reduced={prefs.reduced} />
        <Marquee tools={data.tools} />
        <About data={data} />
        <div className="wrap"><div className="divider" /></div>
        <Skills data={data} />
        <div className="wrap"><div className="divider" /></div>
        <Projects data={data} reduced={prefs.reduced} />
        <div className="wrap"><div className="divider" /></div>
        <Timeline data={data} />
        <div className="wrap"><div className="divider" /></div>
        <Certificates data={data} />
        <div className="wrap"><div className="divider" /></div>
        <Contact data={data} kb={kb} />
      </main>

      <Footer data={data} kb={kb} />
    </>
  );
}
