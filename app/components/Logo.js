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

      {/* C — s'ouvre à droite, de ~1h à ~5h */}
      <path
        d="M338 150
           C303 122 257 108 212 117
           C144 130 96 189 96 256
           C96 323 144 382 212 395
           C257 404 303 390 338 362"
        stroke="white"
        strokeWidth="62"
        strokeLinecap="round"
        fill="none"
      />

      {/* > flèche chevron dans l'ouverture du C */}
      <path
        d="M294 200 L382 256 L294 312"
        stroke="white"
        strokeWidth="56"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
