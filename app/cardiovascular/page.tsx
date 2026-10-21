
"use client";

import Link from "next/link";
import { useState } from "react";

import {
  Activity,
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  FlaskConical,
  HeartPulse,
  Info,
  RotateCcw,
  TrendingUp,
} from "lucide-react";

import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { ExperimentChallenge } from "@/components/physiology/ExperimentChallenge";

// ------------------------------------------------------
// Constants and types
// ------------------------------------------------------

const INITIAL_HEART_RATE = 72;
const INITIAL_STROKE_VOLUME = 70;

const HEART_RATE_MIN = 40;
const HEART_RATE_MAX = 180;

const STROKE_VOLUME_MIN = 30;
const STROKE_VOLUME_MAX = 150;

type CardiacOutputDataPoint = {
  heartRate: number;
  cardiacOutput: number;
};

// ------------------------------------------------------
// Cardiovascular physiology lab
// ------------------------------------------------------

export default function CardiovascularPage() {
  const [heartRate, setHeartRate] = useState(INITIAL_HEART_RATE);
  const [strokeVolume, setStrokeVolume] = useState(
    INITIAL_STROKE_VOLUME,
  );

  // Cardiac output (L/min) = HR (beats/min) × SV (mL/beat) ÷ 1000.
  const cardiacOutput = (heartRate * strokeVolume) / 1000;

  const baselineCardiacOutput =
    (INITIAL_HEART_RATE * INITIAL_STROKE_VOLUME) / 1000;

  const outputDifference = cardiacOutput - baselineCardiacOutput;

  const percentageChange =
    baselineCardiacOutput > 0
      ? (outputDifference / baselineCardiacOutput) * 100
      : 0;

  const chartData: CardiacOutputDataPoint[] = [];

  for (
    let rate = HEART_RATE_MIN;
    rate <= HEART_RATE_MAX;
    rate += 10
  ) {
    chartData.push({
      heartRate: rate,
      cardiacOutput: Number(((rate * strokeVolume) / 1000).toFixed(2)),
    });
  }

  if (
    !chartData.some((point) => point.heartRate === heartRate)
  ) {
    chartData.push({
      heartRate,
      cardiacOutput: Number(cardiacOutput.toFixed(2)),
    });

    chartData.sort((a, b) => a.heartRate - b.heartRate);
  }

  const isBaseline =
    heartRate === INITIAL_HEART_RATE &&
    strokeVolume === INITIAL_STROKE_VOLUME;

  // ----------------------------------------------------
  // Reset simulation
  // ----------------------------------------------------

  function handleReset() {
    setHeartRate(INITIAL_HEART_RATE);
    setStrokeVolume(INITIAL_STROKE_VOLUME);
  }

  // ----------------------------------------------------
  // Physiological interpretation
  // ----------------------------------------------------

  function getInterpretation() {
    if (isBaseline) {
      return {
        title: "Baseline simulation",
        description:
          "At this starting point, a heart rate of 72 beats/min and a stroke volume of 70 mL/beat produce a cardiac output of approximately 5.04 L/min.",
        tone: "border-cyan-400/20 bg-cyan-400/5 text-cyan-300",
      };
    }

    if (outputDifference > 0) {
      return {
        title: "Cardiac output has increased",
        description:
          "Your current combination of heart rate and stroke volume delivers more blood per minute than the baseline simulation. Examine which variable contributed most to the change.",
        tone:
          "border-emerald-400/20 bg-emerald-400/5 text-emerald-300",
      };
    }

    if (outputDifference < 0) {
      return {
        title: "Cardiac output has decreased",
        description:
          "Your current combination of heart rate and stroke volume delivers less blood per minute than the baseline simulation. Consider how this change could affect oxygen delivery if it occurred in the body.",
        tone: "border-amber-400/20 bg-amber-400/5 text-amber-300",
      };
    }

    return {
      title: "Cardiac output is unchanged",
      description:
        "The calculated blood volume delivered per minute matches the baseline, although the heart rate and stroke volume may differ.",
      tone: "border-cyan-400/20 bg-cyan-400/5 text-cyan-300",
    };
  }

  const interpretation = getInterpretation();

  // ----------------------------------------------------
  // Page layout
  // ----------------------------------------------------

  return (
    <main className="min-h-screen bg-[#080d18] text-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            className="group inline-flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-rose-400/20 bg-rose-400/10 text-rose-300">
              <HeartPulse size={23} />
            </div>

            <div>
              <p className="text-lg font-bold tracking-tight">
                Physiolab
              </p>
              <p className="text-xs text-slate-400">
                Human Physiology
              </p>
            </div>
          </Link>

          <Link
            href="/experiments"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/3 px-4 py-2.5 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
          >
            <ArrowLeft size={16} />
            Experiment Hub
          </Link>
        </header>

        {/* Hero */}
        <section className="relative mb-8 overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-rose-400/10 via-[#101827] to-cyan-400/5 p-6 sm:p-9">
          <div className="pointer-events-none absolute -right-12 -top-16 h-64 w-64 rounded-full bg-rose-400/5 blur-3xl" />

          <div className="relative max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-rose-400/20 bg-rose-400/10 px-3 py-1.5 text-xs font-medium text-rose-300">
              <FlaskConical size={14} />
              Interactive cardiovascular lab
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
              Cardiac Output Lab
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              Investigate how heart rate and stroke volume
              determine cardiac output. Adjust each variable,
              observe the mathematical response, and connect
              your findings to cardiovascular physiology.
            </p>

            <div className="mt-6 flex flex-wrap gap-3 text-xs text-slate-400">
              <span className="rounded-full border border-white/10 bg-white/3 px-3 py-2">
                <Activity className="mr-1.5 inline" size={14} />
                Two adjustable variables
              </span>

              <span className="rounded-full border border-white/10 bg-white/3 px-3 py-2">
                <TrendingUp className="mr-1.5 inline" size={14} />
                Live calculation
              </span>
            </div>
          </div>
        </section>

        {/* Formula */}
        <section className="mb-8 grid gap-5 lg:grid-cols-[1fr_1.3fr]">
          <div className="rounded-2xl border border-white/10 bg-[#101827] p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                <BookOpen size={20} />
              </div>

              <div>
                <h2 className="font-semibold">
                  The physiological equation
                </h2>
                <p className="text-xs text-slate-500">
                  The relationship to investigate
                </p>
              </div>
            </div>

            <div className="my-6 rounded-2xl border border-cyan-400/15 bg-cyan-400/5 px-4 py-6 text-center">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-cyan-300">
                Cardiac output
              </p>

              <p className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                CO = HR × SV
              </p>

              <p className="mt-3 text-sm text-slate-400">
                In this lab, divide by 1,000 to convert mL/min
                to L/min.
              </p>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-rose-400/10 text-xs font-bold text-rose-300">
                  HR
                </span>

                <div>
                  <p className="font-medium text-slate-200">
                    Heart rate
                  </p>
                  <p className="mt-1 leading-6 text-slate-400">
                    The number of heartbeats per minute.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-violet-400/10 text-xs font-bold text-violet-300">
                  SV
                </span>

                <div>
                  <p className="font-medium text-slate-200">
                    Stroke volume
                  </p>
                  <p className="mt-1 leading-6 text-slate-400">
                    The volume of blood ejected by one ventricle
                    with each heartbeat.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Live result */}
          <div className="rounded-2xl border border-white/10 bg-[#101827] p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Live simulation result
                </p>

                <h2 className="mt-2 text-xl font-bold">
                  Your cardiac output
                </h2>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-400/10 text-rose-300">
                <HeartPulse size={23} />
              </div>
            </div>

            <div className="mt-7 flex flex-wrap items-end gap-3">
              <p
                className="text-5xl font-bold tracking-tight tabular-nums sm:text-6xl"
                aria-live="polite"
                aria-atomic="true"
              >
                {cardiacOutput.toFixed(2)}
              </p>

              <p className="pb-1 text-sm text-slate-400">
                litres/min
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-white/10 bg-white/2.5 p-4">
                <p className="text-xs text-slate-500">
                  Heart rate
                </p>
                <p className="mt-2 text-xl font-semibold tabular-nums">
                  {heartRate}
                  <span className="ml-1 text-xs font-normal text-slate-400">
                    bpm
                  </span>
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/2.5 p-4">
                <p className="text-xs text-slate-500">
                  Stroke volume
                </p>
                <p className="mt-2 text-xl font-semibold tabular-nums">
                  {strokeVolume}
                  <span className="ml-1 text-xs font-normal text-slate-400">
                    mL/beat
                  </span>
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-white/10 bg-white/2.5 p-4">
              <p className="text-xs text-slate-500">
                Calculation
              </p>

              <p className="mt-2 text-sm font-medium text-slate-200">
                {heartRate} × {strokeVolume} ÷ 1,000 ={" "}
                {cardiacOutput.toFixed(2)} L/min
              </p>
            </div>

            <div
              className={`mt-4 rounded-xl border p-4 ${interpretation.tone}`}
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 size={17} />
                <p className="text-sm font-semibold">
                  {interpretation.title}
                </p>
              </div>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                {interpretation.description}
              </p>

              {!isBaseline && (
                <p className="mt-3 text-xs font-medium text-slate-400">
                  Change from baseline:{" "}
                  {outputDifference > 0 ? "+" : ""}
                  {outputDifference.toFixed(2)} L/min (
                  {percentageChange > 0 ? "+" : ""}
                  {percentageChange.toFixed(1)}%)
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Simulation controls */}
        <section className="mb-8 rounded-2xl border border-white/10 bg-[#101827] p-5 sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
                Simulation controls
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                Change the variables
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                Move either slider and observe how cardiac
                output changes. Keep one variable constant to
                isolate the effect of the other.
              </p>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/3 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
            >
              <RotateCcw size={16} />
              Reset simulation
            </button>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            {/* Heart rate slider */}
            <div className="rounded-2xl border border-white/10 bg-white/2.5 p-5">
              <div className="flex items-center justify-between gap-3">
                <label
                  htmlFor="heart-rate"
                  className="font-semibold text-slate-200"
                >
                  Heart rate
                </label>

                <span className="rounded-lg border border-rose-400/20 bg-rose-400/10 px-3 py-1.5 text-sm font-semibold tabular-nums text-rose-300">
                  {heartRate} bpm
                </span>
              </div>

              <input
                id="heart-rate"
                type="range"
                min={HEART_RATE_MIN}
                max={HEART_RATE_MAX}
                step={1}
                value={heartRate}
                onChange={(event) =>
                  setHeartRate(Number(event.target.value))
                }
                aria-valuetext={`${heartRate} beats per minute`}
                className="mt-6 w-full cursor-pointer accent-rose-400"
              />

              <div className="mt-2 flex justify-between text-xs text-slate-500">
                <span>{HEART_RATE_MIN} bpm</span>
                <span>Resting reference: 72 bpm</span>
                <span>{HEART_RATE_MAX} bpm</span>
              </div>

              <p className="mt-5 text-sm leading-6 text-slate-400">
                Increasing heart rate tends to increase cardiac
                output when stroke volume is maintained. At
                sufficiently high rates, reduced filling time
                can limit stroke volume.
              </p>
            </div>

            {/* Stroke volume slider */}
            <div className="rounded-2xl border border-white/10 bg-white/2.5 p-5">
              <div className="flex items-center justify-between gap-3">
                <label
                  htmlFor="stroke-volume"
                  className="font-semibold text-slate-200"
                >
                  Stroke volume
                </label>

                <span className="rounded-lg border border-violet-400/20 bg-violet-400/10 px-3 py-1.5 text-sm font-semibold tabular-nums text-violet-300">
                  {strokeVolume} mL
                </span>
              </div>

              <input
                id="stroke-volume"
                type="range"
                min={STROKE_VOLUME_MIN}
                max={STROKE_VOLUME_MAX}
                step={1}
                value={strokeVolume}
                onChange={(event) =>
                  setStrokeVolume(Number(event.target.value))
                }
                aria-valuetext={`${strokeVolume} millilitres per beat`}
                className="mt-6 w-full cursor-pointer accent-violet-400"
              />

              <div className="mt-2 flex justify-between text-xs text-slate-500">
                <span>{STROKE_VOLUME_MIN} mL</span>
                <span>Reference: 70 mL</span>
                <span>{STROKE_VOLUME_MAX} mL</span>
              </div>

              <p className="mt-5 text-sm leading-6 text-slate-400">
                Stroke volume is influenced by preload,
                myocardial contractility, and afterload. For
                this simplified model, changing stroke volume
                directly changes the calculated output.
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-start gap-3 rounded-xl border border-cyan-400/15 bg-cyan-400/5 p-4">
            <Info
              size={18}
              className="mt-0.5 shrink-0 text-cyan-300"
            />

            <p className="text-sm leading-6 text-slate-300">
              <span className="font-semibold text-cyan-300">
                Experimental tip:
              </span>{" "}
              First hold stroke volume constant and vary heart
              rate. Then hold heart rate constant and vary
              stroke volume. This helps you identify each
              variable&apos;s contribution to cardiac output.
            </p>
          </div>
        </section>

        {/* Chart */}
        <section className="mb-8 rounded-2xl border border-white/10 bg-[#101827] p-5 sm:p-7">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
              Visual feedback
            </p>

            <h2 className="mt-2 text-xl font-bold sm:text-2xl">
              Heart rate versus cardiac output
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              This graph shows the calculated cardiac output at
              different heart rates while holding your current
              stroke volume constant.
            </p>
          </div>

          <div className="h-72 w-full sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{
                  top: 12,
                  right: 12,
                  left: 0,
                  bottom: 8,
                }}
              >
                <CartesianGrid
                  stroke="rgba(148,163,184,0.12)"
                  strokeDasharray="4 4"
                />

                <XAxis
                  dataKey="heartRate"
                  type="number"
                  domain={[HEART_RATE_MIN, HEART_RATE_MAX]}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                  tickLine={false}
                  axisLine={{ stroke: "rgba(148,163,184,0.2)" }}
                  label={{
                    value: "Heart rate (beats/min)",
                    position: "insideBottom",
                    offset: -3,
                    fill: "#94a3b8",
                    fontSize: 12,
                  }}
                />

                <YAxis
                  domain={[0, "auto"]}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  width={55}
                  label={{
                    value: "Cardiac output (L/min)",
                    angle: -90,
                    position: "insideLeft",
                    fill: "#94a3b8",
                    fontSize: 12,
                  }}
                />

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#101827",
                    border: "1px solid rgba(148,163,184,0.2)",
                    borderRadius: "12px",
                    color: "#e2e8f0",
                  }}
                  labelStyle={{ color: "#cbd5e1" }}
                  formatter={(value) => [
                    `${Number(value).toFixed(2)} L/min`,
                    "Cardiac output",
                  ]}
                  labelFormatter={(label) =>
                    `Heart rate: ${label} bpm`
                  }
                />

                <ReferenceLine
                  x={heartRate}
                  stroke="#fb7185"
                  strokeDasharray="4 4"
                />

                <Line
                  type="monotone"
                  dataKey="cardiacOutput"
                  name="Cardiac output"
                  stroke="#22d3ee"
                  strokeWidth={3}
                  dot={false}
                  activeDot={{
                    r: 6,
                    fill: "#22d3ee",
                    stroke: "#080d18",
                    strokeWidth: 2,
                  }}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/2.5 p-4">
            <div>
              <p className="text-sm font-medium text-slate-200">
                Current simulation point
              </p>

              <p className="mt-1 text-xs text-slate-500">
                HR {heartRate} bpm · SV {strokeVolume} mL/beat
              </p>
            </div>

            <p className="text-lg font-bold tabular-nums text-cyan-300">
              {cardiacOutput.toFixed(2)} L/min
            </p>
          </div>
        </section>

        {/* Physiology insight */}
        <section className="mb-8 grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-[#101827] p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-400/10 text-rose-300">
                <HeartPulse size={21} />
              </div>

              <h2 className="text-lg font-semibold">
                Why cardiac output matters
              </h2>
            </div>

            <p className="mt-4 text-sm leading-7 text-slate-400">
              Cardiac output describes the volume of blood
              pumped by one ventricle each minute. Together
              with the oxygen content of blood, it influences
              how much oxygen can be delivered to tissues.
              The body adjusts heart rate and stroke volume
              to meet changing demands, such as during
              exercise.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#101827] p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-400/10 text-violet-300">
                <TrendingUp size={21} />
              </div>

              <h2 className="text-lg font-semibold">
                Interpret your results
              </h2>
            </div>

            <p className="mt-4 text-sm leading-7 text-slate-400">
              A higher calculated output does not automatically
              mean better cardiovascular function, and a lower
              value does not by itself establish disease.
              Interpretation depends on the person&apos;s
              physiological state, activity, blood pressure,
              oxygen demand, and other clinical findings.
            </p>
          </div>
        </section>

        {/* Experiment challenge */}
        <section className="mb-8">
          <div className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-300">
              Test your understanding
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              Apply what you have learned
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Use the cardiac output equation to predict the
              effect of changing heart rate while stroke
              volume remains constant.
            </p>
          </div>

          <ExperimentChallenge
            experimentId="cardiac-output"
            question="If heart rate increases to 100 beats/min while stroke volume remains at 70 mL/beat, what is the calculated cardiac output?"
            description="Assume stroke volume remains constant and use CO = HR × SV ÷ 1,000 to calculate the result in litres per minute."
            options={[
              {
                label: "4.0 L/min",
                value: "4.0",
              },
              {
                label: "7.0 L/min",
                value: "7.0",
              },
              {
                label: "10.0 L/min",
                value: "10.0",
              },
              {
                label: "0.7 L/min",
                value: "0.7",
              },
            ]}
            correctAnswer="7.0"
            explanation="Cardiac output = 100 beats/min × 70 mL/beat = 7,000 mL/min. Dividing by 1,000 converts the result to 7.0 L/min."
            observation="Return to the sliders and set heart rate to 100 bpm and stroke volume to 70 mL/beat. Compare the live result with your calculation."
          />
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 py-6">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
            <p>
              Physiolab · Cardiovascular Physiology
            </p>

            <Link
              href="/experiments"
              className="transition hover:text-cyan-300"
            >
              Return to Experiment Hub
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
