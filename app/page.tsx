"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Activity,
  ArrowRight,
  Brain,
  ChevronRight,
  FlaskConical,
  HeartPulse,
  Home,
  Layers3,
  Menu,
  Microscope,
  Moon,
  Play,
  Search,
  Settings,
  Sparkles,
  Stethoscope,
  Trophy,
  Wind,
  X,
} from "lucide-react";

const systems = [
  {
    name: "Cardiovascular",
    description:
      "Explore cardiac output, blood pressure, circulation and cardiovascular regulation.",
    icon: HeartPulse,
    color: "text-rose-400",
    background: "bg-rose-500/10",
    border: "border-rose-500/20",
    progress: 82,
  },
  {
    name: "Respiratory",
    description:
      "Understand ventilation, gas exchange, oxygen transport and respiratory control.",
    icon: Wind,
    color: "text-cyan-400",
    background: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    progress: 64,
  },
  {
    name: "Nervous System",
    description:
      "Explore neural signaling, reflexes, autonomic regulation and sensory physiology.",
    icon: Brain,
    color: "text-violet-400",
    background: "bg-violet-500/10",
    border: "border-violet-500/20",
    progress: 48,
  },
  {
    name: "Renal",
    description:
      "Explore filtration, reabsorption, secretion, fluid balance and renal regulation.",
    icon: Activity,
    color: "text-emerald-400",
    background: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    progress: 35,
  },
];

