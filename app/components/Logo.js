export default function Logo({ size = 36, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="logoBg" x1="0" y1="0" x2="460" y2="512" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7AAAF9"/>
          <stop offset="100%" stopColor="#3B6EE8"/>
        </linearGradient>
      </defs>
      {/* Fond arrondi — style iOS app icon */}
      <rect width="512" height="512" rx="115" fill="url(#logoBg)"/>

      {/* P — tige verticale */}
      <rect x="130" y="110" width="68" height="292" rx="34" fill="white"/>

      {/* P — bosse droite (demi-cercle) */}
      <path
        d="M198 110 L278 110
           C340 110 384 150 384 210
           C384 270 340 310 278 310
           L198 310"
        stroke="white"
        strokeWidth="68"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
