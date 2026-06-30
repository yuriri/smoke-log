create policy "Enable update for all users"
on "public"."smoke_logs"
for update
to public
using (true)
with check (true);