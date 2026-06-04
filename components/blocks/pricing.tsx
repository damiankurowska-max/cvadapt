"use client";

import { buttonVariants } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import Link from "next/link";
import { useState, useRef } from "react";
import confetti from "canvas-confetti";
import NumberFlow from "@number-flow/react";

export interface PricingPlan {
  name: string;
  /** Prix mensuel (number, en euros) */
  price: number;
  /** Prix annuel ramené au mois (number, en euros) */
  yearlyPrice: number;
  period: string;
  features: string[];
  description: string;
  buttonText: string;
  /** Optionnel : lien statique (ex. /generate). Si absent, utilise onAction. */
  href?: string;
  /** Optionnel : callback checkout. Reçoit "monthly" | "yearly". */
  onAction?: (billing: "monthly" | "yearly") => void;
  /** Optionnel : affiche le spinner sur ce bouton quand true */
  isLoading?: boolean;
  isPopular: boolean;
}

interface PricingProps {
  plans: PricingPlan[];
  title?: string;
  description?: string;
}

export function Pricing({
  plans,
  title = "Tarifs simples et transparents",
  description = "Choisissez la formule adaptée à vos besoins.\nSans engagement, résiliable à tout moment.",
}: PricingProps) {
  const [isMonthly, setIsMonthly] = useState(true);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const switchRef = useRef<HTMLButtonElement>(null);

  const handleToggle = (checked: boolean) => {
    setIsMonthly(!checked);
    if (checked && switchRef.current) {
      const rect = switchRef.current.getBoundingClientRect();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + rect.height / 2) / window.innerHeight,
        },
        colors: ["#2563eb", "#4f46e5", "#7c3aed", "#06b6d4"],
        ticks: 200,
        gravity: 1.2,
        decay: 0.94,
        startVelocity: 30,
        shapes: ["circle"],
      });
    }
  };

  const billing = isMonthly ? "monthly" : "yearly";

  return (
    <div className="container py-20">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
          {title}
        </h2>
        <p className="text-muted-foreground text-lg whitespace-pre-line">
          {description}
        </p>
      </div>

      {/* Toggle mensuel / annuel — segmented control pill */}
      <div className="flex justify-center mb-10">
        <div
          className="relative flex p-1 rounded-full"
          style={{
            background: "#f0f7ff",
            border: "1.5px solid #bfdbfe",
            gap: 0,
          }}
        >
          {/* Sliding indicator */}
          <motion.div
            layout
            className="absolute inset-y-1 rounded-full"
            style={{
              width: "calc(50% - 4px)",
              background: "linear-gradient(135deg,#3b82f6,#1d4ed8)",
              boxShadow: "0 2px 10px rgba(29,78,216,0.3)",
              left: isMonthly ? 4 : "calc(50%)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />

          <button
            type="button"
            ref={switchRef as React.RefObject<HTMLButtonElement>}
            onClick={() => { if (!isMonthly) handleToggle(false); }}
            className="relative z-10 px-6 py-2 text-sm font-bold rounded-full transition-colors"
            style={{ color: isMonthly ? "#fff" : "#6b7280", minWidth: 110 }}
          >
            Mensuel
          </button>

          <button
            type="button"
            onClick={() => { if (isMonthly) handleToggle(true); }}
            className="relative z-10 px-6 py-2 text-sm font-bold rounded-full transition-colors flex items-center gap-2"
            style={{ color: !isMonthly ? "#fff" : "#6b7280", minWidth: 110 }}
          >
            Annuel
            <span
              className="text-xs font-extrabold px-1.5 py-0.5 rounded-full"
              style={{
                background: !isMonthly ? "rgba(255,255,255,0.25)" : "rgba(29,78,216,0.12)",
                color: !isMonthly ? "#fff" : "#1d4ed8",
              }}
            >
              −20%
            </span>
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ y: 50, opacity: 0 }}
            whileInView={
              isDesktop
                ? {
                    y: plan.isPopular ? -20 : 0,
                    opacity: 1,
                    x: index === 2 ? -30 : index === 0 ? 30 : 0,
                    scale: index === 0 || index === 2 ? 0.94 : 1.0,
                  }
                : { y: 0, opacity: 1 }
            }
            viewport={{ once: true }}
            transition={{
              duration: 1.4,
              type: "spring",
              stiffness: 100,
              damping: 28,
              delay: index * 0.1 + 0.15,
            }}
            className={cn(
              "rounded-2xl border p-6 bg-background text-center flex flex-col relative",
              plan.isPopular
                ? "border-blue-600 border-2 shadow-xl shadow-blue-600/10"
                : "border-border",
              !plan.isPopular && "mt-5"
            )}
          >
            {plan.isPopular && (
              <div className="absolute top-0 right-0 bg-blue-600 py-0.5 px-2.5 rounded-bl-xl rounded-tr-xl flex items-center gap-1">
                <Star className="text-white h-3.5 w-3.5 fill-current" />
                <span className="text-white text-xs font-semibold">Populaire</span>
              </div>
            )}

            <div className="flex-1 flex flex-col">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-6">
                {plan.name}
              </p>

              {/* Prix animé */}
              <div className="flex items-baseline justify-center gap-1 mb-1">
                <span className="text-5xl font-bold tracking-tight text-foreground">
                  <NumberFlow
                    value={isMonthly ? plan.price : plan.yearlyPrice}
                    format={{
                      style: "currency",
                      currency: "EUR",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }}
                    transformTiming={{ duration: 500, easing: "ease-out" }}
                    willChange
                  />
                </span>
                <span className="text-sm font-medium text-muted-foreground">
                  /{plan.period}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mb-6">
                {isMonthly ? "facturé mensuellement" : "facturé annuellement"}
              </p>

              {/* Features */}
              <ul className="space-y-2.5 text-sm text-left mb-6 flex-1">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <hr className="border-border mb-5" />

              {/* CTA — Link ou button selon la config du plan */}
              {plan.href ? (
                <Link
                  href={plan.href}
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "w-full text-sm font-bold transition-all duration-200",
                    "hover:ring-2 hover:ring-blue-600 hover:ring-offset-1 hover:bg-blue-600 hover:text-white hover:border-blue-600",
                    plan.isPopular
                      ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                      : "bg-background text-foreground"
                  )}
                >
                  {plan.buttonText}
                </Link>
              ) : (
                <button
                  onClick={() => plan.onAction?.(billing)}
                  disabled={plan.isLoading}
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "w-full text-sm font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
                    "hover:ring-2 hover:ring-blue-600 hover:ring-offset-1 hover:bg-blue-600 hover:text-white hover:border-blue-600",
                    plan.isPopular
                      ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                      : "bg-background text-foreground"
                  )}
                >
                  {plan.isLoading ? "Chargement..." : plan.buttonText}
                </button>
              )}

              <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
                {plan.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
