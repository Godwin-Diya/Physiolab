"use client";

import {
  Activity,
  ArrowLeft,
  HeartPulse,
  Info,
  RotateCcw,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function CardiovascularPage() {
  const [heartRate, setHeartRate] = useState(70);
  const [strokeVolume, setStrokeVolume] = useState(70);

  const cardiacOutput = useMemo(() => {
    return (heartRate * strokeVolume) / 1000;
  }, [heartRate, strokeVolume]);

  const chartData = useMemo(() => {
    return [
      { time: "0s", output: Number(cardiacOutput.toFixed(2)) },
      {
        time: "5s",
        output: Number((cardiacOutput * 0.96).toFixed(2)),
      },
      {
        time: "10s",
        output: Number((cardiacOutput * 1.03).toFixed(2)),
      },
      {
        time: "15s",
        output: Number((cardiacOutput * 0.98).toFixed(2)),
      },
      {
        time: "20s",
        output: Number((cardiacOutput * 1.01).toFixed(2)),
      },
      {
        time: "25s",
        output: Number(cardiacOutput.toFixed(2)),
      },
    ];
  }, [cardiacOutput]);

  const resetExperiment = () => {
    setHeartRate(70);
    setStrokeVolume(70);
  };

  const status = useMemo(() => {
    if (cardiacOutput < 4) {
      return {
        label: "Low cardiac output",
        description:
          "The calculated cardiac output is below the typical resting range.",
        className: "text-amber-300",
        dot: "bg-amber-300",
        background: "bg-amber-400/10",
      };
    }

    if (cardiacOutput > 8) {
      return {
        label: "High cardiac output",
        description:
          "The calculated cardiac output is elevated compared with a typical resting state.",
        className: "text-cyan-300",
        dot: "bg-cyan-300",
        background: "bg-cyan-400/10",
      };
    }

    return {
      label: "Within resting range",
      description:
        "The calculated cardiac output is within a typical resting physiological range.",
      className: "text-emerald-300",
      dot: "bg-emerald-300",
      background: "bg-emerald-400/10",
    };
  }, [cardiacOutput]);

  const physiologyInsight = useMemo(() => {
    if (heartRate > 100 && strokeVolume < 60) {
      return "Heart rate is elevated while stroke volume is relatively low. This demonstrates that increasing heart rate does not necessarily guarantee a proportional increase in cardiac output.";
    }

    if (heartRate > 100) {
      return "Increasing heart rate increases the number of cardiac cycles occurring each minute. When stroke volume remains adequate, cardiac output rises.";
    }

    if (strokeVolume > 90) {
      return "A larger stroke volume means more blood is ejected with each heartbeat. With heart rate held constant, this increases cardiac output.";
    }

    if (strokeVolume < 55) {
      return "A reduced stroke volume means less blood is ejected with each heartbeat. The heart may compensate by increasing heart rate.";
    }

    return "Both variables are close to typical resting values, producing a cardiac output consistent with a resting physiological state.";
  }, [heartRate, strokeVolume]);

  const beatDuration = Math.max(0.4, 60 / heartRate);

  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#091525]">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link
            href="/"
            className="flex items-center gap-3 text-sm text-slate-400 transition hover:text-white"
          >
            <ArrowLeft size={18} />
            <span>Back to dashboard</span>
          </Link>

          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-400 text-slate-950">
              <Activity size={19} />
            </div>

            <span className="font-semibold">Physiolab</span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
        {/* Introduction */}
        <section className="mb-10">
          <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
            <Sparkles size={14} />
            Cardiovascular Physiology
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Cardiac Output Lab
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400">
            Manipulate cardiovascular variables and observe how the heart&apos;s
            pumping performance changes in real time.
          </p>
        </section>

        {/* Main Lab */}
        <section className="grid gap-6 lg:grid-cols-[1.45fr_1fr]">
          {/* Controls */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Experiment controls
                </p>

                <h2 className="mt-1 text-xl font-semibold">
                  Manipulate the variables
                </h2>
              </div>

              <button
                onClick={resetExperiment}
                className="flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-xs text-slate-400 transition hover:bg-white/5 hover:text-white"
              >
                <RotateCcw size={14} />
                Reset
              </button>
            </div>

            {/* Heart Rate */}
            <div className="mt-10">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-300">
                    Heart Rate
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Beats per minute
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-3xl font-bold">{heartRate}</span>

                  <span className="ml-1 text-sm text-slate-500">
                    bpm
                  </span>
                </div>
              </div>

              <input
                type="range"
                min="40"
                max="140"
                value={heartRate}
                onChange={(event) =>
                  setHeartRate(Number(event.target.value))
                }
                className="mt-6 w-full accent-cyan-400"
              />

              <div className="mt-2 flex justify-between text-[11px] text-slate-600">
                <span>40 bpm</span>
                <span>140 bpm</span>
              </div>
            </div>

            {/* Stroke Volume */}
            <div className="mt-10">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-300">
                    Stroke Volume
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Blood pumped per heartbeat
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-3xl font-bold">
                    {strokeVolume}
                  </span>

                  <span className="ml-1 text-sm text-slate-500">
                    mL
                  </span>
                </div>
              </div>

              <input
                type="range"
                min="40"
                max="120"
                value={strokeVolume}
                onChange={(event) =>
                  setStrokeVolume(Number(event.target.value))
                }
                className="mt-6 w-full accent-cyan-400"
              />

              <div className="mt-2 flex justify-between text-[11px] text-slate-600">
                <span>40 mL</span>
                <span>120 mL</span>
              </div>
            </div>

            {/* Formula */}
            <div className="mt-10 rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.03] p-5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400">
                <Activity size={14} />
                Physiological relationship
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-center">
                <div className="rounded-xl bg-white/5 px-4 py-3">
                  <p className="text-xs text-slate-500">
                    Heart Rate
                  </p>

                  <p className="mt-1 font-semibold">
                    {heartRate} bpm
                  </p>
                </div>

                <span className="text-xl text-slate-600">×</span>

                <div className="rounded-xl bg-white/5 px-4 py-3">
                  <p className="text-xs text-slate-500">
                    Stroke Volume
                  </p>

                  <p className="mt-1 font-semibold">
                    {strokeVolume} mL
                  </p>
                </div>

                <span className="text-xl text-slate-600">=</span>

                <div className="rounded-xl bg-cyan-400/10 px-4 py-3">
                  <p className="text-xs text-cyan-400">
                    Cardiac Output
                  </p>

                  <p className="mt-1 font-semibold text-cyan-300">
                    {cardiacOutput.toFixed(2)} L/min
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Live Visualization */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#0c1e30] to-[#091525] p-6 sm:p-8">
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-rose-500/10 blur-3xl" />

            <div className="relative">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Live physiology
              </p>

              <h2 className="mt-1 text-xl font-semibold">
                Cardiovascular response
              </h2>

              {/* Animated Heart */}
              <div className="flex min-h-[280px] items-center justify-center">
                <div
                  className="flex h-40 w-40 items-center justify-center rounded-full bg-rose-500/10 shadow-[0_0_80px_rgba(244,63,94,0.12)]"
                  style={{
                    animation: `heartbeat ${beatDuration}s ease-in-out infinite`,
                  }}
                >
                  <HeartPulse
                    size={110}
                    strokeWidth={1.2}
                    className="text-rose-400"
                  />
                </div>
              </div>

              {/* Output */}
              <div className="text-center">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Cardiac Output
                </p>

                <p className="mt-2 text-5xl font-bold tracking-tight">
                  {cardiacOutput.toFixed(2)}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  liters / minute
                </p>
              </div>

              {/* Status */}
              <div
                className={`mt-8 rounded-2xl p-4 ${status.background}`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`h-2 w-2 rounded-full ${status.dot}`}
                  />

                  <p
                    className={`text-sm font-medium ${status.className}`}
                  >
                    {status.label}
                  </p>
                </div>

                <p className="mt-2 text-xs leading-5 text-slate-500">
                  {status.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Chart */}
        <section className="mt-6 rounded-3xl border border-white/10 bg-white/[0.025] p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
              <TrendingUp size={20} />
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Live data
              </p>

              <h2 className="mt-1 text-xl font-semibold">
                Cardiac output trend
              </h2>
            </div>
          </div>

          <div className="mt-8 h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.06)"
                />

                <XAxis
                  dataKey="time"
                  stroke="#64748b"
                  tickLine={false}
                  axisLine={false}
                />

                <YAxis
                  stroke="#64748b"
                  tickLine={false}
                  axisLine={false}
                  width={45}
                />

                <Tooltip
                  contentStyle={{
                    background: "#0c1e30",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    color: "#fff",
                  }}
                  formatter={(value) => [
                    `${value} L/min`,
                    "Cardiac Output",
                  ]}
                />

                <Line
                  type="monotone"
                  dataKey="output"
                  stroke="#22d3ee"
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* AI-style insight */}
        <section className="mt-6 rounded-3xl border border-cyan-400/10 bg-cyan-400/[0.025] p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
              <Sparkles size={20} />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
                Physiology insight
              </p>

              <h2 className="mt-2 text-xl font-semibold">
                What is happening?
              </h2>

              <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-400">
                {physiologyInsight}
              </p>
            </div>
          </div>
        </section>

        {/* Explanation */}
        <section className="mt-6 rounded-3xl border border-white/10 bg-white/[0.025] p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
              <Info size={20} />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
                Why does this happen?
              </p>

              <h2 className="mt-2 text-xl font-semibold">
                Cardiac output depends on two major variables.
              </h2>

              <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-400">
                Cardiac output is the volume of blood pumped by one
                ventricle each minute. It is determined by multiplying
                heart rate by stroke volume.
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-black/10 p-5">
                  <p className="font-semibold text-slate-200">
                    Heart Rate
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    The number of heartbeats occurring each minute.
                    Increasing heart rate can increase cardiac output
                    when stroke volume remains adequate.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/10 p-5">
                  <p className="font-semibold text-slate-200">
                    Stroke Volume
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    The volume of blood ejected by a ventricle with
                    each heartbeat. Preload, afterload, and
                    contractility can influence stroke volume.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Equation */}
        <section className="mt-6 rounded-3xl border border-white/10 bg-gradient-to-r from-cyan-400/[0.05] to-blue-500/[0.05] p-8 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Core equation
          </p>

          <p className="mt-4 text-2xl font-semibold sm:text-3xl">
            Cardiac Output = Heart Rate × Stroke Volume
          </p>

          <p className="mt-3 text-sm text-slate-500">
            CO = HR × SV
          </p>
        </section>
      </div>

      {/* Heartbeat animation */}
      <style jsx global>{`
        @keyframes heartbeat {
          0%,
          100% {
            transform: scale(1);
          }

          15% {
            transform: scale(1.08);
          }

          30% {
            transform: scale(1);
          }

          45% {
            transform: scale(1.05);
          }

          60% {
            transform: scale(1);
          }
        }
      `}</style>
    </main>
  );
}