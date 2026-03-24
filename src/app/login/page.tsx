"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignIn, setIsSignIn] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSignUp = async () => {
    setError("");
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: name || "Superstar" },
      },
    });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push(`/onboarding?name=${encodeURIComponent(name || "Superstar")}`);
  };

  const handleSignIn = async () => {
    setError("");
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    // Check if onboarding is completed
    const { data: profile } = await supabase
      .from("profiles")
      .select("onboarding_completed")
      .eq("id", data.user.id)
      .single();

    if (profile?.onboarding_completed) {
      router.push("/home");
    } else {
      router.push("/onboarding");
    }
  };

  const handleSubmit = () => {
    if (isSignIn) {
      handleSignIn();
    } else {
      handleSignUp();
    }
  };

  return (
    <div className="min-h-screen gradient-header">
      {/* Top branding */}
      <p className="text-xs uppercase tracking-[0.25em] text-white/70 text-center pt-14">
        Mama Cheryl&apos;s Studio
      </p>

      {/* Photo placeholder */}
      <div className="mx-8 mt-6 h-48 rounded-2xl bg-white/15 flex items-center justify-center">
        <span className="text-white/40 text-sm">Cheryl Porter Photo</span>
      </div>

      {/* Welcome text */}
      <h1 className="text-3xl font-bold text-white text-center mt-6">
        {isSignIn ? "Welcome back!" : "Welcome, superstar!"}
      </h1>
      <p className="text-base text-white/80 text-center mt-2 mx-8">
        {isSignIn
          ? "Sign in to continue your vocal journey."
          : "I\u2019m Mama Cheryl, and I\u2019m so excited you\u2019re here. Let\u2019s set up your profile!"}
      </p>

      {/* Social proof badge */}
      <div className="flex justify-center mt-4">
        <div className="bg-white/15 backdrop-blur rounded-full px-4 py-2 flex items-center gap-2">
          <span className="text-white font-bold text-sm">⭐ 4.8</span>
          <span className="text-white/30">|</span>
          <span className="text-white/80 text-sm">100,000+ Singers</span>
        </div>
      </div>

      {/* Login card */}
      <div className="bg-white rounded-3xl mx-5 mt-8 p-6 shadow-lg">
        {/* Name input (signup only) */}
        {!isSignIn && (
          <div>
            <label className="text-sm font-medium text-brand-black mb-1 block">
              Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="What should Mama Cheryl call you?"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink"
            />
          </div>
        )}

        {/* Email input */}
        <div className={isSignIn ? "" : "mt-3"}>
          <label className="text-sm font-medium text-brand-black mb-1 block">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink"
          />
        </div>

        {/* Password input */}
        <div className="mt-3">
          <label className="text-sm font-medium text-brand-black mb-1 block">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={isSignIn ? "Your password" : "Create a password"}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink"
          />
        </div>

        {/* Error message */}
        {error && (
          <p className="text-red-500 text-sm mt-3">{error}</p>
        )}

        {/* CTA Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-brand-pink text-white font-bold text-base uppercase tracking-wide rounded-full py-4 mt-5 shadow-md hover:bg-brand-pink-hover transition-colors disabled:opacity-50"
        >
          {loading
            ? "Please wait..."
            : isSignIn
              ? "Sign In"
              : "Let\u2019s Get Started!"}
        </button>

        {/* Divider */}
        {!isSignIn && (
          <>
            <div className="flex items-center gap-3 mt-5">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400">or continue with</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Social login buttons */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <button className="bg-white border border-gray-200 rounded-xl py-3 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                <span className="w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold">G</span>
                <span className="text-sm font-medium">Google</span>
              </button>
              <button className="bg-white border border-gray-200 rounded-xl py-3 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                <span className="w-5 h-5 text-center text-sm">🍎</span>
                <span className="text-sm font-medium">Apple</span>
              </button>
            </div>
          </>
        )}
      </div>

      {/* Sign in / Sign up toggle */}
      <p className="text-white/70 text-sm text-center mt-4 mb-8">
        {isSignIn ? "Don\u2019t have an account? " : "Already have an account? "}
        <button
          onClick={() => {
            setIsSignIn(!isSignIn);
            setError("");
          }}
          className="font-bold text-white underline"
        >
          {isSignIn ? "Sign up" : "Sign in"}
        </button>
      </p>
    </div>
  );
}
