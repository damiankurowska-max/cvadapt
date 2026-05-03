export default function Logo({ size = 36, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Fond arrondi bleu */}
      <rect width="36" height="36" rx="9" fill="#2563EB" />

      {/* Arc du C */}
      <path
        d="M24 12.5C21.8 10.9 19 10.2 16.2 10.8C11.8 11.8 9 15.2 9 18.5C9 21.8 11.8 25.2 16.2 26.2C19 26.8 21.8 26.1 24 24.5"
        stroke="white"
        strokeWidth="2.8"
        strokeLinecap="round"
        fill="none"
      />

      {/* Flèche → dans l'ouverture du C */}
      <path
        d="M21 15.5L26 18.5L21 21.5"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
