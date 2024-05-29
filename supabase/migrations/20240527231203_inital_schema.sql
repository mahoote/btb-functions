create table "public"."accessory" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null
);


alter table "public"."accessory" enable row level security;

create table "public"."game" (
    "id" uuid not null default gen_random_uuid(),
    "title" text not null,
    "messages" text[] not null,
    "intro_message" text,
    "max_players" smallint not null default '0'::smallint,
    "min_players" smallint not null default '0'::smallint,
    "alcohol_level" smallint not null default '0'::smallint,
    "activity_level" smallint not null default '0'::smallint,
    "minutes" smallint not null default '0'::smallint,
    "created_at" timestamp with time zone not null default now(),
    "game_type_id" uuid not null
);


alter table "public"."game" enable row level security;

create table "public"."game_has_accessory" (
    "id" uuid not null default gen_random_uuid(),
    "game_id" uuid not null,
    "accessory_id" uuid not null
);


alter table "public"."game_has_accessory" enable row level security;

create table "public"."game_has_player_type" (
    "id" uuid not null default gen_random_uuid(),
    "game_id" uuid not null,
    "player_type_id" uuid not null
);


alter table "public"."game_has_player_type" enable row level security;

create table "public"."game_type" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null
);


alter table "public"."game_type" enable row level security;

create table "public"."player" (
    "id" uuid not null default gen_random_uuid(),
    "username" text not null,
    "first_name" text,
    "last_name" text,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp without time zone
);


alter table "public"."player" enable row level security;

create table "public"."player_type" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null
);


alter table "public"."player_type" enable row level security;

CREATE UNIQUE INDEX accessory_pkey ON public.accessory USING btree (id);

CREATE UNIQUE INDEX game_has_accessory_pkey ON public.game_has_accessory USING btree (id);

CREATE UNIQUE INDEX game_has_player_type_pkey ON public.game_has_player_type USING btree (id);

CREATE UNIQUE INDEX game_pkey ON public.game USING btree (id);

CREATE UNIQUE INDEX game_type_name_key ON public.game_type USING btree (name);

CREATE UNIQUE INDEX game_type_pkey ON public.game_type USING btree (id);

CREATE UNIQUE INDEX player_pkey ON public.player USING btree (id);

CREATE UNIQUE INDEX player_type_pkey ON public.player_type USING btree (id);

CREATE UNIQUE INDEX player_username_key ON public.player USING btree (username);

alter table "public"."accessory" add constraint "accessory_pkey" PRIMARY KEY using index "accessory_pkey";

alter table "public"."game" add constraint "game_pkey" PRIMARY KEY using index "game_pkey";

alter table "public"."game_has_accessory" add constraint "game_has_accessory_pkey" PRIMARY KEY using index "game_has_accessory_pkey";

alter table "public"."game_has_player_type" add constraint "game_has_player_type_pkey" PRIMARY KEY using index "game_has_player_type_pkey";

alter table "public"."game_type" add constraint "game_type_pkey" PRIMARY KEY using index "game_type_pkey";

alter table "public"."player" add constraint "player_pkey" PRIMARY KEY using index "player_pkey";

alter table "public"."player_type" add constraint "player_type_pkey" PRIMARY KEY using index "player_type_pkey";

alter table "public"."game" add constraint "public_game_game_type_id_fkey" FOREIGN KEY (game_type_id) REFERENCES game_type(id) ON UPDATE CASCADE not valid;

alter table "public"."game" validate constraint "public_game_game_type_id_fkey";

