"use client";

import { Search, Clock } from "lucide-react";

const filters = ["All", "Beginner", "Intermediate", "Advanced"];

const warmUpsQuick = [
  { title: "Morning Wake-Up", duration: "3 min", level: "Beginner" },
  { title: "Quick Lip Trills", duration: "4 min", level: "Beginner" },
];

const warmUpsStandard = [
  { title: "Full Body Warm-Up", duration: "10 min", level: "Beginner" },
  { title: "Range Exploration", duration: "12 min", level: "Intermediate" },
];

const techniqueLessons = [
  { title: "Breath Control Basics", duration: "15 min", level: "Beginner" },
  { title: "Vocal Resonance 101", duration: "20 min", level: "Intermediate" },
];

const songPractice = [
  { title: "Happy Birthday (Easy)", duration: "10 min", level: "Beginner" },
  { title: "Amazing Grace", duration: "15 min", level: "Beginner" },
];

function LessonCard({
  title,
  duration,
  level,
  tagColor,
  tagLabel,
}: {
  title: string;
  duration: string;
  level: string;
  tagColor: string;
  tagLabel: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-card p-4">
      <span className={`text-xs font-bold uppercase px-2 py-0.5 rounded-full ${tagColor}`}>
        {tagLabel}
      </span>
      <p className="font-bold text-sm mt-2">{title}</p>
      <div className="flex items-center gap-1 mt-1">
        <Clock size={12} className="text-gray-400" />
        <span className="text-xs text-gray-500">{duration}</span>
      </div>
      <p className="text-xs text-gray-400 mt-0.5">{level}</p>
    </div>
  );
}

export default function LibraryPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Gradient Header with Hero */}
      <div className="gradient-header pt-12 pb-16 px-5 rounded-b-3xl">
        <div className="w-full h-32 rounded-xl bg-white/10 flex items-center justify-center">
          <span className="text-white/50 text-sm">Cheryl Porter Photo</span>
        </div>
        <h1 className="text-3xl font-bold text-white mt-4">Lesson Library</h1>
      </div>

      {/* Search Bar (overlapping) */}
      <div className="-mt-6 mx-5 relative z-10 bg-white rounded-full shadow-card flex items-center px-4 py-3">
        <Search size={18} className="text-gray-400 flex-shrink-0" />
        <span className="text-sm text-gray-400 ml-3">Search lessons, courses, warm-ups...</span>
      </div>

      {/* Filter Pills */}
      <div className="mx-5 mt-4 flex gap-2 overflow-x-auto hide-scrollbar">
        {filters.map((filter, i) => (
          <button
            key={filter}
            className={
              i === 0
                ? "bg-brand-pink text-white rounded-full px-4 py-1.5 text-sm font-semibold whitespace-nowrap"
                : "bg-gray-100 text-gray-600 rounded-full px-4 py-1.5 text-sm font-medium whitespace-nowrap"
            }
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Vocal Warm-Ups */}
      <h2 className="text-lg font-bold text-brand-black mx-5 mt-6 mb-3">Vocal Warm-Ups</h2>

      <p className="text-sm text-gray-500 font-medium mx-5 mb-2">Quick (3-5 min)</p>
      <div className="grid grid-cols-2 gap-3 mx-5">
        {warmUpsQuick.map((item) => (
          <LessonCard
            key={item.title}
            {...item}
            tagColor="bg-emerald-100 text-emerald-700"
            tagLabel="quick"
          />
        ))}
      </div>

      <p className="text-sm text-gray-500 font-medium mx-5 mt-4 mb-2">Standard (10-15 min)</p>
      <div className="grid grid-cols-2 gap-3 mx-5">
        {warmUpsStandard.map((item) => (
          <LessonCard
            key={item.title}
            {...item}
            tagColor="bg-blue-100 text-blue-700"
            tagLabel="standard"
          />
        ))}
      </div>

      {/* Technique Lessons */}
      <h2 className="text-lg font-bold text-brand-black mx-5 mt-8 mb-3">Technique Lessons</h2>
      <div className="grid grid-cols-2 gap-3 mx-5">
        {techniqueLessons.map((item) => (
          <LessonCard
            key={item.title}
            {...item}
            tagColor="bg-purple-100 text-purple-700"
            tagLabel="technique"
          />
        ))}
      </div>

      {/* Song Practice */}
      <h2 className="text-lg font-bold text-brand-black mx-5 mt-8 mb-3">Song Practice</h2>
      <div className="grid grid-cols-2 gap-3 mx-5">
        {songPractice.map((item) => (
          <LessonCard
            key={item.title}
            {...item}
            tagColor="bg-pink-100 text-pink-700"
            tagLabel="song"
          />
        ))}
      </div>

      <div className="pb-8" />
    </div>
  );
}
