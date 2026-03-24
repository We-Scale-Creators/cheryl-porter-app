"use client";

import { Mic } from "lucide-react";

export default function RecommendedForYou() {
  return (
    <div>
      <h2 className="text-lg font-bold text-brand-black mx-5 mt-8 mb-3">
        Recommended for You
      </h2>
      <div className="mx-5 rounded-xl overflow-hidden shadow-card">
        {/* Thumbnail area */}
        <div className="h-[120px] bg-brand-gradient flex flex-col items-center justify-center relative">
          <Mic size={32} className="text-white/60 mb-2" />
          <p className="text-white font-bold text-lg">Cheryl Porter</p>
          <p className="text-white/70 text-xs">Vocal Mastery Series</p>
        </div>

        {/* Info area */}
        <div className="bg-white p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-bold text-base text-brand-black">
                Unlock Your Voice!
              </h3>
              <p className="text-sm text-gray-500 mt-0.5">
                Based on your profile
              </p>
            </div>
            <span className="text-xs uppercase bg-brand-pink text-white rounded-full px-2 py-0.5 font-bold flex-shrink-0 mt-0.5">
              Featured
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
