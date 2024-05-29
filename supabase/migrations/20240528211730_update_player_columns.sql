alter table "public"."player" add column "deleted_at" timestamp with time zone;

alter table "public"."player" alter column "updated_at" set data type timestamp with time zone using "updated_at"::timestamp with time zone;


