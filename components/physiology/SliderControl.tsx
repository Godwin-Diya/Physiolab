"use client";

interface SliderControlProps {
label: string;
description: string;
value: number;
min: number;
max: number;
unit: string;
onChange: (value: number) => void;
}

export function SliderControl({
label,
description,
value,
min,
max,
unit,
onChange,
}: SliderControlProps) {
return (
    <div>
    <div className="flex items-end justify-between">
        <div>
        <p className="text-sm font-medium text-slate-300">
            {label}
        </p>

        <p className="mt-1 text-xs text-slate-500">
            {description}
        </p>
        </div>

        <div className="text-right">
        <span className="text-3xl font-bold text-white">
            {value}
        </span>

            <span className="ml-1 text-sm text-slate-500">
            {unit}
            </span>
        </div>
        </div>

        <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) =>
        onChange(Number(event.target.value))
        }
        className="mt-6 w-full accent-cyan-400"
        />

        <div className="mt-2 flex justify-between text-[11px] text-slate-600">
        <span>
            {min} {unit}
        </span>

        <span>
            {max} {unit}
        </span>
        </div>
    </div>
    );
}