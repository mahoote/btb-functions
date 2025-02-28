drop policy "Authenticated users can access their own player" on "player"."player";

alter table "player"."room" add column "name" character varying not null;

CREATE UNIQUE INDEX player_has_room_player_id_key ON player.player_has_room USING btree (player_id);

alter table "player"."player_has_room" add constraint "player_has_room_player_id_key" UNIQUE using index "player_has_room_player_id_key";

create policy "Enable read access for all users"
on "player"."player"
as permissive
for select
to public
using (true);


create policy "Enable delete access for all users"
on "player"."player_has_room"
as permissive
for delete
to public
using (true);


create policy "Enable insert access for all users"
on "player"."player_has_room"
as permissive
for insert
to public
with check (true);


create policy "Enable read access for all users"
on "player"."player_has_room"
as permissive
for select
to public
using (true);


create policy "Enable insert for authenticated users only"
on "player"."room"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "player"."room"
as permissive
for select
to public
using (true);


create policy "Enable update for authenticated users only"
on "player"."room"
as permissive
for update
to authenticated
using (true)
with check (true);



