ALTER TABLE "public"."game_has_game_type"
ADD CONSTRAINT game_has_game_type_unique UNIQUE (game_id, game_type_id);