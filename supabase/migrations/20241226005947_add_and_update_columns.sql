alter table "game"."action_card_settings" alter column "has_buzzer" set default false;

alter table "game"."action_card_settings" alter column "is_auto_next" set default false;

alter table "game"."action_card_settings" alter column "is_player_creative" set default false;

alter table "game"."game" add column "deleted_at" timestamp with time zone;

alter table "game"."game" add column "has_winner" boolean default false;


