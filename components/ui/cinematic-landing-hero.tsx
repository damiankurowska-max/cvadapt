// components/ui/cinematic-landing-hero.tsx
"use client";

import React, { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const INJECTED_STYLES = `
  /* ── Intro animations — CSS only, runs before GSAP touches anything ── */
  @keyframes ch-fade-up {
    from { opacity: 0; transform: translateY(60px) scale(0.85); filter: blur(20px); }
    to   { opacity: 1; transform: translateY(0px) scale(1);   filter: blur(0px);  }
  }
  @keyframes ch-reveal-right {
    from { clip-path: inset(0 100% 0 0); }
    to   { clip-path: inset(0 0%   0 0); }
  }

  .ch-text-track {
    opacity: 0; /* initial state — animation fills to opacity:1 */
    animation: ch-fade-up 1.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
  }
  .ch-text-days {
    clip-path: inset(0 100% 0 0); /* initial state */
    animation: ch-reveal-right 1.4s cubic-bezier(0.76, 0, 0.24, 1) 0.9s forwards;
  }

  @media (prefers-reduced-motion: reduce) {
    .ch-text-track { animation: none; opacity: 1; }
    .ch-text-days  { animation: none; clip-path: none; }
  }

  .ch-film-grain {
    position: absolute; inset: 0; width: 100%; height: 100%;
    pointer-events: none; z-index: 50; opacity: 0.04; mix-blend-mode: overlay;
    background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)"/></svg>');
  }

  .ch-bg-grid {
    background-size: 60px 60px;
    background-image:
      linear-gradient(to right, rgba(15, 23, 42, 0.06) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(15, 23, 42, 0.06) 1px, transparent 1px);
    mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
    -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
  }

  .ch-text-3d {
    color: #0f172a;
    text-shadow:
      0 10px 30px rgba(15, 23, 42, 0.18),
      0 2px 4px rgba(15, 23, 42, 0.10);
  }

  /* tagline on light bg — dark ink */
  .ch-text-silver {
    background: linear-gradient(180deg, #0f172a 0%, rgba(15, 23, 42, 0.55) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    transform: translateZ(0);
    filter:
      drop-shadow(0px 10px 20px rgba(15, 23, 42, 0.12))
      drop-shadow(0px 2px 4px rgba(15, 23, 42, 0.08));
  }
  /* CTA heading inside the dark card — white */
  .ch-cta .ch-text-silver {
    background: linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0.55) 100%);
    filter:
      drop-shadow(0px 10px 20px rgba(255, 255, 255, 0.15))
      drop-shadow(0px 2px 4px rgba(255, 255, 255, 0.10));
  }

  .ch-text-card-silver {
    background: linear-gradient(180deg, #FFFFFF 0%, #A1A1AA 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    transform: translateZ(0);
    filter:
      drop-shadow(0px 12px 24px rgba(0,0,0,0.8))
      drop-shadow(0px 4px 8px rgba(0,0,0,0.6));
  }

  .ch-card {
    background: linear-gradient(145deg, #0f2560 0%, #060d1c 100%);
    box-shadow:
      0 40px 100px -20px rgba(0,0,0,0.9),
      0 20px 40px -20px rgba(0,0,0,0.8),
      inset 0 1px 2px rgba(255,255,255,0.15),
      inset 0 -2px 4px rgba(0,0,0,0.8);
    border: 1px solid rgba(255,255,255,0.04);
    position: relative;
  }

  .ch-card-sheen {
    position: absolute; inset: 0; border-radius: inherit; pointer-events: none; z-index: 50;
    background: radial-gradient(800px circle at var(--mouse-x,50%) var(--mouse-y,50%), rgba(59,130,246,0.08) 0%, transparent 40%);
    mix-blend-mode: screen; transition: opacity 0.3s ease;
  }

  .ch-iphone {
    background-color: #111;
    box-shadow:
      inset 0 0 0 2px #52525B,
      inset 0 0 0 7px #000,
      0 40px 80px -15px rgba(0,0,0,0.9),
      0 15px 25px -5px rgba(0,0,0,0.7);
    transform-style: preserve-3d;
  }

  .ch-hw-btn {
    background: linear-gradient(90deg, #404040 0%, #171717 100%);
    box-shadow: -2px 0 5px rgba(0,0,0,0.8), inset -1px 0 1px rgba(255,255,255,0.15), inset 1px 0 2px rgba(0,0,0,0.8);
    border-left: 1px solid rgba(255,255,255,0.05);
  }

  .ch-screen-glare { background: linear-gradient(110deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 45%); }

  .ch-widget {
    background: linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%);
    box-shadow: 0 10px 20px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.05), inset 0 -1px 1px rgba(0,0,0,0.5);
    border: 1px solid rgba(255,255,255,0.03);
  }

  .ch-badge-glass {
    background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.01) 100%);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    box-shadow: 0 0 0 1px rgba(255,255,255,0.1), 0 25px 50px -12px rgba(0,0,0,0.8), inset 0 1px 1px rgba(255,255,255,0.2), inset 0 -1px 1px rgba(0,0,0,0.5);
  }

  .ch-btn-primary {
    background: linear-gradient(180deg, #3B82F6 0%, #1D4ED8 100%);
    color: #FFFFFF;
    box-shadow: 0 0 0 1px rgba(59,130,246,0.3), 0 2px 4px rgba(0,0,0,0.4), 0 12px 24px -4px rgba(29,78,216,0.6), inset 0 1px 1px rgba(255,255,255,0.25);
    transition: all 0.35s cubic-bezier(0.25,1,0.5,1);
  }
  .ch-btn-primary:hover  { transform: translateY(-3px); box-shadow: 0 0 0 1px rgba(59,130,246,0.4), 0 8px 16px rgba(0,0,0,0.2), 0 24px 32px -6px rgba(29,78,216,0.7), inset 0 1px 1px rgba(255,255,255,0.3); }
  .ch-btn-primary:active { transform: translateY(1px); background: linear-gradient(180deg,#1D4ED8 0%,#1E40AF 100%); }

  .ch-btn-secondary {
    background: linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.04) 100%);
    color: #FFFFFF;
    box-shadow: 0 0 0 1px rgba(255,255,255,0.12), 0 2px 4px rgba(0,0,0,0.5), 0 12px 24px -4px rgba(0,0,0,0.7), inset 0 1px 1px rgba(255,255,255,0.15);
    transition: all 0.35s cubic-bezier(0.25,1,0.5,1);
  }
  .ch-btn-secondary:hover  { transform: translateY(-3px); background: linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.07) 100%); box-shadow: 0 0 0 1px rgba(255,255,255,0.18), 0 8px 16px rgba(0,0,0,0.3), 0 24px 32px -6px rgba(0,0,0,0.8); }
  .ch-btn-secondary:active { transform: translateY(1px); }

  .ch-progress-ring {
    transform: rotate(-90deg);
    transform-origin: center;
    stroke-dasharray: 402;
    stroke-dashoffset: 402;
    stroke-linecap: round;
  }

  @media (prefers-reduced-motion: reduce) {
    .ch-text-track, .ch-text-days, .ch-hero-text { opacity: 1 !important; transform: none !important; filter: none !important; clip-path: none !important; visibility: visible !important; }
    .ch-main-card { transform: none !important; width: 92vw !important; height: 92vh !important; }
    .ch-cta-wrapper { opacity: 1 !important; transform: none !important; filter: none !important; }
  }
`;

export interface CinematicHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  brandName?: string;
  tagline1?: string;
  tagline2?: string;
  cardHeading?: string;
  cardDescription?: React.ReactNode;
  metricValue?: number;
  metricLabel?: string;
  ctaHeading?: string;
  ctaDescription?: string;
  primaryCtaText?: string;
  primaryCtaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  badge1Label?: string;
  badge1Sub?: string;
  badge2Label?: string;
  badge2Sub?: string;
  appLabel?: string;
  appSub?: string;
  pageBg?: string;
}

