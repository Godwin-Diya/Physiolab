import { ReactNode } from "react";

interface SimulationPanelProps {
title: string;
eyebrow?: string;
children: ReactNode;
className?: string;
}

export default function SimulationPanel({
title,
eyebrow,
children,
className = "",
}: SimulationPanelProps) {
return (
    <section
    className={`rounded-3xl border border-white/10 bg-white/[0.025] p-6 sm:p-8 ${className}`}
    >
    {eyebrow && (
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
        {eyebrow}
        </p>
    )}

    <h2 className="mt-1 text-xl font-semibold">
        {title}
    </h2>

    <div className="mt-6">
        {children}
    </div>
    </section>
);
}