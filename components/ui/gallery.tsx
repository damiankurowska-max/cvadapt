"use client";

import { Ref, forwardRef, useState, useEffect, useRef } from "react";
import Image, { ImageProps } from "next/image";
import { motion, useMotionValue } from "motion/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// ─── Types ───────────────────────────────────────────────────────────────────

type Direction = "left" | "right";
type GalleryStyle = "spread" | "stack" | "carousel";

interface PhotoData {
  id: number;
  src: string;
  alt: string;
  order?: number;
  x?: string;
  y?: string;
  zIndex?: number;
  direction?: Direction;
  rotation?: number;
}

// ─── Images par défaut ────────────────────────────────────────────────────────

const DEFAULT_PHOTOS: PhotoData[] = [
  {
    id: 1,
    src: "https://images.pexels.com/photos/32025694/pexels-photo-32025694/free-photo-of-romantic-wedding-in-ancient-ruins.jpeg",
    alt: "Photo 1",
    order: 0, x: "-320px", y: "15px", zIndex: 50, direction: "left",
  },
  {
    id: 2,
    src: "https://images.pexels.com/photos/31596551/pexels-photo-31596551/free-photo-of-winter-scene-with-lake-view-in-van-turkiye.jpeg",
    alt: "Photo 2",
    order: 1, x: "-160px", y: "32px", zIndex: 40, direction: "left",
  },
  {
    id: 3,
    src: "https://images.pexels.com/photos/31890053/pexels-photo-31890053/free-photo-of-moody-portrait-with-heart-shaped-light.jpeg",
    alt: "Photo 3",
    order: 2, x: "0px", y: "8px", zIndex: 30, direction: "right",
  },
  {
    id: 4,
    src: "https://images.pexels.com/photos/19936068/pexels-photo-19936068/free-photo-of-women-sitting-on-hilltop-with-clouds-below.jpeg",
    alt: "Photo 4",
    order: 3, x: "160px", y: "22px", zIndex: 20, direction: "right",
  },
  {
    id: 5,
    src: "https://images.pexels.com/photos/20494995/pexels-photo-20494995/free-photo-of-head-of-peacock.jpeg",
    alt: "Photo 5",
    order: 4, x: "320px", y: "44px", zIndex: 10, direction: "left",
  },
];

// ─── Composant principal ──────────────────────────────────────────────────────

export const PhotoGallery = ({
  animationDelay = 0.5,
  style = "spread",
  photos = DEFAULT_PHOTOS,
  title = "Welcome to My Stories",
  subtitle = "A Journey Through Visual Stories",
  ctaLabel = "View All Stories",
  onCtaClick,
}: {
  animationDelay?: number;
  style?: GalleryStyle;
  photos?: PhotoData[];
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
}) => {
  const [activeStyle, setActiveStyle] = useState<GalleryStyle>(style);

  const styles: { id: GalleryStyle; label: string }[] = [
    { id: "spread",   label: "Éventail" },
    { id: "stack",    label: "Pile" },
    { id: "carousel", label: "Carrousel" },
  ];

  return (
    <div className="mt-10 relative">
      {/* Grille de fond décorative */}
      <div className="absolute inset-0 max-md:hidden top-[200px] -z-10 h-[300px] w-full bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-40 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      {/* En-tête */}
      <p className="my-2 text-center text-xs font-light uppercase tracking-widest text-slate-500">
        {subtitle}
      </p>
      <h3 className="z-20 mx-auto max-w-2xl bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text py-3 text-center text-4xl font-bold text-transparent md:text-5xl">
        {title.split(" ").map((word, i) =>
          i === title.split(" ").length - 1 ? (
            <span key={i} className="text-blue-600"> {word}</span>
          ) : (
            <span key={i}>{word} </span>
          )
        )}
      </h3>

      {/* Toggle styles */}
      <div className="flex justify-center gap-2 mb-8 mt-4">
        {styles.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveStyle(s.id)}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-semibold transition-all",
              activeStyle === s.id
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Galerie selon le style */}
      <div className="relative mb-8">
        {activeStyle === "spread"   && <SpreadGallery   photos={photos} animationDelay={animationDelay} />}
        {activeStyle === "stack"    && <StackGallery    photos={photos} />}
        {activeStyle === "carousel" && <CarouselGallery photos={photos} />}
      </div>

      {/* CTA */}
      <div className="flex w-full justify-center">
        <Button onClick={onCtaClick}>{ctaLabel}</Button>
      </div>
    </div>
  );
};

// ─── Style 1 : ÉVENTAIL (spread) ─────────────────────────────────────────────

