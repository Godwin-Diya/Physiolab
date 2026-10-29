import type { SimulationKind } from "@/lib/physiology/experiment";

interface ModelGuideProps {
  kind: SimulationKind;
}

interface ModelInformation {
  title: string;
  equation: string;
  assumptions: string;
  interpretation: string;
  limitation: string;
}

const MODEL_INFORMATION: Record<SimulationKind, ModelInformation> = {
  "ecg-rate": {
    title: "Heart rate and the R–R interval",
    equation: "Heart rate = 60,000 ÷ R–R interval (ms)",
    assumptions:
      "The interval is measured in milliseconds and represents the time between consecutive R peaks.",
    interpretation:
      "A shorter R–R interval corresponds to a faster heart rate. For example, an interval of 1,000 ms corresponds to 60 beats/min.",
    limitation:
      "This calculation estimates rate from an interval. It does not interpret ECG morphology, rhythm disorders, or a complete ECG recording.",
  },

  "mean-arterial-pressure": {
    title: "Vascular resistance and arterial pressure",
    equation: "MAP − CVP ≈ cardiac output × systemic vascular resistance",
    assumptions:
      "The relationship assumes a steady circulation and uses cardiac output, vascular resistance, and pressure in compatible units.",
    interpretation:
      "If cardiac output remains constant, increasing systemic vascular resistance generally increases the pressure gradient needed to drive blood flow.",
    limitation:
      "The slider uses a simplified scaled relationship, not a clinically validated blood-pressure calculator. The displayed pressure should not be treated as an actual patient measurement.",
  },

  "oxygen-saturation": {
    title: "pH and haemoglobin–oxygen affinity",
    equation: "Oxygen binding is described by a sigmoidal dissociation curve.",
    assumptions:
      "The educational model changes pH while illustrating the direction of the Bohr effect.",
    interpretation:
      "A lower pH generally reduces haemoglobin's affinity for oxygen, shifting the oxygen dissociation curve to the right and favouring oxygen unloading at a given PO₂.",
    limitation:
      "The displayed percentage is a conceptual index, not a calculated oxygen saturation. Actual saturation depends on factors including PO₂, temperature, CO₂, and haemoglobin properties.",
  },

  "minute-ventilation": {
    title: "Minute ventilation",
    equation: "Minute ventilation = tidal volume × respiratory rate",
    assumptions:
      "Tidal volume is converted from millilitres to litres. The current model holds respiratory rate at 12 breaths/min.",
    interpretation:
      "With tidal volume expressed in litres, multiplying it by breaths per minute gives minute ventilation in L/min.",
    limitation:
      "Minute ventilation is not the same as alveolar ventilation. Dead-space ventilation must also be considered when assessing effective gas exchange.",
  },

  "action-potential": {
    title: "The neuronal action potential",
    equation: "Below threshold: no full action potential; at threshold: regenerative firing.",
    assumptions:
      "The model uses a fixed teaching threshold of 55 arbitrary stimulus units.",
    interpretation:
      "Once threshold is reached, voltage-gated ion channels generate a regenerative action potential. Increasing stimulus strength above threshold does not simply increase the amplitude of each action potential.",
    limitation:
      "Real neuronal thresholds depend on membrane potential, ion-channel properties, recent activity, and cell type. The slider is not a calibrated measurement of membrane voltage.",
  },

  "synaptic-response": {
    title: "Synaptic response",
    equation: "Conceptual response = 100 × x ÷ (x + 30)",
    assumptions:
      "The variable x is a non-negative conceptual input. The formula illustrates a response that rises and gradually approaches a ceiling.",
    interpretation:
      "As the input increases, the model response increases at a progressively slower rate, illustrating saturation.",
    limitation:
      "This is a mathematical teaching curve, not a universal equation for neurotransmitter release, receptor activation, or postsynaptic potential.",
  },

  "reflex-latency": {
    title: "Reflex pathway timing",
    equation: "Illustrative latency = 250 − 1.5 × (x − 10) ms",
    assumptions:
      "The current model uses a simplified linear relationship over its configured slider range.",
    interpretation:
      "The illustration shows how a modelled latency can change with its input. Actual reflex timing depends on conduction distance and velocity, synaptic delays, and the response measured.",
    limitation:
      "This linear equation is not a general physiological law. The input must not be interpreted as a directly measured nerve conduction velocity unless its units and calibration are explicitly defined.",
  },

  "glomerular-filtration": {
    title: "Glomerular filtration",
    equation: "GFR = Kf × net filtration pressure",
    assumptions:
      "The physiological relationship depends on the filtration coefficient and the balance of hydrostatic and oncotic pressures.",
    interpretation:
      "Glomerular capillary hydrostatic pressure generally favours filtration, while opposing forces can reduce it.",
    limitation:
      "The current slider produces a conceptual index, not a measured or estimated GFR. The output must not be used to assess kidney function.",
  },

  "water-reabsorption": {
    title: "ADH and renal water reabsorption",
    equation: "ADH → V₂ receptor activation → increased collecting-duct water permeability",
    assumptions:
      "The model illustrates the directional effect of antidiuretic hormone (ADH) on collecting-duct water permeability.",
    interpretation:
      "ADH promotes aquaporin-2 insertion into collecting-duct principal-cell membranes, generally increasing water reabsorption when an appropriate osmotic gradient is present.",
    limitation:
      "The displayed percentage is a conceptual index, not a measured percentage of water reabsorbed. Actual urine concentration also depends on the medullary osmotic gradient and other renal factors.",
  },
};

export function ModelGuide({ kind }: ModelGuideProps) {
  const model = MODEL_INFORMATION[kind];

  return (
    <section
      aria-labelledby="model-guide-title"
      className="mt-5 rounded-2xl border border-violet-400/15 bg-violet-400/5 p-5 sm:p-6"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-400/10 text-violet-300">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path d="M9 18h6" />
            <path d="M10 22h4" />
            <path d="M8.5 14.5A7 7 0 1 1 15.5 14.5c-.8.6-1.2 1.3-1.4 2.5h-4.2c-.2-1.2-.6-1.9-1.4-2.5Z" />
          </svg>
        </div>

        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-300">
            Physiology explained
          </p>

          <h2
            id="model-guide-title"
            className="mt-1 text-lg font-semibold text-white"
          >
            {model.title}
          </h2>
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-white/5 bg-[#080d18]/70 p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Equation or physiological relationship
        </p>

        <p className="mt-2 text-sm font-medium leading-6 text-cyan-200">
          {model.equation}
        </p>
      </div>

      <div className="mt-4 space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-200">
            Model assumptions
          </h3>
          <p className="mt-1 text-sm leading-6 text-slate-400">
            {model.assumptions}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-200">
            Physiological meaning
          </h3>
          <p className="mt-1 text-sm leading-6 text-slate-400">
            {model.interpretation}
          </p>
        </div>

        <div className="rounded-xl border border-amber-400/15 bg-amber-400/5 p-4">
          <h3 className="text-sm font-semibold text-amber-200">
            Model limitation
          </h3>
          <p className="mt-1 text-sm leading-6 text-amber-100/70">
            {model.limitation}
          </p>
        </div>
      </div>
    </section>
  );
}
