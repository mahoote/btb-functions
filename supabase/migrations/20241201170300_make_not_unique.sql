-- Remove unique constraint from the "name" column in "game_translation"
alter table "public"."game_translation" drop constraint if exists "game_translation_name_key";

drop index if exists "public"."game_translation_name_key";
