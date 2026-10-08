export type ExperimentDifficulty = "beginner" | "intermediate" | "advanced";

export type ExperimentStatus =
  | "not-started"
  | "in-progress"
  | "completed";

export interface ExperimentOption {
  label: string;
  value: string;
}

export interface ExperimentChallenge {
  question: string;
  description?: string;
  options: ExperimentOption[];
  correctAnswer: string;
  explanation: string;
  observation?: string;
}

export interface Experiment {
  id: string;
  title: string;
  system: string;
  description: string;
  learningObjective: string;
  difficulty: ExperimentDifficulty;
  status: ExperimentStatus;
  challenge?: ExperimentChallenge;
}