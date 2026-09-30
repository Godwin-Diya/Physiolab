"use client";

import {
  Activity,
  ArrowLeft,
  Brain,
  Gauge,
  HeartPulse,
  Info,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function BaroreflexPage() {
  const [arterialPressure, setArterialPressure] = useState(100);
  const [bloodVolume, setBloodVolume] = useState(5);

  /*
   * Educational model:
   *
   * Higher arterial pressure
   * → increased baroreceptor firing
   * → increased parasympathetic activity
   * → reduced heart rate
   * → reduced sympathetic tone
   *
   * Lower arterial pressure produces the opposite response.
   */

  const baroreceptorActivity = useMemo(() => {
    const activity =
      ((arterialPressure - 60) / (140 - 60)) * 100;

    return Math.max(0, Math.min(100, activity));
  }, [arterialPressure]);

  const autonomicResponse = useMemo(() => {
    const normalized =
      (arterialPressure - 100) / 40;

    const sympathetic = Math.max(
      0,
      Math.min(100, 50 - normalized * 35)
    );

    const parasympathetic = Math.max(
      0,
      Math.min(100, 50 + normalized * 35)
    );

    return {
      sympathetic,
      parasympathetic,
    };
  }, [arterialPressure]);

  const heartRate = useMemo(() => {
    const pressureEffect =
      (100 - arterialPressure) * 0.55;

    const volumeEffect =
      (bloodVolume - 5) * 4;

    return Math.round(
      70 + pressureEffect + volumeEffect
    );
  }, [arterialPressure, bloodVolume]);

  const estimatedMAP = useMemo(() => {
    const volumeEffect =
      (bloodVolume - 5) * 3;

    const reflexEffect =
      (70 - heartRate) * 0.08;

    return Math.round(
      arterialPressure +
        volumeEffect +
        reflexEffect
    );
  }, [arterialPressure, bloodVolume, heartRate]);

  const response = useMemo(() => {
    if (arterialPressure < 80) {
      return {
        label: "Hypotensive stimulus",
        description:
          "Reduced arterial pressure decreases baroreceptor firing. The autonomic response shifts toward sympathetic activity, helping support heart rate and vascular tone.",
        className: "text-amber-300",
        background: "bg-amber-400/10",
        dot: "bg-amber-300",
      };
    }

    if (arterialPressure > 120) {
      return {
        label: "Hypertensive stimulus",
        description:
          "Increased arterial pressure increases baroreceptor firing. Parasympathetic activity rises while sympathetic activity is reduced.",
        className: "text-cyan-300",
        background: "bg-cyan-400/10",
        dot: "bg-cyan-300",
      };
    }

    return {
      label: "Normal baroreflex state",
      description:
        "Arterial pressure is within a typical resting range, producing a balanced autonomic response.",
      className: "text-emerald-300",
      background: "bg-emerald-400/10",
      dot: "bg-emerald-300",
    };
  }, [arterialPressure]);

  const insight = useMemo(() => {
    if (arterialPressure < 80) {
      return "The fall in arterial pressure reduces stretch of the carotid sinus and aortic arch. Baroreceptor firing decreases, allowing sympathetic activity to increase.";
    }

    if (arterialPressure > 120) {
      return "The increase in arterial pressure stretches the baroreceptors more strongly. Their firing increases, promoting parasympathetic activity and reducing sympathetic drive.";
    }

    if (bloodVolume > 5.5) {
      return "Increased blood volume tends to increase venous return and cardiovascular filling. In this simplified model, the resulting pressure stimulus influences the reflex response.";
    }

    if (bloodVolume < 4.5) {
      return "Reduced blood volume decreases circulating volume. The cardiovascular system responds through mechanisms that help preserve arterial pressure and tissue perfusion.";
    }

    return "The cardiovascular system is operating close to its baseline state, with baroreceptor activity and autonomic output relatively balanced.";
  }, [arterialPressure, bloodVolume]);

  const resetExperiment = () => {
    setArterialPressure(100);
    setBloodVolume(5);
  };

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
            Back to dashboard
          </Link>

          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-400 text-slate-950">
              <Activity size={19} />
            </div>

            <span className="font-semibold">
              Physiolab
            </span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
        {/* Introduction */}
        <section className="mb-10">
          <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
            <Sparkles size={14} />
            Cardiovascular Regulation
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Baroreceptor Reflex Lab
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-400">
            Explore how the nervous system detects changes in
            arterial pressure and rapidly adjusts cardiovascular
            activity to help maintain homeostasis.
          </p>
        </section>

        {/* Experiment */}
        <section className="grid gap-6 lg:grid-cols-[1.15fr_1fr]">
          {/* Controls */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Experimental variables
                </p>

                <h2 className="mt-1 text-xl font-semibold">
                  Change the cardiovascular state
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

            {/* Arterial Pressure */}
            <div className="mt-10">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-300">
                    Arterial Pressure
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Pressure stimulus detected by baroreceptors
                  </p>
                </div>

                <div>
                  <span className="text-3xl font-bold">
                    {arterialPressure}
                  </span>

                  <span className="ml-1 text-sm text-slate-500">
                    mmHg
                  </span>
                </div>
              </div>

              <input
                type="range"
                min="60"
                max="140"
                value={arterialPressure}
                onChange={(event) =>
                  setArterialPressure(
                    Number(event.target.value)
                  )
                }
                className="mt-6 w-full accent-cyan-400"
              />

              <div className="mt-2 flex justify-between text-[11px] text-slate-600">
                <span>60 mmHg</span>
                <span>140 mmHg</span>
              </div>
            </div>

            {/* Blood Volume */}
            <div className="mt-10">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-300">
                    Blood Volume
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Circulating blood volume
                  </p>
                </div>

                <div>
                  <span className="text-3xl font-bold">
                    {bloodVolume.toFixed(1)}
                  </span>

                  <span className="ml-1 text-sm text-slate-500">
                    L
                  </span>
                </div>
              </div>

              <input
                type="range"
                min="3"
                max="7"
                step="0.1"
                value={bloodVolume}
                onChange={(event) =>
                  setBloodVolume(
                    Number(event.target.value)
                  )
                }
                className="mt-6 w-full accent-cyan-400"
              />

              <div className="mt-2 flex justify-between text-[11px] text-slate-600">
                <span>3 L</span>
                <span>7 L</span>
              </div>
            </div>

            {/* Baroreceptor Meter */}
            <div className="mt-10 rounded-2xl border border-white/10 bg-black/10 p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Gauge
                    size={17}
                    className="text-cyan-400"
                  />

                  <p className="text-sm font-medium">
                    Baroreceptor activity
                  </p>
                </div>

                <span className="text-sm font-semibold text-cyan-300">
                  {Math.round(baroreceptorActivity)}%
                </span>
              </div>

              <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/5">
                <div
                  className="h-full rounded-full bg-cyan-400 transition-all duration-300"
                  style={{
                    width: `${baroreceptorActivity}%`,
                  }}
                />
              </div>

              <p className="mt-3 text-xs leading-5 text-slate-500">
                Baroreceptors respond to stretch in the walls of
                major arteries. This simplified meter represents
                relative firing activity.
              </p>
            </div>
          </div>

          {/* Response panel */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#0c1e30] to-[#091525] p-6 sm:p-8">
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl" />

            <div className="relative">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Reflex response
              </p>

              <h2 className="mt-1 text-xl font-semibold">
                Autonomic regulation
              </h2>

              {/* Brain */}
              <div className="mt-8 flex justify-center">
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-cyan-400/10 shadow-[0_0_60px_rgba(34,211,238,0.08)]">
                  <Brain
                    size={64}
                    strokeWidth={1.2}
                    className="text-cyan-400"
                  />
                </div>
              </div>

              <div className="mt-8 space-y-4">
                {/* Sympathetic */}
                <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-300">
                      Sympathetic activity
                    </span>

                    <span className="font-semibold text-rose-300">
                      {Math.round(
                        autonomicResponse.sympathetic
                      )}
                      %
                    </span>
                  </div>

                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/5">
                    <div
                      className="h-full rounded-full bg-rose-400 transition-all duration-300"
                      style={{
                        width: `${autonomicResponse.sympathetic}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Parasympathetic */}
                <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-300">
                      Parasympathetic activity
                    </span>

                    <span className="font-semibold text-cyan-300">
                      {Math.round(
                        autonomicResponse.parasympathetic
                      )}
                      %
                    </span>
                  </div>

                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/5">
                    <div
                      className="h-full rounded-full bg-cyan-400 transition-all duration-300"
                      style={{
                        width: `${autonomicResponse.parasympathetic}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Heart rate */}
              <div className="mt-6 flex items-center justify-between rounded-2xl bg-white/5 p-5">
                <div className="flex items-center gap-3">
                  <HeartPulse
                    size={24}
                    className="text-rose-400"
                  />

                  <div>
                    <p className="text-xs text-slate-500">
                      Reflex heart rate
                    </p>

                    <p className="mt-1 text-sm font-medium">
                      Current response
                    </p>
                  </div>
                </div>

                <div>
                  <span className="text-3xl font-bold">
                    {heartRate}
                  </span>

                  <span className="ml-1 text-xs text-slate-500">
                    bpm
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Flow diagram */}
        <section className="mt-6 rounded-3xl border border-white/10 bg-white/[0.025] p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
              <Activity size={20} />
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Feedback pathway
              </p>

              <h2 className="mt-1 text-xl font-semibold">
                Follow the reflex
              </h2>
            </div>
          </div>

          <div className="mt-8 grid gap-3 md:grid-cols-5">
            <FlowStep
              number="01"
              title="Pressure"
              description={`${arterialPressure} mmHg`}
            />

            <FlowArrow />

            <FlowStep
              number="02"
              title="Sensors"
              description="Baroreceptors"
            />

            <FlowArrow />

            <FlowStep
              number="03"
              title="Control"
              description="Medulla"
            />

            <FlowArrow />

            <FlowStep
              number="04"
              title="Autonomic"
              description={
                arterialPressure < 100
                  ? "Sympathetic ↑"
                  : "Parasympathetic ↑"
              }
            />

            <FlowArrow />

            <FlowStep
              number="05"
              title="Response"
              description={`${heartRate} bpm`}
            />
          </div>
        </section>

        {/* Current state */}
        <section
          className={`mt-6 rounded-3xl p-6 sm:p-8 ${response.background}`}
        >
          <div className="flex items-start gap-4">
            <div
              className={`mt-1 h-3 w-3 shrink-0 rounded-full ${response.dot}`}
            />

            <div>
              <p
                className={`text-sm font-semibold ${response.className}`}
              >
                {response.label}
              </p>

              <p className="mt-2 max-w-4xl text-sm leading-7 text-slate-400">
                {response.description}
              </p>
            </div>
          </div>
        </section>

        {/* Insight */}
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
                {insight}
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
                Learn the mechanism
              </p>

              <h2 className="mt-2 text-xl font-semibold">
                The baroreceptor reflex maintains short-term
                cardiovascular stability.
              </h2>

              <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-400">
                Baroreceptors located primarily in the carotid
                sinus and aortic arch detect changes in arterial
                wall stretch. Their signals reach cardiovascular
                control centers in the brainstem, which alter
                sympathetic and parasympathetic activity.
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-black/10 p-5">
                  <p className="font-semibold text-slate-200">
                    When pressure falls
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Baroreceptor firing decreases. Sympathetic
                    activity increases and parasympathetic
                    activity decreases, supporting heart rate,
                    contractility, and vascular tone.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/10 p-5">
                  <p className="font-semibold text-slate-200">
                    When pressure rises
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Baroreceptor firing increases. Parasympathetic
                    activity increases while sympathetic activity
                    decreases, tending to reduce cardiovascular
                    drive.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Learning challenge */}
        <section className="mt-6 rounded-3xl border border-white/10 bg-gradient-to-r from-cyan-400/[0.05] to-blue-500/[0.05] p-8">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Experiment challenge
          </p>

          <h2 className="mt-3 text-2xl font-semibold">
            Can you predict the reflex?
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
            Before moving the slider, predict what will happen to
            baroreceptor activity and heart rate when arterial
            pressure falls from 100 mmHg to 70 mmHg.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => setArterialPressure(70)}
              className="rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Run experiment
            </button>

            <button
              onClick={() => {
                setArterialPressure(100);
                setBloodVolume(5);
              }}
              className="rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
            >
              Return to baseline
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

function FlowStep({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
      <p className="text-[10px] font-semibold tracking-[0.2em] text-cyan-400">
        {number}
      </p>

      <p className="mt-2 text-sm font-semibold">
        {title}
      </p>

      <p className="mt-1 text-xs text-slate-500">
        {description}
      </p>
    </div>
  );
}

function FlowArrow() {
  return (
    <div className="hidden items-center justify-center text-slate-700 md:flex">
      →
    </div>
  );
}

