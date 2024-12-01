alter table "public"."game_translation" alter column "custom_end_game_sentence" drop not null;

create policy "Enable insert for authenticated users only"
on "public"."action_card_settings_translation"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."action_card_settings_translation"
as permissive
for select
to public
using (true);


create policy "Enable insert for authenticated users only"
on "public"."action_card_translation"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."action_card_translation"
as permissive
for select
to public
using (true);


create policy "Enable delete for authenticated users only"
on "public"."game"
as permissive
for delete
to authenticated
using (true);


create policy "Enable insert for authenticated users only"
on "public"."game_translation"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."game_translation"
as permissive
for select
to public
using (true);



