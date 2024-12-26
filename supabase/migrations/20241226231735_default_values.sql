alter table "game"."action_card_settings" alter column "has_buzzer" set not null;

alter table "game"."action_card_settings" alter column "is_auto_next" set not null;

alter table "game"."action_card_settings" alter column "is_player_creative" set not null;

alter table "game"."game" alter column "has_winner" set not null;

alter table "game"."game" alter column "min_players" set not null;