function SpreadGallery({ photos, animationDelay }: { photos: PhotoData[]; animationDelay: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded]   = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setIsVisible(true), animationDelay * 1000);
    const t2 = setTimeout(() => setIsLoaded(true),  (animationDelay + 0.4) * 1000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [animationDelay]);

  const containerVariants = {
    hidden:  { opacity: 1 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
  };

  const photoVariants: import("motion/react").Variants = {
    hidden:  { x: 0, y: 0, scale: 1 },
    visible: (custom: { x: string; y: string; order: number }) => ({
      x: custom.x,
      y: custom.y,
      scale: 1,
      transition: { type: "spring", stiffness: 70, damping: 12, mass: 1, delay: custom.order * 0.15 },
    }),
  };

  return (
    <div className="relative h-[350px] w-full flex items-center justify-center">
      <motion.div
        className="relative mx-auto flex w-full max-w-7xl justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <motion.div
          className="relative flex w-full justify-center"
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
        >
          <div className="relative h-[220px] w-[220px]">
            {[...photos].reverse().map((photo) => (
              <motion.div
                key={photo.id}
                className="absolute left-0 top-0"
                style={{ zIndex: photo.zIndex }}
                variants={photoVariants}
                custom={{ x: photo.x ?? "0px", y: photo.y ?? "0px", order: photo.order ?? 0 }}
              >
                <DraggablePhoto
                  width={220} height={220}
                  src={photo.src} alt={photo.alt}
                  direction={photo.direction ?? "right"}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

// ─── Style 2 : PILE (stack) ───────────────────────────────────────────────────

function StackGallery({ photos }: { photos: PhotoData[] }) {
  const [stack, setStack] = useState<PhotoData[]>(photos);

  function sendToBack() {
    setStack((prev) => {
      const next = [...prev];
      const top  = next.pop()!;
      next.unshift(top);
      return next;
    });
  }

  const rotations = [-6, -3, 0, 3, 6];

  return (
    <div className="relative h-[350px] w-full flex flex-col items-center justify-center gap-4">
      <div className="relative h-[260px] w-[220px]">
        {stack.map((photo, i) => {
          const isTop = i === stack.length - 1;
          const rot   = rotations[i % rotations.length];
          return (
            <motion.div
              key={photo.id}
              className="absolute inset-0 rounded-3xl overflow-hidden shadow-xl cursor-pointer"
              style={{ zIndex: i }}
              animate={{ rotate: rot, scale: isTop ? 1.04 : 1, y: isTop ? -8 : 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              onClick={isTop ? sendToBack : undefined}
              whileHover={isTop ? { scale: 1.07 } : {}}
            >
              <Image src={photo.src} alt={photo.alt} fill className="object-cover" />
              {isTop && (
                <div className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-black/40 to-transparent">
                  <span className="text-white text-xs font-semibold">Cliquer pour tourner →</span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
      <p className="text-xs text-gray-400 mt-2">Clique sur la photo du dessus pour faire défiler</p>
    </div>
  );
}

// ─── Style 3 : CARROUSEL (carousel) ──────────────────────────────────────────

function CarouselGallery({ photos }: { photos: PhotoData[] }) {
  const [current, setCurrent] = useState(0);
  const total = photos.length;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  // Auto-play
  useEffect(() => {
    const t = setInterval(next, 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative h-[350px] w-full flex items-center justify-center overflow-hidden">
      {/* Photos */}
      <div className="relative flex items-center justify-center w-full max-w-2xl">
        {photos.map((photo, i) => {
          const offset  = i - current;
          const visible = Math.abs(offset) <= 1;
          return (
            <motion.div
              key={photo.id}
              className="absolute rounded-2xl overflow-hidden shadow-xl"
              style={{ width: 240, height: 260, zIndex: offset === 0 ? 30 : 10 }}
              animate={{
                x:       offset * 220,
                scale:   offset === 0 ? 1 : 0.82,
                opacity: visible ? (offset === 0 ? 1 : 0.5) : 0,
                rotateY: offset * -8,
              }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
            >
              <Image src={photo.src} alt={photo.alt} fill className="object-cover" />
            </motion.div>
          );
        })}
      </div>

      {/* Flèches */}
      <button
        onClick={prev}
        className="absolute left-4 z-40 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-colors text-lg"
      >
        ‹
      </button>
      <button
        onClick={next}
        className="absolute right-4 z-40 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-colors text-lg"
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-2 flex gap-2">
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              i === current ? "bg-blue-600 w-5" : "bg-gray-300"
            )}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Photo draggable (utilisée dans Spread) ───────────────────────────────────

const MotionImage = motion(
  forwardRef(function MotionImageInner(props: ImageProps, ref: Ref<HTMLImageElement>) {
    return <Image ref={ref} {...props} />;
  })
);

function DraggablePhoto({
  src, alt, direction = "right", width, height, className,
}: {
  src: string; alt: string; direction?: Direction;
  width: number; height: number; className?: string;
}) {
  const [rotation, setRotation] = useState(0);
  const x = useMotionValue(200);
  const y = useMotionValue(200);

  useEffect(() => {
    const r = (Math.random() * 3 + 1) * (direction === "left" ? -1 : 1);
    setRotation(r);
  }, [direction]);

  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      whileTap={{ scale: 1.2, zIndex: 9999 }}
      whileHover={{ scale: 1.1, rotateZ: 2 * (direction === "left" ? -1 : 1), zIndex: 9999 }}
      whileDrag={{ scale: 1.1, zIndex: 9999 }}
      initial={{ rotate: 0 }}
      animate={{ rotate: rotation }}
      style={{ width, height, zIndex: 1, userSelect: "none", touchAction: "none" }}
      className={cn(className, "relative mx-auto shrink-0 cursor-grab active:cursor-grabbing")}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left);
        y.set(e.clientY - rect.top);
      }}
      onMouseLeave={() => { x.set(200); y.set(200); }}
      draggable={false}
    >
      <div className="relative h-full w-full overflow-hidden rounded-3xl shadow-md">
        <MotionImage
          className="rounded-3xl object-cover"
          fill src={src} alt={alt}
          draggable={false}
          unoptimized
        />
      </div>
    </motion.div>
  );
}
