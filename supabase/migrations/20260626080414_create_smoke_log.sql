-- 喫煙本数記録テーブル
create table if not EXISTS smoke_logs (
  id uuid default gen_random_uuid() primary key,
  date date not null default current_date,
  count integer not null default 0,
  is_day_ended boolean not null default false,
  ended_at timestamptz,
  created_at timestamptz default now()
);

-- ユニーク制約
create unique index smoke_logs_date_idx on smoke_logs(date);

-- カウントを+1するファンクション
create or replace function increment_smoke_count(target_date date)
returns void as $$
begin
  insert into smoke_logs (date, count)
  values (target_date, 1)
  on conflict (date)
  do update set count = smoke_logs.count + 1;
end;
$$ language plpgsql;