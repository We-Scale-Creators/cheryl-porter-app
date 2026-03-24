"use client";

import { Mic, Star, Sparkles, Crown, Music, BookOpen, Flame } from "lucide-react";

const levels = [
  { name: "Shower Singer", icon: Mic, active: true },
  { name: "Backup Vocalist", icon: Mic, active: false },
  { name: "Lead Singer", icon: Star, active: false },
  { name: "Vocal Star", icon: Sparkles, active: false },
  { name: "Diva", icon: Crown, active: false },
];

export default function ProgressPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Gradient Header */}
      <div className="gradient-header rounded-b-3xl pt-12 pb-8 px-5">
        <h1 className="text-2xl font-bold text-white">My Progress</h1>
        <p className="text-sm text-white/70 mt-1">Your vocal journey so far</p>
      </div>

      {/* Level Card */}
      <div className="mx-5 -mt-4 relative z-10 bg-white rounded-2xl shadow-card p-5">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full ring-2 ring-brand-pink flex items-center justify-center bg-pink-50 flex-shrink-0">
            <Mic size={24} className="text-brand-pink" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Level 1</p>
            <p className="text-lg font-bold text-brand-black">Shower Singer</p>
            <p className="text-sm font-bold text-brand-gold">0 XP</p>
          </div>
        </div>
        <div className="mt-4">
          <div className="w-full h-2 bg-gray-100 rounded-full">
            <div className="h-full bg-brand-pink rounded-full" style={{ width: "0%" }} />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-gray-400">0% to Backup Vocalist</span>
            <span className="text-xs text-gray-400">200 XP needed</span>
          </div>
        </div>
      </div>

      {/* Journey Map */}
      <h2 className="text-lg font-bold text-brand-black mx-5 mt-8 mb-4">Journey Map</h2>
      <div className="mx-5 pb-2 overflow-x-auto hide-scrollbar">
        <div className="flex items-start gap-0 min-w-max">
          {levels.map((level, i) => {
            const Icon = level.icon;
            return (
              <div key={level.name} className="flex items-start">
                <div className="flex flex-col items-center w-20">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      level.active ? "bg-brand-pink" : "bg-gray-100"
                    }`}
                  >
                    <Icon
                      size={20}
                      className={level.active ? "text-white" : "text-gray-400"}
                    />
                  </div>
                  <span
                    className={`text-xs mt-2 text-center leading-tight ${
                      level.active ? "font-bold text-brand-pink" : "text-gray-400"
                    }`}
                  >
                    {level.name}
                  </span>
                </div>
                {i < levels.length - 1 && (
                  <div className="flex items-center h-12">
                    <div
                      className={`w-8 border-t-2 border-dashed ${
                        i === 0 ? "border-brand-pink" : "border-gray-200"
                      }`}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats Row */}
      <h2 className="text-lg font-bold text-brand-black mx-5 mt-8 mb-3">This Week</h2>
      <div className="grid grid-cols-3 gap-3 mx-5">
        <div className="bg-white rounded-xl shadow-card p-3 text-center">
          <Flame size={18} className="text-orange-500 mx-auto" />
          <p className="text-xl font-bold text-brand-black mt-1">&mdash;</p>
          <p className="text-xs text-gray-500">Days</p>
        </div>
        <div className="bg-white rounded-xl shadow-card p-3 text-center">
          <BookOpen size={18} className="text-brand-pink mx-auto" />
          <p className="text-xl font-bold text-brand-black mt-1">0</p>
          <p className="text-xs text-gray-500">Done</p>
        </div>
        <div className="bg-white rounded-xl shadow-card p-3 text-center">
          <Music size={18} className="text-brand-purple mx-auto" />
          <p className="text-xl font-bold text-brand-black mt-1">0</p>
          <p className="text-xs text-gray-500">Done</p>
        </div>
      </div>

      {/* Voice Transformation */}
      <h2 className="text-lg font-bold text-brand-black mx-5 mt-8 mb-3">Voice Transformation</h2>
      <div className="mx-5 bg-white rounded-xl shadow-card p-5 text-center">
        <div className="flex items-center justify-center gap-6">
          <div className="flex flex-col items-center">
            <p className="text-xs text-gray-500 mb-2">Day 1</p>
            <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
              <Music size={24} className="text-gray-400" />
            </div>
          </div>
          <span className="text-sm text-gray-400">vs</span>
          <div className="flex flex-col items-center">
            <p className="text-xs font-bold text-brand-pink mb-2">Today</p>
            <div className="w-14 h-14 rounded-full bg-pink-50 flex items-center justify-center">
              <Music size={24} className="text-brand-pink" />
            </div>
          </div>
        </div>
        <button className="w-full border-2 border-brand-pink text-brand-pink font-bold rounded-full py-3 mt-4">
          Listen & Compare
        </button>
        <p className="text-xs text-gray-400 mt-2">
          Complete a voice recording in your daily check-in to unlock this!
        </p>
      </div>

      <div className="pb-8" />
    </div>
  );
}
