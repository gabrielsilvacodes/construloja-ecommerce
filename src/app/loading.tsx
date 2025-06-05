export default function Loading() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen text-primary gap-4"
      role="status"
      aria-live="polite"
    >
      <svg
        className="animate-spin h-8 w-8 text-primary"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
      <span className="text-base font-medium animate-pulse">Carregando...</span>
    </div>
  );
}
