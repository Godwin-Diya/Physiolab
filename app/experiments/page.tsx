
"use client";

import Link from "next/link";
import { useMemo, useState, useSyncExternalStore } from "react";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Clock3,
  FlaskConical,
  HeartPulse,
  Search,
  Wind,
} from "lucide-react";

import { experiments } from "@/lib/physiology/experiments";
import {
  getCompletedCount,
  getCompletionPercentage,
  type ExperimentProgress,
} from "@/lib/physiology/progress";
import type {
  ExperimentStatus,
} from "@/lib/physiology/experiment";

// ------------------------------------------------------
// Experiment configuration
// ------------------------------------------------------

const experimentRoutes: Record<string, string> = {
  "cardiac-output": "/cardiovascular",
  "baroreceptor-reflex": "/baroreflex",
  "gas-exchange": "/respiratory",
};

const systemIcons: Record<string, typeof Activity> = {
  Cardiovascular: HeartPulse,
  Respiratory: Wind,
};

const systemStyles: Record<string, string> = {
  Cardiovascular:
    "border-rose-400/20 bg-rose-400/10 text-rose-300",
  Respiratory:
    "border-sky-400/20 bg-sky-400/10 text-sky-300",
};

const statusFilters: {
  label: string;
  value: "all" | ExperimentStatus;
}[] = [
  { label: "All statuses", value: "all" },
  { label: "Not started", value: "not-started" },
  { label: "In progress", value: "in-progress" },
  { label: "Completed", value: "completed" },
];

// ------------------------------------------------------
// Progress synchronization
// ------------------------------------------------------

function subscribeToProgress(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  window.addEventListener("storage", callback);
  window.addEventListener("physiolab-progress-updated", callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("physiolab-progress-updated", callback);
  };
}

function getProgressSnapshot() {
  if (typeof window === "undefined") {
    return "{}";
  }

  try {
    return window.localStorage.getItem("physiolab-progress") ?? "{}";
  } catch {
    return "{}";
  }
}

function getServerProgressSnapshot() {
  return "{}";
}

function parseProgressSnapshot(
  snapshot: string,
): ExperimentProgress {
  try {
    const parsed: unknown = JSON.parse(snapshot);

    if (
      parsed !== null &&
      typeof parsed === "object" &&
      !Array.isArray(parsed)
    ) {
      return parsed as ExperimentProgress;
    }

    return {};
  } catch {
    return {};
  }
}

// ------------------------------------------------------
// Experiment Hub
// ------------------------------------------------------