alter table "public"."game_has_accessory" add constraint "public_game_has_accessory_accessory_id_fkey" FOREIGN KEY (accessory_id) REFERENCES accessory(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."game_has_accessory" validate constraint "public_game_has_accessory_accessory_id_fkey";

alter table "public"."game_has_accessory" add constraint "public_game_has_accessory_game_id_fkey" FOREIGN KEY (game_id) REFERENCES game(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."game_has_accessory" validate constraint "public_game_has_accessory_game_id_fkey";

alter table "public"."game_has_player_type" add constraint "public_game_has_player_type_game_id_fkey" FOREIGN KEY (game_id) REFERENCES game(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."game_has_player_type" validate constraint "public_game_has_player_type_game_id_fkey";

alter table "public"."game_has_player_type" add constraint "public_game_has_player_type_player_type_id_fkey" FOREIGN KEY (player_type_id) REFERENCES player_type(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."game_has_player_type" validate constraint "public_game_has_player_type_player_type_id_fkey";

alter table "public"."game_type" add constraint "game_type_name_key" UNIQUE using index "game_type_name_key";

alter table "public"."player" add constraint "player_username_key" UNIQUE using index "player_username_key";

grant delete on table "public"."accessory" to "anon";

grant insert on table "public"."accessory" to "anon";

grant references on table "public"."accessory" to "anon";

grant select on table "public"."accessory" to "anon";

grant trigger on table "public"."accessory" to "anon";

grant truncate on table "public"."accessory" to "anon";

grant update on table "public"."accessory" to "anon";

grant delete on table "public"."accessory" to "authenticated";

grant insert on table "public"."accessory" to "authenticated";

grant references on table "public"."accessory" to "authenticated";

grant select on table "public"."accessory" to "authenticated";

grant trigger on table "public"."accessory" to "authenticated";

grant truncate on table "public"."accessory" to "authenticated";

grant update on table "public"."accessory" to "authenticated";

grant delete on table "public"."accessory" to "service_role";

grant insert on table "public"."accessory" to "service_role";

grant references on table "public"."accessory" to "service_role";

grant select on table "public"."accessory" to "service_role";

grant trigger on table "public"."accessory" to "service_role";

grant truncate on table "public"."accessory" to "service_role";

grant update on table "public"."accessory" to "service_role";

grant delete on table "public"."game" to "anon";

grant insert on table "public"."game" to "anon";

grant references on table "public"."game" to "anon";

grant select on table "public"."game" to "anon";

grant trigger on table "public"."game" to "anon";

grant truncate on table "public"."game" to "anon";

grant update on table "public"."game" to "anon";

grant delete on table "public"."game" to "authenticated";

grant insert on table "public"."game" to "authenticated";

grant references on table "public"."game" to "authenticated";

grant select on table "public"."game" to "authenticated";

grant trigger on table "public"."game" to "authenticated";

grant truncate on table "public"."game" to "authenticated";

grant update on table "public"."game" to "authenticated";

grant delete on table "public"."game" to "service_role";

grant insert on table "public"."game" to "service_role";

grant references on table "public"."game" to "service_role";

grant select on table "public"."game" to "service_role";

grant trigger on table "public"."game" to "service_role";

grant truncate on table "public"."game" to "service_role";

grant update on table "public"."game" to "service_role";

grant delete on table "public"."game_has_accessory" to "anon";

grant insert on table "public"."game_has_accessory" to "anon";

grant references on table "public"."game_has_accessory" to "anon";

grant select on table "public"."game_has_accessory" to "anon";

grant trigger on table "public"."game_has_accessory" to "anon";

grant truncate on table "public"."game_has_accessory" to "anon";

grant update on table "public"."game_has_accessory" to "anon";

grant delete on table "public"."game_has_accessory" to "authenticated";

grant insert on table "public"."game_has_accessory" to "authenticated";

grant references on table "public"."game_has_accessory" to "authenticated";

grant select on table "public"."game_has_accessory" to "authenticated";

grant trigger on table "public"."game_has_accessory" to "authenticated";

grant truncate on table "public"."game_has_accessory" to "authenticated";

grant update on table "public"."game_has_accessory" to "authenticated";

grant delete on table "public"."game_has_accessory" to "service_role";

grant insert on table "public"."game_has_accessory" to "service_role";

grant references on table "public"."game_has_accessory" to "service_role";

grant select on table "public"."game_has_accessory" to "service_role";

grant trigger on table "public"."game_has_accessory" to "service_role";

grant truncate on table "public"."game_has_accessory" to "service_role";

grant update on table "public"."game_has_accessory" to "service_role";

grant delete on table "public"."game_has_player_type" to "anon";

grant insert on table "public"."game_has_player_type" to "anon";

grant references on table "public"."game_has_player_type" to "anon";

grant select on table "public"."game_has_player_type" to "anon";

grant trigger on table "public"."game_has_player_type" to "anon";

grant truncate on table "public"."game_has_player_type" to "anon";

grant update on table "public"."game_has_player_type" to "anon";

grant delete on table "public"."game_has_player_type" to "authenticated";

grant insert on table "public"."game_has_player_type" to "authenticated";

grant references on table "public"."game_has_player_type" to "authenticated";

grant select on table "public"."game_has_player_type" to "authenticated";

grant trigger on table "public"."game_has_player_type" to "authenticated";

grant truncate on table "public"."game_has_player_type" to "authenticated";

grant update on table "public"."game_has_player_type" to "authenticated";

grant delete on table "public"."game_has_player_type" to "service_role";

grant insert on table "public"."game_has_player_type" to "service_role";

grant references on table "public"."game_has_player_type" to "service_role";

grant select on table "public"."game_has_player_type" to "service_role";

grant trigger on table "public"."game_has_player_type" to "service_role";

grant truncate on table "public"."game_has_player_type" to "service_role";

grant update on table "public"."game_has_player_type" to "service_role";

grant delete on table "public"."game_type" to "anon";

grant insert on table "public"."game_type" to "anon";

grant references on table "public"."game_type" to "anon";

grant select on table "public"."game_type" to "anon";

grant trigger on table "public"."game_type" to "anon";

grant truncate on table "public"."game_type" to "anon";

grant update on table "public"."game_type" to "anon";

grant delete on table "public"."game_type" to "authenticated";

grant insert on table "public"."game_type" to "authenticated";

grant references on table "public"."game_type" to "authenticated";

grant select on table "public"."game_type" to "authenticated";

grant trigger on table "public"."game_type" to "authenticated";

grant truncate on table "public"."game_type" to "authenticated";

grant update on table "public"."game_type" to "authenticated";

grant delete on table "public"."game_type" to "service_role";

grant insert on table "public"."game_type" to "service_role";

grant references on table "public"."game_type" to "service_role";

grant select on table "public"."game_type" to "service_role";

grant trigger on table "public"."game_type" to "service_role";

grant truncate on table "public"."game_type" to "service_role";

grant update on table "public"."game_type" to "service_role";

grant delete on table "public"."player" to "anon";

grant insert on table "public"."player" to "anon";

grant references on table "public"."player" to "anon";

grant select on table "public"."player" to "anon";

grant trigger on table "public"."player" to "anon";

grant truncate on table "public"."player" to "anon";

grant update on table "public"."player" to "anon";

grant delete on table "public"."player" to "authenticated";

grant insert on table "public"."player" to "authenticated";

grant references on table "public"."player" to "authenticated";

grant select on table "public"."player" to "authenticated";

grant trigger on table "public"."player" to "authenticated";

grant truncate on table "public"."player" to "authenticated";

grant update on table "public"."player" to "authenticated";

grant delete on table "public"."player" to "service_role";

grant insert on table "public"."player" to "service_role";

grant references on table "public"."player" to "service_role";

grant select on table "public"."player" to "service_role";

grant trigger on table "public"."player" to "service_role";

grant truncate on table "public"."player" to "service_role";

grant update on table "public"."player" to "service_role";

grant delete on table "public"."player_type" to "anon";

grant insert on table "public"."player_type" to "anon";

grant references on table "public"."player_type" to "anon";

grant select on table "public"."player_type" to "anon";

grant trigger on table "public"."player_type" to "anon";

grant truncate on table "public"."player_type" to "anon";

grant update on table "public"."player_type" to "anon";

grant delete on table "public"."player_type" to "authenticated";

grant insert on table "public"."player_type" to "authenticated";

grant references on table "public"."player_type" to "authenticated";

grant select on table "public"."player_type" to "authenticated";

grant trigger on table "public"."player_type" to "authenticated";

grant truncate on table "public"."player_type" to "authenticated";

grant update on table "public"."player_type" to "authenticated";

grant delete on table "public"."player_type" to "service_role";

grant insert on table "public"."player_type" to "service_role";

grant references on table "public"."player_type" to "service_role";

grant select on table "public"."player_type" to "service_role";

grant trigger on table "public"."player_type" to "service_role";

grant truncate on table "public"."player_type" to "service_role";

grant update on table "public"."player_type" to "service_role";


