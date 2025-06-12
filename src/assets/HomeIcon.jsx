export default function HomeIcon({ className = 'w-6 h-6' }) {
  return (
    <div className={`relative ${className}`}>
      {/* Çatı (stroke üçgen) */}
      <svg
        viewBox="0 0 100 100"
        className="absolute bottom-[33%] left-1/2 -translate-x-1/2 w-[24px] h-[24px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="6"
      >
        <polygon points="50,25 95,80 5,80" />
      </svg>

      {/* Gövde */}
      <div className="absolute bottom-[-3%] left-1/2 -translate-x-1/2 w-[340%] h-[60%] border-2 border-current bg-white" />
    </div>
  );
}
