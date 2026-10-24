"use client";

import { useState, useSyncExternalStore } from "react";

import {
  CheckCircle2,
  Lightbulb,
  RotateCcw,
  XCircle,
} from "lucide-react";

import { updateExperimentStatus } from "@/lib/physiology/progress";

// ------------------------------------------------------
// Types
// ------------------------------------------------------

type ExperimentOption = {
  label: string;
  value: string;
};

type ExperimentChallengeProps = {
  question: string;
  description?: string;
  options: ExperimentOption[];
  correctAnswer: string;
  explanation: string;
  observation?: string;
  experimentId?: string;
};

// ------------------------------------------------------
// Saved completion status
// ------------------------------------------------------

function subscribeToProgress(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  window.addEventListener("storage", callback);
  window.addEventListener("physiolab-progress-updated", callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(
      "physiolab-progress-updated",
      callback,
    );
  };
}

function getSavedCompletion(experimentId?: string): boolean {
  if (typeof window === "undefined" || !experimentId) {
    return false;
  }

  try {
    const saved = window.localStorage.getItem("physiolab-progress");

    if (!saved) {
      return false;
    }

    const progress: unknown = JSON.parse(saved);

    if (
      progress === null ||
      typeof progress !== "object" ||
      Array.isArray(progress)
    ) {
      return false;
    }

    return (
      (progress as Record<string, unknown>)[experimentId] ===
      "completed"
    );
  } catch {
    return false;
  }
}

function getServerCompletionSnapshot() {
  return false;
}

// ------------------------------------------------------
// Experiment challenge
// ------------------------------------------------------

export function ExperimentChallenge({
  question,
  description,
  options,
  correctAnswer,
  explanation,
  observation,
  experimentId,
}: ExperimentChallengeProps) {
  const [selectedAnswer, setSelectedAnswer] =
    useState<string | null>(null);

  const [submitted, setSubmitted] = useState(false);

  const [completedThisSession, setCompletedThisSession] =
    useState(false);

  const savedCompletion = useSyncExternalStore(
    subscribeToProgress,
    () => getSavedCompletion(experimentId),
    getServerCompletionSnapshot,
  );

  const completed = savedCompletion || completedThisSession;
  const isCorrect = selectedAnswer === correctAnswer;

  // ----------------------------------------------------
  // Answer submission and automatic completion
  // ----------------------------------------------------

  function handleSubmit() {
    if (!selectedAnswer || submitted) {
      return;
    }

    setSubmitted(true);

    // Do not change progress if this challenge has no registered ID.
    if (!experimentId) {
      return;
    }

    // A correct answer completes the experiment immediately.
    if (selectedAnswer === correctAnswer) {
      if (!completed) {
        updateExperimentStatus(experimentId, "completed");
        setCompletedThisSession(true);
      }

      return;
    }

    // An incorrect answer starts or continues the experiment.
    // Never downgrade an experiment that was already completed.
    if (!completed) {
      updateExperimentStatus(experimentId, "in-progress");
    }
  }

  // ----------------------------------------------------
  // Retry challenge
  // ----------------------------------------------------

  function handleReset() {
    setSelectedAnswer(null);
    setSubmitted(false);

    // Saved completion is deliberately preserved.
  }

  // ----------------------------------------------------
  // Render
  // ----------------------------------------------------

  return (
    <section className="rounded-2xl border border-violet-400/15 bg-violet-400/3 p-6 sm:p-7">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-400/10 text-violet-300">
          <Lightbulb size={21} />
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">
            Experiment challenge
          </p>

          <h3 className="mt-2 text-lg font-semibold text-white">
            Predict the physiological response
          </h3>
        </div>
      </div>

      {/* Saved completion indicator */}
      {completed && (
        <div className="mt-5 flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/5 px-4 py-3 text-sm font-medium text-emerald-300">
          <CheckCircle2 size={18} />
          This experiment is completed.
        </div>
      )}

      {/* Question */}
      <div className="mt-6">
        <p className="text-base leading-7 text-slate-200">
          {question}
        </p>

        {description && (
          <p className="mt-2 text-sm leading-6 text-slate-500">
            {description}
          </p>
        )}
      </div>

      {/* Answer options */}
      <div className="mt-6 grid gap-3">
        {options.map((option) => {
          const selected = selectedAnswer === option.value;

          const showCorrect =
            submitted && option.value === correctAnswer;

          const showIncorrect =
            submitted &&
            selected &&
            option.value !== correctAnswer;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                if (!submitted) {
                  setSelectedAnswer(option.value);
                }
              }}
              disabled={submitted}
              aria-pressed={selected}
              className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition ${
                showCorrect
                  ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-200"
                  : showIncorrect
                    ? "border-rose-400/30 bg-rose-400/10 text-rose-200"
                    : selected
                      ? "border-violet-400/40 bg-violet-400/10 text-violet-200"
                      : "border-white/10 bg-white/2.5 text-slate-300 hover:border-white/20 hover:bg-white/5"
              }`}
            >
              <span>{option.label}</span>

              {showCorrect && <CheckCircle2 size={18} />}

              {showIncorrect && <XCircle size={18} />}
            </button>
          );
        })}
      </div>

      {/* Submit answer */}
      {!submitted && (
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!selectedAnswer}
          className="mt-6 inline-flex items-center justify-center rounded-xl bg-violet-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-violet-300 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Check prediction
        </button>
      )}

      {/* Answer result */}
      {submitted && (
        <div
          aria-live="polite"
          className={`mt-6 rounded-xl border p-5 ${
            isCorrect
              ? "border-emerald-400/20 bg-emerald-400/5"
              : "border-rose-400/20 bg-rose-400/5"
          }`}
        >
          <div className="flex items-start gap-3">
            {isCorrect ? (
              <CheckCircle2
                size={20}
                className="mt-0.5 shrink-0 text-emerald-400"
              />
            ) : (
              <XCircle
                size={20}
                className="mt-0.5 shrink-0 text-rose-400"
              />
            )}

            <div>
              <p
                className={`font-semibold ${
                  isCorrect
                    ? "text-emerald-300"
                    : "text-rose-300"
                }`}
              >
                {isCorrect ? "Correct prediction" : "Not quite"}
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                {explanation}
              </p>
            </div>
          </div>

          {/* Observation */}
          {observation && (
            <div className="mt-4 rounded-xl border border-white/10 bg-white/2.5 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                What to observe
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                {observation}
              </p>
            </div>
          )}

          {/* Completion confirmation */}
          {isCorrect && experimentId && (
            <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-emerald-300">
              <CheckCircle2 size={18} />
              Experiment completed and progress saved.
            </div>
          )}

          {/* Retry */}
          <button
            type="button"
            onClick={handleReset}
            className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition hover:text-white"
          >
            <RotateCcw size={15} />
            Try again
          </button>
        </div>
      )}
    </section>
  );
}
