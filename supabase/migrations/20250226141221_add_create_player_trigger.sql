create trigger on_auth_user_created
    after insert on auth.users
    for each row execute function player.create_player_for_new_user();
