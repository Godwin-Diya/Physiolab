import type { Experiment } from "./experiment";

export const experiments: Experiment[] = [
  {
    id: "cardiac-output",
    title: "Cardiac Output Lab",
    system: "Cardiovascular",
    description:
      "Investigate how heart rate and stroke volume influence blood flow from the heart.",
    learningObjective:
      "Explain the relationship between heart rate, stroke volume, and cardiac output.",
    difficulty: "beginner",
    status: "not-started",
    challenge: {
      question: "If heart rate increases while stroke volume remains constant, what happens to cardiac output?",
      options: [
        { label: "It increases", value: "increases" },
        { label: "It decreases", value: "decreases" },
        { label: "It remains unchanged", value: "unchanged" },
      ],
      correctAnswer: "increases",
      explanation:
        "Cardiac output equals heart rate multiplied by stroke volume. With stroke volume unchanged, an increase in heart rate increases cardiac output.",
    },
  },
  {
    id: "baroreceptor-reflex",
    title: "Baroreceptor Reflex",
    system: "Cardiovascular",
    description:
      "Explore how pressure-sensitive receptors help stabilize arterial blood pressure.",
    learningObjective:
      "Trace the feedback pathway linking arterial pressure, autonomic activity, and cardiovascular responses.",
    difficulty: "intermediate",
    status: "not-started",
    challenge: {
      question: "What normally happens to baroreceptor firing when arterial pressure rises?",
      options: [
        { label: "Firing increases", value: "increases" },
        { label: "Firing decreases", value: "decreases" },
        { label: "Firing stops completely", value: "stops" },
      ],
      correctAnswer: "increases",
      explanation:
        "Higher arterial pressure stretches the carotid sinus and aortic arch baroreceptors, increasing their firing and promoting a reflex response that reduces pressure.",
    },
  },
  {
    id: "gas-exchange",
    title: "Gas Exchange Lab",
    system: "Respiratory",
    description:
      "Explore how oxygen and carbon dioxide move between alveoli and pulmonary capillaries.",
    learningObjective:
      "Explain how partial-pressure gradients drive pulmonary gas exchange.",
    difficulty: "beginner",
    status: "not-started",
    challenge: {
      question: "What primarily drives oxygen diffusion from alveoli into pulmonary blood?",
      options: [
        { label: "An oxygen partial-pressure gradient", value: "gradient" },
        { label: "Active pumping by red blood cells", value: "pumping" },
        { label: "Equal oxygen partial pressures", value: "equal" },
      ],
      correctAnswer: "gradient",
      explanation:
        "Oxygen diffuses down its partial-pressure gradient from alveolar gas into pulmonary capillary blood.",
    },
  },
  {
    id: "ecg-interpretation",
    title: "ECG & Heart Rate",
    system: "Cardiovascular",
    description:
      "Investigate how the interval between successive heartbeats relates to heart rate.",
    learningObjective:
      "Calculate heart rate from the R–R interval and recognize the relationship between interval duration and rate.",
    difficulty: "beginner",
    status: "not-started",
    simulation: {
      kind: "ecg-rate",
      variableLabel: "R–R interval",
      min: 400,
      max: 1200,
      step: 20,
      initialValue: 800,
      unit: "ms",
      description:
        "Adjust the interval between consecutive R waves. The model estimates heart rate using 60,000 divided by the R–R interval in milliseconds.",
      resultLabel: "Estimated heart rate",
      resultUnit: "beats/min",
    },
    challenge: {
      question: "What is the approximate heart rate when the R–R interval is 1,000 ms?",
      options: [
        { label: "60 beats/min", value: "60" },
        { label: "100 beats/min", value: "100" },
        { label: "120 beats/min", value: "120" },
      ],
      correctAnswer: "60",
      explanation:
        "Heart rate is approximately 60,000 divided by the R–R interval in milliseconds. At 1,000 ms, the rate is about 60 beats/min.",
      observation:
        "This calculation estimates rate only; it does not diagnose a rhythm or replace full ECG interpretation.",
    },
  },
  {
    id: "blood-pressure-regulation",
    title: "Blood Pressure Regulation",
    system: "Cardiovascular",
    description:
      "Explore how changes in systemic vascular resistance can influence mean arterial pressure.",
    learningObjective:
      "Relate cardiac output and systemic vascular resistance to mean arterial pressure.",
    difficulty: "intermediate",
    status: "not-started",
    simulation: {
      kind: "mean-arterial-pressure",
      variableLabel: "Systemic vascular resistance",
      min: 10,
      max: 30,
      step: 1,
      initialValue: 18,
      unit: "model units",
      description:
        "Adjust vascular resistance in a simplified model with cardiac output held constant at 5 L/min. The displayed pressure is illustrative, not a clinical prediction.",
      resultLabel: "Model mean arterial pressure",
      resultUnit: "mmHg",
    },
    challenge: {
      question: "If cardiac output stays constant and systemic vascular resistance increases, what generally happens to mean arterial pressure?",
      options: [
        { label: "It tends to increase", value: "increase" },
        { label: "It tends to decrease", value: "decrease" },
        { label: "It must remain constant", value: "constant" },
      ],
      correctAnswer: "increase",
      explanation:
        "Mean arterial pressure is related to cardiac output multiplied by systemic vascular resistance, with central venous pressure often small enough to simplify the relationship.",
    },
  },
  {
    id: "oxygen-hemoglobin",
    title: "Oxygen–Hemoglobin Dissociation",
    system: "Respiratory",
    description:
      "Explore how pH can influence hemoglobin's affinity for oxygen.",
    learningObjective:
      "Describe the Bohr effect and the influence of pH on the oxygen–hemoglobin dissociation curve.",
    difficulty: "advanced",
    status: "not-started",
    simulation: {
      kind: "oxygen-saturation",
      variableLabel: "Blood pH",
      min: 6.8,
      max: 7.8,
      step: 0.05,
      initialValue: 7.4,
      unit: "pH",
      description:
        "Explore the direction of the pH effect at a fixed, illustrative oxygen partial pressure. The output is a conceptual index, not a validated oxygen-saturation calculation.",
      resultLabel: "Illustrative affinity index",
      resultUnit: "%",
    },
    challenge: {
      question: "What does a fall in pH generally do to hemoglobin's affinity for oxygen?",
      options: [
        { label: "Decreases affinity and favors oxygen unloading", value: "decreases" },
        { label: "Increases affinity and prevents oxygen unloading", value: "increases" },
        { label: "Has no effect under any circumstances", value: "none" },
      ],
      correctAnswer: "decreases",
      explanation:
        "The Bohr effect describes how increased hydrogen-ion concentration and carbon dioxide can reduce hemoglobin's oxygen affinity, favoring oxygen unloading in metabolically active tissues.",
    },
  },
  {
    id: "ventilation-mechanics",
    title: "Ventilation Mechanics",
    system: "Respiratory",
    description:
      "Adjust tidal volume and investigate its contribution to minute ventilation.",
    learningObjective:
      "Calculate minute ventilation and distinguish it from alveolar ventilation.",
    difficulty: "beginner",
    status: "not-started",
    simulation: {
      kind: "minute-ventilation",
      variableLabel: "Tidal volume",
      min: 250,
      max: 800,
      step: 25,
      initialValue: 500,
      unit: "mL/breath",
      description:
        "The model holds respiratory rate at 12 breaths/min. Minute ventilation equals tidal volume multiplied by respiratory rate.",
      resultLabel: "Minute ventilation",
      resultUnit: "L/min",
    },
    challenge: {
      question: "With a tidal volume of 500 mL and a respiratory rate of 12 breaths/min, what is minute ventilation?",
      options: [
        { label: "6 L/min", value: "6" },
        { label: "12 L/min", value: "12" },
        { label: "4.2 L/min", value: "4.2" },
      ],
      correctAnswer: "6",
      explanation:
        "Minute ventilation is 500 mL × 12 breaths/min = 6,000 mL/min, or 6 L/min. Alveolar ventilation also accounts for dead-space volume.",
    },
  },
  {
    id: "action-potential",
    title: "Neuronal Action Potential",
    system: "Nervous System",
    description:
      "Explore the all-or-none response of a simplified excitable membrane.",
    learningObjective:
      "Explain threshold and the all-or-none nature of a neuronal action potential.",
    difficulty: "beginner",
    status: "not-started",
    simulation: {
      kind: "action-potential",
      variableLabel: "Relative stimulus strength",
      min: 0,
      max: 100,
      step: 5,
      initialValue: 40,
      unit: "%",
      description:
        "Increase stimulus strength to cross a simplified threshold. Real neuronal excitability depends on membrane state, ion channels, and other factors.",
      resultLabel: "Membrane response",
      resultUnit: "",
    },
    challenge: {
      question: "What happens when a neuronal membrane reaches its action-potential threshold?",
      options: [
        { label: "A full action potential is triggered", value: "triggered" },
        { label: "A smaller action potential is always produced", value: "smaller" },
        { label: "The membrane can no longer respond", value: "unresponsive" },
      ],
      correctAnswer: "triggered",
      explanation:
        "Once threshold is reached, regenerative voltage-gated ion-channel activity produces an action potential. Stronger suprathreshold stimuli do not simply create proportionally taller action potentials.",
    },
  },
  {
    id: "synaptic-transmission",
    title: "Synaptic Transmission",
    system: "Nervous System",
    description:
      "Investigate how neurotransmitter release can influence a postsynaptic response.",
    learningObjective:
      "Connect neurotransmitter release with receptor activation and graded postsynaptic responses.",
    difficulty: "intermediate",
    status: "not-started",
    simulation: {
      kind: "synaptic-response",
      variableLabel: "Relative neurotransmitter release",
      min: 0,
      max: 100,
      step: 5,
      initialValue: 40,
      unit: "%",
      description:
        "Adjust relative transmitter release and observe a conceptual saturating postsynaptic-response index. Actual synaptic responses vary with receptors and circuit context.",
      resultLabel: "Postsynaptic response index",
      resultUnit: "%",
    },
    challenge: {
      question: "Which event most directly allows a chemical synapse to transmit a signal to the postsynaptic cell?",
      options: [
        { label: "Neurotransmitter binds to postsynaptic receptors", value: "binding" },
        { label: "The two cells always merge into one cell", value: "merge" },
        { label: "All ions stop moving across membranes", value: "stop" },
      ],
      correctAnswer: "binding",
      explanation:
        "Released neurotransmitter binds to receptors on the postsynaptic membrane, changing ion-channel activity or intracellular signaling.",
    },
  },
  {
    id: "reflex-arc",
    title: "Reflex Arc",
    system: "Nervous System",
    description:
      "Trace how sensory input travels through a neural pathway to produce a response.",
    learningObjective:
      "Identify the sensory, integration, and motor components of a reflex arc.",
    difficulty: "intermediate",
    status: "not-started",
    simulation: {
      kind: "reflex-latency",
      variableLabel: "Relative stimulus strength",
      min: 10,
      max: 100,
      step: 5,
      initialValue: 50,
      unit: "%",
      description:
        "Explore a conceptual response-latency model. Real reflex latency depends on pathway length, conduction speed, synapses, and the response measured.",
      resultLabel: "Illustrative response latency",
      resultUnit: "ms",
    },
    challenge: {
      question: "Which structure detects a stimulus at the start of a typical reflex arc?",
      options: [
        { label: "A sensory receptor", value: "receptor" },
        { label: "A motor effector", value: "effector" },
        { label: "The responding muscle only", value: "muscle" },
      ],
      correctAnswer: "receptor",
      explanation:
        "A sensory receptor detects the stimulus and initiates sensory signaling. The pathway then integrates the signal and activates an effector through motor output.",
    },
  },
  {
    id: "glomerular-filtration",
    title: "Glomerular Filtration",
    system: "Renal",
    description:
      "Explore the relationship between filtration pressure and a simplified glomerular filtration estimate.",
    learningObjective:
      "Describe how filtration forces and renal hemodynamics influence glomerular filtration.",
    difficulty: "advanced",
    status: "not-started",
    simulation: {
      kind: "glomerular-filtration",
      variableLabel: "Illustrative filtration-pressure input",
      min: 60,
      max: 140,
      step: 5,
      initialValue: 100,
      unit: "model units",
      description:
        "This conceptual model demonstrates a directional relationship only. It does not calculate an individual's GFR or represent the full Starling-force equation.",
      resultLabel: "Model filtration index",
      resultUnit: "mL/min",
    },
    challenge: {
      question: "Which force generally favors filtration of fluid from glomerular capillaries into Bowman's space?",
      options: [
        { label: "Glomerular capillary hydrostatic pressure", value: "hydrostatic" },
        { label: "Bowman's space hydrostatic pressure", value: "bowman" },
        { label: "Plasma oncotic pressure", value: "oncotic" },
      ],
      correctAnswer: "hydrostatic",
      explanation:
        "Glomerular capillary hydrostatic pressure favors filtration, while Bowman's space hydrostatic pressure and plasma oncotic pressure oppose it.",
    },
  },
  {
    id: "water-balance",
    title: "Renal Water Balance",
    system: "Renal",
    description:
      "Explore how antidiuretic hormone influences collecting-duct water reabsorption.",
    learningObjective:
      "Explain how ADH changes collecting-duct water permeability and helps regulate urine concentration.",
    difficulty: "intermediate",
    status: "not-started",
    simulation: {
      kind: "water-reabsorption",
      variableLabel: "Relative ADH signal",
      min: 0,
      max: 100,
      step: 5,
      initialValue: 50,
      unit: "%",
      description:
        "Adjust a conceptual ADH signal to see its directional effect on water reabsorption. The output is an educational index, not a measured physiological percentage.",
      resultLabel: "Illustrative water-reabsorption index",
      resultUnit: "%",
    },
    challenge: {
      question: "What is the usual effect of increased ADH on the collecting ducts?",
      options: [
        { label: "Water permeability increases", value: "increases" },
        { label: "Water permeability always falls", value: "decreases" },
        { label: "The kidneys stop filtering plasma", value: "stop" },
      ],
      correctAnswer: "increases",
      explanation:
        "ADH promotes aquaporin-2 insertion in collecting-duct principal cells, increasing water permeability and helping conserve water.",
    },
  },
];
