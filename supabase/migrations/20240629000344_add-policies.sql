create policy "Enable insert for authenticated users only"
on "public"."accessory"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."accessory"
as permissive
for select
to public
using (true);


create policy "Enable insert for authenticated users only"
on "public"."game"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."game_audience"
as permissive
for select
to public
using (true);


create policy "Enable insert for authenticated users only"
on "public"."game_has_accessory"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."game_type"
as permissive
for select
to public
using (true);


create policy "Enable insert for authenticated users only"
on "public"."player_group_type"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."player_group_type"
as permissive
for select
to public
using (true);



