"use client";

import { Mic } from "lucide-react";

export default function TipCard() {
  return (
    <div className="mx-5 mt-4 bg-brand-cream rounded-xl py-4 px-4 border-l-[3px] border-brand-pink">
      <div className="flex gap-3">
        {/* Cheryl photo placeholder */}
        <div className="flex-shrink-0 w-11 h-11 rounded-full border-2 border-brand-pink bg-brand-pink-light flex items-center justify-center">
          <span className="text-lg">👩‍🎤</span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-1">
            <div className="flex items-center gap-1">
              <Mic size={14} className="text-brand-pink" />
              <span className="text-sm font-bold text-brand-black">
                Mama Cheryl&apos;s Tip
              </span>
            </div>
            <span className="text-xs text-gray-400 flex-shrink-0 ml-2">
              Monday, Mar 23
            </span>
          </div>
          <p className="text-sm italic text-brand-black leading-relaxed">
            &ldquo;Remember, darling, your breath is the fuel for your song. Focus on low, belly breaths today.&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}
