ALTER TABLE smoke_logs ADD COLUMN is_day_ended boolean not null default false;
ALTER TABLE smoke_logs ADD COLUMN ended_at timestamptz;
ALTER TABLE smoke_logs ADD COLUMN created_at timestamptz default now();