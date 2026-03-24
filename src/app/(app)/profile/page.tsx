"use client";

import {
  UserPen,
  Bell,
  Clock,
  CreditCard,
  Heart,
  Mic,
  History,
  ChevronRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface SettingsRowProps {
  icon: LucideIcon;
  label: string;
  subtitle?: string;
  isLast?: boolean;
}

function SettingsRow({ icon: Icon, label, subtitle, isLast }: SettingsRowProps) {
  return (
    <div
      className={`px-5 py-4 flex items-center justify-between ${
        !isLast ? "border-b border-gray-50" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-pink-50 flex items-center justify-center flex-shrink-0">
          <Icon size={18} className="text-brand-pink" />
        </div>
        <div>
          <p className="text-sm font-medium text-brand-black">{label}</p>
          {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
        </div>
      </div>
      <ChevronRight size={18} className="text-gray-300 flex-shrink-0" />
    </div>
  );
}

export default function ProfilePage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Gradient Header with User Info */}
      <div className="gradient-header rounded-b-3xl pt-12 pb-8 px-5">
        <div className="flex items-center">
          <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-brand-gold flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xl font-bold">S</span>
          </div>
          <div className="ml-4">
            <h1 className="text-xl font-bold text-white">Superstar</h1>
            <p className="text-sm text-white/70">user@example.com</p>
            <p className="text-xs text-brand-gold mt-1">
              Level 1 · Shower Singer · 0 XP
            </p>
          </div>
        </div>
      </div>

      {/* Account Section */}
      <p className="text-sm font-bold uppercase tracking-wide text-gray-400 mx-5 mt-6 mb-2">
        Account
      </p>
      <div className="mx-5 bg-white rounded-xl shadow-card overflow-hidden">
        <SettingsRow icon={UserPen} label="Edit Profile" />
        <SettingsRow icon={Bell} label="Notifications" />
        <SettingsRow icon={Clock} label="Practice Reminder" subtitle="Daily at 9:00 AM" />
        <SettingsRow icon={CreditCard} label="Subscription" subtitle="Free Plan" isLast />
      </div>

      {/* My Content Section */}
      <p className="text-sm font-bold uppercase tracking-wide text-gray-400 mx-5 mt-6 mb-2">
        My Content
      </p>
      <div className="mx-5 bg-white rounded-xl shadow-card overflow-hidden">
        <SettingsRow icon={Heart} label="My Favorites" subtitle="0 saved" />
        <SettingsRow icon={Mic} label="My Recordings" subtitle="0 sessions" />
        <SettingsRow icon={History} label="Session History" subtitle="Detailed practice log" isLast />
      </div>

      {/* App Info */}
      <p className="text-xs text-gray-300 text-center mt-8">
        Mama Cheryl&apos;s Studio v2.0
      </p>
      <p className="text-xs text-gray-300 text-center mt-1">
        Made with love by Mama Cheryl
      </p>

      <div className="pb-8" />
    </div>
  );
}
