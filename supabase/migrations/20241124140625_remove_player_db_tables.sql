revoke delete on table "public"."player" from "anon";

revoke insert on table "public"."player" from "anon";

revoke references on table "public"."player" from "anon";

revoke select on table "public"."player" from "anon";

revoke trigger on table "public"."player" from "anon";

revoke truncate on table "public"."player" from "anon";

revoke update on table "public"."player" from "anon";

revoke delete on table "public"."player" from "authenticated";

revoke insert on table "public"."player" from "authenticated";

revoke references on table "public"."player" from "authenticated";

revoke select on table "public"."player" from "authenticated";

revoke trigger on table "public"."player" from "authenticated";

revoke truncate on table "public"."player" from "authenticated";

revoke update on table "public"."player" from "authenticated";

revoke delete on table "public"."player" from "service_role";

revoke insert on table "public"."player" from "service_role";

revoke references on table "public"."player" from "service_role";

revoke select on table "public"."player" from "service_role";

revoke trigger on table "public"."player" from "service_role";

revoke truncate on table "public"."player" from "service_role";

revoke update on table "public"."player" from "service_role";

revoke delete on table "public"."player_has_room" from "anon";

revoke insert on table "public"."player_has_room" from "anon";

revoke references on table "public"."player_has_room" from "anon";

revoke select on table "public"."player_has_room" from "anon";

revoke trigger on table "public"."player_has_room" from "anon";

revoke truncate on table "public"."player_has_room" from "anon";

revoke update on table "public"."player_has_room" from "anon";

revoke delete on table "public"."player_has_room" from "authenticated";

revoke insert on table "public"."player_has_room" from "authenticated";

revoke references on table "public"."player_has_room" from "authenticated";

revoke select on table "public"."player_has_room" from "authenticated";

revoke trigger on table "public"."player_has_room" from "authenticated";

revoke truncate on table "public"."player_has_room" from "authenticated";

revoke update on table "public"."player_has_room" from "authenticated";

revoke delete on table "public"."player_has_room" from "service_role";

revoke insert on table "public"."player_has_room" from "service_role";

revoke references on table "public"."player_has_room" from "service_role";

revoke select on table "public"."player_has_room" from "service_role";

revoke trigger on table "public"."player_has_room" from "service_role";

revoke truncate on table "public"."player_has_room" from "service_role";

revoke update on table "public"."player_has_room" from "service_role";

revoke delete on table "public"."room" from "anon";

revoke insert on table "public"."room" from "anon";

revoke references on table "public"."room" from "anon";

revoke select on table "public"."room" from "anon";

revoke trigger on table "public"."room" from "anon";

revoke truncate on table "public"."room" from "anon";

revoke update on table "public"."room" from "anon";

revoke delete on table "public"."room" from "authenticated";

revoke insert on table "public"."room" from "authenticated";

revoke references on table "public"."room" from "authenticated";

revoke select on table "public"."room" from "authenticated";

revoke trigger on table "public"."room" from "authenticated";

revoke truncate on table "public"."room" from "authenticated";

revoke update on table "public"."room" from "authenticated";

revoke delete on table "public"."room" from "service_role";

revoke insert on table "public"."room" from "service_role";

revoke references on table "public"."room" from "service_role";

revoke select on table "public"."room" from "service_role";

revoke trigger on table "public"."room" from "service_role";

revoke truncate on table "public"."room" from "service_role";

revoke update on table "public"."room" from "service_role";

alter table "public"."player" drop constraint "player_username_key";

alter table "public"."player_has_room" drop constraint "public_player_has_room_player_id_fkey";

alter table "public"."player_has_room" drop constraint "public_player_has_room_room_id_fkey";

alter table "public"."player" drop constraint "player_pkey";

alter table "public"."player_has_room" drop constraint "player_has_room_pkey";

alter table "public"."room" drop constraint "room_pkey";

drop index if exists "public"."player_has_room_pkey";

drop index if exists "public"."player_pkey";

drop index if exists "public"."player_username_key";

drop index if exists "public"."room_pkey";

drop table "public"."player";

drop table "public"."player_has_room";

drop table "public"."room";


