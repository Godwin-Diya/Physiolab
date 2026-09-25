export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <header className="mb-12">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-cyan-400">
            Human Physiology Laboratory
          </p>

          <h1 className="text-5xl font-bold tracking-tight">
            Physiolab
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-slate-400">
            Explore human physiology through interactive simulations,
            experiments, and clinical reasoning.
          </p>
        </header>

        <section>
          <h2 className="mb-6 text-2xl font-semibold">
            Explore Physiology
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <div className="mb-4 text-3xl">🫀</div>

              <h3 className="text-xl font-semibold">
                Cardiovascular
              </h3>

              <p className="mt-2 text-slate-400">
                Explore cardiac output, blood pressure,
                circulation, and cardiovascular regulation.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <div className="mb-4 text-3xl">🫁</div>

              <h3 className="text-xl font-semibold">
                Respiratory
              </h3>

              <p className="mt-2 text-slate-400">
                Explore ventilation, gas exchange,
                oxygen transport, and respiratory control.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <div className="mb-4 text-3xl">🧠</div>

              <h3 className="text-xl font-semibold">
                Nervous System
              </h3>

              <p className="mt-2 text-slate-400">
                Explore neural signaling, reflexes,
                autonomic regulation, and sensory physiology.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}