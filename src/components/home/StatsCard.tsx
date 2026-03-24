"use client";

import { Star, Flame } from "lucide-react";

interface StatsCardProps {
  level?: number;
  levelName?: string;
  xp?: number;
  streak?: number;
}

export default function StatsCard({
  level = 1,
  levelName = "Shower Singer",
  xp = 0,
  streak = 0,
}: StatsCardProps) {
  return (
    <div className="mx-5 -mt-4 relative z-10 bg-white rounded-2xl shadow-card py-4 px-6">
      <div className="flex items-center justify-around">
        {/* Level */}
        <div className="flex flex-col items-center">
          <span className="text-xl font-bold text-brand-black">{level}</span>
          <span className="text-xs text-gray-500">{levelName}</span>
        </div>

        {/* Divider */}
        <div className="w-px h-10 bg-gray-200" />

        {/* XP */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1">
            <Star size={14} className="text-brand-gold fill-brand-gold" />
            <span className="text-xl font-bold text-brand-gold">{xp}</span>
          </div>
          <span className="text-xs text-gray-500">XP</span>
        </div>

        {/* Divider */}
        <div className="w-px h-10 bg-gray-200" />

        {/* Streak */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1">
            <Flame size={14} className="text-orange-500" />
            <span className="text-xl font-bold text-brand-black">
              {streak > 0 ? streak : "\u2014"}
            </span>
          </div>
          <span className="text-xs text-gray-500">Days</span>
        </div>
      </div>
    </div>
  );
}
