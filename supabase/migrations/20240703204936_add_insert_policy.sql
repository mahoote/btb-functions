create policy "Enable insert for authenticated users only"
on "public"."game_has_game_type"
as permissive
for insert
to authenticated
with check (true);



