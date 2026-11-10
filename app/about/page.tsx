import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "../components/Reveal";

export const metadata: Metadata = {
  title: "About",
};

const services = [
  {
    num: "01",
    title: "Commercial Sales",
    body: "We represent vendors and purchasers across retail, office, industrial and development sites — delivering transparent, results-driven sales processes from day one.",
  },
  {
    num: "02",
    title: "Commercial Leasing",
    body: "Whether you're a landlord seeking quality tenants or a business finding the right space, our leasing team handles negotiations, documentation and handover.",
  },
  {
    num: "03",
    title: "Investment Advisory",
    body: "We help investors identify, assess and acquire commercial assets in the Illawarra — with market intelligence that goes beyond the listing.",
  },
  {
    num: "04",
    title: "Market Appraisals",
    body: "Thinking of selling or leasing? Our no-obligation appraisals give you a clear picture of your property's current market value and potential.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="page-hero light">
        <div className="wrap">
          <Reveal as="p" className="eyebrow">About us</Reveal>
          <Reveal as="h1" className="page-hero__title">
            Commercial<br />Real Estate,<br />Done Properly.
          </Reveal>
        </div>
      </section>

      {/* STATEMENT */}
      <section className="section light" style={{ paddingTop: 0 }}>
        <div className="wrap statement">
          <Reveal as="p" className="statement__text">
            Spinelli Commercial is the dedicated commercial division of Spinelli Real Estate — the Illawarra's most trusted boutique agency. Local knowledge, honest advice, and a relentless focus on results.
          </Reveal>
        </div>
      </section>

      {/* ABOUT BODY */}
      <section className="section light" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(40px,6vw,96px)", alignItems: "start" }}>
            <Reveal>
              <p style={{ fontSize: "clamp(16px,1.4vw,20px)", lineHeight: 1.75, opacity: 0.75, marginBottom: 24 }}>
                Our commercial specialists understand that business property decisions carry real financial weight. We take that seriously — providing thorough market analysis, direct access to our senior agents, and a transaction experience that keeps you informed at every step.
              </p>
              <p style={{ fontSize: "clamp(16px,1.4vw,20px)", lineHeight: 1.75, opacity: 0.75 }}>
                From retail tenancies and office suites to industrial facilities and development sites, we cover the full spectrum of commercial property across Wollongong, Kiama, Shellharbour and the wider South Coast.
              </p>
            </Reveal>
            <Reveal delay={80}>
              <Link href="/contact" className="btn btn--dark">
                Talk to our team <span aria-hidden="true">→</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section light">
        <div className="wrap">
          <div className="approach">
            <div>
              <Reveal as="h2" className="h2 approach__title">What<br />we do</Reveal>
            </div>
            <div className="approach__list">
              {services.map((s, i) => (
                <Reveal key={s.num} delay={i * 60} className="approach__item">
                  <span className="mono">{s.num}</span>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="section light" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="stats stats__grid">
            {[
              { n: "20+", l: "Years in the Illawarra" },
              { n: "100%", l: "Locally owned" },
              { n: "1:1", l: "Direct senior agent access" },
              { n: "Free", l: "Market appraisals" },
            ].map((s, i) => (
              <Reveal key={s.l} delay={i * 60} className="stat">
                <span className="stat__n">{s.n}</span>
                <span className="stat__l">{s.l}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta light">
        <div className="wrap">
          <Reveal as="p" className="eyebrow">Ready to start</Reveal>
          <Reveal as="h2" className="cta__title">
            Talk to our<br />commercial<br />team.
          </Reveal>
          <Reveal>
            <Link href="/contact" className="btn btn--dark">
              Get in touch <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
