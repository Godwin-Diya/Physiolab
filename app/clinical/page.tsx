
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ChangeEvent, ReactNode } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  ClipboardList,
  Eye,
  FileImage,
  HeartPulse,
  Info,
  RotateCcw,
  ScanHeart,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Upload,
  Waves,
  X,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

type ClinicalTab = "ecg" | "echo" | "cases";

type ClinicalCase = {
  id: string;
  title: string;
  modality: "ECG" | "Echocardiography";
  level: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  description: string;
  findings: string[];
  teachingPoints: string[];
  reminder: string;
};

/* -------------------------------------------------------------------------- */
/* Educational content                                                        */
/* -------------------------------------------------------------------------- */

const ecgLessons = [
  {
    number: "01",
    title: "The ECG foundations",
    description:
      "Understand electrical activity, leads, calibration, and the standard ECG layout.",
    duration: "8 min",
    tag: "Foundations",
  },
  {
    number: "02",
    title: "Waves and intervals",
    description:
      "Explore the P wave, PR interval, QRS complex, ST segment, and T wave.",
    duration: "12 min",
    tag: "Core concepts",
  },
  {
    number: "03",
    title: "Heart rate and rhythm",
    description:
      "Practise a systematic approach to rate, regularity, and rhythm assessment.",
    duration: "10 min",
    tag: "Interpretation",
  },
  {
    number: "04",
    title: "A systematic ECG approach",
    description:
      "Work through a repeatable checklist before forming an interpretation.",
    duration: "15 min",
    tag: "Clinical method",
  },
];

const echoLessons = [
  {
    number: "01",
    title: "The echocardiography room",
    description:
      "Learn what cardiac ultrasound shows and how views are acquired.",
    tag: "Foundations",
  },
  {
    number: "02",
    title: "Recognising standard views",
    description:
      "Explore parasternal, apical, subcostal, and suprasternal windows.",
    tag: "Image orientation",
  },
  {
    number: "03",
    title: "Chambers and valves",
    description:
      "Identify the four chambers and understand the function of the valves.",
    tag: "Anatomy",
  },
  {
    number: "04",
    title: "Doppler and blood flow",
    description:
      "Discover how Doppler techniques help assess direction and velocity of flow.",
    tag: "Haemodynamics",
  },
];

