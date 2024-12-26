INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at)
VALUES
    ('00000000-0000-0000-0000-000000000000',
     'c8edc523-7b8f-47f0-a9ed-532fccae909d',
     'authenticated', 'authenticated',
     'admin@email.com',
     '$2a$12$lCiooCJX479sTAeCJS4tA.Gtaqm2iQuv9rwdL3ltewckPGFJsg1qq',  /* qwer1234 */
     '2024-07-03 17:07:50.495936+00',
     NULL, '', NULL, '', NULL, '', '', NULL, NULL,
     '{"provider": "email", "providers": ["email"]}',
     '{}', NULL,
     '2024-07-03 17:07:50.48819+00', '2024-07-03 17:07:50.496082+00',
     NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL);

insert into game.game_type (id, name)
values (1, 'Action Card'),
       (2, 'Teams'),
       (3, 'Writing');

SELECT setval('game.game_type_id_seq', (SELECT MAX(id) FROM game.game_type));

insert into game.game_category (id, name)
values (1, 'Quick Thinking'),
       (2, 'Skills'),
       (3, 'Social Interactive'),
       (4, 'Strategy'),
       (5, 'Trivia and Knowledge');

SELECT setval('game.game_category_id_seq', (SELECT MAX(id) FROM game.game_category));

insert into game.game_audience (id, name)
values (1, 'Friends'),
       (2, 'Strangers');

SELECT setval('game.game_audience_id_seq', (SELECT MAX(id) FROM game.game_audience));

insert into game.action_card_state (id, name)
values (1, 'All get same cards'),
       (2, 'All get different cards'),
       (3, 'Some get different cards'),
       (4, 'Random player get card'),
       (5, 'One player get cards');

SELECT setval('game.action_card_state_id_seq', (SELECT MAX(id) FROM game.action_card_state));