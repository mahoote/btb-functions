create policy "Enable read access for all users"
on "public"."game_has_game_type"
as permissive
for select
to public
using (true);



