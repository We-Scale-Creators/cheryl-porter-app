"use client";

import { Music } from "lucide-react";

export default function ContinueLearning() {
  return (
    <div>
      <h2 className="text-lg font-bold text-brand-black mx-5 mt-8 mb-3">
        Continue Learning
      </h2>
      <div className="mx-5 bg-white rounded-xl shadow-card py-8 text-center">
        <div className="w-12 h-12 rounded-full bg-brand-pink-light flex items-center justify-center mx-auto">
          <Music size={24} className="text-brand-pink" />
        </div>
        <p className="font-bold text-base text-brand-black mt-3">
          No lessons yet, superstar!
        </p>
        <p className="text-sm text-gray-500 mt-1 px-6">
          Tap &ldquo;Start Today&apos;s Plan&rdquo; above to begin your vocal journey.
        </p>
        <p className="text-xs text-gray-400 italic mt-3 px-8">
          &ldquo;Consistency is the secret ingredient to greatness.&rdquo; — Cheryl
        </p>
      </div>
    </div>
  );
}
