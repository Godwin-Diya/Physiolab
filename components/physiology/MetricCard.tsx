type MetricCardProps = {
label: string;
value: string | number;
unit?: string;
highlighted?: boolean;
};

export function MetricCard({
label,
value,
unit,
highlighted = false,
}: MetricCardProps) {
return (
    <div
        className={`rounded-2xl border p-5 transition-all duration-300 ${
        highlighted
            ? "border-cyan-400/20 bg-cyan-400/6"
            : "border-white/10 bg-white/2.5"
        }`}
    >
    <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
        {label}
    </p>

    <div className="mt-3 flex items-end gap-1.5">
        <span
            className={`text-3xl font-bold ${
            highlighted ? "text-cyan-300" : "text-white"
            }`}
        >
            {value}
        </span>

        {unit && (
            <span className="mb-1 text-xs font-medium text-slate-500">
            {unit}
            </span>
        )}
        </div>
    </div>
);
}