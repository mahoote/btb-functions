alter table "public"."game" alter column "min_players" drop default;

alter table "public"."game" alter column "min_players" drop not null;


