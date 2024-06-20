alter table "public"."game" drop column "messages";

alter table "public"."game" drop column "title";

alter table "public"."game" add column "descriptions" text[] not null;

alter table "public"."game" add column "intro_description" text;

alter table "public"."game" add column "name" character varying not null;


