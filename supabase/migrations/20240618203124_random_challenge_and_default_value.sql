create table "public"."challenge" (
    "id" uuid not null default gen_random_uuid(),
    "message" text not null,
    "created_at" timestamp with time zone not null default now()
);


alter table "public"."challenge" enable row level security;

alter table "public"."player" alter column "is_guest" set default true;

CREATE UNIQUE INDEX challenge_pkey ON public.challenge USING btree (id);

alter table "public"."challenge" add constraint "challenge_pkey" PRIMARY KEY using index "challenge_pkey";

create or replace view "public"."random_challenge" as  SELECT challenge.id,
    challenge.message,
    challenge.created_at
   FROM challenge
  ORDER BY (random());


grant delete on table "public"."challenge" to "anon";

grant insert on table "public"."challenge" to "anon";

grant references on table "public"."challenge" to "anon";

grant select on table "public"."challenge" to "anon";

grant trigger on table "public"."challenge" to "anon";

grant truncate on table "public"."challenge" to "anon";

grant update on table "public"."challenge" to "anon";

grant delete on table "public"."challenge" to "authenticated";

grant insert on table "public"."challenge" to "authenticated";

grant references on table "public"."challenge" to "authenticated";

grant select on table "public"."challenge" to "authenticated";

grant trigger on table "public"."challenge" to "authenticated";

grant truncate on table "public"."challenge" to "authenticated";

grant update on table "public"."challenge" to "authenticated";

grant delete on table "public"."challenge" to "service_role";

grant insert on table "public"."challenge" to "service_role";

grant references on table "public"."challenge" to "service_role";

grant select on table "public"."challenge" to "service_role";

grant trigger on table "public"."challenge" to "service_role";

grant truncate on table "public"."challenge" to "service_role";

grant update on table "public"."challenge" to "service_role";

create policy "Enable insert for authenticated users only"
on "public"."challenge"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."challenge"
as permissive
for select
to public
using (true);



