"use client";

import { Star, Flame } from "lucide-react";

export default function StatsCard() {
  return (
    <div className="mx-5 -mt-4 relative z-10 bg-white rounded-2xl shadow-card py-4 px-6">
      <div className="flex items-center justify-around">
        {/* Level */}
        <div className="flex flex-col items-center">
          <span className="text-xl font-bold text-brand-black">1</span>
          <span className="text-xs text-gray-500">Shower Singer</span>
        </div>

        {/* Divider */}
        <div className="w-px h-10 bg-gray-200" />

        {/* XP */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1">
            <Star size={14} className="text-brand-gold fill-brand-gold" />
            <span className="text-xl font-bold text-brand-gold">0</span>
          </div>
          <span className="text-xs text-gray-500">XP</span>
        </div>

        {/* Divider */}
        <div className="w-px h-10 bg-gray-200" />

        {/* Streak */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1">
            <Flame size={14} className="text-orange-500" />
            <span className="text-xl font-bold text-brand-black">&mdash;</span>
          </div>
          <span className="text-xs text-gray-500">Days</span>
        </div>
      </div>
    </div>
  );
}
