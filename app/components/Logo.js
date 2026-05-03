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
        <linearGradient id="logoBg" x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3B82F6"/>
          <stop offset="100%" stopColor="#1D4ED8"/>
        </linearGradient>
        <linearGradient id="logoShine" x1="0" y1="0" x2="0" y2="512" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="white" stopOpacity="0.12"/>
          <stop offset="100%" stopColor="white" stopOpacity="0"/>
        </linearGradient>
      </defs>
      <rect width="512" height="512" rx="110" fill="url(#logoBg)"/>
      <rect width="512" height="512" rx="110" fill="url(#logoShine)"/>
      <path
        d="M340 158 C308 132 268 120 228 126 C164 136 118 188 118 256 C118 324 164 376 228 386 C268 392 308 380 340 354"
        stroke="white"
        strokeWidth="52"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M296 210 L390 256 L296 302"
        stroke="white"
        strokeWidth="46"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