export default function ExperimentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSystem, setSelectedSystem] =
    useState("All systems");
  const [selectedStatus, setSelectedStatus] =
    useState<"all" | ExperimentStatus>("all");

  const progressSnapshot = useSyncExternalStore(
    subscribeToProgress,
    getProgressSnapshot,
    getServerProgressSnapshot,
  );

  const progress = useMemo(
    () => parseProgressSnapshot(progressSnapshot),
    [progressSnapshot],
  );

  // ----------------------------------------------------
  // Progress statistics
  // ----------------------------------------------------

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

  // ----------------------------------------------------
  // Search and filtering
  // ----------------------------------------------------

  const filteredExperiments = experiments.filter((experiment) => {
    const searchValue = searchTerm.toLowerCase().trim();

    const matchesSearch =
      experiment.title.toLowerCase().includes(searchValue) ||
      experiment.system.toLowerCase().includes(searchValue) ||
      experiment.description.toLowerCase().includes(searchValue) ||
      experiment.learningObjective.toLowerCase().includes(searchValue);

    const matchesSystem =
      selectedSystem === "All systems" ||
      experiment.system === selectedSystem;

    const status: ExperimentStatus =
      progress[experiment.id] ?? "not-started";

    const matchesStatus =
      selectedStatus === "all" || status === selectedStatus;

    return matchesSearch && matchesSystem && matchesStatus;
  });

  // ----------------------------------------------------
  // Status presentation
  // ----------------------------------------------------

  function getStatusLabel(status: ExperimentStatus) {
    switch (status) {
      case "completed":
        return "Completed";
      case "in-progress":
        return "In progress";
      default:
        return "Not started";
    }
  }

  function getStatusStyles(status: ExperimentStatus) {
    switch (status) {
      case "completed":
        return "border-emerald-400/20 bg-emerald-400/10 text-emerald-300";
      case "in-progress":
        return "border-amber-400/20 bg-amber-400/10 text-amber-300";
      default:
        return "border-white/10 bg-white/3 text-slate-400";
    }
  }

  // ----------------------------------------------------
  // Page
  // ----------------------------------------------------

  return (
    <main className="min-h-screen bg-[#080d18] text-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Page header */}
        <header className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            className="group inline-flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
              <Activity size={23} />
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
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/3 px-4 py-2.5 text-sm text-slate-300 transition hover:border-cyan-400/30 hover:bg-white/5 hover:text-white"
          >
            <ArrowRight className="rotate-180" size={16} />
            Back to dashboard
          </Link>
        </header>

        {/* Hero section */}
        <section className="relative mb-8 overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-cyan-400/10 via-[#101a2b] to-violet-400/10 p-6 sm:p-9">
          <div className="pointer-events-none absolute -right-12 -top-16 h-56 w-56 rounded-full bg-cyan-400/5 blur-3xl" />

          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-2xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-xs font-medium text-cyan-300">
                <FlaskConical size={14} />
                Interactive learning laboratory
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
                The Experiment Hub.
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                Explore human physiology through interactive
                experiments. Change variables, test your
                understanding, and discover how the body works.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#experiments"
                  className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
                >
                  Explore experiments
                  <ArrowRight size={16} />
                </a>

                <a
                  href="#learning-method"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/3 px-5 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/5"
                >
                  How it works
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:min-w-64">
              <div className="rounded-2xl border border-white/10 bg-black/15 p-4">
                <p className="text-2xl font-bold">
                  {experiments.length}
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Available experiments
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/15 p-4">
                <p className="text-2xl font-bold">
                  {systems.length - 1}
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Physiology systems
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Overall progress */}
        <section className="mb-10 rounded-2xl border border-white/10 bg-[#101827] p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300">
                <CheckCircle2 size={22} />
              </div>

              <div>
                <h2 className="font-semibold">
                  Your learning progress
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  Complete an experiment by answering its
                  challenge correctly.
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-2xl font-bold tabular-nums">
                {completionPercentage}%
              </p>
              <p className="text-xs text-slate-400">
                Overall completion
              </p>
            </div>
          </div>

          <div
            className="mt-5 h-2 overflow-hidden rounded-full bg-white/5"
            role="progressbar"
            aria-label="Experiment completion"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={completionPercentage}
          >
            <div
              className="h-full rounded-full bg-linear-to-r from-cyan-400 to-emerald-400 transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>

          <div className="mt-3 flex flex-wrap justify-between gap-2 text-xs text-slate-400">
            <span>
              {completedCount} of {experiments.length} experiments
              completed
            </span>
            <span>
              {Math.max(experiments.length - completedCount, 0)}{" "}
              remaining
            </span>
          </div>
        </section>

        {/* Experiment list and filters */}
        <section id="experiments" className="scroll-mt-6">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
              Your laboratory
            </p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
              Explore and experiment
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Find an experiment, choose a physiology system, and
              track your progress as you learn.
            </p>
          </div>

          {/* Search */}
          <div className="mb-5">
            <label
              htmlFor="experiment-search"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Search experiments
            </label>

            <div className="relative max-w-xl">
              <Search
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                id="experiment-search"
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search by title, system, or learning objective..."
                className="w-full rounded-xl border border-white/10 bg-[#101827] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/10"
              />
            </div>
          </div>

          {/* System filters */}
          <div className="mb-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Physiology system
            </p>

            <div className="flex flex-wrap gap-2">
              {systems.map((system) => {
                const isSelected = selectedSystem === system;

                return (
                  <button
                    key={system}
                    type="button"
                    onClick={() => setSelectedSystem(system)}
                    aria-pressed={isSelected}
                    className={`rounded-xl border px-4 py-2 text-sm font-medium transition ${
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

          {/* Status filters */}
          <div className="mb-7">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Learning status
            </p>

            <div className="flex flex-wrap gap-2">
              {statusFilters.map((filter) => {
                const isSelected = selectedStatus === filter.value;

                return (
                  <button
                    key={filter.value}
                    type="button"
                    onClick={() => setSelectedStatus(filter.value)}
                    aria-pressed={isSelected}
                    className={`rounded-xl border px-4 py-2 text-sm font-medium transition ${
                      isSelected
                        ? "border-violet-400/30 bg-violet-400/10 text-violet-300"
                        : "border-white/10 bg-white/3 text-slate-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Experiment cards */}
          {filteredExperiments.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredExperiments.map((experiment) => {
                const status: ExperimentStatus =
                  progress[experiment.id] ?? "not-started";

                const isCompleted = status === "completed";

                const SystemIcon =
                  systemIcons[experiment.system] ?? Activity;

                const systemStyle =
                  systemStyles[experiment.system] ??
                  "border-cyan-400/20 bg-cyan-400/10 text-cyan-300";

                const route =
                  experimentRoutes[experiment.id] ?? "/experiments";

                return (
                  <article
                    key={experiment.id}
                    className="group flex h-full flex-col rounded-2xl border border-white/10 bg-[#101827] p-5 transition duration-200 hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-[#121d2e]"
                  >
                    <div className="mb-5 flex items-start justify-between gap-3">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${systemStyle}`}
                      >
                        <SystemIcon size={23} />
                      </div>

                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-medium capitalize ${
                          experiment.difficulty === "beginner"
                            ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
                            : experiment.difficulty === "intermediate"
                              ? "border-amber-400/20 bg-amber-400/10 text-amber-300"
                              : "border-violet-400/20 bg-violet-400/10 text-violet-300"
                        }`}
                      >
                        {experiment.difficulty}
                      </span>
                    </div>

                    <div className="mb-3">
                      <p className="mb-2 text-xs font-medium text-slate-500">
                        {experiment.system}
                      </p>

                      <h3 className="text-lg font-semibold leading-snug">
                        {experiment.title}
                      </h3>
                    </div>

                    <p className="text-sm leading-6 text-slate-400">
                      {experiment.description}
                    </p>

                    <div className="mt-5 rounded-xl border border-white/5 bg-white/2.5 p-4">
                      <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Learning objective
                      </p>

                      <p className="text-sm leading-6 text-slate-300">
                        {experiment.learningObjective}
                      </p>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium ${getStatusStyles(status)}`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 size={13} />
                        ) : status === "in-progress" ? (
                          <Clock3 size={13} />
                        ) : (
                          <FlaskConical size={13} />
                        )}

                        {getStatusLabel(status)}
                      </span>

                      {isCompleted && (
                        <span className="text-xs text-emerald-300">
                          Challenge passed
                        </span>
                      )}
                    </div>

                    <div className="mt-auto pt-6">
                      <Link
                        href={route}
                        className="flex w-full items-center justify-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-sm font-semibold text-cyan-300 transition hover:border-cyan-400/40 hover:bg-cyan-400/15"
                      >
                        {isCompleted
                          ? "Review experiment"
                          : status === "in-progress"
                            ? "Continue experiment"
                            : "Start experiment"}

                        <ArrowRight
                          size={16}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-white/10 bg-white/2.5 px-5 py-12 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/3 text-slate-400">
                <Search size={24} />
              </div>

              <h3 className="mt-4 text-lg font-semibold">
                No experiments found
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
                Try another search term or adjust your physiology
                system and learning status filters.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedSystem("All systems");
                  setSelectedStatus("all");
                }}
                className="mt-5 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-white/10"
              >
                Clear all filters
              </button>
            </div>
          )}
        </section>

        {/* Learning method */}
        <section id="learning-method" className="scroll-mt-6 pt-16">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
              Learn by doing
            </p>

            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
              The Physiolab method
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              Build understanding by exploring a physiological
              process, observing the results, and testing what
              you have learned.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              {
                number: "01",
                title: "Explore",
                description:
                  "Begin with a physiological system and understand the question you are investigating.",
                icon: Search,
              },
              {
                number: "02",
                title: "Experiment",
                description:
                  "Work through the laboratory activity and examine the variables that influence the system.",
                icon: FlaskConical,
              },
              {
                number: "03",
                title: "Reason",
                description:
                  "Use your observations to connect physiological mechanisms with their outcomes.",
                icon: Activity,
              },
              {
                number: "04",
                title: "Demonstrate",
                description:
                  "Answer the experiment challenge correctly to record your completion.",
                icon: CheckCircle2,
              },
            ].map((step) => {
              const StepIcon = step.icon;

              return (
                <div
                  key={step.number}
                  className="rounded-2xl border border-white/10 bg-[#101827] p-5"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <span className="text-sm font-semibold text-cyan-300">
                      {step.number}
                    </span>

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/3 text-slate-300">
                      <StepIcon size={20} />
                    </div>
                  </div>

                  <h3 className="text-base font-semibold">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 border-t border-white/10 py-6">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
            <p>
              Physiolab · Interactive Human Physiology Learning
            </p>

            <Link
              href="/"
              className="transition hover:text-cyan-300"
            >
              Return to dashboard
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
