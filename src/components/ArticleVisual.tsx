import { getImageUrl } from "../lib/utils";

/** Decorative scientific cover art per article, recreated with SVG gradients. */
export default function ArticleVisual({ visual }: { visual: string }) {
  switch (visual) {
    case "incretin":
      return <IncretinWave />;
    case "molecule":
      return <MoleculeCloud />;
    case "chart":
      return <PriceChart />;
    case "vial":
      return <VialArt />;
    case "lab":
      return <LabArt />;
    case "dna":
      return <DnaArt />;
    default:
      return <img src={getImageUrl(visual)} alt="" />;
  }
}

function IncretinWave() {
  return (
    <svg
      viewBox="0 0 400 200"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="400" height="200" fill="#0a1733" />
      <ellipse
        cx="120"
        cy="100"
        rx="110"
        ry="80"
        fill="#11214a"
        opacity="0.7"
      />
      <ellipse
        cx="300"
        cy="100"
        rx="110"
        ry="80"
        fill="#11214a"
        opacity="0.7"
      />
      <path
        d="M0 100 C60 30 100 170 160 100 S260 30 320 100 400 170 400 100"
        stroke="#34d399"
        strokeWidth="2.5"
        fill="none"
      />
      <path
        d="M0 100 C60 170 100 30 160 100 S260 170 320 100 400 30 400 100"
        stroke="#38bdf8"
        strokeWidth="2.5"
        fill="none"
      />
      <circle cx="120" cy="118" r="5" fill="#38bdf8" />
      <circle cx="200" cy="100" r="5" fill="#fbbf24" />
      <rect x="20" y="74" width="58" height="26" rx="4" fill="#1e40af" />
      <text
        x="49"
        y="91"
        textAnchor="middle"
        fontSize="9"
        fill="#fff"
        fontFamily="Inter"
      >
        GIP receptor
      </text>
      <rect x="322" y="74" width="58" height="26" rx="4" fill="#15803d" />
      <text
        x="351"
        y="91"
        textAnchor="middle"
        fontSize="9"
        fill="#fff"
        fontFamily="Inter"
      >
        GLP-1 receptor
      </text>
      <text
        x="200"
        y="158"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill="#fff"
        fontFamily="Inter"
      >
        Tirzepatide
      </text>
      <text
        x="200"
        y="174"
        textAnchor="middle"
        fontSize="7"
        fill="#94a3b8"
        fontFamily="Inter"
      >
        Dual incretin receptor agonist · 39-residue synthetic peptide
      </text>
    </svg>
  );
}

function MoleculeCloud() {
  const dots = [
    [70, 90, "#14b8a6"],
    [95, 70, "#64748b"],
    [120, 95, "#ef4444"],
    [150, 75, "#3b82f6"],
    [180, 100, "#a855f7"],
    [210, 80, "#14b8a6"],
    [240, 95, "#64748b"],
    [270, 70, "#ef4444"],
    [300, 100, "#3b82f6"],
    [330, 85, "#14b8a6"],
    [110, 130, "#a855f7"],
    [160, 140, "#64748b"],
    [220, 135, "#ef4444"],
    [285, 140, "#14b8a6"],
    [85, 115, "#3b82f6"],
    [255, 120, "#facc15"],
  ] as const;
  return (
    <svg
      viewBox="0 0 400 200"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="400" height="200" fill="#f1f5f9" />
      <g stroke="#cbd5e1" strokeWidth="1.5">
        {dots.slice(0, -1).map(([x, y], i) => {
          const [nx, ny] = dots[i + 1];
          return <line key={i} x1={x} y1={y} x2={nx} y2={ny} />;
        })}
      </g>
      {dots.map(([x, y, c], i) => (
        <circle key={i} cx={x} cy={y} r="6" fill={c} />
      ))}
    </svg>
  );
}

function PriceChart() {
  return (
    <svg
      viewBox="0 0 400 200"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="400" height="200" fill="#0a1733" />
      <g stroke="#1e2f55" strokeWidth="1">
        {[40, 80, 120, 160].map((y) => (
          <line key={y} x1="20" y1={y} x2="380" y2={y} />
        ))}
      </g>
      <polyline
        points="30,150 90,120 150,135 210,80 270,95 330,45 375,60"
        fill="none"
        stroke="#34d399"
        strokeWidth="3"
      />
      <polyline
        points="30,150 90,120 150,135 210,80 270,95 330,45 375,60 375,170 30,170"
        fill="#34d39922"
        stroke="none"
      />
      {[
        [90, 120],
        [210, 80],
        [330, 45],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4" fill="#34d399" />
      ))}
      <text
        x="30"
        y="30"
        fontSize="11"
        fontWeight="700"
        fill="#fff"
        fontFamily="Inter"
      >
        Price / mg trend
      </text>
    </svg>
  );
}

function VialArt() {
  return (
    <svg
      viewBox="0 0 400 200"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="400" height="200" fill="#e8f0fb" />
      {[140, 200, 260].map((x, i) => (
        <g key={x}>
          <rect
            x={x - 18}
            y={50 + (i === 1 ? -10 : 0)}
            width="36"
            height="110"
            rx="8"
            fill="#fff"
            stroke="#bcd0ec"
            strokeWidth="1.5"
          />
          <rect
            x={x - 12}
            y={38 + (i === 1 ? -10 : 0)}
            width="24"
            height="14"
            rx="4"
            fill="#2563eb"
          />
        </g>
      ))}
      <circle cx="80" cy="60" r="26" fill="#bfdbfe" opacity="0.6" />
      <circle cx="330" cy="150" r="34" fill="#bfdbfe" opacity="0.5" />
    </svg>
  );
}

function LabArt() {
  return (
    <svg
      viewBox="0 0 400 200"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="400" height="200" fill="#eef6f1" />
      <path
        d="M170 50 L170 95 L140 150 a8 8 0 0 0 7 12 h106 a8 8 0 0 0 7 -12 L237 95 L237 50 Z"
        fill="#fff"
        stroke="#34d399"
        strokeWidth="2"
      />
      <path
        d="M156 130 h94 l-8 -15 a40 40 0 0 1 -78 0 Z"
        fill="#6ee7b7"
        opacity="0.7"
      />
      <rect x="160" y="44" width="87" height="8" rx="3" fill="#34d399" />
      <circle cx="190" cy="120" r="3" fill="#fff" />
      <circle cx="215" cy="135" r="3" fill="#fff" />
    </svg>
  );
}

function DnaArt() {
  return (
    <svg
      viewBox="0 0 400 200"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="400" height="200" fill="#0a1733" />
      {Array.from({ length: 9 }).map((_, i) => {
        const x = 60 + i * 36;
        const y1 = 100 + Math.sin(i * 0.8) * 45;
        const y2 = 100 - Math.sin(i * 0.8) * 45;
        return (
          <g key={i}>
            <line
              x1={x}
              y1={y1}
              x2={x}
              y2={y2}
              stroke="#1e3a8a"
              strokeWidth="2"
            />
            <circle cx={x} cy={y1} r="5" fill="#38bdf8" />
            <circle cx={x} cy={y2} r="5" fill="#34d399" />
          </g>
        );
      })}
    </svg>
  );
}
