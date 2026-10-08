import type { Experiment } from "./experiment";

export const experiments: Experiment[] = [
  {
    id: "cardiac-output",
    title: "Cardiac Output Lab",
    system: "Cardiovascular",
    description:
      "Explore how heart rate and stroke volume influence cardiac output.",
    learningObjective:
      "Understand the relationship between heart rate, stroke volume, and cardiac output.",
    difficulty: "beginner",
    status: "in-progress",
  },

  {
    id: "baroreceptor-reflex",
    title: "Baroreceptor Reflex Lab",
    system: "Cardiovascular",
    description:
      "Explore how the body responds to changes in arterial pressure.",
    learningObjective:
      "Understand how baroreceptors and the autonomic nervous system regulate arterial pressure.",
    difficulty: "intermediate",
    status: "in-progress",
  },

  {
    id: "gas-exchange",
    title: "Gas Exchange Lab",
    system: "Respiratory",
    description:
      "Explore how ventilation influences oxygen and carbon dioxide exchange.",
    learningObjective:
      "Understand how ventilation contributes to effective pulmonary gas exchange.",
    difficulty: "beginner",
    status: "in-progress",
  },
];