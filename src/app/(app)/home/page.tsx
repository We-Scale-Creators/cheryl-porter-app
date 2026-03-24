"use client";

import StatsCard from "@/components/home/StatsCard";
import TipCard from "@/components/home/TipCard";
import ActionButtons from "@/components/home/ActionButtons";
import ContinueLearning from "@/components/home/ContinueLearning";
import RecommendedForYou from "@/components/home/RecommendedForYou";

export default function HomePage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Gradient Header */}
      <div className="gradient-header px-5 pt-12 pb-12 rounded-b-3xl">
        <div className="flex items-center justify-between mb-4">
          <span className="text-white/80 text-xs font-medium uppercase tracking-widest">
            Mama Cheryl&apos;s Studio
          </span>
          <div className="w-10 h-10 rounded-full bg-gray-400 border-2 border-brand-gold flex items-center justify-center">
            <span className="text-white text-sm font-bold">S</span>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-white">Hey, Superstar!</h1>
        <p className="text-white/80 text-sm mt-1">
          Your voice is a gift. Let&apos;s polish it today.
        </p>
      </div>

      {/* Stats Card (overlapping gradient) */}
      <StatsCard />

      {/* Mama Cheryl's Tip */}
      <TipCard />

      {/* Action Buttons */}
      <ActionButtons />

      {/* Continue Learning */}
      <ContinueLearning />

      {/* Recommended for You */}
      <RecommendedForYou />

      {/* Bottom spacing */}
      <div className="pb-8" />
    </div>
  );
}
