"use client";

import { PlayCircle, Timer } from "lucide-react";

export default function ActionButtons() {
  return (
    <div className="mx-5 mt-5 flex flex-col gap-3">
      <button className="flex items-center justify-center gap-2 w-full py-4 bg-brand-pink rounded-full shadow-md hover:bg-brand-pink-hover transition-colors">
        <PlayCircle size={20} className="text-white" />
        <span className="text-white font-bold uppercase tracking-wide text-sm">
          Start Today&apos;s Plan
        </span>
      </button>

      <button className="flex items-center justify-center gap-2 w-full py-4 bg-white border-2 border-brand-pink rounded-full hover:bg-brand-pink-light transition-colors">
        <Timer size={20} className="text-brand-pink" />
        <span className="text-brand-pink font-bold uppercase tracking-wide text-sm">
          Quick Warm-Up
        </span>
      </button>
    </div>
  );
}
