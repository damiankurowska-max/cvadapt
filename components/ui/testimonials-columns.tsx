"use client";
import React from "react";

export type Testimonial = {
  text: string;
  image: string;
  name: string;
  role: string;
  result: string;
};

const AVATAR_COLORS = [
  "#3b82f6","#8b5cf6","#10b981","#f59e0b","#ef4444","#06b6d4","#ec4899","#14b8a6","#f97316","#6366f1"
];

function getAvatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function getInitials(name: string): string {
  return name.split(" ").slice(0, 2).map(n => n[0]).join("").toUpperCase();
}

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  const duration = props.duration || 25;

  return (
    <div className={props.className} style={{ overflow: "hidden" }}>
      <div
        className="flex flex-col gap-6 pb-6"
        style={{ animation: `scrollCol ${duration}s linear infinite` }}
      >
        {[0, 1].map((rep) => (
          <React.Fragment key={rep}>
            {props.testimonials.map(({ text, name, role, result }, i) => (
              <div
                key={`${rep}-${i}`}
                className="p-6 rounded-2xl border border-gray-100 bg-white shadow-sm max-w-xs w-full"
              >
                <div className="flex gap-0.5 mb-3">
                  {[0,1,2,3,4].map((s) => (
                    <span key={s} className="text-yellow-400 text-sm">★</span>
                  ))}
                  <span className="ml-2 text-xs bg-green-50 text-green-600 border border-green-100 px-2 py-0.5 rounded-full font-semibold">✓ Vérifié</span>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">&ldquo;{text}&rdquo;</p>
                <div className="bg-green-50 rounded-lg px-3 py-1.5 mb-4">
                  <p className="text-green-700 text-xs font-semibold">🎯 {result}</p>
                </div>
                <div className="flex items-center gap-3 pt-3 border-t border-gray-50">
                  <div
                    style={{ background: getAvatarColor(name), width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 12, fontWeight: 700, flexShrink: 0 }}
                  >
                    {getInitials(name)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm leading-tight">{name}</div>
                    <div className="text-gray-400 text-xs">{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
