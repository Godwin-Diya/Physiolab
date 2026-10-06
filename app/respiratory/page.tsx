"use client";

import { useState } from "react";

import {
  Activity,
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Brain,
  Wind,
} from "lucide-react";

import { MetricCard } from "@/components/physiology/MetricCard";
import { SimulationPanel } from "@/components/physiology/SimulationPanel";
import { SliderControl } from "@/components/physiology/SliderControl";
import { calculateGasExchange } from "@/lib/physiology/respiratory";

export default function RespiratoryPage() {
  const [alveolarOxygen, setAlveolarOxygen] = useState(100);
  const [alveolarCarbonDioxide, setAlveolarCarbonDioxide] = useState(40);
  const [inspiredOxygen, setInspiredOxygen] = useState(150);
  const [ventilation, setVentilation] = useState(6);

  const result = calculateGasExchange(
    alveolarOxygen,
    alveolarCarbonDioxide,
    inspiredOxygen,
    ventilation
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        {/* Header */}
        <section className="mb-10">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10">
              <Wind className="h-5 w-5 text-cyan-300" />
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-cyan-300">
                Respiratory Physiology
              </p>

              <h1 className="mt-1 text-3xl font-bold tracking-tight">
                Gas Exchange Lab
              </h1>
            </div>
          </div>

          <p className="max-w-3xl text-sm leading-7 text-slate-400">
            Explore how oxygen and carbon dioxide move between the alveoli and
            the blood. Adjust the variables and observe how the gas exchange
            process responds.
          </p>
        </section>

        {/* Controls */}
        <SimulationPanel
          title="Experiment Controls"
          eyebrow="Manipulate the respiratory system"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <SliderControl
              label="Alveolar Oxygen"
              description="Approximate oxygen pressure inside the alveoli."
              value={alveolarOxygen}
              min={40}
              max={140}
              unit="mmHg"
              onChange={setAlveolarOxygen}
            />

            <SliderControl
              label="Alveolar Carbon Dioxide"
              description="Approximate carbon dioxide pressure inside the alveoli."
              value={alveolarCarbonDioxide}
              min={20}
              max={70}
              unit="mmHg"
              onChange={setAlveolarCarbonDioxide}
            />

            <SliderControl
              label="Inspired Oxygen"
              description="Simplified oxygen pressure of inspired air."
              value={inspiredOxygen}
              min={80}
              max={200}
              unit="mmHg"
              onChange={setInspiredOxygen}
            />

            <SliderControl
              label="Ventilation"
              description="Simplified alveolar ventilation level."
              value={ventilation}
              min={2}
              max={12}
              unit="L/min"
              onChange={setVentilation}
            />
          </div>
        </SimulationPanel>

        {/* Metrics */}
        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            label="O₂ Gradient"
            value={result.oxygenGradient.toFixed(0)}
            unit="mmHg"
            highlighted
          />

          <MetricCard
            label="CO₂ Gradient"
            value={result.carbonDioxideGradient.toFixed(0)}
            unit="mmHg"
          />

          <MetricCard
            label="O₂ Transfer"
            value={result.oxygenTransfer.toFixed(0)}
            unit="%"
          />

          <MetricCard
            label="CO₂ Transfer"
            value={result.carbonDioxideTransfer.toFixed(0)}
            unit="%"
          />
        </section>

        {/* Gas exchange visualization */}
        <section className="mt-8">
          <SimulationPanel
            title="Alveolar Gas Exchange"
            eyebrow="Visualize the movement of gases"
          >
            <div className="grid gap-8 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
              {/* Alveolus */}
              <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/5 p-6">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                      Alveolus
                    </p>

                    <h2 className="mt-1 text-xl font-semibold text-white">
                      Air Space
                    </h2>
                  </div>

                  <Wind className="h-5 w-5 text-cyan-300" />
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl bg-slate-900/60 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">
                        Oxygen
                      </span>

                      <span className="font-semibold text-cyan-300">
                        {alveolarOxygen} mmHg
                      </span>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-slate-900/60 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">
                        Carbon Dioxide
                      </span>

                      <span className="font-semibold text-orange-300">
                        {alveolarCarbonDioxide} mmHg
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direction */}
              <div className="flex flex-col items-center gap-3">
                <div className="flex items-center gap-2 text-cyan-300">
                  <ArrowRight className="hidden h-6 w-6 lg:block" />
                  <ArrowDown className="h-6 w-6 lg:hidden" />
                  <span className="text-xs font-semibold uppercase tracking-[0.16em]">
                    Diffusion
                  </span>
                  <ArrowRight className="hidden h-6 w-6 lg:block" />
                </div>

                <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-400">
                  Down a partial-pressure gradient
                </div>
              </div>

              {/* Blood */}
              <div className="rounded-3xl border border-rose-400/20 bg-rose-400/5 p-6">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                      Pulmonary Capillary
                    </p>

                    <h2 className="mt-1 text-xl font-semibold text-white">
                      Blood
                    </h2>
                  </div>

                  <Activity className="h-5 w-5 text-rose-300" />
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl bg-slate-900/60 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">
                        Oxygen Transfer
                      </span>

                      <span className="font-semibold text-cyan-300">
                        {result.oxygenTransfer.toFixed(0)}%
                      </span>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-slate-900/60 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">
                        CO₂ Transfer
                      </span>

                      <span className="font-semibold text-orange-300">
                        {result.carbonDioxideTransfer.toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SimulationPanel>
        </section>

        {/* Ventilation status */}
        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <SimulationPanel
            title="Ventilation Status"
            eyebrow="Respiratory response"
          >
            <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5">
              {result.ventilationStatus === "low" && (
                <ArrowDown className="h-6 w-6 text-amber-300" />
              )}

              {result.ventilationStatus === "normal" && (
                <Activity className="h-6 w-6 text-emerald-300" />
              )}

              {result.ventilationStatus === "high" && (
                <ArrowUp className="h-6 w-6 text-cyan-300" />
              )}

              <div>
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                  Current ventilation
                </p>

                <p className="mt-1 text-lg font-semibold capitalize text-white">
                  {result.ventilationStatus}
                </p>
              </div>
            </div>
          </SimulationPanel>

          <SimulationPanel
            title="Gas Exchange Status"
            eyebrow="Alveolar-capillary exchange"
          >
            <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5">
              <Brain className="h-6 w-6 text-violet-300" />

              <div>
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                  Current exchange
                </p>

                <p className="mt-1 text-lg font-semibold capitalize text-white">
                  {result.gasExchangeStatus}
                </p>
              </div>
            </div>
          </SimulationPanel>
        </section>

        {/* Physiology insight */}
        <section className="mt-8">
          <SimulationPanel
            title="Physiology Insight"
            eyebrow="What is happening?"
          >
            <div className="rounded-2xl border border-cyan-400/10 bg-cyan-400/5 p-6">
              <p className="text-sm leading-7 text-slate-300">
                {result.insight}
              </p>
            </div>
          </SimulationPanel>
        </section>

        {/* Learning explanation */}
        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <SimulationPanel
            title="Why Oxygen Moves Into Blood"
            eyebrow="Diffusion"
          >
            <p className="text-sm leading-7 text-slate-400">
              Oxygen moves from the alveolar air space toward the pulmonary
              capillary blood because it moves down its partial-pressure
              gradient. The larger the difference between alveolar and blood
              oxygen pressure, the greater the driving force for diffusion.
            </p>
          </SimulationPanel>

          <SimulationPanel
            title="Why Carbon Dioxide Moves Out"
            eyebrow="CO₂ removal"
          >
            <p className="text-sm leading-7 text-slate-400">
              Carbon dioxide produced by metabolism is transported in the blood
              to the lungs. It diffuses from the blood into the alveoli and is
              then removed from the body during expiration.
            </p>
          </SimulationPanel>
        </section>

        {/* Footer */}
        <footer className="mt-12 border-t border-white/10 pt-6">
          <p className="text-xs text-slate-600">
            Physiolab • Interactive Human Physiology Learning Platform
          </p>
        </footer>
      </div>
    </main>
  );
}

