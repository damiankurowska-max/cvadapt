"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Logo from "../components/Logo";

const STEPS = [
  {
    id: "objectif",
    question: "Tu cherches quoi en ce moment ?",
    emoji: "🎯",
    options: [
      { value: "stage",       label: "Un stage",               emoji: "🏢" },
      { value: "alternance",  label: "Une alternance",          emoji: "🎓" },
      { value: "cdi",         label: "Un premier emploi / CDI", emoji: "💼" },
      { value: "reconversion",label: "Une reconversion",        emoji: "🔄" },
    ],
  },
  {
    id: "secteur",
    question: "Ton domaine de prédilection ?",
    emoji: "📚",
    options: [
      { value: "tech",        label: "Tech / Dev",              emoji: "💻" },
      { value: "finance",     label: "Finance / Compta",        emoji: "📊" },
      { value: "marketing",   label: "Marketing / Com",         emoji: "📣" },
      { value: "commerce",    label: "Commerce / Vente",        emoji: "🤝" },
      { value: "rh",          label: "RH / Management",         emoji: "👥" },
      { value: "autre",       label: "Autre",                   emoji: "✨" },
    ],
  },
  {
    id: "cv",
    question: "Tu as un CV existant ?",
    emoji: "📄",
    options: [
      { value: "oui",         label: "Oui, je veux l'améliorer", emoji: "✏️" },
      { value: "non",         label: "Non, je pars de zéro",     emoji: "🚀" },
    ],
  },
];

export default function Onboarding() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    // Skip onboarding si déjà fait
    try {
      if (localStorage.getItem("cvadapt_onboarding_done")) {
        router.replace("/generate");
      }
    } catch {}
  }, [router]);

  function handleSelect(value) {
    setSelected(value);
  }

  function handleNext() {
    if (!selected) return;
    const currentStep = STEPS[step];
    const newAnswers = { ...answers, [currentStep.id]: selected };
    setAnswers(newAnswers);

    if (step < STEPS.length - 1) {
      setAnimating(true);
      setTimeout(() => {
        setStep(step + 1);
        setSelected(null);
        setAnimating(false);
      }, 200);
    } else {
      // Onboarding terminé
      try {
        localStorage.setItem("cvadapt_onboarding", JSON.stringify(newAnswers));
        localStorage.setItem("cvadapt_onboarding_done", "1");
      } catch {}

      // Redirection selon CV existant
      if (newAnswers.cv === "oui") {
        router.push("/analyse");
      } else {
        router.push("/generate");
      }
    }
  }

  function skip() {
    try { localStorage.setItem("cvadapt_onboarding_done", "1"); } catch {}
    router.push("/generate");
  }

  if (!isLoaded) return null;

  const currentStep = STEPS[step];
  const progress = ((step) / STEPS.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col">
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between max-w-2xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <Logo size={28} />
          <span className="text-lg font-bold text-blue-600">CVAdapt</span>
        </div>
        <button onClick={skip} className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
          Passer →
        </button>
      </header>

      {/* Progress bar */}
      <div className="w-full max-w-2xl mx-auto px-6 mb-2">
        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-1.5 text-right">
          Question {step + 1} sur {STEPS.length}
        </p>
      </div>

      {/* Card centrale */}
      <div className="flex-1 flex items-center justify-center px-6 py-8">
        <div
          className="bg-white rounded-3xl shadow-xl border border-gray-100 w-full max-w-lg p-8 transition-all duration-200"
          style={{ opacity: animating ? 0 : 1, transform: animating ? "translateY(8px)" : "translateY(0)" }}
        >
          {/* Emoji + question */}
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">{currentStep.emoji}</div>
            <h1 className="text-2xl font-extrabold text-gray-900 leading-tight">
              {currentStep.question}
            </h1>
            {step === 0 && user?.firstName && (
              <p className="text-gray-400 text-sm mt-2">
                Bienvenue {user.firstName} ! 2 minutes pour personnaliser ton expérience.
              </p>
            )}
          </div>

          {/* Options */}
          <div className={`grid gap-3 mb-8 ${currentStep.options.length > 4 ? "grid-cols-2" : "grid-cols-1"}`}>
            {currentStep.options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleSelect(opt.value)}
                className={`flex items-center gap-3 px-5 py-4 rounded-2xl border-2 text-left transition-all font-medium text-sm ${
                  selected === opt.value
                    ? "border-blue-600 bg-blue-50 text-blue-700 shadow-sm"
                    : "border-gray-100 bg-gray-50 text-gray-700 hover:border-gray-200 hover:bg-white"
                }`}
              >
                <span className="text-xl flex-shrink-0">{opt.emoji}</span>
                <span className="font-semibold">{opt.label}</span>
                {selected === opt.value && (
                  <span className="ml-auto text-blue-600 font-bold text-base">✓</span>
                )}
              </button>
            ))}
          </div>

          {/* Bouton suivant */}
          <button
            onClick={handleNext}
            disabled={!selected}
            className={`w-full py-4 rounded-2xl font-bold text-base transition-all ${
              selected
                ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                : "bg-gray-100 text-gray-300 cursor-not-allowed"
            }`}
          >
            {step < STEPS.length - 1 ? "Continuer →" : "Accéder à CVAdapt →"}
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center pb-6 text-xs text-gray-400">
        Tes réponses restent sur ton appareil · Jamais partagées
      </div>
    </div>
  );
}
