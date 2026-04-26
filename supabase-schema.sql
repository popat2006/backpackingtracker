-- Hikes table
create table if not exists hikes (
  id uuid default gen_random_uuid() primary key,
  trail_name text not null,
  location text not null,
  miles numeric(10,2) not null,
  date date not null,
  notes text default '',
  created_at timestamp with time zone default now()
);

-- Camping trips table
create table if not exists camping_trips (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  location text not null,
  nights integer not null,
  date date not null,
  notes text default '',
  created_at timestamp with time zone default now()
);

-- Photos table (linked to hikes or camping trips)
create table if not exists hike_photos (
  id uuid default gen_random_uuid() primary key,
  hike_id uuid references hikes(id) on delete cascade,
  camping_trip_id uuid references camping_trips(id) on delete cascade,
  photo_url text not null,
  caption text default '',
  created_at timestamp with time zone default now(),
  constraint one_parent check (
    (hike_id is not null and camping_trip_id is null) or
    (hike_id is null and camping_trip_id is not null)
  )
);

-- Enable Row Level Security (open for now, configure auth later)
alter table hikes enable row level security;
alter table camping_trips enable row level security;
alter table hike_photos enable row level security;

-- Open policies for now (we can restrict with auth later)
create policy if not exists "Allow all" on hikes for all using (true) with check (true);
create policy if not exists "Allow all" on camping_trips for all using (true) with check (true);
create policy if not exists "Allow all" on hike_photos for all using (true) with check (true);

-- Create storage bucket for photos (run this in Storage > Create bucket if UI fails)
-- insert into storage.buckets (id, name, public) values ('hike-photos', 'hike-photos', true)
-- on conflict (id) do nothing;
