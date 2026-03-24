"use client";

import { useEffect, useState } from "react";
import { Search, Clock } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { Lesson } from "@/lib/supabase/types";

const filters = ["All", "Beginner", "Intermediate", "Advanced"];

/* Fallback data if Supabase fetch fails */
const fallbackLessons: Lesson[] = [
  { id: "1", title: "Morning Wake-Up", description: "", category: "warmup", subcategory: "quick", difficulty: "beginner", duration_minutes: 3, xp_reward: 15, thumbnail_url: null, content_url: null, sort_order: 1, created_at: "" },
  { id: "2", title: "Quick Lip Trills", description: "", category: "warmup", subcategory: "quick", difficulty: "beginner", duration_minutes: 4, xp_reward: 15, thumbnail_url: null, content_url: null, sort_order: 2, created_at: "" },
  { id: "3", title: "Full Body Warm-Up", description: "", category: "warmup", subcategory: "standard", difficulty: "beginner", duration_minutes: 10, xp_reward: 25, thumbnail_url: null, content_url: null, sort_order: 3, created_at: "" },
  { id: "4", title: "Range Exploration", description: "", category: "warmup", subcategory: "standard", difficulty: "intermediate", duration_minutes: 12, xp_reward: 30, thumbnail_url: null, content_url: null, sort_order: 4, created_at: "" },
  { id: "5", title: "Breath Control Basics", description: "", category: "technique", subcategory: null, difficulty: "beginner", duration_minutes: 15, xp_reward: 40, thumbnail_url: null, content_url: null, sort_order: 5, created_at: "" },
  { id: "6", title: "Vocal Resonance 101", description: "", category: "technique", subcategory: null, difficulty: "intermediate", duration_minutes: 20, xp_reward: 50, thumbnail_url: null, content_url: null, sort_order: 6, created_at: "" },
  { id: "7", title: "Happy Birthday (Easy)", description: "", category: "song", subcategory: null, difficulty: "beginner", duration_minutes: 10, xp_reward: 35, thumbnail_url: null, content_url: null, sort_order: 7, created_at: "" },
  { id: "8", title: "Amazing Grace", description: "", category: "song", subcategory: null, difficulty: "beginner", duration_minutes: 15, xp_reward: 45, thumbnail_url: null, content_url: null, sort_order: 8, created_at: "" },
];

function getTagStyle(category: string, subcategory: string | null) {
  if (category === "warmup" && subcategory === "quick") return { color: "bg-emerald-100 text-emerald-700", label: "quick" };
  if (category === "warmup" && subcategory === "standard") return { color: "bg-blue-100 text-blue-700", label: "standard" };
  if (category === "technique") return { color: "bg-purple-100 text-purple-700", label: "technique" };
  return { color: "bg-pink-100 text-pink-700", label: "song" };
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function LessonCard({ lesson }: { lesson: Lesson }) {
  const tag = getTagStyle(lesson.category, lesson.subcategory);
  return (
    <div className="bg-white rounded-xl shadow-card p-4">
      <span className={`text-xs font-bold uppercase px-2 py-0.5 rounded-full ${tag.color}`}>
        {tag.label}
      </span>
      <p className="font-bold text-sm mt-2">{lesson.title}</p>
      <div className="flex items-center gap-1 mt-1">
        <Clock size={12} className="text-gray-400" />
        <span className="text-xs text-gray-500">{lesson.duration_minutes} min</span>
      </div>
      <p className="text-xs text-gray-400 mt-0.5">{capitalize(lesson.difficulty)}</p>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl shadow-card p-4 animate-pulse">
      <div className="h-4 w-12 bg-gray-200 rounded-full" />
      <div className="h-4 w-24 bg-gray-200 rounded mt-2" />
      <div className="h-3 w-16 bg-gray-100 rounded mt-2" />
    </div>
  );
}

export default function LibraryPage() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchLessons() {
      const { data, error } = await supabase
        .from("lessons")
        .select("*")
        .order("sort_order");
      if (error || !data) {
        setLessons(fallbackLessons);
      } else {
        setLessons(data as Lesson[]);
      }
      setLoading(false);
    }
    fetchLessons();
  }, [supabase]);

  const warmUpsQuick = lessons.filter((l) => l.category === "warmup" && l.subcategory === "quick");
  const warmUpsStandard = lessons.filter((l) => l.category === "warmup" && l.subcategory === "standard");
  const techniqueLessons = lessons.filter((l) => l.category === "technique");
  const songPractice = lessons.filter((l) => l.category === "song");

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

      {loading ? (
        /* Loading skeletons */
        <div className="mx-5 mt-6">
          <div className="h-5 w-32 bg-gray-200 rounded mb-3 animate-pulse" />
          <div className="grid grid-cols-2 gap-3">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </div>
      ) : (
        <>
          {/* Vocal Warm-Ups */}
          <h2 className="text-lg font-bold text-brand-black mx-5 mt-6 mb-3">Vocal Warm-Ups</h2>

          {warmUpsQuick.length > 0 && (
            <>
              <p className="text-sm text-gray-500 font-medium mx-5 mb-2">Quick (3-5 min)</p>
              <div className="grid grid-cols-2 gap-3 mx-5">
                {warmUpsQuick.map((l) => <LessonCard key={l.id} lesson={l} />)}
              </div>
            </>
          )}

          {warmUpsStandard.length > 0 && (
            <>
              <p className="text-sm text-gray-500 font-medium mx-5 mt-4 mb-2">Standard (10-15 min)</p>
              <div className="grid grid-cols-2 gap-3 mx-5">
                {warmUpsStandard.map((l) => <LessonCard key={l.id} lesson={l} />)}
              </div>
            </>
          )}

          {/* Technique Lessons */}
          {techniqueLessons.length > 0 && (
            <>
              <h2 className="text-lg font-bold text-brand-black mx-5 mt-8 mb-3">Technique Lessons</h2>
              <div className="grid grid-cols-2 gap-3 mx-5">
                {techniqueLessons.map((l) => <LessonCard key={l.id} lesson={l} />)}
              </div>
            </>
          )}

          {/* Song Practice */}
          {songPractice.length > 0 && (
            <>
              <h2 className="text-lg font-bold text-brand-black mx-5 mt-8 mb-3">Song Practice</h2>
              <div className="grid grid-cols-2 gap-3 mx-5">
                {songPractice.map((l) => <LessonCard key={l.id} lesson={l} />)}
              </div>
            </>
          )}
        </>
      )}

      <div className="pb-8" />
    </div>
  );
}