const navigation = [
  { name: "Dashboard", icon: Home },
  { name: "Systems", icon: Layers3 },
  { name: "Simulations", icon: Activity },
  { name: "Experiments", icon: FlaskConical },
  { name: "Clinical Cases", icon: Stethoscope },
  { name: "Quiz", icon: Trophy },
];

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <button
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-white/10 bg-[#091525] transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-400/20">
              <Microscope size={22} strokeWidth={2.5} />
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-tight">Physiolab</h1>
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
                Human Physiology
              </p>
            </div>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-8">
          <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Explore
          </p>

          <div className="space-y-1">
            {navigation.map((item, index) => {
              const Icon = item.icon;
              const active = index === 0;

              return (
                <button
                  key={item.name}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${
                    active
                      ? "bg-cyan-400/10 text-cyan-300"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.name}</span>

                  {active && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  )}
                </button>
              );
            })}
          </div>

          <p className="mb-3 mt-10 px-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Workspace
          </p>

          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white">
            <Settings size={18} />
            <span>Settings</span>
          </button>
        </nav>

        <div className="m-4 rounded-2xl border border-cyan-400/10 bg-cyan-400/5 p-4">
          <div className="mb-3 flex items-center gap-2">
            <Sparkles size={16} className="text-cyan-400" />
            <span className="text-sm font-medium">Learning streak</span>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <p className="text-2xl font-bold">7 days</p>
              <p className="mt-1 text-xs text-slate-500">
                Keep exploring physiology.
              </p>
            </div>

            <div className="text-2xl">🔥</div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-72">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-white/10 bg-[#07111f]/90 px-5 backdrop-blur-xl sm:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-xl border border-white/10 p-2 text-slate-300 hover:bg-white/5 lg:hidden"
          >
            <Menu size={20} />
          </button>

          <div className="relative hidden max-w-md flex-1 lg:block">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              type="text"
              placeholder="Search physiology..."
              className="h-11 w-full rounded-xl border border-white/10 bg-white/3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/40"
            />
          </div>

          <div className="ml-auto flex items-center gap-3">
            <button className="rounded-xl border border-white/10 p-2.5 text-slate-400 transition hover:bg-white/5 hover:text-white">
              <Moon size={18} />
            </button>

            <div className="flex items-center gap-3 border-l border-white/10 pl-3">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-medium">Physio Explorer</p>
                <p className="text-xs text-slate-500">Learner</p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-cyan-300 to-blue-500 font-bold text-slate-950">
                P
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
          {/* Hero */}
          <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-[#0d2033] via-[#0a1828] to-[#07111f] p-7 sm:p-10">
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />
            <div className="absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />

            <div className="relative max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1.5 text-xs font-medium text-cyan-300">
                <Sparkles size={14} />
                Interactive Human Physiology
              </div>

              <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
                Understand the body by{" "}
                <span className="text-cyan-300">exploring it.</span>
              </h2>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                Learn physiology through interactive simulations, virtual
                experiments, visual feedback loops and clinical reasoning.
                Move beyond memorization and discover why the body responds
                the way it does.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <button className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
                  <Play size={16} fill="currentColor" />
                  Start exploring
                </button>

                <button className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/3 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/7">
                  View simulations
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </section>

          {/* Continue learning */}
          <section className="mt-10">
            <div className="mb-5 flex items-end justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
                  Continue learning
                </p>

                <h2 className="mt-1 text-2xl font-bold">
                  Your physiology journey
                </h2>
              </div>

              <button className="hidden items-center gap-1 text-sm text-slate-400 hover:text-white sm:flex">
                View progress
                <ChevronRight size={16} />
              </button>
            </div>

            <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
              {/* Progress card */}
              <div className="rounded-2xl border border-white/10 bg-white/2.5 p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-slate-500">Current module</p>

                    <h3 className="mt-1 text-xl font-semibold">
                      Cardiovascular Physiology
                    </h3>
                  </div>

                  <div className="rounded-xl bg-rose-500/10 p-3 text-rose-400">
                    <HeartPulse size={22} />
                  </div>
                </div>

                <div className="mt-7">
                  <div className="mb-2 flex justify-between text-xs">
                    <span className="text-slate-500">Progress</span>
                    <span className="font-medium text-cyan-300">82%</span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                    <div className="h-full w-[82%] rounded-full bg-cyan-400" />
                  </div>
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-6 text-sm">
                  <div>
                    <p className="text-slate-500">Lessons</p>
                    <p className="mt-1 font-semibold">14 / 17</p>
                  </div>

                  <div>
                    <p className="text-slate-500">Experiments</p>
                    <p className="mt-1 font-semibold">8 completed</p>
                  </div>

                  <div>
                    <p className="text-slate-500">Mastery</p>
                    <p className="mt-1 font-semibold">Advanced</p>
                  </div>
                </div>

                <button className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-cyan-300 hover:text-cyan-200">
                  Continue module
                  <ArrowRight size={16} />
                </button>
              </div>

              {/* Daily challenge */}
              <div className="rounded-2xl border border-violet-400/10 bg-violet-400/4 p-6">
                <div className="flex items-center justify-between">
                  <div className="rounded-xl bg-violet-400/10 p-3 text-violet-300">
                    <Trophy size={22} />
                  </div>

                  <span className="rounded-full bg-violet-400/10 px-3 py-1 text-xs text-violet-300">
                    Daily challenge
                  </span>
                </div>

                <h3 className="mt-6 text-lg font-semibold">
                  Can you predict the response?
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  A patient experiences a sudden decrease in blood pressure.
                  What happens to heart rate?
                </p>

                <button className="mt-6 inline-flex items-center gap-2 rounded-xl border border-violet-400/20 bg-violet-400/10 px-4 py-2.5 text-sm font-medium text-violet-200 hover:bg-violet-400/15">
                  Take challenge
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </section>

          {/* Systems */}
          <section className="mt-12">
            <div className="mb-5 flex items-end justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
                  Explore
                </p>

                <h2 className="mt-1 text-2xl font-bold">
                  Human physiology systems
                </h2>
              </div>

              <button className="hidden items-center gap-1 text-sm text-slate-400 hover:text-white sm:flex">
                View all
                <ChevronRight size={16} />
              </button>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {systems.map((system) => {
                const Icon = system.icon;

                return (
                  <article
                    key={system.name}
                    className={`group rounded-2xl border ${system.border} bg-white/2.5 p-5 transition duration-300 hover:-translate-y-1 hover:bg-white/4`}
                  >
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl ${system.background} ${system.color}`}
                    >
                      <Icon size={21} />
                    </div>

                    <h3 className="mt-5 font-semibold">{system.name}</h3>

                    <p className="mt-2 min-h-18 text-sm leading-6 text-slate-500">
                      {system.description}
                    </p>

                    <div className="mt-5">
                      <div className="mb-2 flex justify-between text-xs">
                        <span className="text-slate-600">Mastery</span>
                        <span className="text-slate-400">
                          {system.progress}%
                        </span>
                      </div>

                      <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
                        <div
                          className={`h-full rounded-full ${system.color.replace(
                            "text-",
                            "bg-"
                          )}`}
                          style={{ width: `${system.progress}%` }}
                        />
                      </div>
                    </div>

                    <button className="mt-5 flex items-center gap-1 text-sm font-medium text-slate-300 transition group-hover:text-cyan-300">
                      Explore
                      <ArrowRight
                        size={15}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </button>
                  </article>
                );
              })}
            </div>
          </section>

          {/* Quick lab */}
          <section className="mt-12">
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
                Quick lab
              </p>

              <h2 className="mt-1 text-2xl font-bold">
                Run an experiment
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {/* Cardiac Output Lab */}
              <Link
                href="/cardiovascular"
                className="group rounded-2xl border border-white/10 bg-white/2.5 p-6 text-left transition hover:border-rose-400/20 hover:bg-rose-400/3"
              >
                <HeartPulse size={25} className="text-rose-400" />

                <h3 className="mt-5 font-semibold">
                  Cardiac Output Lab
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Change heart rate and stroke volume and observe how cardiac
                  output responds.
                </p>

                <span className="mt-5 inline-flex items-center gap-1 text-sm text-slate-300 group-hover:text-rose-300">
                  Run experiment
                  <ArrowRight size={15} />
                </span>
              </Link>

              {/* Baroreceptor Reflex Lab */}
              <Link
                href="/baroreflex"
                className="group rounded-2xl border border-white/10 bg-white/2.5 p-6 text-left transition hover:border-cyan-400/30 hover:bg-white/4"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
                  <Activity size={20} />
                </div>

                <p className="mt-5 text-xs uppercase tracking-[0.18em] text-slate-500">
                  Cardiovascular
                </p>

                <h3 className="mt-2 text-lg font-semibold">
                  Baroreceptor Reflex
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Explore how the nervous system responds to changes in
                  arterial pressure.
                </p>

                <div className="mt-5 text-sm font-medium text-cyan-400">
                  Enter laboratory →
                </div>
              </Link>

              {/* Gas Exchange Lab */}
              <Link
                href="/respiratory"
                className="group rounded-2xl border border-white/10 bg-white/2.5 p-6 text-left transition hover:border-cyan-400/20 hover:bg-cyan-400/3"
              >
                <Wind size={25} className="text-cyan-400" />

                <h3 className="mt-5 font-semibold">
                  Gas Exchange Lab
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Explore how ventilation and diffusion influence oxygen and
                  carbon dioxide exchange.
                </p>

                <span className="mt-5 inline-flex items-center gap-1 text-sm text-slate-300 group-hover:text-cyan-300">
                  Run experiment
                  <ArrowRight size={15} />
                </span>
              </Link>

              {/* Reflex Lab */}
              <button className="group rounded-2xl border border-white/10 bg-white/2.5 p-6 text-left transition hover:border-violet-400/20 hover:bg-violet-400/3">
                <Brain size={25} className="text-violet-400" />

                <h3 className="mt-5 font-semibold">
                  Reflex Lab
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Follow a sensory stimulus through the nervous system and
                  observe the resulting response.
                </p>

                <span className="mt-5 inline-flex items-center gap-1 text-sm text-slate-300 group-hover:text-violet-300">
                  Run experiment
                  <ArrowRight size={15} />
                </span>
              </button>
            </div>
          </section>

          {/* Footer */}
          <footer className="mt-16 border-t border-white/10 py-8 text-center">
            <p className="text-xs text-slate-600">
              Physiolab · Interactive Human Physiology Learning Platform
            </p>
          </footer>
        </div>
      </div>
    </main>
  );
}