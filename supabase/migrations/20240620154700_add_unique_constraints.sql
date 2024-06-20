ALTER TABLE "public"."game"
ADD CONSTRAINT game_name_unique UNIQUE (name);

ALTER TABLE "public"."game_has_accessory"
ADD CONSTRAINT game_accessory_unique UNIQUE (game_id, accessory_id);