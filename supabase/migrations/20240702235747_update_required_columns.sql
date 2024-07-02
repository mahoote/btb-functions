alter table "public"."game" alter column "activity_level" set default '0'::smallint;

alter table "public"."game" alter column "activity_level" set not null;

alter table "public"."game" alter column "drunk_level" set default '0'::smallint;

alter table "public"."game" alter column "drunk_level" set not null;

alter table "public"."game" alter column "minutes" set default '0'::smallint;

alter table "public"."game" alter column "minutes" set not null;


