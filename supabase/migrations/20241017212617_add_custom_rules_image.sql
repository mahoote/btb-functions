alter table "public"."game" add column "custom_rules_image_url" character varying;

create policy "Enable update for authenticated users only"
on "public"."game"
as permissive
for update
to authenticated
using (true)
with check (true);