const clinicalCases: ClinicalCase[] = [
  {
    id: "ecg-normal",
    title: "A normal sinus rhythm",
    modality: "ECG",
    level: "Beginner",
    category: "Rhythm",
    description:
      "A teaching case for practising a structured first look at a 12-lead ECG.",
    findings: [
      "Check that each QRS complex is preceded by a P wave.",
      "Assess whether the rhythm is regular.",
      "Measure the rate and review the intervals.",
    ],
    teachingPoints: [
      "Sinus rhythm is assessed by examining P-wave morphology and its relationship to the QRS complexes.",
      "A systematic review should include rate, rhythm, intervals, axis, and ST-T changes.",
      "A single reassuring feature does not replace review of the complete tracing and clinical context.",
    ],
    reminder:
      "This is a fictional teaching case, not a real patient ECG or a diagnostic result.",
  },
  {
    id: "ecg-rhythm",
    title: "An irregular rhythm",
    modality: "ECG",
    level: "Intermediate",
    category: "Rhythm",
    description:
      "Practise identifying rhythm irregularity before considering possible explanations.",
    findings: [
      "Compare the R-R intervals across the tracing.",
      "Look carefully for consistent P waves.",
      "Describe what is visible before proposing a rhythm diagnosis.",
    ],
    teachingPoints: [
      "An irregular rhythm has several possible causes, and the pattern must be assessed carefully.",
      "Inspect the full tracing, ECG quality, symptoms, and clinical history.",
      "Do not diagnose a specific arrhythmia from an isolated feature alone.",
    ],
    reminder:
      "This fictional case teaches observation and reasoning; it does not represent a confirmed arrhythmia.",
  },
  {
    id: "echo-lv",
    title: "Exploring left ventricular function",
    modality: "Echocardiography",
    level: "Intermediate",
    category: "Ventricular function",
    description:
      "Learn how image quality, chamber size, and ventricular motion fit into an echo review.",
    findings: [
      "Identify the left ventricle in the selected view.",
      "Observe endocardial borders and wall motion.",
      "Consider why multiple views are important.",
    ],
    teachingPoints: [
      "Left ventricular systolic function should be assessed using appropriate views and validated methods.",
      "Visual estimation has limitations and may be affected by image quality and observer experience.",
      "A complete assessment may include quantitative measurements and the clinical context.",
    ],
    reminder:
      "This is an educational walkthrough, not a real echocardiogram or a measurement of ejection fraction.",
  },
  {
    id: "echo-effusion",
    title: "Pericardial space exploration",
    modality: "Echocardiography",
    level: "Advanced",
    category: "Pericardium",
    description:
      "Review the pericardial space and learn why suspected fluid requires careful assessment.",
    findings: [
      "Identify the myocardium and the surrounding pericardial space.",
      "Distinguish an imaging observation from a confirmed diagnosis.",
      "Learn why haemodynamic assessment matters when an effusion is suspected.",
    ],
    teachingPoints: [
      "Pericardial fluid must be assessed in suitable views and distinguished from other structures and artefacts.",
      "The clinical significance depends on more than the apparent amount of fluid.",
      "Suspected haemodynamic compromise requires urgent clinical assessment.",
    ],
    reminder:
      "This fictional teaching case does not show a real effusion and cannot assess an individual patient.",
  },
];

const ecgQuizOptions = [
  {
    value: "atrial",
    label: "Atrial depolarisation",
  },
  {
    value: "ventricular",
    label: "Ventricular depolarisation",
  },
  {
    value: "repolarisation",
    label: "Ventricular repolarisation",
  },
  {
    value: "filling",
    label: "Ventricular filling",
  },
];

/* -------------------------------------------------------------------------- */
/* Reusable components                                                        */
/* -------------------------------------------------------------------------- */

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-6">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
        {eyebrow}
      </p>

      <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
        {title}
      </h2>

      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        {description}
      </p>
    </div>
  );
}

