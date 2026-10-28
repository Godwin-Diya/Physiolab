"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  FlaskConical,
  Lightbulb,
  SlidersHorizontal,
} from "lucide-react";

import { ExperimentChallenge } from "@/components/physiology/ExperimentChallenge";
import {
  getProgress,
  updateExperimentStatus,
} from "@/lib/physiology/progress";
import { experiments } from "@/lib/physiology/experiments";
import type { SimulationKind } from "@/lib/physiology/experiment";
import { SimulationVisual } from "@/components/physiology/SimulationVisual";

interface SimulationResult {
  display: string;
  interpretation: string;
}

function calculateResult(
  kind: SimulationKind,
  value: number,
): SimulationResult {
  switch (kind) {
    case "ecg-rate": {
      const rate = Math.round(60000 / value);
      return {
        display: `${rate} beats/min`,
        interpretation:
          "A shorter R–R interval corresponds to a higher estimated heart rate.",
      };
    }

    case "mean-arterial-pressure": {
      const pressure = Math.round(value * 5);
      return {
        display: `${pressure} mmHg`,
        interpretation:
          "In this simplified model, higher vascular resistance raises pressure when cardiac output is held constant.",
      };
    }

    case "oxygen-saturation": {
      const index = Math.max(
        0,
        Math.min(100, Math.round(75 + (value - 7.4) * 30)),
      );
      return {
        display: `${index}%`,
        interpretation:
          "The index illustrates the direction of the pH effect only. It is not a measured or clinically calculated oxygen saturation.",
      };
    }

    case "minute-ventilation": {
      const ventilation = (value * 12) / 1000;
      return {
        display: `${ventilation.toFixed(2)} L/min`,
        interpretation:
          "Minute ventilation is tidal volume multiplied by respiratory rate. This model holds the rate at 12 breaths/min.",
      };
    }

    case "action-potential": {
      const fired = value >= 55;
      return {
        display: fired ? "Action potential triggered" : "Below threshold",
        interpretation: fired
          ? "The stimulus has crossed the model threshold. Real neurons have more complex excitability than this demonstration."
          : "The stimulus has not reached the model threshold. Increase it to observe the all-or-none response.",
      };
    }

    case "synaptic-response": {
      const response =
        value === 0 ? 0 : Math.round((100 * value) / (value + 30));
      return {
        display: `${response}%`,
        interpretation:
          "This conceptual response index rises with transmitter release and gradually saturates. It is not a measured synaptic potential.",
      };
    }

    case "reflex-latency": {
      const latency = Math.round(250 - (value - 10) * 1.5);
      return {
        display: `${latency} ms`,
        interpretation:
          "The model illustrates a possible relationship, not a universal rule: real reflex latency depends on pathway length, conduction, synapses, and the response measured.",
      };
    }

    case "glomerular-filtration": {
      const index = Math.round(value * 1.2 - 24);
      return {
        display: `${index} mL/min`,
        interpretation:
          "This is a conceptual filtration index, not an estimate of actual kidney function. Real filtration depends on several pressure and permeability factors.",
      };
    }

    case "water-reabsorption": {
      const index = Math.round(50 + value * 0.45);
      return {
        display: `${index}%`,
        interpretation:
          "The index illustrates the directional effect of ADH on water reabsorption. It is not a measured physiological percentage.",
      };
    }
    
      default: {
      return {
        display: "Model unavailable",
        interpretation:
          "This simulation does not have a configured calculation yet.",
      };
    }
  }
}


