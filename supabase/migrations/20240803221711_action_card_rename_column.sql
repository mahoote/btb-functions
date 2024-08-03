alter table "public"."action_card" drop column "name";

alter table "public"."action_card" add column "value" character varying not null;


