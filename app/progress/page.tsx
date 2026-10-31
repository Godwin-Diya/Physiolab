"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    Activity,
    ArrowRight,
    Award,
    BookOpen,
    CheckCircle2,
    CircleDashed,
    Clock3,
    FlaskConical,
    Target,
    TrendingUp,
    Trophy,
} from "lucide-react";

import type { ExperimentStatus } from "@/lib/physiology/experiment";
import { experiments } from "@/lib/physiology/experiments";
import {
    getProgress,
    type ExperimentProgress,
} from "@/lib/physiology/progress";

const SYSTEMS = [
    "Cardiovascular",
    "Respiratory",
    "Nervous System",
    "Renal",
];

function getStatus(
    progress: ExperimentProgress,
    experimentId: string,
): ExperimentStatus {
    return progress[experimentId] ?? "not-started";
}

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

export default function ProgressPage() {
    const [progress, setProgress] = useState<ExperimentProgress>({});
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
    function syncProgress() {
        setProgress(getProgress());
        setIsLoaded(true);
    }

    syncProgress();

    window.addEventListener("storage", syncProgress);
    window.addEventListener(
        "physiolab-progress-updated",
        syncProgress,
    );

    return () => {
        window.removeEventListener("storage", syncProgress);
        window.removeEventListener(
        "physiolab-progress-updated",
        syncProgress,
        );
    };
    }, []);

    const totalExperiments = experiments.length;

    const completedExperiments = experiments.filter(
    (experiment) =>
        getStatus(progress, experiment.id) === "completed",
    );

    const inProgressExperiments = experiments.filter(
    (experiment) =>
        getStatus(progress, experiment.id) === "in-progress",
    );

    const completedCount = completedExperiments.length;

    const completionPercentage =
    totalExperiments > 0
        ? Math.round(
          (completedCount / totalExperiments) * 100,
        )
        : 0;

    const nextExperiment = experiments.find(
    (experiment) =>
        getStatus(progress, experiment.id) !== "completed",
    );

    const systemProgress = SYSTEMS.map((system) => {
    const systemExperiments = experiments.filter(
        (experiment) => experiment.system === system,
    );

    const completed = systemExperiments.filter(
        (experiment) =>
        getStatus(progress, experiment.id) === "completed",
    ).length;

    const total = systemExperiments.length;

    return {
        name: system,
        completed,
        total,
        percentage:
        total > 0
          ? Math.round((completed / total) * 100)
            : 0,
    };
});

    const achievements = [
    {
        title: "First Discovery",
        description: "Complete your first experiment.",
        unlocked: completedCount >= 1,
        icon: Award,
    },
    {
        title: "Halfway Scientist",
        description: "Complete at least half of your experiments.",
        unlocked:
        totalExperiments > 0 &&
        completedCount >= Math.ceil(totalExperiments / 2),
        icon: Target,
    },
    {
        title: "Physiology Explorer",
        description: "Complete every registered experiment.",
        unlocked:
        totalExperiments > 0 &&
        completedCount === totalExperiments,
        icon: Trophy,
    },
    ];

    if (!isLoaded) {
    return (
        <main className="min-h-screen bg-[#080d18] p-6 text-white">
        <div className="mx-auto max-w-6xl animate-pulse space-y-5">
            <div className="h-8 w-64 rounded-lg bg-white/10" />
            <div className="h-40 rounded-3xl bg-white/5" />
            <div className="grid gap-4 md:grid-cols-3">
            <div className="h-28 rounded-2xl bg-white/5" />
            <div className="h-28 rounded-2xl bg-white/5" />
            <div className="h-28 rounded-2xl bg-white/5" />
            </div>
        </div>
        </main>
    );
}

    return (
    <main className="min-h-screen bg-[#080d18] px-5 py-8 text-white sm:px-8">
        <div className="mx-auto max-w-6xl space-y-8">

        {/* Page heading */}
        <header className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-cyan-400">
            <TrendingUp size={16} />
            Learning analytics
            </div>

            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Your learning progress
            </h1>

            <p className="max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
            Track your discoveries, monitor your understanding
            of human physiology, and see what to explore next.
            </p>
        </header>

        {/* Overall progress */}
        <section className="relative overflow-hidden rounded-3xl border border-cyan-400/15 bg-linear-to-br from-cyan-500/10 via-slate-900 to-blue-500/10 p-6 sm:p-8">
            <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-cyan-400/5 blur-3xl" />

            <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div className="space-y-5">
                <div className="flex items-center gap-2 text-sm text-cyan-300">
                <Activity size={18} />
                Overall learning progress
                </div>

                <div>
                <div className="flex flex-wrap items-end gap-3">
                    <span className="text-5xl font-semibold tracking-tight">
                    {completionPercentage}%
                    </span>

                    <span className="pb-1 text-sm text-slate-400">
                    of registered experiments completed
                    </span>
                </div>

                <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-white/10">
                    <div
                    className="h-full rounded-full bg-linear-to-r from-cyan-400 to-blue-500 transition-all duration-500"
                    style={{
                        width: `${completionPercentage}%`,
                    }}
                    />
                </div>

                <p className="mt-3 text-sm text-slate-400">
                    {completedCount} of {totalExperiments} experiments
                    completed
                </p>
                </div>
            </div>

            <div className="flex h-32 w-32 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/5 md:h-36 md:w-36">
                <div className="text-center">
                <FlaskConical
                    className="mx-auto mb-2 text-cyan-300"
                    size={28}
                />
                <p className="text-2xl font-semibold">
                    {completedCount}/{totalExperiments}
                </p>
                <p className="text-xs text-slate-400">
                    Completed
                </p>
                </div>
            </div>
            </div>
        </section>

        {/* Summary cards */}
        <section className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/2.5 p-5">
            <div className="flex items-center justify-between">
                <p className="text-sm text-slate-400">
                Completed
                </p>
                <CheckCircle2 className="text-emerald-400" size={20} />
            </div>
            <p className="mt-4 text-3xl font-semibold">
                {completedCount}
            </p>
            <p className="mt-1 text-xs text-slate-500">
                Experiments completed
            </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/2.5 p-5">
            <div className="flex items-center justify-between">
                <p className="text-sm text-slate-400">
                In progress
                </p>
                <Clock3 className="text-amber-400" size={20} />
            </div>
            <p className="mt-4 text-3xl font-semibold">
                {inProgressExperiments.length}
            </p>
            <p className="mt-1 text-xs text-slate-500">
                Experiments underway
            </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/2.5 p-5">
            <div className="flex items-center justify-between">
                <p className="text-sm text-slate-400">
                Remaining
                </p>
                <CircleDashed className="text-blue-400" size={20} />
            </div>
            <p className="mt-4 text-3xl font-semibold">
                {totalExperiments - completedCount}
            </p>
            <p className="mt-1 text-xs text-slate-500">
                Experiments to complete
            </p>
            </div>
        </section>

        {/* System progress */}
        <section className="space-y-5">
            <div>
            <h2 className="text-xl font-semibold">
                Progress by body system
            </h2>
            <p className="mt-1 text-sm text-slate-400">
                Follow your progress across the major areas of physiology.
            </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
            {systemProgress.map((system) => (
                <div
                key={system.name}
                className="rounded-2xl border border-white/10 bg-white/2.5 p-5"
                >
                <div className="flex items-center justify-between gap-3">
                    <h3 className="font-medium">
                    {system.name}
                    </h3>
                    <span className="text-sm text-cyan-300">
                    {system.percentage}%
                    </span>
                </div>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                    className="h-full rounded-full bg-cyan-400 transition-all duration-500"
                    style={{
                        width: `${system.percentage}%`,
                    }}
                    />
                </div>

                <p className="mt-3 text-xs text-slate-500">
                    {system.completed} of {system.total} experiments completed
                </p>
                </div>
            ))}
            </div>
        </section>

        {/* Recommended experiment */}
        <section className="rounded-2xl border border-cyan-400/15 bg-cyan-400/5 p-5 sm:p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-cyan-300">
                <BookOpen size={17} />
                Recommended next step
                </div>

                {nextExperiment ? (
                <>
                    <h2 className="text-xl font-semibold">
                    {nextExperiment.title}
                    </h2>
                    <p className="max-w-xl text-sm leading-6 text-slate-400">
                    {nextExperiment.learningObjective}
                    </p>
                    <p className="text-xs text-slate-500">
                    {nextExperiment.system} · {nextExperiment.difficulty}
                    </p>
                </>
                ) : (
                <>
                    <h2 className="text-xl font-semibold">
                    All experiments completed!
                    </h2>
                    <p className="text-sm text-slate-400">
                    You have completed every experiment currently
                    registered in Physiolab.
                    </p>
                </>
                )}
            </div>

            {nextExperiment && (
                <Link
                href={`/experiments/${nextExperiment.id}`}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
                >
                Continue learning
                <ArrowRight size={17} />
                </Link>
            )}
            </div>
        </section>

        {/* Experiment activity */}
        <section className="space-y-5">
            <div>
            <h2 className="text-xl font-semibold">
                Your experiments
            </h2>
            <p className="mt-1 text-sm text-slate-400">
                Review the status of every registered experiment.
            </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/10">
            {experiments.map((experiment, index) => {
                const status = getStatus(progress, experiment.id);

                return (
                <div
                    key={experiment.id}
                    className={`flex flex-col gap-4 bg-white/2.5 p-5 sm:flex-row sm:items-center sm:justify-between ${
                    index !== experiments.length - 1
                        ? "border-b border-white/10"
                        : ""
                    }`}
                >
                    <div className="flex items-start gap-3">
                    <div className="mt-1 rounded-xl bg-white/5 p-2">
                        {status === "completed" ? (
                        <CheckCircle2
                            className="text-emerald-400"
                            size={20}
                    />
                        ) : status === "in-progress" ? (
                        <Clock3
                            className="text-amber-400"
                            size={20}
                        />
                        ) : (
                        <CircleDashed
                            className="text-slate-500"
                            size={20}
                        />
                        )}
                    </div>

                    <div>
                        <h3 className="font-medium">
                        {experiment.title}
                        </h3>
                        <p className="mt-1 text-xs text-slate-500">
                        {experiment.system} · {experiment.difficulty}
                        </p>
                        <p className="mt-2 text-sm text-slate-400">
                        {experiment.description}
                        </p>
                    </div>
                    </div>

                    <div className="flex items-center justify-between gap-4 sm:justify-end">
                    <span
                        className={`text-xs font-medium ${
                        status === "completed"
                            ? "text-emerald-400"
                            : status === "in-progress"
                            ? "text-amber-400"
                            : "text-slate-500"
                        }`}
                    >
                        {getStatusLabel(status)}
                    </span>

                    <Link
                        href={`/experiments/${experiment.id}`}
                        className="inline-flex items-center gap-1 text-sm text-cyan-300 transition hover:text-cyan-200"
                    >
                        Open
                        <ArrowRight size={15} />
                    </Link>
                    </div>
                </div>
                );
            })}
            </div>
        </section>

        {/* Achievements */}
        <section className="space-y-5">
            <div>
            <h2 className="text-xl font-semibold">
                Achievements
            </h2>
            <p className="mt-1 text-sm text-slate-400">
                Milestones earned as you explore human physiology.
            </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
            {achievements.map((achievement) => {
                const Icon = achievement.icon;

                return (
                <div
                    key={achievement.title}
                    className={`rounded-2xl border p-5 ${
                    achievement.unlocked
                        ? "border-cyan-400/20 bg-cyan-400/5"
                        : "border-white/10 bg-white/2.5"
                    }`}
                >
                    <div className="flex items-center justify-between">
                    <div className="rounded-xl bg-white/5 p-3">
                        <Icon
                        size={22}
                        className={
                            achievement.unlocked
                            ? "text-cyan-300"
                            : "text-slate-500"
                        }
                        />
                    </div>

                    <span
                        className={`text-xs ${
                        achievement.unlocked
                            ? "text-cyan-300"
                            : "text-slate-500"
                        }`}
                    >
                        {achievement.unlocked
                        ? "Unlocked"
                        : "Locked"}
                    </span>
                    </div>

                    <h3 className="mt-4 font-semibold">
                    {achievement.title}
                    </h3>
                    <p className="mt-2 text-sm leading-5 text-slate-400">
                    {achievement.description}
                    </p>
                </div>
                );
            })}
            </div>
        </section>

        {/* Return link */}
        <div className="border-t border-white/10 pt-6">
            <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
            >
            <ArrowRight className="rotate-180" size={16} />
            Return to dashboard
            </Link>
        </div>

        </div>
    </main>
);
}
