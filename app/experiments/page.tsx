
"use client";

import Link from "next/link";
import { useState } from "react";

import {
  Activity,
  ArrowRight,
  CheckCircle2,
  FlaskConical,
  HeartPulse,
  Search,
  Wind,
} from "lucide-react";

import { experiments } from "@/lib/physiology/experiments";

import {
  getProgress,
  updateExperimentStatus,
  getCompletedCount,
  getCompletionPercentage,
  type ExperimentProgress,
} from "@/lib/physiology/progress";

const systemIcons: Record<string, typeof HeartPulse> = {
  Cardiovascular: HeartPulse,
  Respiratory: Wind,
};

const systemStyles: Record<
  string,
  {
    color: string;
    background: string;
    border: string;
  }
> = {
  Cardiovascular: {
    color: "text-rose-300",
    background: "bg-rose-400/10",
    border: "border-rose-400/20",
  },
  Respiratory: {
    color: "text-cyan-300",
    background: "bg-cyan-400/10",
    border: "border-cyan-400/20",
  },
};

const experimentRoutes: Record<string, string> = {
  "cardiac-output": "/cardiovascular",
  "baroreceptor-reflex": "/baroreflex",
  "gas-exchange": "/respiratory",
};

export default function ExperimentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSystem, setSelectedSystem] =
    useState("All systems");

const [progress, setProgress] =
  useState<ExperimentProgress>(() => getProgress());

