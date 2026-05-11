"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const sizeConfig = {
  sm: {
    container: "h-[300px] w-[300px]",
    fontSize: "text-xs",
    tracking: "tracking-[0.25em]",
    radius: 130,
    gap: 40,
    imageSize: "w-[75%] h-[75%]",
    textStyle: "font-medium",
  },
  md: {
    container: "h-[400px] w-[400px]",
    fontSize: "text-sm",
    tracking: "tracking-[0.3em]",
    radius: 170,
    gap: 30,
    imageSize: "w-[75%] h-[75%]",
    textStyle: "font-medium",
  },
  lg: {
    container: "h-[500px] w-[500px]",
    fontSize: "text-base",
    tracking: "tracking-[0.35em]",
    radius: 210,
    gap: 20,
    imageSize: "w-[75%] h-[75%]",
    textStyle: "font-medium",
  },
};

const usePreloadImages = (images) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const loadImage = (url) =>
      new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve();
        img.onerror = reject;
      });
    Promise.all(images.map(loadImage))
      .then(() => setLoaded(true))
      .catch((err) => console.error("Error preloading images:", err));
  }, [images]);
  return loaded;
};

const ImageOverlay = ({ image, size = "md" }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
  >
    <motion.img
      src={image}
      alt=""
      className={cn(sizeConfig[size].imageSize, "object-cover rounded-full")}
      style={{ filter: "brightness(0.95)" }}
    />
  </motion.div>
);

export const CircularRevealHeading = ({
  items,
  centerText,
  className,
  size = "md",
}) => {
  const [activeImage, setActiveImage] = useState(null);
  const [activeLabel, setActiveLabel] = useState(null);
  const config = sizeConfig[size];
  const imagesLoaded = usePreloadImages(items.map((item) => item.image));

  const createTextSegments = () => {
    const totalItems = items.length;
    const totalGapDegrees = config.gap * totalItems;
    const availableDegrees = 360 - totalGapDegrees;
    const segmentDegrees = availableDegrees / totalItems;

    return items.map((item, index) => {
      const startPosition = index * (segmentDegrees + config.gap);
      const startOffset = `${(startPosition / 360) * 100}%`;

      return (
        <g key={index}>
          <text
            className={cn(
              config.fontSize,
              config.tracking,
              config.textStyle,
              "uppercase cursor-pointer transition-all duration-300"
            )}
            onMouseEnter={() => {
              if (imagesLoaded) {
                setActiveImage(item.image);
                setActiveLabel(item.text);
              }
            }}
            onMouseLeave={() => {
              setActiveImage(null);
              setActiveLabel(null);
            }}
          >
            <textPath
              href="#curve"
              className="fill-[url(#textGradient)]"
              startOffset={startOffset}
              textLength={`${segmentDegrees * 1.8}`}
              lengthAdjust="spacingAndGlyphs"
            >
              {item.text}
            </textPath>
          </text>
        </g>
      );
    });
  };

  return (
    <motion.div
      whileHover={{
        boxShadow: "20px 20px 40px #c5d5f5, -20px -20px 40px #ffffff",
      }}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      className={cn(
        "relative overflow-hidden",
        config.container,
        "rounded-full bg-[#eef2ff]",
        "shadow-[16px_16px_32px_#c5d5f5,-16px_-16px_32px_#ffffff]",
        "transition-all duration-500 ease-out",
        className
      )}
    >
      <AnimatePresence>
        {activeImage && imagesLoaded && (
          <ImageOverlay image={activeImage} size={size} />
        )}
      </AnimatePresence>

      <motion.div
        className="absolute inset-[2px] rounded-full bg-[#eef2ff]"
        style={{
          boxShadow: "inset 6px 6px 12px #d8e0f8, inset -6px -6px 12px #ffffff",
        }}
      />
      <motion.div
        className="absolute inset-[12px] rounded-full bg-[#eef2ff]"
        style={{
          boxShadow: "inset 4px 4px 8px #d8e0f8, inset -4px -4px 8px #ffffff",
        }}
      />

      <motion.div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {activeLabel ? (
            <motion.div
              key={activeLabel}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.2 }}
              className="relative z-30 px-4 py-2 rounded-2xl bg-blue-600 text-white text-sm font-bold text-center shadow-lg"
            >
              {activeLabel}
            </motion.div>
          ) : (
            <motion.div
              key="center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 p-6 rounded-3xl bg-[#eef2ff] text-center"
              style={{
                boxShadow: "inset 3px 3px 6px #d8e0f8, inset -3px -3px 6px #ffffff",
              }}
            >
              {centerText}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        className="absolute inset-0"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <defs>
            <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
          </defs>
          <path
            id="curve"
            fill="none"
            d={`M 200,200 m -${config.radius},0 a ${config.radius},${config.radius} 0 1,1 ${config.radius * 2},0 a ${config.radius},${config.radius} 0 1,1 -${config.radius * 2},0`}
          />
          {createTextSegments()}
        </svg>
      </motion.div>
    </motion.div>
  );
};
