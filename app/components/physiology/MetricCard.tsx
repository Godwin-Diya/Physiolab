interface MetricCardProps {
label: string;
value: string;
unit?: string;
highlighted?: boolean;
}

export default function MetricCard({
label,
value,
unit,
highlighted = false,
}: MetricCardProps) {
return (
    <div
    className={`rounded-xl px-4 py-3 ${
        highlighted
        ? "bg-cyan-400/10"
        : "bg-white/5"
    }`}
    >
    <p
        className={`text-xs ${
        highlighted
            ? "text-cyan-400"
            : "text-slate-500"
        }`}
    >
        {label}
    </p>

    <p
        className={`mt-1 font-semibold ${
        highlighted
            ? "text-cyan-300"
            : "text-white"
        }`}
        >
        {value}

        {unit && (
        <span className="ml-1 text-xs text-slate-500">
            {unit}
        </span>
        )}
        </p>
    </div>
    );
}