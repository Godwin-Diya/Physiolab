export type ExperimentDifficulty = "beginner" | "intermediate" | "advanced";

export type ExperimentStatus = "not-started" | "in-progress" | "completed";

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

export type SimulationKind =
  | "ecg-rate"
  | "mean-arterial-pressure"
  | "oxygen-saturation"
  | "minute-ventilation"
  | "action-potential"
  | "synaptic-response"
  | "reflex-latency"
  | "glomerular-filtration"
  | "water-reabsorption";

export interface ExperimentSimulation {
  kind: SimulationKind;
  variableLabel: string;
  min: number;
  max: number;
  step: number;
  initialValue: number;
  unit: string;
  description: string;
  resultLabel: string;
  resultUnit: string;
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
  simulation?: ExperimentSimulation;
}
