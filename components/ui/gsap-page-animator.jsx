// components/ui/gsap-page-animator.jsx
// GSAP scroll animations — patterns from greensock/gsap-skills
"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function GSAPPageAnimator() {
  useEffect(() => {
    // Set initial invisible states BEFORE animating — prevents flash
    gsap.set("[data-gsap='hero-badge'], [data-gsap='hero-h1'], [data-gsap='hero-sub'], [data-gsap='hero-cta'], [data-gsap='hero-perks'], [data-gsap='hero-proof']", {
      autoAlpha: 0,
      y: 30,
    });

    const ctx = gsap.context(() => {
      // ── Hero entrance ───────────────────────────────────────────
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to("[data-gsap='hero-badge']",  { autoAlpha: 1, y: 0, duration: 0.6 }, 0.15)
        .to("[data-gsap='hero-h1']",     { autoAlpha: 1, y: 0, duration: 0.9 }, 0.3)
        .to("[data-gsap='hero-sub']",    { autoAlpha: 1, y: 0, duration: 0.7 }, 0.6)
        .to("[data-gsap='hero-cta']",    { autoAlpha: 1, y: 0, duration: 0.6 }, 0.8)
        .to("[data-gsap='hero-perks']",  { autoAlpha: 1, y: 0, duration: 0.5 }, 1.0)
        .to("[data-gsap='hero-proof']",  { autoAlpha: 1, y: 0, duration: 0.5 }, 1.1);

      // ── Logos ───────────────────────────────────────────────────
      gsap.from("[data-gsap='logo-item']", {
        scrollTrigger: { trigger: "[data-gsap='logos']", start: "top 90%", once: true },
        y: 20, autoAlpha: 0, stagger: 0.07, duration: 0.5, ease: "power2.out",
      });

      // ── Section headers ─────────────────────────────────────────
      gsap.utils.toArray("[data-gsap='section-header']").forEach((el) => {
        gsap.from(el.children, {
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
          y: 40, autoAlpha: 0, stagger: 0.12, duration: 0.8, ease: "power3.out",
        });
      });

      // ── Steps ───────────────────────────────────────────────────
      gsap.from("[data-gsap='step-card']", {
        scrollTrigger: { trigger: "[data-gsap='steps']", start: "top 80%", once: true },
        y: 70, autoAlpha: 0, stagger: 0.18, duration: 0.9, ease: "expo.out",
      });

      // ── Before / After ──────────────────────────────────────────
      const bc = document.querySelector("[data-gsap='before-card']");
      const ac = document.querySelector("[data-gsap='after-card']");
      if (bc && ac) {
        const tr = { trigger: bc, start: "top 82%", once: true };
        gsap.from(bc, { scrollTrigger: tr, x: -60, autoAlpha: 0, duration: 0.9, ease: "power3.out" });
        gsap.from(ac, { scrollTrigger: { ...tr, delay: 0.1 }, x: 60, autoAlpha: 0, duration: 0.9, ease: "power3.out" });
      }

      // ── Testimonials ────────────────────────────────────────────
      gsap.from("[data-gsap='testimonial-card']", {
        scrollTrigger: { trigger: "[data-gsap='testimonials']", start: "top 82%", once: true },
        y: 50, autoAlpha: 0, stagger: 0.1, duration: 0.75, ease: "power3.out",
      });

      // ── Pricing ─────────────────────────────────────────────────
      gsap.from("[data-gsap='price-card']", {
        scrollTrigger: { trigger: "[data-gsap='pricing']", start: "top 80%", once: true },
        y: 60, autoAlpha: 0, scale: 0.95, stagger: 0.12, duration: 0.85, ease: "back.out(1.2)",
      });

      // ── FAQ ─────────────────────────────────────────────────────
      gsap.from("[data-gsap='faq-item']", {
        scrollTrigger: { trigger: "[data-gsap='faq']", start: "top 82%", once: true },
        y: 30, autoAlpha: 0, stagger: 0.08, duration: 0.6, ease: "power2.out",
      });

      // ── Final CTA ───────────────────────────────────────────────
      const cta = document.querySelector("[data-gsap='final-cta']");
      if (cta) {
        gsap.from(cta.children, {
          scrollTrigger: { trigger: cta, start: "top 82%", once: true },
          y: 40, autoAlpha: 0, stagger: 0.15, duration: 0.8, ease: "power3.out",
        });
      }
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return null;
}
