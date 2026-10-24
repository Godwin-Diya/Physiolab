import type { ExperimentStatus } from "./experiment";
import { experiments } from "./experiments";

const STORAGE_KEY = "physiolab-progress";

export type ExperimentProgress = Record<string, ExperimentStatus>;

const VALID_STATUSES = new Set<ExperimentStatus>([
  "not-started",
  "in-progress",
  "completed",
]);

const VALID_EXPERIMENT_IDS = new Set(
  experiments.map((experiment) => experiment.id),
);

const EMPTY_PROGRESS: ExperimentProgress = {};

function isExperimentStatus(value: unknown): value is ExperimentStatus {
  return (
    typeof value === "string" &&
    VALID_STATUSES.has(value as ExperimentStatus)
  );
}

function normalizeProgress(value: unknown): ExperimentProgress {
  if (
    value === null ||
    typeof value !== "object" ||
    Array.isArray(value)
  ) {
    return {};
  }

  const normalized: ExperimentProgress = {};

  for (const [experimentId, status] of Object.entries(value)) {
    if (
      VALID_EXPERIMENT_IDS.has(experimentId) &&
      isExperimentStatus(status)
    ) {
      normalized[experimentId] = status;
    }
  }

  return normalized;
}

export function getProgress(): ExperimentProgress {
  if (typeof window === "undefined") {
    return EMPTY_PROGRESS;
  }

  try {
    const savedProgress = window.localStorage.getItem(STORAGE_KEY);

    if (!savedProgress) {
      return {};
    }

    return normalizeProgress(JSON.parse(savedProgress));
  } catch {
    return {};
  }
}

export function saveProgress(
  progress: ExperimentProgress,
): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const normalizedProgress = normalizeProgress(progress);

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(normalizedProgress),
    );

    window.dispatchEvent(
      new Event("physiolab-progress-updated"),
    );
  } catch (error) {
    console.error(
      "Unable to save Physiolab progress:",
      error,
    );
  }
}

export function updateExperimentStatus(
  experimentId: string,
  status: ExperimentStatus,
): ExperimentProgress {
  const currentProgress = getProgress();

  // Only registered experiments may update saved progress.
  if (!VALID_EXPERIMENT_IDS.has(experimentId)) {
    return currentProgress;
  }

  const updatedProgress: ExperimentProgress = {
    ...currentProgress,
    [experimentId]: status,
  };

  saveProgress(updatedProgress);

  return updatedProgress;
}

export function getCompletedCount(
  progress: ExperimentProgress,
): number {
  return experiments.reduce((count, experiment) => {
    return count + (
      progress[experiment.id] === "completed" ? 1 : 0
    );
  }, 0);
}

export function getCompletionPercentage(
  progress: ExperimentProgress,
  totalExperiments: number,
): number {
  if (totalExperiments <= 0) {
    return 0;
  }

  return Math.round(
    (getCompletedCount(progress) / totalExperiments) * 100,
  );
}
