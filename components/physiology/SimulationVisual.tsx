import type { SimulationKind } from "@/lib/physiology/experiment";

interface SimulationVisualProps {
  kind: SimulationKind;
  value: number;
  min: number;
  max: number;
}

function getRatio(value: number, min: number, max: number): number {
  if (max <= min) return 0;

  return Math.max(0, Math.min(1, (value - min) / (max - min)));
}

function EcgVisual({ ratio }: { ratio: number }) {
  const beatCount = 2 + Math.round(ratio * 4);
  const segmentWidth = 600 / beatCount;

  const path = Array.from({ length: beatCount }, (_, index) => {
    const start = 20 + index * segmentWidth;
    const baseline = 78;
    const peak = start + segmentWidth * 0.45;

    return [
      `L ${start} ${baseline}`,
      `L ${start + segmentWidth * 0.12} ${baseline - 5}`,
      `L ${start + segmentWidth * 0.22} ${baseline}`,
      `L ${peak - 9} ${baseline}`,
      `L ${peak} 24`,
      `L ${peak + 11} 112`,
      `L ${peak + 20} ${baseline}`,
      `L ${start + segmentWidth * 0.72} ${baseline}`,
      `L ${start + segmentWidth * 0.84} ${baseline - 10}`,
      `L ${start + segmentWidth * 0.94} ${baseline}`,
    ].join(" ");
  }).join(" ");

  return (
    <>
      <path
        d="M 20 78 H 620"
        stroke="currentColor"
        strokeOpacity="0.15"
        strokeDasharray="4 6"
      />
      <path
        d={`M 20 78 ${path} L 620 78`}
        fill="none"
        stroke="#67e8f9"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
}

function PressureVisual({ ratio }: { ratio: number }) {
  const height = 30 + ratio * 90;
  const top = 132 - height;

  return (
    <>
      <rect x="265" y="20" width="110" height="120" rx="18" fill="#1e293b" />
      <rect
        x="279"
        y={top}
        width="82"
        height={height}
        rx="10"
        fill="#818cf8"
        fillOpacity="0.9"
      />
      <path
        d="M 230 45 H 260 M 230 80 H 260 M 230 115 H 260"
        stroke="#94a3b8"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M 380 45 H 410 M 380 80 H 410 M 380 115 H 410"
        stroke="#94a3b8"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="320" cy={top} r="5" fill="#c4b5fd" />
    </>
  );
}

function OxygenVisual({ ratio }: { ratio: number }) {
  const markerX = 90 + ratio * 460;
  const markerY = 128 - 100 / (1 + Math.exp(-10 * (ratio - 0.5)));

  return (
    <>
      <path
        d="M 40 135 H 610 M 40 135 V 20"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="1.5"
      />
      <path
        d="M 45 130 C 130 130 160 125 220 105 S 290 45 360 32 S 490 28 605 28"
        fill="none"
        stroke="#34d399"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx={markerX} cy={markerY} r="7" fill="#67e8f9" />
      <circle
        cx={markerX}
        cy={markerY}
        r="13"
        fill="#67e8f9"
        fillOpacity="0.15"
      />
    </>
  );
}

function VentilationVisual({ ratio }: { ratio: number }) {
  const lungOpacity = 0.25 + ratio * 0.7;

  return (
    <>
      <path
        d="M 320 30 V 72"
        stroke="#94a3b8"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path
        d="M 320 65 C 295 75 285 85 280 105"
        stroke="#94a3b8"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 320 65 C 345 75 355 85 360 105"
        stroke="#94a3b8"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 280 75 C 230 55 205 105 220 135 C 230 153 270 145 290 112 Z"
        fill="#67e8f9"
        fillOpacity={lungOpacity}
        stroke="#67e8f9"
        strokeWidth="2"
      />
      <path
        d="M 360 75 C 410 55 435 105 420 135 C 410 153 370 145 350 112 Z"
        fill="#67e8f9"
        fillOpacity={lungOpacity}
        stroke="#67e8f9"
        strokeWidth="2"
      />
    </>
  );
}

function ActionPotentialVisual({ ratio }: { ratio: number }) {
  const fired = ratio >= 0.5;

  return (
    <>
      <path
        d="M 35 100 H 605"
        stroke="currentColor"
        strokeOpacity="0.3"
        strokeDasharray="5 5"
      />
      <path
        d={
          fired
            ? "M 35 100 L 190 100 L 230 94 L 260 25 L 290 125 L 325 100 L 605 100"
            : "M 35 100 L 190 100 L 230 94 L 260 82 L 290 100 L 325 100 L 605 100"
        }
        fill="none"
        stroke={fired ? "#c4b5fd" : "#67e8f9"}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 35 65 H 605"
        stroke="#fbbf24"
        strokeOpacity="0.55"
        strokeDasharray="5 5"
      />
    </>
  );
}

function SynapseVisual({ ratio }: { ratio: number }) {
  const count = Math.round(ratio * 8);

  return (
    <>
      <path
        d="M 90 35 Q 320 5 550 35 L 550 65 Q 320 35 90 65 Z"
        fill="#818cf8"
        fillOpacity="0.3"
        stroke="#a5b4fc"
        strokeWidth="2"
      />
      <path
        d="M 90 120 Q 320 90 550 120"
        fill="none"
        stroke="#67e8f9"
        strokeWidth="7"
        strokeLinecap="round"
      />
      {Array.from({ length: 8 }, (_, index) => (
        <circle
          key={index}
          cx={125 + index * 56}
          cy={75 + (index % 2) * 8}
          r="5"
          fill={index < count ? "#67e8f9" : "#475569"}
        />
      ))}
      <path
        d="M 115 91 H 525"
        stroke="#94a3b8"
        strokeOpacity="0.4"
        strokeDasharray="3 8"
      />
    </>
  );
}

function ReflexVisual({ ratio }: { ratio: number }) {
  const signalX = 70 + ratio * 500;

  return (
    <>
      <path
        d="M 70 80 H 570"
        stroke="#475569"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M 70 80 H 570"
        stroke="#67e8f9"
        strokeOpacity="0.45"
        strokeWidth="2"
        strokeDasharray="8 8"
      />
      <circle cx="70" cy="80" r="18" fill="#818cf8" fillOpacity="0.8" />
      <circle cx="570" cy="80" r="18" fill="#34d399" fillOpacity="0.8" />
      <circle
        cx={signalX}
        cy="80"
        r="10"
        fill="#67e8f9"
        stroke="#ecfeff"
        strokeWidth="2"
      />
      <circle
        cx={signalX}
        cy="80"
        r="19"
        fill="#67e8f9"
        fillOpacity="0.12"
      />
    </>
  );
}

function FiltrationVisual({ ratio }: { ratio: number }) {
  const arrowCount = 1 + Math.round(ratio * 5);

  return (
    <>
      <path
        d="M 100 35 C 70 50 90 110 135 112 C 180 114 190 60 160 40 C 140 25 120 25 100 35 Z"
        fill="#f87171"
        fillOpacity="0.25"
        stroke="#f87171"
        strokeWidth="4"
      />
      <path
        d="M 170 75 H 300"
        stroke="#f87171"
        strokeWidth="5"
        strokeLinecap="round"
      />
      {Array.from({ length: 6 }, (_, index) => (
        <g key={index} opacity={index < arrowCount ? 1 : 0.15}>
          <path
            d={`M ${300 + index * 42} 58 V 92 M ${288 + index * 42} 80 L ${300 + index * 42} 92 L ${312 + index * 42} 80`}
            stroke="#67e8f9"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      ))}
    </>
  );
}

function WaterVisual({ ratio }: { ratio: number }) {
  const count = Math.round(ratio * 7);

  return (
    <>
      <path
        d="M 280 20 V 140 Q 320 155 360 140 V 20"
        fill="#818cf8"
        fillOpacity="0.15"
        stroke="#a5b4fc"
        strokeWidth="4"
      />
      <path
        d={`M 285 ${135 - ratio * 75} Q 320 ${125 - ratio * 75} 355 ${135 - ratio * 75} V 140 Q 320 155 285 140 Z`}
        fill="#67e8f9"
        fillOpacity="0.7"
      />
      {Array.from({ length: 7 }, (_, index) => (
        <path
          key={index}
          d={`M ${160 + index * 53} 40 C ${150 + index * 53} 54 ${153 + index * 53} 64 ${160 + index * 53} 64 C ${167 + index * 53} 64 ${170 + index * 53} 54 ${160 + index * 53} 40 Z`}
          fill="#67e8f9"
          opacity={index < count ? 0.9 : 0.15}
        />
      ))}
    </>
  );
}

export function SimulationVisual({
  kind,
  value,
  min,
  max,
}: SimulationVisualProps) {
  const ratio = getRatio(value, min, max);

  let visual: React.ReactNode;
  let caption: string;

  switch (kind) {
    case "ecg-rate":
      visual = <EcgVisual ratio={ratio} />;
      caption = "Illustrative electrical activity pattern";
      break;
    case "mean-arterial-pressure":
      visual = <PressureVisual ratio={ratio} />;
      caption = "Conceptual vascular pressure indicator";
      break;
    case "oxygen-saturation":
      visual = <OxygenVisual ratio={ratio} />;
      caption = "Illustrative oxygen-binding response";
      break;
    case "minute-ventilation":
      visual = <VentilationVisual ratio={ratio} />;
      caption = "Conceptual lung expansion";
      break;
    case "action-potential":
      visual = <ActionPotentialVisual ratio={ratio} />;
      caption = "Simplified membrane response and threshold";
      break;
    case "synaptic-response":
      visual = <SynapseVisual ratio={ratio} />;
      caption = "Conceptual neurotransmitter response";
      break;
    case "reflex-latency":
      visual = <ReflexVisual ratio={ratio} />;
      caption = "Illustrative signal movement along a pathway";
      break;
    case "glomerular-filtration":
      visual = <FiltrationVisual ratio={ratio} />;
      caption = "Conceptual movement during filtration";
      break;
    case "water-reabsorption":
      visual = <WaterVisual ratio={ratio} />;
      caption = "Illustrative water reabsorption";
      break;
    default: {
      const exhaustiveCheck: never = kind;
      return exhaustiveCheck;
    }
  }

  return (
    <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-[#0b1321] p-4 sm:p-5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-slate-200">
          Live visual response
        </p>
        <span className="rounded-full border border-cyan-400/20 bg-cyan-400/5 px-2.5 py-1 text-xs text-cyan-300">
          Interactive model
        </span>
      </div>

      <svg
        viewBox="0 0 640 160"
        role="img"
        aria-label={caption}
        className="h-36 w-full sm:h-44"
        preserveAspectRatio="xMidYMid meet"
      >
        {visual}
      </svg>

      <p className="mt-2 text-xs leading-5 text-slate-500">
        {caption}. This is a teaching illustration, not a clinical measurement.
      </p>
    </div>
  );
}
