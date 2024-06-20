ALTER TABLE "public"."accessory"
ADD CONSTRAINT accessory_name_unique UNIQUE (name);

ALTER TABLE "public"."game_type"
ADD CONSTRAINT game_type_name_unique UNIQUE (name);

ALTER TABLE "public"."player_group_type"
ADD CONSTRAINT player_group_type_name_unique UNIQUE (name);
