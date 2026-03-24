-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- Profiles table (extends Supabase auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  display_name text not null default '',
  email text not null default '',
  avatar_url text,
  level integer not null default 1,
  level_name text not null default 'Shower Singer',
  xp integer not null default 0,
  streak_count integer not null default 0,
  practice_reminder_time time default '09:00:00',
  onboarding_completed boolean not null default false,
  onboarding_answers jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Lessons table
create table public.lessons (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text not null default '',
  category text not null check (category in ('warmup', 'technique', 'song')),
  subcategory text,
  difficulty text not null default 'beginner' check (difficulty in ('beginner', 'intermediate', 'advanced')),
  duration_minutes integer not null default 5,
  xp_reward integer not null default 10,
  thumbnail_url text,
  content_url text,
  sort_order integer not null default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- User progress tracking
create table public.user_progress (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  lesson_id uuid references public.lessons(id) on delete cascade not null,
  completed boolean not null default false,
  completed_at timestamp with time zone,
  xp_earned integer not null default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, lesson_id)
);

-- Daily check-ins
create table public.daily_checkins (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  date date not null default current_date,
  reflection_text text,
  recording_url text,
  xp_earned integer not null default 10,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, date)
);

-- Row Level Security
alter table public.profiles enable row level security;
alter table public.lessons enable row level security;
alter table public.user_progress enable row level security;
alter table public.daily_checkins enable row level security;

-- Profiles: users can read and update their own profile
create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

-- Lessons: everyone can read lessons (public content)
create policy "Anyone can view lessons" on public.lessons
  for select using (true);

-- User progress: users can read and write their own progress
create policy "Users can view own progress" on public.user_progress
  for select using (auth.uid() = user_id);
create policy "Users can insert own progress" on public.user_progress
  for insert with check (auth.uid() = user_id);
create policy "Users can update own progress" on public.user_progress
  for update using (auth.uid() = user_id);

-- Daily check-ins: users can read and write their own
create policy "Users can view own checkins" on public.daily_checkins
  for select using (auth.uid() = user_id);
create policy "Users can insert own checkins" on public.daily_checkins
  for insert with check (auth.uid() = user_id);

-- Function to create a profile when a new user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'display_name', ''),
    coalesce(new.email, '')
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to auto-create profile on signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Seed lessons data
insert into public.lessons (title, description, category, subcategory, difficulty, duration_minutes, xp_reward, sort_order) values
  ('Morning Wake-Up', 'Gentle vocal wake-up routine', 'warmup', 'quick', 'beginner', 3, 15, 1),
  ('Quick Lip Trills', 'Fast lip trill exercises', 'warmup', 'quick', 'beginner', 4, 15, 2),
  ('Full Body Warm-Up', 'Complete warm-up routine', 'warmup', 'standard', 'beginner', 10, 25, 3),
  ('Range Exploration', 'Explore your vocal range', 'warmup', 'standard', 'intermediate', 12, 30, 4),
  ('Breath Control Basics', 'Foundation breathing exercises', 'technique', null, 'beginner', 15, 40, 5),
  ('Vocal Resonance 101', 'Master resonance and projection', 'technique', null, 'intermediate', 20, 50, 6),
  ('Happy Birthday (Easy)', 'Learn this classic in your style', 'song', null, 'beginner', 10, 35, 7),
  ('Amazing Grace', 'Beautiful hymn for vocal control', 'song', null, 'beginner', 15, 45, 8);
