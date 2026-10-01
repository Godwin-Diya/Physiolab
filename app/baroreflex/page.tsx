"use client";

import { useState } from "react";

import {
  Activity,
  ArrowDown,
  ArrowRight,
  ArrowUp,
  HeartPulse,
  RotateCcw,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { MetricCard } from "@/components/physiology/MetricCard";
import { SimulationPanel } from "@/components/physiology/SimulationPanel";
import { SliderControl } from "@/components/physiology/SliderControl";

import { calculateBaroreflex } from "@/lib/physiology/baroreflex";

export default function BaroreflexPage() {
  const [arterialPressure, setArterialPressure] = useState(100);
  const [bloodVolume, setBloodVolume] = useState(5);

  const result = calculateBaroreflex(
    arterialPressure,
    bloodVolume
  );

  const resetExperiment = () => {
    setArterialPressure(100);
    setBloodVolume(5);
  };

  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">

        {/* Header */}

        <header className="mb-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1.5 text-xs font-medium text-cyan-300">
            <Sparkles size={14} />
            Cardiovascular Physiology
          </div>

          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Baroreceptor Reflex Lab
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                Explore how the autonomic nervous system responds to changes
                in arterial pressure and blood volume.
              </p>
            </div>

            <button
              onClick={resetExperiment}
              className="inline-flex w-fit items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/[0.07] hover:text-white"
            >
              <RotateCcw size={16} />
              Reset experiment
            </button>
          </div>
        </header>

        {/* Main simulation */}

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">

          {/* Controls */}

          <SimulationPanel
            eyebrow="Experiment controls"
            title="Change the physiological conditions"
          >
            <div className="space-y-8">
              <SliderControl
                label="Arterial Pressure"
                description="Adjust systemic arterial pressure."
                value={arterialPressure}
                min={70}
                max={130}
                unit="mmHg"
                onChange={setArterialPressure}
              />

              <SliderControl
                label="Blood Volume"
                description="Change circulating blood volume."
                value={bloodVolume}
                min={3}
                max={7}
                unit="L"
                onChange={setBloodVolume}
              />
            </div>

            {/* Experimental question */}

            <div className="mt-8 rounded-2xl border border-violet-400/10 bg-violet-400/[0.04] p-5">
              <div className="flex items-center gap-2 text-violet-300">
                <Activity size={17} />

                <span className="text-sm font-semibold">
                  Think before observing
                </span>
              </div>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                What do you predict will happen to heart rate if arterial
                pressure suddenly falls?
              </p>
            </div>
          </SimulationPanel>

          {/* Response */}

          <SimulationPanel
            eyebrow="Live response"
            title="Autonomic regulation"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <MetricCard
                label="Heart Rate"
                value={result.heartRate}
                unit="bpm"
                highlighted
              />

              <MetricCard
                label="MAP"
                value={result.estimatedMAP}
                unit="mmHg"
              />

              <MetricCard
                label="Baroreceptor Activity"
                value={Math.round(result.baroreceptorActivity)}
                unit="%"
              />

              <MetricCard
                label="Vascular Tone"
                value={result.vascularTone}
                unit="%"
              />
            </div>

            {/* Activity meter */}

            <div className="mt-7">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-slate-400">
                  Baroreceptor firing
                </span>

                <span className="text-sm font-semibold text-cyan-300">
                  {Math.round(result.baroreceptorActivity)}%
                </span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-cyan-400 transition-all duration-300"
                  style={{
                    width: `${result.baroreceptorActivity}%`,
                  }}
                />
              </div>
            </div>
          </SimulationPanel>
        </div>

        {/* Autonomic balance */}

        <section className="mt-6">
          <SimulationPanel
            eyebrow="Autonomic nervous system"
            title="The body adjusts in opposite directions"
          >
            <div className="grid gap-5 md:grid-cols-2">

              {/* Parasympathetic */}

              <div className="rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.04] p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-cyan-400/10 p-3 text-cyan-300">
                      <ArrowDown size={20} />
                    </div>

                    <div>
                      <p className="font-semibold">
                        Parasympathetic
                      </p>

                      <p className="text-xs text-slate-500">
                        Rest-and-digest influence
                      </p>
                    </div>
                  </div>

                  <span className="text-xl font-bold text-cyan-300">
                    {Math.round(result.parasympatheticActivity)}%
                  </span>
                </div>

                <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-cyan-400 transition-all duration-300"
                    style={{
                      width: `${result.parasympatheticActivity}%`,
                    }}
                  />
                </div>
              </div>

              {/* Sympathetic */}

              <div className="rounded-2xl border border-rose-400/10 bg-rose-400/[0.04] p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-rose-400/10 p-3 text-rose-300">
                      <ArrowUp size={20} />
                    </div>

                    <div>
                      <p className="font-semibold">
                        Sympathetic
                      </p>

                      <p className="text-xs text-slate-500">
                        Fight-or-flight influence
                      </p>
                    </div>
                  </div>

                  <span className="text-xl font-bold text-rose-300">
                    {Math.round(result.sympatheticActivity)}%
                  </span>
                </div>

                <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-rose-400 transition-all duration-300"
                    style={{
                      width: `${result.sympatheticActivity}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </SimulationPanel>
        </section>

        {/* Feedback loop */}

        <section className="mt-6">
          <SimulationPanel
            eyebrow="Physiological feedback loop"
            title="Follow the signal"
          >
            <div className="grid gap-4 md:grid-cols-7">

              {/* Arterial pressure */}

              <div
                className={`rounded-2xl border p-5 text-center transition-all duration-300 ${
                  result.pressureDirection === "low"
                    ? "border-amber-400/30 bg-amber-400/[0.06]"
                    : result.pressureDirection === "high"
                      ? "border-rose-400/30 bg-rose-400/[0.06]"
                      : "border-white/10 bg-white/[0.025]"
                }`}
              >
                <div
                  className={`mx-auto flex h-11 w-11 items-center justify-center rounded-xl ${
                    result.pressureDirection === "low"
                      ? "bg-amber-400/10 text-amber-300"
                      : result.pressureDirection === "high"
                        ? "bg-rose-400/10 text-rose-300"
                        : "bg-cyan-400/10 text-cyan-300"
                  }`}
                >
                  <HeartPulse size={21} />
                </div>

                <p className="mt-4 text-sm font-semibold">
                  Arterial pressure
                </p>

                <p className="mt-1 text-lg font-bold text-white">
                  {arterialPressure}

                  <span className="ml-1 text-xs font-medium text-slate-500">
                    mmHg
                  </span>
                </p>

                <p
                  className={`mt-2 text-xs font-medium capitalize ${
                    result.pressureDirection === "low"
                      ? "text-amber-300"
                      : result.pressureDirection === "high"
                        ? "text-rose-300"
                        : "text-cyan-300"
                  }`}
                >
                  {result.pressureDirection} pressure
                </p>
              </div>

              {/* Arrow */}

              <div className="hidden items-center justify-center md:flex">
                <ArrowRight
                  className={`transition-all duration-300 ${
                    result.pressureDirection === "low"
                      ? "text-amber-300"
                      : result.pressureDirection === "high"
                        ? "text-rose-300"
                        : "text-slate-600"
                  }`}
                />
              </div>

              {/* Baroreceptors */}

              <div
                className={`rounded-2xl border p-5 text-center transition-all duration-300 ${
                  result.baroreceptorActivity < 45
                    ? "border-amber-400/30 bg-amber-400/[0.06]"
                    : result.baroreceptorActivity > 55
                      ? "border-cyan-400/30 bg-cyan-400/[0.06]"
                      : "border-white/10 bg-white/[0.025]"
                }`}
              >
                <div
                  className={`mx-auto flex h-11 w-11 items-center justify-center rounded-xl ${
                    result.baroreceptorActivity < 45
                      ? "bg-amber-400/10 text-amber-300"
                      : "bg-cyan-400/10 text-cyan-300"
                  }`}
                >
                  <Activity size={21} />
                </div>

                <p className="mt-4 text-sm font-semibold">
                  Baroreceptors
                </p>

                <p className="mt-1 text-lg font-bold text-white">
                  {Math.round(result.baroreceptorActivity)}%
                </p>

                <p className="mt-2 text-xs text-slate-500">
                  Detect vessel wall stretch
                </p>
              </div>

              {/* Arrow */}

              <div className="hidden items-center justify-center md:flex">
                <ArrowRight
                  className={`transition-all duration-300 ${
                    result.autonomicDirection === "sympathetic"
                      ? "text-rose-300"
                      : result.autonomicDirection === "parasympathetic"
                        ? "text-cyan-300"
                        : "text-slate-600"
                  }`}
                />
              </div>

              {/* Autonomic response */}

              <div
                className={`rounded-2xl border p-5 text-center transition-all duration-300 ${
                  result.autonomicDirection === "sympathetic"
                    ? "border-rose-400/30 bg-rose-400/6"
                    : result.autonomicDirection === "parasympathetic"
                      ? "border-cyan-400/30 bg-cyan-400/6"
                      : "border-violet-400/30 bg-violet-400/6"
                }`}
              >
                <div
                  className={`mx-auto flex h-11 w-11 items-center justify-center rounded-xl ${
                    result.autonomicDirection === "sympathetic"
                      ? "bg-rose-400/10 text-rose-300"
                      : result.autonomicDirection === "parasympathetic"
                        ? "bg-cyan-400/10 text-cyan-300"
                        : "bg-violet-400/10 text-violet-300"
                  }`}
                >
                  <ShieldCheck size={21} />
                </div>

                <p className="mt-4 text-sm font-semibold">
                  Autonomic response
                </p>

                <p className="mt-1 text-lg font-bold capitalize text-white">
                  {result.autonomicDirection}
                </p>

                <p className="mt-2 text-xs text-slate-500">
                  Adjusts cardiovascular function
                </p>
              </div>
            </div>

            {/* Direction indicator */}

            <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.025] p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                    Current reflex direction
                  </p>

                  <p className="mt-1 text-sm font-semibold text-white">
                    {result.autonomicDirection === "sympathetic"
                      ? "Increase cardiovascular support"
                      : result.autonomicDirection === "parasympathetic"
                        ? "Reduce cardiovascular drive"
                        : "Maintain balanced autonomic control"}
                  </p>
                </div>

                <div
                  className={`inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${
                    result.autonomicDirection === "sympathetic"
                      ? "border-rose-400/20 bg-rose-400/10 text-rose-300"
                      : result.autonomicDirection === "parasympathetic"
                        ? "border-cyan-400/20 bg-cyan-400/10 text-cyan-300"
                        : "border-violet-400/20 bg-violet-400/10 text-violet-300"
                  }`}
                >
                  {result.autonomicDirection === "sympathetic" ? (
                    <ArrowUp size={14} />
                  ) : result.autonomicDirection === "parasympathetic" ? (
                    <ArrowDown size={14} />
                  ) : (
                    <ShieldCheck size={14} />
                  )}

                  {result.autonomicDirection}
                </div>
              </div>
            </div>
          </SimulationPanel>
        </section>

        {/* Response explanation */}

        <section className="mt-6 grid gap-6 lg:grid-cols-2">
          <SimulationPanel
            eyebrow="What is happening?"
            title={result.response}
          >
            <p className="text-sm leading-7 text-slate-400">
              {result.insight}
            </p>
          </SimulationPanel>

          <SimulationPanel
            eyebrow="Physiology principle"
            title="Negative feedback"
          >
            <p className="text-sm leading-7 text-slate-400">
              The baroreceptor reflex is a classic example of negative
              feedback. A change in arterial pressure is detected and
              triggers a response that acts to oppose the original change,
              helping maintain cardiovascular stability.
            </p>
          </SimulationPanel>
        </section>

        {/* Footer */}

        <footer className="mt-12 border-t border-white/10 py-8 text-center">
          <p className="text-xs text-slate-600">
            Physiolab · Interactive Human Physiology Learning Platform
          </p>
        </footer>
      </div>
    </main>
  );
}