export function CinematicHero({
  brandName = "CVAdapt",
  tagline1 = "Adapte ton CV,",
  tagline2 = "décroche l'entretien.",
  cardHeading = "L'IA qui bat l'ATS.",
  cardDescription = (
    <>
      <span style={{ color: "#fff", fontWeight: 600 }}>CVAdapt</span> analyse l&apos;offre
      d&apos;emploi, intègre les bons mots-clés et génère un CV optimisé pour passer les
      filtres automatiques en{" "}
      <span style={{ color: "#93c5fd", fontWeight: 600 }}>30 secondes</span>.
    </>
  ),
  metricValue = 85,
  metricLabel = "Score ATS",
  ctaHeading = "Commence dès maintenant.",
  ctaDescription = "Rejoins 12 000 étudiants et candidats qui ont déjà optimisé leur CV. Gratuit pour démarrer, sans carte bancaire.",
  primaryCtaText = "Générer mon CV — Gratuit 🚀",
  primaryCtaHref = "/generate",
  secondaryCtaText = "Voir les tarifs",
  secondaryCtaHref = "/tarifs",
  badge1Label = "Score ATS 85+",
  badge1Sub = "Optimisé automatiquement",
  badge2Label = "CV généré",
  badge2Sub = "En 30 secondes",
  appLabel = "Aujourd'hui",
  appSub = "Analyse offre",
  pageBg = "#f0f7ff",
  className,
  ...props
}: CinematicHeroProps) {

  const containerRef = useRef<HTMLDivElement>(null);
  const mainCardRef  = useRef<HTMLDivElement>(null);
  const mockupRef    = useRef<HTMLDivElement>(null);
  const rafRef       = useRef<number>(0);

  // ── Mouse parallax on card sheen + 3D tilt ──────────────────────────────
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (window.scrollY > window.innerHeight * 2) return;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (!mainCardRef.current || !mockupRef.current) return;
        const rect = mainCardRef.current.getBoundingClientRect();
        mainCardRef.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
        mainCardRef.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
        const xVal = (e.clientX / window.innerWidth  - 0.5) * 2;
        const yVal = (e.clientY / window.innerHeight - 0.5) * 2;
        gsap.to(mockupRef.current, { rotationY: xVal * 10, rotationX: -yVal * 10, ease: "power3.out", duration: 1.2 });
      });
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => { window.removeEventListener("mousemove", onMouseMove); cancelAnimationFrame(rafRef.current); };
  }, []);

  // ── SCROLL timeline (scrubbed, pinned) ───────────────────────────────────
  // Intro is handled by CSS animation — GSAP only controls scroll behaviour.
  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const isMobile = window.innerWidth < 768;
    const vh = window.innerHeight;

    const ctx = gsap.context(() => {
      // Set off-screen / hidden initial states for scroll elements
      gsap.set(".ch-main-card",   { y: vh + 200 });
      gsap.set([".ch-card-left", ".ch-card-right", ".ch-mockup-wrap", ".ch-badge", ".ch-phone-widget"], { autoAlpha: 0 });
      gsap.set(".ch-cta",        { autoAlpha: 0, scale: 0.8, filter: "blur(30px)" });

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=7000",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      scrollTl
        // Step 1 — hero text recedes, card rises
        .fromTo(".ch-hero-text",
          { scale: 1, filter: "blur(0px)", opacity: 1 },
          { scale: 1.15, filter: "blur(20px)", opacity: 0.2, ease: "power2.inOut", duration: 2 }, 0)
        .fromTo(".ch-bg-grid",
          { scale: 1, filter: "blur(0px)", opacity: 0.5 },
          { scale: 1.15, filter: "blur(20px)", opacity: 0.1, ease: "power2.inOut", duration: 2 }, 0)
        .fromTo(".ch-main-card",
          { y: vh + 200 },
          { y: 0, ease: "power3.inOut", duration: 2 }, 0)
        // Step 2 — card fills screen
        .to(".ch-main-card", { width: "100%", height: "100%", borderRadius: "0px", ease: "power3.inOut", duration: 1.5 })
        // Step 3 — 3D mockup enters
        .fromTo(".ch-mockup-wrap",
          { y: 300, z: -500, rotationX: 50, rotationY: -30, autoAlpha: 0, scale: 0.6 },
          { y: 0, z: 0, rotationX: 0, rotationY: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 2.5 }, "-=0.8")
        .fromTo(".ch-phone-widget",
          { y: 40, autoAlpha: 0, scale: 0.95 },
          { y: 0, autoAlpha: 1, scale: 1, stagger: 0.15, ease: "back.out(1.2)", duration: 1.5 }, "-=1.5")
        .to(".ch-progress-ring", { strokeDashoffset: 60, duration: 2, ease: "power3.inOut" }, "-=1.2")
        .to(".ch-counter",       { innerHTML: metricValue, snap: { innerHTML: 1 }, duration: 2, ease: "expo.out" }, "-=2.0")
        .fromTo(".ch-badge",
          { y: 100, autoAlpha: 0, scale: 0.7, rotationZ: -10 },
          { y: 0, autoAlpha: 1, scale: 1, rotationZ: 0, ease: "back.out(1.5)", duration: 1.5, stagger: 0.2 }, "-=2.0")
        .fromTo(".ch-card-left",  { x: -50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power4.out", duration: 1.5 }, "-=1.5")
        .fromTo(".ch-card-right", { x: 50, autoAlpha: 0, scale: 0.8 }, { x: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 1.5 }, "<")
        // Dwell
        .to({}, { duration: 2.5 })
        // Step 4 — hero text disappears, CTA appears
        .set(".ch-hero-text", { autoAlpha: 0 })
        .set(".ch-cta",       { autoAlpha: 1 })
        .to({}, { duration: 1.5 })
        // Card pullback + CTA reveal
        .to([".ch-mockup-wrap", ".ch-badge", ".ch-card-left", ".ch-card-right"], {
          scale: 0.9, y: -40, z: -200, autoAlpha: 0, ease: "power3.in", duration: 1.2, stagger: 0.05,
        })
        .to(".ch-main-card", {
          width: isMobile ? "92vw" : "85vw",
          height: isMobile ? "92vh" : "85vh",
          borderRadius: isMobile ? "32px" : "40px",
          ease: "expo.inOut", duration: 1.8,
        }, "pullback")
        .to(".ch-cta", { scale: 1, filter: "blur(0px)", ease: "expo.inOut", duration: 1.8 }, "pullback")
        // Step 5 — card exits + page fade
        .to(".ch-main-card", { y: -vh - 300, ease: "power3.in", duration: 1.5 }, "exit")
        .to(".ch-page-fade", { opacity: 1, ease: "power2.inOut", duration: 1.2 }, "exit+=0.4");

    }, containerRef);

    return () => ctx.revert();
  }, [metricValue]);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-screen h-screen overflow-hidden flex items-center justify-center text-foreground font-sans antialiased", className)}
      style={{ perspective: "1500px", background: pageBg }}
      {...props}
    >
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />

      {/* Grain + grid */}
      <div className="ch-film-grain" aria-hidden="true" />
      <div className="ch-bg-grid absolute inset-0 z-0 pointer-events-none opacity-50" aria-hidden="true" />

      {/* Page-color exit overlay */}
      <div className="ch-page-fade absolute inset-0 pointer-events-none" style={{ zIndex: 60, opacity: 0, background: pageBg }} aria-hidden="true" />

      {/* ── LAYER 1: Taglines ── */}
      <div className="ch-hero-text absolute z-10 flex flex-col items-center justify-center text-center w-screen px-4 will-change-transform">
        <h1 className="ch-text-track ch-text-3d text-5xl md:text-7xl lg:text-[6rem] font-bold tracking-tight mb-2">
          {tagline1}
        </h1>
        <h1 className="ch-text-days ch-text-silver text-5xl md:text-7xl lg:text-[6rem] font-extrabold tracking-tighter">
          {tagline2}
        </h1>
      </div>

      {/* ── LAYER 2: Final CTA ── */}
      <div className="ch-cta absolute z-10 flex flex-col items-center justify-center text-center w-screen px-4 pointer-events-auto will-change-transform" style={{ opacity: 0, visibility: "hidden" }}>
        <h2 className="text-4xl md:text-6xl lg:text-[5.5rem] font-bold mb-6 tracking-tight ch-text-silver">
          {ctaHeading}
        </h2>
        <p className="text-muted-foreground text-lg md:text-xl mb-12 max-w-lg mx-auto font-light leading-relaxed">
          {ctaDescription}
        </p>
        <div className="flex flex-col sm:flex-row gap-5">
          <a href={primaryCtaHref}   className="ch-btn-primary   flex items-center justify-center px-8 py-4 rounded-[1.25rem] text-base font-bold focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-background">{primaryCtaText}</a>
          <a href={secondaryCtaHref} className="ch-btn-secondary flex items-center justify-center px-8 py-4 rounded-[1.25rem] text-base font-semibold focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-background">{secondaryCtaText}</a>
        </div>
      </div>

      {/* ── LAYER 3: Deep blue card ── */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none" style={{ perspective: "1500px" }}>
        <div
          ref={mainCardRef}
          className="ch-main-card ch-card relative overflow-hidden flex items-center justify-center pointer-events-auto w-[92vw] md:w-[85vw] h-[92vh] md:h-[85vh] rounded-[32px] md:rounded-[40px]"
        >
          <div className="ch-card-sheen" aria-hidden="true" />

          <div className="relative w-full h-full max-w-7xl mx-auto px-4 lg:px-12 flex flex-col justify-evenly lg:grid lg:grid-cols-3 items-center lg:gap-8 z-10 py-6 lg:py-0">

            {/* TOP mobile / RIGHT desktop — Brand */}
            <div className="ch-card-right order-1 lg:order-3 flex justify-center lg:justify-end z-20 w-full">
              <h2 className="text-5xl md:text-[5.5rem] lg:text-[7rem] font-black uppercase tracking-tighter ch-text-card-silver leading-none">
                {brandName}
              </h2>
            </div>

            {/* CENTER — iPhone mockup */}
            <div className="ch-mockup-wrap order-2 relative w-full h-[360px] lg:h-[600px] flex items-center justify-center z-10" style={{ perspective: "1000px" }}>
              <div className="relative w-full h-full flex items-center justify-center scale-[0.65] md:scale-[0.85] lg:scale-100">
                <div ref={mockupRef} className="ch-iphone relative w-[280px] h-[580px] rounded-[3rem] flex flex-col will-change-transform" style={{ transformStyle: "preserve-3d" }}>
                  {/* Side buttons */}
                  <div className="absolute top-[120px] -left-[3px] w-[3px] h-[25px] ch-hw-btn rounded-l-md" aria-hidden="true" />
                  <div className="absolute top-[160px] -left-[3px] w-[3px] h-[45px] ch-hw-btn rounded-l-md" aria-hidden="true" />
                  <div className="absolute top-[220px] -left-[3px] w-[3px] h-[45px] ch-hw-btn rounded-l-md" aria-hidden="true" />
                  <div className="absolute top-[170px] -right-[3px] w-[3px] h-[70px] ch-hw-btn rounded-r-md scale-x-[-1]" aria-hidden="true" />

                  {/* Screen */}
                  <div className="absolute inset-[7px] bg-[#030B1A] rounded-[2.5rem] overflow-hidden text-white z-10">
                    <div className="absolute inset-0 ch-screen-glare z-40 pointer-events-none" aria-hidden="true" />
                    {/* Dynamic Island */}
                    <div className="absolute top-[5px] left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-full z-50 flex items-center justify-end px-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.9)] animate-pulse" />
                    </div>

                    <div className="relative w-full h-full pt-12 px-5 pb-8 flex flex-col">
                      {/* App header */}
                      <div className="ch-phone-widget flex justify-between items-center mb-7">
                        <div>
                          <span className="block text-[10px] text-neutral-400 uppercase tracking-widest font-bold mb-0.5">{appLabel}</span>
                          <span className="block text-xl font-bold tracking-tight text-white">{appSub}</span>
                        </div>
                        <div className="w-9 h-9 rounded-full bg-blue-600/20 text-blue-300 flex items-center justify-center text-xs font-bold border border-blue-500/20">IA</div>
                      </div>

                      {/* ATS score ring */}
                      <div className="ch-phone-widget relative w-44 h-44 mx-auto flex items-center justify-center mb-7 drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]">
                        <svg className="absolute inset-0 w-full h-full" aria-label={`Score ATS: ${metricValue}`}>
                          <circle cx="88" cy="88" r="64" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="12" />
                          <circle className="ch-progress-ring" cx="88" cy="88" r="64" fill="none" stroke="#3B82F6" strokeWidth="12" />
                        </svg>
                        <div className="text-center z-10 flex flex-col items-center">
                          <span className="ch-counter text-5xl font-extrabold tracking-tighter text-white tabular-nums">0</span>
                          <span className="text-[8px] text-blue-300/60 uppercase tracking-[0.12em] font-bold mt-0.5">{metricLabel}</span>
                        </div>
                      </div>

                      {/* Widgets */}
                      <div className="space-y-3">
                        <div className="ch-phone-widget ch-widget rounded-2xl p-3 flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-700/5 flex items-center justify-center border border-blue-400/20 flex-shrink-0">
                            <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                          </div>
                          <div className="flex-1 min-w-0"><div className="h-2 w-20 bg-neutral-200 rounded-full mb-2" /><div className="h-1.5 w-14 bg-neutral-600 rounded-full" /></div>
                          <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20 flex-shrink-0">OK</span>
                        </div>
                        <div className="ch-phone-widget ch-widget rounded-2xl p-3 flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-700/5 flex items-center justify-center border border-emerald-400/20 flex-shrink-0">
                            <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                          </div>
                          <div className="flex-1 min-w-0"><div className="h-2 w-24 bg-neutral-200 rounded-full mb-2" /><div className="h-1.5 w-16 bg-neutral-600 rounded-full" /></div>
                          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 flex-shrink-0">✓</span>
                        </div>
                      </div>
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[120px] h-[4px] bg-white/20 rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Badge 1 */}
                <div className="ch-badge absolute flex top-6 lg:top-12 left-[-15px] lg:left-[-80px] ch-badge-glass rounded-xl lg:rounded-2xl p-3 lg:p-4 items-center gap-3 z-30">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-b from-blue-500/20 to-blue-900/10 flex items-center justify-center border border-blue-400/30 flex-shrink-0"><span className="text-base lg:text-xl" aria-hidden="true">🎯</span></div>
                  <div><p className="text-white text-xs lg:text-sm font-bold tracking-tight whitespace-nowrap">{badge1Label}</p><p className="text-blue-200/50 text-[10px] lg:text-xs whitespace-nowrap">{badge1Sub}</p></div>
                </div>

                {/* Badge 2 */}
                <div className="ch-badge absolute flex bottom-12 lg:bottom-20 right-[-15px] lg:right-[-80px] ch-badge-glass rounded-xl lg:rounded-2xl p-3 lg:p-4 items-center gap-3 z-30">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-b from-emerald-500/20 to-emerald-900/10 flex items-center justify-center border border-emerald-400/30 flex-shrink-0"><span className="text-base lg:text-lg" aria-hidden="true">⚡</span></div>
                  <div><p className="text-white text-xs lg:text-sm font-bold tracking-tight whitespace-nowrap">{badge2Label}</p><p className="text-blue-200/50 text-[10px] lg:text-xs whitespace-nowrap">{badge2Sub}</p></div>
                </div>
              </div>
            </div>

            {/* BOTTOM mobile / LEFT desktop — copy */}
            <div className="ch-card-left order-3 lg:order-1 flex flex-col justify-center text-center lg:text-left z-20 w-full px-4 lg:px-0">
              <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-0 lg:mb-5 tracking-tight">{cardHeading}</h3>
              <p className="hidden md:block text-blue-100/70 text-sm md:text-base lg:text-lg font-normal leading-relaxed max-w-sm lg:max-w-none mx-auto lg:mx-0">{cardDescription}</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