export default function ExperimentDetailPage() {
  const params = useParams<{ id: string }>();
  const experimentId = Array.isArray(params.id)
    ? params.id[0]
    : params.id;

  const [simulationValue, setSimulationValue] = useState<number | null>(
    null,
  );

  const experiment = experiments.find(
    (item) => item.id === experimentId,
  );

  if (!experiment) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#080d18] px-5 text-white">
        <div className="max-w-md rounded-3xl border border-white/10 bg-[#101827] p-8 text-center">
          <FlaskConical className="mx-auto text-cyan-300" size={36} />
          <h1 className="mt-5 text-2xl font-bold">
            Experiment not found
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            This experiment may have moved or the link may be incorrect.
          </p>
          <Link
            href="/experiments"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Return to Experiment Hub
            <ArrowRight size={16} />
          </Link>
        </div>
      </main>
    );
  }

  const simulation = experiment.simulation;
  const value = simulationValue ?? simulation?.initialValue ?? 0;
  const result = simulation
    ? calculateResult(simulation.kind, value)
    : null;

  const currentExperimentId = experiment.id;

  function handleSimulationChange(nextValue: number) {
    setSimulationValue(nextValue);

    const progress = getProgress();

    if (progress[currentExperimentId] !== "completed") {
      updateExperimentStatus(currentExperimentId, "in-progress");
    }
  }


  return (
    <main className="min-h-screen bg-[#080d18] text-white">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
              <Activity size={23} />
            </div>
            <div>
              <p className="text-lg font-bold">Physiolab</p>
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

        <section className="relative mb-6 overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-cyan-400/10 via-[#101a2b] to-violet-400/10 p-6 sm:p-9">
          <div className="pointer-events-none absolute -right-10 -top-12 h-48 w-48 rounded-full bg-cyan-400/5 blur-3xl" />

          <div className="relative">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-xs font-medium text-cyan-300">
              <FlaskConical size={14} />
              {experiment.system} laboratory
            </div>

            <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
              {experiment.title}
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              {experiment.description}
            </p>

            <span className="mt-5 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs capitalize text-slate-300">
              {experiment.difficulty} level
            </span>
          </div>
        </section>

        <section className="mb-6 rounded-2xl border border-white/10 bg-[#101827] p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-400/10 text-violet-300">
              <Lightbulb size={20} />
            </div>
            <div>
              <h2 className="font-semibold">Learning objective</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                {experiment.learningObjective}
              </p>
            </div>
          </div>
        </section>

        {simulation && result && (
          <section className="mb-6 rounded-2xl border border-white/10 bg-[#101827] p-5 sm:p-7">
            <div className="mb-6 flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
                <SlidersHorizontal size={21} />
              </div>
              <div>
                <h2 className="text-xl font-semibold">
                  Interactive model
                </h2>
                <p className="mt-1 text-sm leading-6 text-slate-400">
                  Adjust the variable and observe how the model responds.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/5 bg-white/2.5 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <label
                  htmlFor="simulation-control"
                  className="text-sm font-medium text-slate-200"
                >
                  {simulation.variableLabel}
                </label>
                <span className="rounded-lg border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-sm font-semibold tabular-nums text-cyan-300">
                  {value} {simulation.unit}
                </span>
              </div>

              <input
                id="simulation-control"
                type="range"
                min={simulation.min}
                max={simulation.max}
                step={simulation.step}
                value={value}
                onChange={(event) =>
                  handleSimulationChange(Number(event.target.value))
                }
                className="mt-6 w-full accent-cyan-400"
              />

              <div className="mt-2 flex justify-between text-xs text-slate-500">
                <span>
                  {simulation.min} {simulation.unit}
                </span>
                <span>
                  {simulation.max} {simulation.unit}
                </span>
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-400">
                {simulation.description}
              </p>
            </div>

            <div className="mt-5 rounded-2xl border border-cyan-400/15 bg-cyan-400/5 p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-cyan-300">
                {simulation.resultLabel}
              </p>
              <p className="mt-2 text-3xl font-bold tabular-nums">
                {result.display}
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                {result.interpretation}
              </p>
            </div>

            <p className="mt-4 text-xs leading-5 text-slate-500">
              Educational demonstration only. Simplified models are not
              clinical calculators and should not be used to make
              diagnostic or treatment decisions.
            </p>
          </section>
        )}

        <section className="mb-8">
          <div className="mb-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
              Check your understanding
            </p>
            <h2 className="mt-2 text-2xl font-bold">
              Experiment challenge
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Answer the question and review the explanation. A correct
              answer records the experiment as completed.
            </p>
          </div>

          {experiment.challenge ? (
            <ExperimentChallenge
              key={experiment.id}
              experimentId={experiment.id}
              question={experiment.challenge.question}
              description={experiment.challenge.description}
              options={experiment.challenge.options}
              correctAnswer={experiment.challenge.correctAnswer}
              explanation={experiment.challenge.explanation}
              observation={experiment.challenge.observation}
            />
          ) : (
            <div className="rounded-2xl border border-amber-400/20 bg-amber-400/5 p-5 text-sm leading-6 text-amber-200">
              A challenge has not been configured for this experiment yet.
            </div>
          )}
        </section>

        <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 py-6">
          <p className="text-xs text-slate-500">
            Physiolab · Learn through exploration
          </p>
          <Link
            href="/experiments"
            className="inline-flex items-center gap-2 text-sm font-medium text-cyan-300 transition hover:text-cyan-200"
          >
            Browse other experiments
            <ArrowRight size={16} />
          </Link>
        </footer>
      </div>
    </main>
  );
}
