export default function HomeIcon({ size = 100, color = '#000000' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Çatı */}
      <polygon
        points="40,160 200,40 360,160"
        fill="none"
        stroke={color}
        strokeWidth="8"
        strokeLinejoin="round"
      />

      {/* Baca */}
      <polygon
        points="100,40 140,40 140,80 100,115"
        fill="none"
        stroke={color}
        strokeWidth="8"
        strokeLinejoin="round"
      />

      {/* Ana ev gövdesi */}
      <polygon
        points="80,160 80,320 320,320 320,160"
        fill="none"
        stroke={color}
        strokeWidth="8"
        strokeLinejoin="round"
      />

      {/* Kapı */}
      <polygon
        points="170,200 170,320 230,320 230,200"
        fill="none"
        stroke={color}
        strokeWidth="6"
        strokeLinejoin="round"
      />

      {/* Sol pencere */}
      <polygon
        points="100,220 140,220 140,280 100,280"
        fill="none"
        stroke={color}
        strokeWidth="6"
        strokeLinejoin="round"
      />

      {/* Sağ pencere */}
      <polygon
        points="260,220 300,220 300,280 260,280"
        fill="none"
        stroke={color}
        strokeWidth="6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
