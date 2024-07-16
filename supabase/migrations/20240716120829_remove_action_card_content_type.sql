revoke delete on table "public"."action_card_content_type" from "anon";

revoke insert on table "public"."action_card_content_type" from "anon";

revoke references on table "public"."action_card_content_type" from "anon";

revoke select on table "public"."action_card_content_type" from "anon";

revoke trigger on table "public"."action_card_content_type" from "anon";

revoke truncate on table "public"."action_card_content_type" from "anon";

revoke update on table "public"."action_card_content_type" from "anon";

revoke delete on table "public"."action_card_content_type" from "authenticated";

revoke insert on table "public"."action_card_content_type" from "authenticated";

revoke references on table "public"."action_card_content_type" from "authenticated";

revoke select on table "public"."action_card_content_type" from "authenticated";

revoke trigger on table "public"."action_card_content_type" from "authenticated";

revoke truncate on table "public"."action_card_content_type" from "authenticated";

revoke update on table "public"."action_card_content_type" from "authenticated";

revoke delete on table "public"."action_card_content_type" from "service_role";

revoke insert on table "public"."action_card_content_type" from "service_role";

revoke references on table "public"."action_card_content_type" from "service_role";

revoke select on table "public"."action_card_content_type" from "service_role";

revoke trigger on table "public"."action_card_content_type" from "service_role";

revoke truncate on table "public"."action_card_content_type" from "service_role";

revoke update on table "public"."action_card_content_type" from "service_role";

alter table "public"."action_card_content_type" drop constraint "action_card_content_type_name_key";

alter table "public"."action_card_settings" drop constraint "public_action_card_settings_content_type_id_fkey";

alter table "public"."action_card_content_type" drop constraint "action_card_content_type_pkey";

drop index if exists "public"."action_card_content_type_name_key";

drop index if exists "public"."action_card_content_type_pkey";

drop table "public"."action_card_content_type";

alter table "public"."action_card_settings" drop column "content_type_id";


