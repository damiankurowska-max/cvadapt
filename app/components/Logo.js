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
      <rect x="128" y="108" width="72" height="296" rx="36" fill="white"/>

      {/* P — bosse (demi-cercle plein, plus lisible à petite taille) */}
      <path
        d="M200 108 L290 108
           C368 108 412 152 412 212
           C412 272 368 316 290 316
           L200 316 Z"
        fill="white"
      />
      {/* Trou intérieur pour créer le P creux */}
      <path
        d="M200 160 L282 160
           C338 160 358 180 358 212
           C358 244 338 264 282 264
           L200 264 Z"
        fill="url(#logoBg)"
      />
    </svg>
  );
}
