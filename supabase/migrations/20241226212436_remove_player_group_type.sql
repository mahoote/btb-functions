drop policy "Enable insert for authenticated users only" on "game"."player_group_type";

drop policy "Enable read access for all users" on "game"."player_group_type";

revoke delete on table "game"."player_group_type" from "anon";

revoke insert on table "game"."player_group_type" from "anon";

revoke references on table "game"."player_group_type" from "anon";

revoke select on table "game"."player_group_type" from "anon";

revoke trigger on table "game"."player_group_type" from "anon";

revoke truncate on table "game"."player_group_type" from "anon";

revoke update on table "game"."player_group_type" from "anon";

revoke delete on table "game"."player_group_type" from "authenticated";

revoke insert on table "game"."player_group_type" from "authenticated";

revoke references on table "game"."player_group_type" from "authenticated";

revoke select on table "game"."player_group_type" from "authenticated";

revoke trigger on table "game"."player_group_type" from "authenticated";

revoke truncate on table "game"."player_group_type" from "authenticated";

revoke update on table "game"."player_group_type" from "authenticated";

revoke delete on table "game"."player_group_type" from "service_role";

revoke insert on table "game"."player_group_type" from "service_role";

revoke references on table "game"."player_group_type" from "service_role";

revoke select on table "game"."player_group_type" from "service_role";

revoke trigger on table "game"."player_group_type" from "service_role";

revoke truncate on table "game"."player_group_type" from "service_role";

revoke update on table "game"."player_group_type" from "service_role";

alter table "game"."game" drop constraint "game_game_player_group_type_id_fkey";

alter table "game"."player_group_type" drop constraint "player_group_type_name_unique";

alter table "game"."player_group_type" drop constraint "player_type_pkey";

drop index if exists "game"."player_group_type_name_unique";

drop index if exists "game"."player_type_pkey";

drop table "game"."player_group_type";

alter table "game"."game" drop column "player_group_type_id";


