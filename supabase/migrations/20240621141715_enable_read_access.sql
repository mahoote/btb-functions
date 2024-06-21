create policy "Enable read access for all users"
on "public"."game"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users"
on "public"."game_category"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users"
on "public"."game_has_accessory"
as permissive
for select
to public
using (true);



