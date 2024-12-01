alter table "public"."game" add column "name" character varying not null;

CREATE UNIQUE INDEX game_name_key ON public.game USING btree (name);

alter table "public"."game" add constraint "game_name_key" UNIQUE using index "game_name_key";


