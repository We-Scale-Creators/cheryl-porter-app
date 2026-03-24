export interface Profile {
  id: string;
  display_name: string;
  email: string;
  avatar_url: string | null;
  level: number;
  level_name: string;
  xp: number;
  streak_count: number;
  practice_reminder_time: string;
  onboarding_completed: boolean;
  onboarding_answers: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  category: "warmup" | "technique" | "song";
  subcategory: string | null;
  difficulty: "beginner" | "intermediate" | "advanced";
  duration_minutes: number;
  xp_reward: number;
  thumbnail_url: string | null;
  content_url: string | null;
  sort_order: number;
  created_at: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  completed: boolean;
  completed_at: string | null;
  xp_earned: number;
  created_at: string;
}

export interface DailyCheckin {
  id: string;
  user_id: string;
  date: string;
  reflection_text: string | null;
  recording_url: string | null;
  xp_earned: number;
  created_at: string;
}
