"use client";

import { useState, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";
import { createClient } from "@/lib/supabase/client";

/* ------------------------------------------------------------------ */
/*  Step definitions                                                   */
/* ------------------------------------------------------------------ */

interface SingleSelectStep {
  type: "single";
  title: string;
  subtitle: string;
  options: { label: string; desc: string; emoji: string }[];
}

interface MultiSelectStep {
  type: "multi";
  title: string;
  subtitle: string;
  options: string[];
}

interface FinalStep {
  type: "final";
}

type Step = SingleSelectStep | MultiSelectStep | FinalStep;

const steps: Step[] = [
  {
    type: "single",
    title: "What\u2019s your singing experience?",
    subtitle: "This helps us personalize your journey",
    options: [
      { label: "Complete Beginner", desc: "I\u2019ve never had a lesson", emoji: "\uD83C\uDFA4" },
      { label: "Casual Singer", desc: "I sing for fun but want to improve", emoji: "\uD83C\uDFB5" },
      { label: "Some Training", desc: "I\u2019ve taken lessons before", emoji: "\uD83C\uDFB6" },
      { label: "Experienced", desc: "I perform regularly", emoji: "\u2B50" },
    ],
  },
  {
    type: "multi",
    title: "What genres do you love?",
    subtitle: "Pick all that apply",
    options: ["Pop", "R&B/Soul", "Rock", "Classical", "Jazz", "Gospel"],
  },
  {
    type: "multi",
    title: "What are your vocal goals?",
    subtitle: "Select your top priorities",
    options: [
      "\uD83C\uDFAF Hit Higher Notes",
      "\uD83D\uDCAA Build Confidence",
      "\u2728 Improve Tone",
      "\uD83C\uDFB5 Sing in Tune",
      "\uD83C\uDFA4 Perform Live",
    ],
  },
  {
    type: "single",
    title: "How much time can you practice daily?",
    subtitle: "Every minute counts, sweetheart!",
    options: [
      { label: "5-10 minutes", desc: "Quick sessions", emoji: "\u23F1\uFE0F" },
      { label: "15-20 minutes", desc: "Focused practice", emoji: "\uD83D\uDCAA" },
      { label: "30+ minutes", desc: "Deep training", emoji: "\uD83D\uDD25" },
      { label: "It varies", desc: "Flexible schedule", emoji: "\uD83C\uDFB5" },
    ],
  },
  {
    type: "single",
    title: "When do you prefer to practice?",
    subtitle: "We\u2019ll build your plan around this",
    options: [
      { label: "Morning", desc: "Start the day with your voice", emoji: "\u2600\uFE0F" },
      { label: "Afternoon", desc: "Midday vocal boost", emoji: "\uD83C\uDF24\uFE0F" },
      { label: "Evening", desc: "Wind down with music", emoji: "\uD83C\uDF19" },
      { label: "No preference", desc: "Whenever I can", emoji: "\uD83C\uDFB5" },
    ],
  },
  {
    type: "single",
    title: "What\u2019s your biggest vocal challenge?",
    subtitle: "Honey, we\u2019re gonna tackle this together!",
    options: [
      { label: "Vocal range", desc: "I can\u2019t hit the notes I want", emoji: "\uD83C\uDFB5" },
      { label: "Breath control", desc: "I run out of air", emoji: "\uD83D\uDCA8" },
      { label: "Confidence", desc: "I\u2019m afraid to sing in front of others", emoji: "\uD83D\uDE36" },
      { label: "Consistency", desc: "I don\u2019t practice regularly", emoji: "\uD83D\uDCC5" },
    ],
  },
  {
    type: "single",
    title: "What motivates you most?",
    subtitle: "Dream big, baby! I believe in you!",
    options: [
      { label: "Personal growth", desc: "I want to discover my voice", emoji: "\uD83C\uDF1F" },
      { label: "Performing", desc: "I want to sing for others", emoji: "\uD83C\uDFA4" },
      { label: "Career", desc: "I want to go professional", emoji: "\uD83D\uDE80" },
      { label: "Fun", desc: "I just love singing!", emoji: "\uD83D\uDE04" },
    ],
  },
  { type: "final" },
];

/* ------------------------------------------------------------------ */
/*  Main component (wrapped in Suspense for useSearchParams)          */
/* ------------------------------------------------------------------ */

function OnboardingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userName = searchParams.get("name") || "Superstar";

  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<Record<number, string | string[]>>({});
  const [saving, setSaving] = useState(false);

  const step = steps[currentStep];
  const supabase = createClient();

  /* helpers */
  const goNext = useCallback(() => {
    setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  }, []);

  const goBack = () => setCurrentStep((s) => Math.max(s - 1, 0));

  const selectSingle = (value: string) => {
    setSelections((prev) => ({ ...prev, [currentStep]: value }));
    setTimeout(goNext, 500);
  };

  const toggleMulti = (value: string) => {
    setSelections((prev) => {
      const current = (prev[currentStep] as string[]) || [];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [currentStep]: next };
    });
  };

  const handleFinish = async () => {
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase
          .from("profiles")
          .update({
            onboarding_completed: true,
            onboarding_answers: selections,
            display_name: userName,
          })
          .eq("id", user.id);
      }
    } catch {
      // Allow navigation even if save fails
    }
    setSaving(false);
    router.push("/home");
  };

  /* ---- render ---- */

  return (
    <div className="min-h-screen gradient-header flex flex-col">
      {/* Progress bar */}
      <div className="px-5 pt-12 pb-4">
        <div className="flex gap-1.5">
          {steps.map((_, i) => (
            <div
              key={i}
              className={clsx(
                "h-1 flex-1 rounded-full transition-colors",
                i <= currentStep ? "bg-brand-pink" : "bg-white/30"
              )}
            />
          ))}
        </div>
      </div>

      {/* Final step — stays on gradient */}
      {step.type === "final" ? (
        <div className="flex-1 flex flex-col items-center justify-center px-5 pb-8">
          <span className="text-5xl">🎉</span>
          <h1 className="text-3xl font-bold text-white text-center mt-4">
            Your plan is ready!
          </h1>
          <p className="text-base text-white/80 text-center mt-3 mx-5">
            We&apos;re starting with the essentials — breath, tone, and confidence. You&apos;ve got this!
          </p>

          {/* Summary card */}
          <div className="bg-white/15 backdrop-blur rounded-2xl p-6 mx-5 mt-8 w-full">
            <h2 className="text-xl font-bold text-white">Foundation Builder</h2>
            <p className="text-sm text-white/70 mt-1">~30+ minutes daily</p>
            <div className="mt-4 space-y-2">
              {[
                "Daily warm-ups to build vocal strength",
                "Breathing exercises for control and support",
                "Simple songs to build confidence step by step",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <span className="text-brand-pink text-sm mt-0.5">✦</span>
                  <span className="text-sm text-white/90">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={handleFinish}
            disabled={saving}
            className="bg-white text-brand-pink font-bold text-lg uppercase rounded-full py-4 w-full mt-8 shadow-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : "Let\u2019s Go Baby! 🎤"}
          </button>

          {/* Back */}
          <button
            onClick={goBack}
            className="text-white/60 text-sm mt-4"
          >
            ← Back
          </button>
        </div>
      ) : (
        /* Steps 0-6: white card */
        <div className="bg-white rounded-t-3xl mt-4 flex-1 flex flex-col min-h-0">
          <div className="flex-1 overflow-y-auto px-5 pt-8 pb-8">
            {/* Back button */}
            {currentStep > 0 && (
              <button
                onClick={goBack}
                className="text-sm text-gray-400 mb-4"
              >
                ← Back
              </button>
            )}

            <h1 className="text-xl font-bold text-brand-black">{step.title}</h1>
            <p className="text-sm text-gray-500 mt-1">{step.subtitle}</p>

            {/* Single select options */}
            {step.type === "single" && (
              <div className="flex flex-col gap-3 mt-6">
                {step.options.map((opt) => {
                  const selected = selections[currentStep] === opt.label;
                  return (
                    <button
                      key={opt.label}
                      onClick={() => selectSingle(opt.label)}
                      className={clsx(
                        "border-2 rounded-xl p-4 flex items-center gap-3 text-left transition-colors",
                        selected
                          ? "border-brand-pink bg-brand-pink/5"
                          : "border-gray-100 bg-gray-50"
                      )}
                    >
                      <span className="text-xl flex-shrink-0">{opt.emoji}</span>
                      <div>
                        <p className="font-semibold text-sm text-brand-black">{opt.label}</p>
                        <p className="text-xs text-gray-500">{opt.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Multi select options */}
            {step.type === "multi" && (
              <>
                <div className="flex flex-wrap gap-2 mt-6">
                  {step.options.map((opt) => {
                    const selected = ((selections[currentStep] as string[]) || []).includes(opt);
                    return (
                      <button
                        key={opt}
                        onClick={() => toggleMulti(opt)}
                        className={clsx(
                          "rounded-full px-5 py-3 border-2 text-sm font-medium transition-colors",
                          selected
                            ? "bg-brand-pink text-white border-brand-pink"
                            : "border-gray-200 text-brand-black"
                        )}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={goNext}
                  className="w-full bg-brand-pink text-white font-bold uppercase tracking-wide rounded-full py-4 mt-8 shadow-md hover:bg-brand-pink-hover transition-colors"
                >
                  Next
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen gradient-header flex items-center justify-center">
          <span className="text-white text-lg">Loading...</span>
        </div>
      }
    >
      <OnboardingContent />
    </Suspense>
  );
}
