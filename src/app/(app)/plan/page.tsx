"use client";

import { Bell, Sunrise, Target, Mic, Moon } from "lucide-react";

const tasks = [
  {
    icon: Sunrise,
    title: "Morning Warm-Up",
    description: "Lip trills, breathing & sirens",
    duration: "5 min",
    xp: 25,
  },
  {
    icon: Target,
    title: "Skill-Building Exercise",
    description: "Focused technique work",
    duration: "10 min",
    xp: 40,
  },
  {
    icon: Mic,
    title: "Practice Song",
    description: "Apply skills to a real song",
    duration: "15 min",
    xp: 50,
  },
  {
    icon: Moon,
    title: "Cool-Down",
    description: "Gentle humming & vocal rest",
    duration: "3 min",
    xp: 15,
  },
];

export default function PlanPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Daily Check-In Banner */}
      <div className="bg-brand-cream px-5 py-3 flex justify-between items-center">
        <div className="flex items-start gap-2">
          <Bell size={18} className="text-brand-black mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-brand-black">Time for your daily check-in!</p>
            <p className="text-xs text-gray-500">Tap to reflect on today&apos;s practice</p>
          </div>
        </div>
        <span className="text-xs font-bold text-brand-gold bg-brand-gold/10 rounded-full px-2 py-1 flex-shrink-0">
          +10 XP
        </span>
      </div>

      {/* Plan Header */}
      <div className="gradient-header rounded-b-3xl pt-8 pb-8 px-5">
        <p className="text-xs uppercase tracking-widest text-white/70">Daily Vocal Plan</p>
        <h1 className="text-2xl font-bold text-white mt-1">Superstar&apos;s Plan</h1>
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-white/80">0% complete</span>
          <span className="text-sm text-white/80">0/130 XP</span>
        </div>
        <div className="w-full h-2 bg-white/20 rounded-full mt-2">
          <div className="h-full bg-brand-gold rounded-full" style={{ width: "0%" }} />
        </div>
      </div>

      {/* Today's Tasks */}
      <h2 className="text-lg font-bold text-brand-black mx-5 mt-6">Today&apos;s Tasks</h2>
      <p className="text-sm text-gray-500 mx-5 mb-3">Complete all 4 for maximum XP</p>

      <div className="flex flex-col gap-3 mx-5">
        {tasks.map((task) => {
          const Icon = task.icon;
          return (
            <div
              key={task.title}
              className="bg-white rounded-xl shadow-card p-4 flex items-center gap-4"
            >
              <div className="w-11 h-11 rounded-full bg-pink-50 flex items-center justify-center flex-shrink-0">
                <Icon size={20} className="text-brand-pink" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-brand-black">{task.title}</p>
                <p className="text-xs text-gray-500">{task.description}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-xs text-gray-500">{task.duration}</p>
                <p className="text-xs font-bold text-brand-gold">+{task.xp} XP</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bonus Quests */}
      <h2 className="text-lg font-bold text-brand-black mx-5 mt-8">
        Bonus Quests ✨
      </h2>
      <p className="text-sm text-gray-500 mx-5 mb-3">Optional — earn extra XP</p>

      <div className="mx-5 bg-white border-l-[3px] border-brand-gold rounded-xl shadow-card p-4 flex items-center gap-4">
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-brand-black">Record a Voice Note</p>
          <p className="text-xs text-gray-500">Capture your voice today for progress tracking</p>
        </div>
        <span className="text-xs font-bold text-brand-gold flex-shrink-0">+20 XP</span>
      </div>

      <div className="pb-8" />
    </div>
  );
}
