"use client";
import React, { useRef } from "react";
import {
  useScroll,
  useTransform,
  useSpring,
  motion,
  MotionValue,
} from "motion/react";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent?: React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // ── Raw scroll values ────────────────────────────────────────────────────
  const rotateXRaw  = useTransform(scrollYProgress, [0, 0.55], isMobile ? [35, 0] : [52, 0]);
  const rotateYRaw  = useTransform(scrollYProgress, [0, 0.55], [-10, 0]);
  const translateYRaw = useTransform(scrollYProgress, [0, 0.55], [isMobile ? 60 : 120, 0]);
  const scaleRaw    = useTransform(scrollYProgress, [0, 0.55], [isMobile ? 0.78 : 0.72, 1]);
  const opacityRaw  = useTransform(scrollYProgress, [0, 0.25], [0, 1]);

  // Shadow tracks the tilt angle
  const shadowYRaw   = useTransform(scrollYProgress, [0, 0.55], [6, 50]);
  const shadowBlurRaw = useTransform(scrollYProgress, [0, 0.55], [10, 80]);
  const shadowSpreadRaw = useTransform(scrollYProgress, [0, 0.55], [-6, -20]);

  // ── Springy smoothing ────────────────────────────────────────────────────
  const spring = { stiffness: 80, damping: 20, mass: 0.8 };
  const rotateX  = useSpring(rotateXRaw,  spring);
  const rotateY  = useSpring(rotateYRaw,  spring);
  const translateY = useSpring(translateYRaw, spring);
  const scale    = useSpring(scaleRaw,    spring);

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center"
      style={{ height: isMobile ? "52rem" : "68rem" }}
    >
      {/* Deep-perspective wrapper */}
      <div className="sticky top-1/4 w-full flex flex-col items-center" style={{ perspective: "2400px" }}>
        {titleComponent && (
          <motion.div
            style={{ opacity: opacityRaw, y: translateY }}
            className="max-w-2xl mx-auto text-center mb-10"
          >
            {titleComponent}
          </motion.div>
        )}

        <Card
          rotateX={rotateX}
          rotateY={rotateY}
          scale={scale}
          translateY={translateY}
          opacity={opacityRaw}
          shadowY={shadowYRaw}
          shadowBlur={shadowBlurRaw}
          shadowSpread={shadowSpreadRaw}
        >
          {children}
        </Card>
      </div>
    </div>
  );
};

const Card = ({
  rotateX,
  rotateY,
  scale,
  translateY,
  opacity,
  shadowY,
  shadowBlur,
  shadowSpread,
  children,
}: {
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
  scale: MotionValue<number>;
  translateY: MotionValue<number>;
  opacity: MotionValue<number>;
  shadowY: MotionValue<number>;
  shadowBlur: MotionValue<number>;
  shadowSpread: MotionValue<number>;
  children: React.ReactNode;
}) => {
  // Compose dynamic box-shadow from motion values
  const boxShadow = useTransform(
    [shadowY, shadowBlur, shadowSpread],
    ([y, blur, spread]: number[]) =>
      `0 ${y}px ${blur}px ${spread}px rgba(29,78,216,0.10), 0 ${Math.round(y * 0.35)}px ${Math.round(blur * 0.4)}px ${spread}px rgba(0,0,0,0.08)`,
  );

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        scale,
        y: translateY,
        opacity,
        boxShadow,
        transformStyle: "preserve-3d",
        transformOrigin: "center bottom",
      }}
      className="w-full max-w-lg mx-auto rounded-2xl overflow-hidden border border-gray-100 bg-white"
    >
      {/* Reflective top-edge highlight — gives depth to the 3D tilt */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.9) 30%, rgba(255,255,255,0.9) 70%, transparent)",
        }}
      />
      {children}
    </motion.div>
  );
};
