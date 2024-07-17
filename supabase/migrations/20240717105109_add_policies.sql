create policy "Enable insert for authenticated users only"
on "public"."action_card"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."action_card"
as permissive
for select
to public
using (true);


create policy "Enable insert for authenticated users only"
on "public"."action_card_settings"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."action_card_settings"
as permissive
for select
to public
using (true);


create policy "Enable insert for authenticated users only"
on "public"."action_card_settings_has_action_card"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."action_card_settings_has_action_card"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users"
on "public"."action_card_state"
as permissive
for select
to public
using (true);



