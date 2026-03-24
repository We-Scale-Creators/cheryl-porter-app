"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Profile } from "@/lib/supabase/types";
import StatsCard from "@/components/home/StatsCard";
import TipCard from "@/components/home/TipCard";
import ActionButtons from "@/components/home/ActionButtons";
import ContinueLearning from "@/components/home/ContinueLearning";
import RecommendedForYou from "@/components/home/RecommendedForYou";

export default function HomePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const supabase = createClient();

  useEffect(() => {
    async function loadProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();
        if (data) setProfile(data as Profile);
      }
    }
    loadProfile();
  }, [supabase]);

  const displayName = profile?.display_name || "Superstar";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Gradient Header */}
      <div className="gradient-header px-5 pt-12 pb-12 rounded-b-3xl">
        <div className="flex items-center justify-between mb-4">
          <span className="text-white/80 text-xs font-medium uppercase tracking-widest">
            Mama Cheryl&apos;s Studio
          </span>
          <div className="w-10 h-10 rounded-full bg-gray-400 border-2 border-brand-gold flex items-center justify-center">
            <span className="text-white text-sm font-bold">{initial}</span>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-white">Hey, {displayName}!</h1>
        <p className="text-white/80 text-sm mt-1">
          Your voice is a gift. Let&apos;s polish it today.
        </p>
      </div>

      {/* Stats Card (overlapping gradient) */}
      <StatsCard
        level={profile?.level}
        levelName={profile?.level_name}
        xp={profile?.xp}
        streak={profile?.streak_count}
      />

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
