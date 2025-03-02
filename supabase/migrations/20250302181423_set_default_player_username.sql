create sequence "player"."player_username_seq";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION player.set_default_username()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  -- Only set username if it's NULL
  IF NEW.username IS NULL THEN
    NEW.username := 'User' || nextval('player.player_username_seq');
  END IF;
  RETURN NEW;
END;
$function$
;

CREATE TRIGGER trigger_set_username BEFORE INSERT ON player.player FOR EACH ROW EXECUTE FUNCTION player.set_default_username();


