alter table "player"."player_has_room" drop column "is_host";

alter table "player"."room" add column "host_player_id" uuid not null;

alter table "player"."room" add constraint "player_room_host_player_id_fkey" FOREIGN KEY (host_player_id) REFERENCES player.player(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "player"."room" validate constraint "player_room_host_player_id_fkey";

create policy "Enable insert access for all users"
on "player"."player"
as permissive
for insert
to public
with check (true);


create policy "Enable update access for all users"
on "player"."player"
as permissive
for update
to public
using (true)
with check (true);