const progressLoaded = true;

  function handleToggleComplete(experimentId: string) {
    const currentStatus =
      progress[experimentId] ?? "not-started";

    const nextStatus =
      currentStatus === "completed"
        ? "in-progress"
        : "completed";

    const updatedProgress = updateExperimentStatus(
      experimentId,
      nextStatus,
    );

    setProgress(updatedProgress);
  }

  const completedCount = getCompletedCount(progress);

  const completionPercentage = getCompletionPercentage(
    progress,
    experiments.length,
  );

  const systems = [
    "All systems",
    ...Array.from(
      new Set(experiments.map((experiment) => experiment.system)),
    ),
  ];

  const filteredExperiments = experiments.filter((experiment) => {
    const search = searchTerm.toLowerCase().trim();

    const matchesSearch =
      experiment.title.toLowerCase().includes(search) ||
      experiment.system.toLowerCase().includes(search) ||
      experiment.description.toLowerCase().includes(search) ||
      experiment.learningObjective.toLowerCase().includes(search);

    const matchesSystem =
      selectedSystem === "All systems" ||
      experiment.system === selectedSystem;

    return matchesSearch && matchesSystem;
  });

  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
        {/* Header */}
        <header className="mb-10 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
          >
            <ArrowRight size={16} className="rotate-180" />
            Back to dashboard
          </Link>

          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/3 px-3 py-2">
            <Activity size={16} className="text-cyan-300" />
            <span className="text-xs font-medium text-slate-300">
              Physiolab
            </span>
          </div>
        </header>

        {/* Hero */}
        <section className="relative mb-8 overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-cyan-400/10 via-slate-900 to-blue-500/10 p-7 sm:p-10 lg:p-12">
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="relative z-10 max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-xs font-medium text-cyan-300">
              <FlaskConical size={14} />
              Interactive learning laboratory
            </div>

            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              The Experiment
              <span className="block text-cyan-300">Hub.</span>
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
              Move beyond memorizing physiology. Explore interactive
              experiments, manipulate physiological variables, observe
              responses, and discover how the human body maintains balance.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                <p className="text-2xl font-semibold">
                  {experiments.length}
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Available experiments
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                <p className="text-2xl font-semibold">
                  {systems.length - 1}
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Physiology systems
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Learning progress */}
        <section
          aria-label="Your learning progress"
          className="mb-10 rounded-2xl border border-white/10 bg-white/3 p-5 sm:p-6"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-slate-400">
                Your learning progress
              </p>

              <h2 className="mt-1 text-xl font-semibold sm:text-2xl">
                {completedCount} of {experiments.length} experiments completed
              </h2>

              <p className="mt-2 text-xs text-slate-500">
                Keep exploring to build your physiology knowledge.
              </p>
            </div>

            <p className="text-3xl font-bold text-emerald-400">
              {completionPercentage}%
            </p>
          </div>

          <div
            className="mt-5 h-2 overflow-hidden rounded-full bg-white/10"
            role="progressbar"
            aria-label="Experiment completion"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={completionPercentage}
          >
            <div
              className="h-full rounded-full bg-linear-to-r from-emerald-400 to-teal-400 transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </section>

        {/* Search and filters */}
        <section className="mb-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search experiments..."
                aria-label="Search experiments"
                className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400/50"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {systems.map((system) => {
                const isSelected = selectedSystem === system;

                return (
                  <button
                    key={system}
                    type="button"
                    onClick={() => setSelectedSystem(system)}
                    aria-pressed={isSelected}
                    className={`rounded-xl border px-4 py-2.5 text-xs font-medium transition ${
                      isSelected
                        ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-300"
                        : "border-white/10 bg-white/3 text-slate-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {system}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Experiment library */}
        <section>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">
                Explore experiments
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Choose a laboratory and start investigating.
              </p>
            </div>

            <span className="text-xs text-slate-500">
              {filteredExperiments.length} results
            </span>
          </div>

          {filteredExperiments.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredExperiments.map((experiment) => {
                const Icon =
                  systemIcons[experiment.system] ?? FlaskConical;

                const style = systemStyles[experiment.system] ?? {
                  color: "text-cyan-300",
                  background: "bg-cyan-400/10",
                  border: "border-cyan-400/20",
                };

                const route = experimentRoutes[experiment.id];

                const status =
                  progress[experiment.id] ?? experiment.status;

                const isCompleted = status === "completed";

                return (
                  <article
                    key={experiment.id}
                    className="group flex flex-col rounded-2xl border border-white/10 bg-white/2.5 p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-white/5"
                  >
                    {/* Card heading */}
                    <div className="mb-5 flex items-start justify-between">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-xl border ${style.background} ${style.border}`}
                      >
                        <Icon size={22} className={style.color} />
                      </div>

                      <span className="rounded-full border border-white/10 bg-white/3 px-3 py-1 text-xs capitalize text-slate-400">
                        {experiment.difficulty}
                      </span>
                    </div>

                    <p className={`mb-2 text-xs font-medium ${style.color}`}>
                      {experiment.system} physiology
                    </p>

                    <h3 className="text-lg font-semibold tracking-tight">
                      {experiment.title}
                    </h3>

                    <p className="mt-3 flex-1 text-sm leading-6 text-slate-400">
                      {experiment.description}
                    </p>

                    {/* Learning objective */}
                    <div className="mt-5 rounded-xl border border-white/5 bg-white/3 p-3">
                      <p className="mb-1 text-xs font-medium text-slate-300">
                        Learning objective
                      </p>

                      <p className="text-xs leading-5 text-slate-500">
                        {experiment.learningObjective}
                      </p>
                    </div>

                    {/* Status */}
                    <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/5 pt-4">
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <CheckCircle2
                          size={16}
                          className={
                            isCompleted
                              ? "text-emerald-400"
                              : "text-slate-600"
                          }
                        />

                        <span className="capitalize">
                          {status.replace("-", " ")}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleToggleComplete(experiment.id)}
                        disabled={!progressLoaded}
                        aria-pressed={isCompleted}
                        className={`rounded-lg border px-3 py-2 text-xs font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${
                          isCompleted
                            ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300 hover:bg-emerald-400/15"
                            : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
                        }`}
                      >
                        {isCompleted ? "Completed ✓" : "Mark complete"}
                      </button>
                    </div>

                    {/* Laboratory link */}
                    <div className="mt-4">
                      {route ? (
                        <Link
                          href={route}
                          className="inline-flex items-center gap-2 rounded-lg bg-cyan-400/10 px-3 py-2 text-xs font-medium text-cyan-300 transition hover:bg-cyan-400/20"
                        >
                          Enter laboratory

                          <ArrowRight
                            size={14}
                            className="transition group-hover:translate-x-0.5"
                          />
                        </Link>
                      ) : (
                        <span className="text-xs text-slate-500">
                          Coming soon
                        </span>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-white/10 px-6 py-16 text-center">
              <Search
                size={28}
                className="mx-auto mb-4 text-slate-600"
              />

              <h3 className="text-lg font-medium">
                No experiments found
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Try another search term or select a different system.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedSystem("All systems");
                }}
                className="mt-5 rounded-lg border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/5"
              >
                Clear filters
              </button>
            </div>
          )}
        </section>

        {/* Learning method */}
        <section className="mt-12 rounded-2xl border border-white/10 bg-white/2.5 p-6 sm:p-8">
          <div className="mb-6">
            <p className="text-xs font-medium uppercase tracking-widest text-cyan-300">
              The Physiolab method
            </p>

            <h2 className="mt-2 text-2xl font-semibold">
              Think like a physiologist.
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              Every experiment is an opportunity to connect a physiological
              mechanism with an observable response.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                number: "01",
                title: "Predict",
                description:
                  "Make a hypothesis about how the body will respond.",
              },
              {
                number: "02",
                title: "Manipulate",
                description:
                  "Change a physiological variable in the simulation.",
              },
              {
                number: "03",
                title: "Observe",
                description:
                  "Watch the indicators and physiological responses.",
              },
              {
                number: "04",
                title: "Explain",
                description:
                  "Connect the observed response to the underlying mechanism.",
              },
            ].map((step) => (
              <div
                key={step.number}
                className="rounded-xl border border-white/5 bg-white/3 p-4"
              >
                <p className="text-sm font-semibold text-cyan-300">
                  {step.number}
                </p>

                <h3 className="mt-3 font-medium">{step.title}</h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-10 border-t border-white/5 py-6 text-center text-xs text-slate-600">
          Physiolab · Learn the mechanisms. Explore the systems. Understand
          the body.
        </footer>
      </div>
    </main>
  );
}
