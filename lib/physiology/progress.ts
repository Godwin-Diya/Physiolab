import type { ExperimentStatus } from "./experiment";

const STORAGE_KEY = "physiolab-progress";

export type ExperimentProgress = Record<string, ExperimentStatus>;

const DEFAULT_PROGRESS: ExperimentProgress = {};

export function getProgress(): ExperimentProgress {
  if (typeof window === "undefined") {
    return DEFAULT_PROGRESS;
  }

  try {
    const savedProgress = localStorage.getItem(STORAGE_KEY);

    if (!savedProgress) {
      return DEFAULT_PROGRESS;
    }

    return JSON.parse(savedProgress) as ExperimentProgress;
  } catch {
    return DEFAULT_PROGRESS;
  }
}


export function saveProgress(
  progress: ExperimentProgress,
): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(progress),
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
  return Object.values(progress).filter(
    (status) => status === "completed",
  ).length;
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