function Panel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-2xl border border-white/10 bg-white/3 p-5 sm:p-6 ${className}`}
    >
      {children}
    </section>
  );
}

function EcgIllustration() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-rose-300/15 bg-[#111522] p-4">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(251,113,133,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(251,113,133,0.16) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-rose-200">
            ECG waveform
          </span>

          <span className="rounded-full border border-rose-300/20 bg-rose-300/10 px-2 py-1 text-[10px] text-rose-100">
            Schematic
          </span>
        </div>

        <svg
          viewBox="0 0 600 180"
          role="img"
          aria-label="Illustrative ECG waveform showing P, QRS, and T wave labels"
          className="w-full"
        >
          <path
            d="M10 100 L70 100 Q88 100 100 82 Q112 65 125 100 L168 100 L188 115 L210 35 L232 140 L254 100 L320 100 Q350 100 370 78 Q395 54 418 100 L590 100"
            fill="none"
            stroke="#fb7185"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <g fill="#fecdd3" fontSize="13" fontWeight="600">
            <text x="103" y="58">P</text>
            <text x="208" y="23">QRS</text>
            <text x="385" y="50">T</text>
          </g>
        </svg>

        <p className="mt-2 text-xs leading-5 text-slate-400">
          Illustrative waveform only. Not a real ECG recording.
        </p>
      </div>
    </div>
  );
}

function EchoIllustration() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-cyan-300/15 bg-[#101923] p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="text-xs font-semibold uppercase tracking-widest text-cyan-200">
          Cardiac imaging
        </span>

        <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-2 py-1 text-[10px] text-cyan-100">
          Schematic
        </span>
      </div>

      <svg
        viewBox="0 0 600 250"
        role="img"
        aria-label="Abstract illustration of a heart in an ultrasound imaging frame"
        className="w-full"
      >
        <defs>
          <linearGradient id="echoGlow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#0e7490" stopOpacity="0.12" />
          </linearGradient>
        </defs>

        <path
          d="M300 25 L115 225 L485 225 Z"
          fill="url(#echoGlow)"
          opacity="0.45"
        />

        <path
          d="M300 45 C265 12 211 48 226 94 C241 139 294 179 300 185 C306 179 359 139 374 94 C389 48 335 12 300 45 Z"
          fill="none"
          stroke="#a5f3fc"
          strokeWidth="4"
        />

        <path
          d="M300 45 C294 85 303 115 300 185 M228 94 Q266 85 300 105 Q338 80 374 94"
          fill="none"
          stroke="#67e8f9"
          strokeWidth="2"
          strokeDasharray="5 5"
        />

        <path
          d="M115 225 L485 225"
          stroke="#67e8f9"
          strokeWidth="2"
          opacity="0.5"
        />
      </svg>

      <p className="mt-2 text-xs leading-5 text-slate-400">
        Concept illustration only. It is not an ultrasound image.
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Main page                                                                  */
/* -------------------------------------------------------------------------- */

export default function ClinicalPage() {
  const [activeTab, setActiveTab] = useState<ClinicalTab>("ecg");
  const [selectedCaseId, setSelectedCaseId] = useState("ecg-normal");
  const [caseSearch, setCaseSearch] = useState("");
  const [showInterpretation, setShowInterpretation] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState("");
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploadMessage, setUploadMessage] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  /* Release the temporary browser URL when it is replaced or no longer needed. */
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const filteredCases = useMemo(() => {
    const query = caseSearch.trim().toLowerCase();

    if (!query) {
      return clinicalCases;
    }

    return clinicalCases.filter((clinicalCase) => {
      const searchableText = [
        clinicalCase.title,
        clinicalCase.modality,
        clinicalCase.level,
        clinicalCase.category,
        clinicalCase.description,
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(query);
    });
  }, [caseSearch]);

  const selectedCase = clinicalCases.find(
    (clinicalCase) => clinicalCase.id === selectedCaseId,
  );

  function changeTab(tab: ClinicalTab) {
    setActiveTab(tab);
    setShowInterpretation(false);
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    /* Allow the same file to be selected again later. */
    event.target.value = "";

    setSelectedFile(null);
    setPreviewUrl("");
    setShowInterpretation(false);
    setUploadMessage("");

    if (!file) {
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "application/pdf",
    ];

    if (!allowedTypes.includes(file.type)) {
      setUploadMessage("Choose a JPG, PNG, WebP, or PDF file.");
      return;
    }

    const maxFileSize = 10 * 1024 * 1024;

    if (file.size > maxFileSize) {
      setUploadMessage("The file is too large. Choose a file under 10 MB.");
      return;
    }

    setSelectedFile(file);

    if (file.type.startsWith("image/")) {
      setPreviewUrl(URL.createObjectURL(file));
    }

    setUploadMessage(
      "File selected locally. It has not been uploaded to a server.",
    );
  }

  function clearFile() {
    setSelectedFile(null);
    setPreviewUrl("");
    setUploadMessage("");
    setShowInterpretation(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function resetQuiz() {
    setQuizAnswer("");
    setQuizSubmitted(false);
  }

  const isCorrectAnswer = quizAnswer === "ventricular";

  return (
    <main className="min-h-screen bg-[#080d17] text-white">
      {/* Background decoration */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/3 h-96 w-96 rounded-full bg-cyan-500/8 blur-3xl" />
        <div className="absolute right-0 top-[35%] h-80 w-80 rounded-full bg-violet-500/8 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        {/* Top navigation */}
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-300 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to Physiolab
          </Link>

          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/3 px-3 py-2 text-xs text-slate-300">
            <ShieldCheck size={15} className="text-emerald-300" />
            Educational workspace
          </div>
        </header>

        {/* Hero */}
        <section className="mb-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/8 px-3 py-1.5 text-xs font-medium text-cyan-200">
              <Sparkles size={14} />
              Clinical Learning Centre
            </div>

            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Learn to read the heart,{" "}
              <span className="bg-linear-to-r from-cyan-300 to-violet-300 bg-clip-text text-transparent">
                one finding at a time.
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400">
              Build your understanding of electrocardiography and
              echocardiography with structured lessons, guided examples, and
              fictional clinical teaching cases.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => changeTab("ecg")}
                className="inline-flex items-center gap-2 rounded-xl bg-cyan-300 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
              >
                <Activity size={17} />
                Explore ECG
                <ArrowRight size={16} />
              </button>

              <button
                type="button"
                onClick={() => changeTab("echo")}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <ScanHeart size={17} />
                Explore Echo
              </button>
            </div>

            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-400">
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-300" />
                Guided learning
              </span>

              <span className="inline-flex items-center gap-2">
                <BookOpen size={14} className="text-cyan-300" />
                Case-based practice
              </span>

              <span className="inline-flex items-center gap-2">
                <ShieldCheck size={14} className="text-violet-300" />
                Privacy-conscious demo
              </span>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <EcgIllustration />
            <EchoIllustration />
          </div>
        </section>

        {/* Learning mode selector */}
        <nav
          aria-label="Clinical learning sections"
          className="mb-8 flex flex-wrap gap-2 rounded-2xl border border-white/10 bg-white/3 p-2"
        >
          <button
            type="button"
            onClick={() => changeTab("ecg")}
            aria-pressed={activeTab === "ecg"}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition ${
              activeTab === "ecg"
                ? "bg-cyan-300 text-slate-950"
                : "text-slate-300 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Activity size={17} />
            ECG Academy
          </button>

          <button
            type="button"
            onClick={() => changeTab("echo")}
            aria-pressed={activeTab === "echo"}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition ${
              activeTab === "echo"
                ? "bg-cyan-300 text-slate-950"
                : "text-slate-300 hover:bg-white/5 hover:text-white"
            }`}
          >
            <ScanHeart size={17} />
            Echo Academy
          </button>

          <button
            type="button"
            onClick={() => changeTab("cases")}
            aria-pressed={activeTab === "cases"}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition ${
              activeTab === "cases"
                ? "bg-cyan-300 text-slate-950"
                : "text-slate-300 hover:bg-white/5 hover:text-white"
            }`}
          >
            <ClipboardList size={17} />
            Case Review Studio
          </button>
        </nav>

        {/* ECG Academy */}
        {activeTab === "ecg" && (
          <div className="space-y-8">
            <SectionHeading
              eyebrow="Module 01 / Electrocardiography"
              title="ECG Academy"
              description="Learn the electrical story behind the tracing, then practise using a consistent interpretation sequence."
            />

            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <Panel>
                <div className="mb-5 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Your learning pathway
                    </h3>
                    <p className="mt-1 text-sm text-slate-400">
                      Start with the basics and progress towards structured
                      interpretation.
                    </p>
                  </div>

                  <Activity size={22} className="shrink-0 text-rose-300" />
                </div>

                <div className="space-y-3">
                  {ecgLessons.map((lesson) => (
                    <div
                      key={lesson.number}
                      className="flex gap-4 rounded-xl border border-white/8 bg-black/10 p-4"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-300/10 text-sm font-semibold text-rose-200">
                        {lesson.number}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="font-medium text-white">
                            {lesson.title}
                          </h4>

                          <span className="rounded-full bg-white/5 px-2 py-1 text-[10px] text-slate-400">
                            {lesson.tag}
                          </span>
                        </div>

                        <p className="mt-1 text-sm leading-6 text-slate-400">
                          {lesson.description}
                        </p>

                        <p className="mt-2 text-xs text-slate-500">
                          {lesson.duration} · Learning lesson
                        </p>
                      </div>

                      <ChevronRight
                        size={18}
                        className="mt-1 shrink-0 text-slate-500"
                      />
                    </div>
                  ))}
                </div>
              </Panel>

              <div className="space-y-6">
                <Panel>
                  <div className="mb-4 flex items-center gap-2">
                    <CircleHelp size={20} className="text-cyan-300" />
                    <h3 className="font-semibold text-white">
                      Quick knowledge check
                    </h3>
                  </div>

                  <p className="text-sm leading-6 text-slate-300">
                    What does the QRS complex primarily represent on a
                    conventional ECG?
                  </p>

                  <div className="mt-4 space-y-2">
                    {ecgQuizOptions.map((option) => (
                      <label
                        key={option.value}
                        className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 text-sm transition ${
                          quizAnswer === option.value
                            ? "border-cyan-300/40 bg-cyan-300/8 text-white"
                            : "border-white/8 bg-black/10 text-slate-300 hover:bg-white/5"
                        }`}
                      >
                        <input
                          type="radio"
                          name="ecg-quiz"
                          value={option.value}
                          checked={quizAnswer === option.value}
                          onChange={() => {
                            setQuizAnswer(option.value);
                            setQuizSubmitted(false);
                          }}
                          className="accent-cyan-300"
                        />
                        {option.label}
                      </label>
                    ))}
                  </div>

                  {quizSubmitted && (
                    <div
                      className={`mt-4 rounded-xl border p-3 text-sm leading-6 ${
                        isCorrectAnswer
                          ? "border-emerald-300/20 bg-emerald-300/8 text-emerald-100"
                          : "border-amber-300/20 bg-amber-300/8 text-amber-100"
                      }`}
                      role="status"
                    >
                      {isCorrectAnswer
                        ? "Correct. The QRS complex primarily represents ventricular depolarisation."
                        : "Not quite. Review the options and try again. The QRS complex represents ventricular depolarisation."}
                    </div>
                  )}

                  <div className="mt-4 flex gap-2">
                    <button
                      type="button"
                      onClick={() => setQuizSubmitted(true)}
                      disabled={!quizAnswer}
                      className="flex-1 rounded-xl bg-cyan-300 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Check answer
                    </button>

                    <button
                      type="button"
                      onClick={resetQuiz}
                      aria-label="Reset ECG quiz"
                      className="rounded-xl border border-white/10 px-3 text-slate-300 transition hover:bg-white/5"
                    >
                      <RotateCcw size={16} />
                    </button>
                  </div>
                </Panel>

                <Panel>
                  <div className="flex items-start gap-3">
                    <Info
                      size={19}
                      className="mt-0.5 shrink-0 text-cyan-300"
                    />

                    <div>
                      <h3 className="font-semibold text-white">
                        A reliable ECG checklist
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-slate-400">
                        Confirm patient and tracing details, review calibration
                        and quality, assess rate and rhythm, examine intervals
                        and axis, then review morphology and ST-T changes in
                        clinical context.
                      </p>
                    </div>
                  </div>
                </Panel>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => changeTab("cases")}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/5"
              >
                Practise with sample cases
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Echo Academy */}
        {activeTab === "echo" && (
          <div className="space-y-8">
            <SectionHeading
              eyebrow="Module 02 / Cardiac ultrasound"
              title="Echo Academy"
              description="Build familiarity with standard echocardiographic views, cardiac structures, and the questions each view can help answer."
            />

            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <EchoIllustration />

              <Panel>
                <div className="mb-5 flex items-center gap-3">
                  <div className="rounded-xl bg-cyan-300/10 p-3">
                    <Waves size={22} className="text-cyan-200" />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Your learning pathway
                    </h3>
                    <p className="mt-1 text-sm text-slate-400">
                      A structured introduction to echocardiography.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {echoLessons.map((lesson) => (
                    <div
                      key={lesson.number}
                      className="flex items-start gap-4 rounded-xl border border-white/8 bg-black/10 p-4"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-300/10 text-sm font-semibold text-cyan-200">
                        {lesson.number}
                      </div>

                      <div>
                        <h4 className="font-medium text-white">
                          {lesson.title}
                        </h4>

                        <p className="mt-1 text-sm leading-6 text-slate-400">
                          {lesson.description}
                        </p>

                        <span className="mt-2 inline-block text-xs text-cyan-200/80">
                          {lesson.tag}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Panel>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <Panel>
                <Eye size={22} className="mb-3 text-cyan-200" />
                <h3 className="font-semibold text-white">Recognise the view</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Learn orientation and identify the structures visible in
                  standard imaging windows.
                </p>
              </Panel>

              <Panel>
                <HeartPulse size={22} className="mb-3 text-rose-200" />
                <h3 className="font-semibold text-white">
                  Understand function
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Connect chamber movement and valve function with cardiac
                  physiology.
                </p>
              </Panel>

              <Panel>
                <Waves size={22} className="mb-3 text-violet-200" />
                <h3 className="font-semibold text-white">Explore Doppler</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Learn how Doppler adds information about blood-flow direction
                  and velocity.
                </p>
              </Panel>
            </div>

            <Panel>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-semibold text-white">
                    Ready to practise your observations?
                  </h3>
                  <p className="mt-1 text-sm text-slate-400">
                    Open the sample cases to review a guided echocardiography
                    teaching scenario.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedCaseId("echo-lv");
                    changeTab("cases");
                  }}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-cyan-300 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
                >
                  Open Echo case
                  <ArrowRight size={16} />
                </button>
              </div>
            </Panel>
          </div>
        )}

        {/* Case Review Studio */}
        {activeTab === "cases" && (
          <div className="space-y-8">
            <SectionHeading
              eyebrow="Module 03 / Guided practice"
              title="Case Review Studio"
              description="Explore fictional ECG and echocardiography scenarios, practise describing findings, and reveal the teaching notes when you are ready."
            />

            <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
              {/* Case list */}
              <Panel>
                <div className="mb-4">
                  <label
                    htmlFor="case-search"
                    className="mb-2 block text-sm font-medium text-slate-200"
                  >
                    Find a teaching case
                  </label>

                  <input
                    id="case-search"
                    type="search"
                    value={caseSearch}
                    onChange={(event) => setCaseSearch(event.target.value)}
                    placeholder="Search ECG, echo, rhythm..."
                    className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-300/50"
                  />
                </div>

                <div className="space-y-3">
                  {filteredCases.map((clinicalCase) => {
                    const isSelected = clinicalCase.id === selectedCaseId;

                    return (
                      <button
                        key={clinicalCase.id}
                        type="button"
                        onClick={() => {
                          setSelectedCaseId(clinicalCase.id);
                          setShowInterpretation(false);
                        }}
                        className={`w-full rounded-xl border p-4 text-left transition ${
                          isSelected
                            ? "border-cyan-300/40 bg-cyan-300/8"
                            : "border-white/8 bg-black/10 hover:bg-white/5"
                        }`}
                      >
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <span
                            className={`rounded-full px-2 py-1 text-[10px] font-semibold ${
                              clinicalCase.modality === "ECG"
                                ? "bg-rose-300/10 text-rose-200"
                                : "bg-cyan-300/10 text-cyan-200"
                            }`}
                          >
                            {clinicalCase.modality}
                          </span>

                          <span className="text-[10px] text-slate-500">
                            {clinicalCase.level}
                          </span>
                        </div>

                        <h3 className="font-medium text-white">
                          {clinicalCase.title}
                        </h3>

                        <p className="mt-1 text-sm leading-5 text-slate-400">
                          {clinicalCase.description}
                        </p>
                      </button>
                    );
                  })}

                  {filteredCases.length === 0 && (
                    <div className="rounded-xl border border-dashed border-white/10 p-5 text-sm text-slate-400">
                      No cases match that search. Try a different keyword.
                    </div>
                  )}
                </div>
              </Panel>

              {/* Selected case */}
              <div className="space-y-6">
                {selectedCase ? (
                  <>
                    <Panel>
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <div className="mb-2 flex flex-wrap gap-2">
                            <span className="rounded-full bg-white/5 px-2 py-1 text-xs text-slate-300">
                              {selectedCase.modality}
                            </span>

                            <span className="rounded-full bg-white/5 px-2 py-1 text-xs text-slate-300">
                              {selectedCase.category}
                            </span>
                          </div>

                          <h3 className="text-xl font-semibold text-white">
                            {selectedCase.title}
                          </h3>

                          <p className="mt-2 text-sm leading-6 text-slate-400">
                            {selectedCase.description}
                          </p>
                        </div>

                        <Stethoscope
                          size={24}
                          className="shrink-0 text-cyan-200"
                        />
                      </div>

                      <div className="mt-6">
                        <h4 className="mb-3 text-sm font-semibold text-white">
                          Step 1 — Describe your observations
                        </h4>

                        <ul className="space-y-3">
                          {selectedCase.findings.map((finding) => (
                            <li
                              key={finding}
                              className="flex items-start gap-3 text-sm leading-6 text-slate-300"
                            >
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                              {finding}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-6 flex flex-wrap gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            setShowInterpretation((current) => !current)
                          }
                          className="inline-flex items-center gap-2 rounded-xl bg-cyan-300 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
                        >
                          <BookOpen size={16} />
                          {showInterpretation
                            ? "Hide teaching notes"
                            : "Reveal teaching notes"}
                        </button>
                      </div>

                      {showInterpretation && (
                        <div className="mt-6 rounded-xl border border-cyan-300/15 bg-cyan-300/5 p-4">
                          <h4 className="mb-3 flex items-center gap-2 font-semibold text-cyan-100">
                            <CheckCircle2 size={18} />
                            Teaching notes
                          </h4>

                          <ul className="space-y-3">
                            {selectedCase.teachingPoints.map((point) => (
                              <li
                                key={point}
                                className="text-sm leading-6 text-slate-300"
                              >
                                {point}
                              </li>
                            ))}
                          </ul>

                          <p className="mt-4 border-t border-white/10 pt-4 text-xs leading-5 text-slate-400">
                            {selectedCase.reminder}
                          </p>
                        </div>
                      )}
                    </Panel>

                    {/* Local image and PDF review */}
                    <Panel>
                      <div className="mb-4 flex items-start gap-3">
                        <div className="rounded-xl bg-violet-300/10 p-3">
                          <Upload size={20} className="text-violet-200" />
                        </div>

                        <div>
                          <h3 className="font-semibold text-white">
                            Local image review
                          </h3>

                          <p className="mt-1 text-sm leading-6 text-slate-400">
                            Select an image or PDF from your device to preview
                            it in this browser.
                          </p>
                        </div>
                      </div>

                      <label
                        htmlFor="clinical-file"
                        className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-white/15 bg-black/10 px-5 py-8 text-center transition hover:border-cyan-300/40 hover:bg-white/3"
                      >
                        <FileImage
                          size={28}
                          className="mb-3 text-cyan-200"
                        />

                        <span className="text-sm font-medium text-white">
                          Choose a clinical teaching file
                        </span>

                        <span className="mt-2 text-xs leading-5 text-slate-500">
                          JPG, PNG, WebP, or PDF · Maximum 10 MB
                        </span>

                        <input
                          ref={fileInputRef}
                          id="clinical-file"
                          type="file"
                          accept="image/jpeg,image/png,image/webp,application/pdf"
                          onChange={handleFileChange}
                          className="sr-only"
                        />
                      </label>

                      {uploadMessage && (
                        <p
                          role="status"
                          className="mt-3 text-sm leading-6 text-slate-300"
                        >
                          {uploadMessage}
                        </p>
                      )}

                      {selectedFile && (
                        <div className="mt-4 rounded-xl border border-white/10 bg-black/10 p-4">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex min-w-0 items-start gap-3">
                              <FileImage
                                size={19}
                                className="mt-1 shrink-0 text-cyan-200"
                              />

                              <div className="min-w-0">
                                <p className="break-all text-sm font-medium text-white">
                                  {selectedFile.name}
                                </p>

                                <p className="mt-1 text-xs text-slate-500">
                                  {(selectedFile.size / 1024).toFixed(1)} KB
                                </p>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={clearFile}
                              aria-label="Clear selected file"
                              className="rounded-lg p-1 text-slate-400 transition hover:bg-white/5 hover:text-white"
                            >
                              <X size={18} />
                            </button>
                          </div>

                          {/* Image preview: this is a temporary local browser URL. */}
                          {previewUrl && (
                            <div className="mt-4 overflow-hidden rounded-xl border border-white/10 bg-black/20">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={previewUrl}
                                alt="Local preview of the selected teaching file"
                                className="max-h-105 w-full object-contain"
                              />
                            </div>
                          )}

                          {selectedFile.type === "application/pdf" && (
                            <p className="mt-3 text-xs leading-5 text-slate-400">
                              PDF selected. This demo records the file
                              selection but does not upload or interpret the
                              PDF.
                            </p>
                          )}

                          <button
                            type="button"
                            onClick={() =>
                              setShowInterpretation((current) => !current)
                            }
                            className="mt-4 inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/5"
                          >
                            <Info size={16} />
                            {showInterpretation
                              ? "Hide educational reminder"
                              : "View educational reminder"}
                          </button>

                          {showInterpretation && (
                            <div className="mt-4 rounded-xl border border-amber-300/15 bg-amber-300/5 p-4 text-sm leading-6 text-amber-100/90">
                              This prototype does not analyse the selected
                              image, extract clinical measurements, or produce
                              an interpretation. Use de-identified teaching
                              material only. Do not select identifiable patient
                              information.
                            </div>
                          )}
                        </div>
                      )}

                      <div className="mt-4 flex items-start gap-3 rounded-xl border border-amber-300/15 bg-amber-300/5 p-4">
                        <ShieldCheck
                          size={19}
                          className="mt-0.5 shrink-0 text-amber-200"
                        />

                        <p className="text-xs leading-5 text-slate-300">
                          Privacy note: the selected file is previewed locally
                          in your browser and is not sent to a server by this
                          page. This is not a secure medical-record system.
                          Avoid real patient identifiers and confidential
                          clinical data.
                        </p>
                      </div>
                    </Panel>
                  </>
                ) : (
                  <Panel>
                    <h3 className="font-semibold text-white">
                      Choose a teaching case
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      Select a case from the list to see its learning prompts.
                    </p>
                  </Panel>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 border-t border-white/10 py-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold text-white">Physiolab</p>
              <p className="mt-1 text-xs text-slate-500">
                Interactive Human Physiology Learning Platform
              </p>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-slate-400">
              <Link
                href="/experiments"
                className="transition hover:text-white"
              >
                Experiment Hub
              </Link>

              <Link
                href="/cardiovascular"
                className="transition hover:text-white"
              >
                Cardiovascular Lab
              </Link>

              <Link href="/" className="transition hover:text-white">
                Dashboard
              </Link>
            </div>
          </div>

          <p className="mt-5 max-w-4xl text-xs leading-5 text-slate-500">
            Physiolab is an educational prototype. Its fictional cases and
            illustrative graphics are not intended for diagnosis, treatment
            decisions, or replacement of qualified clinical assessment.
          </p>
        </footer>
      </div>
    </main>
  );
}
