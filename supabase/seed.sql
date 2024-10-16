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



insert into player (username, first_name, last_name, is_guest)
values ('MaHooTe', 'Martin', 'Teigen', false);

insert into player (username)
values ('winner_123'),
       ('CoolUsername45');

insert into challenge (message)
values ('Hver gang noen skåler, må du rope "Skål!" høyere enn alle andre.'),
       ('Gi subtile komplimenter til tre forskjellige personer i løpet av kvelden uten at de legger merke til det.'),
       ('Ta et snikbilde med telefonen av fem forskjellige personer uten at noen oppdager deg.'),
       ('I løpet av kvelden må du gi en kort, improvisert tale på et passende tidspunkt uten at det virker planlagt.'),
       ('Bruk et tilfeldig fremmedord i samtalene dine minst tre ganger i løpet av kvelden.');

insert into game_type (id, name)
values (1, 'Action Card'),
       (2, 'Teams'),
       (3, 'Writing');

SELECT setval('game_type_id_seq', (SELECT MAX(id) FROM game_type));

insert into accessory (id, name)
values (1, 'Paper'),
       (2, 'Pen'),
       (3, 'Blindfold'),
       (4, 'Shot glass'),
       (5, 'Ping pong ball'),
       (6, 'Cups'),
       (7, 'Random items'),
       (8, 'Chairs'),
       (9, 'Music');

SELECT setval('accessory_id_seq', (SELECT MAX(id) FROM accessory));

insert into player_group_type (id, name)
values (1, 'Even'),
       (2, 'Odd'),
       (3, 'Pairs');

SELECT setval('player_group_type_id_seq', (SELECT MAX(id) FROM player_group_type));

insert into game_category (id, name)
values (1, 'Quick Thinking'),
       (2, 'Skills'),
       (3, 'Social Interactive'),
       (4, 'Strategy'),
       (5, 'Trivia and Knowledge');

SELECT setval('game_category_id_seq', (SELECT MAX(id) FROM game_category));

insert into game_audience (id, name)
values (1, 'Friends'),
       (2, 'Strangers');

SELECT setval('game_audience_id_seq', (SELECT MAX(id) FROM game_audience));

insert into action_card_state (id, name)
values (1, 'All get same cards'),
       (2, 'All get different cards'),
       (3, 'Some get different cards'),
       (4, 'Random player get card'),
       (5, 'One player get cards');

SELECT setval('action_card_state_id_seq', (SELECT MAX(id) FROM action_card_state));

insert into game (id, name, intro_description,
                  descriptions,
                  min_players, max_players, activity_level, drunk_level, minutes, game_category_id, player_group_type_id, game_audience_id)
values (1, 'Fast Word', null,
        ARRAY['Each player must quickly say a word related to the previous. For example, if the first word is "beach", the next player could say "sand". No repeating words. If a player hesitates for more than 5 seconds, or repeats a word, they must take a drink.'],
        3, null, 0, 1, 3, 1, null, null),

       (2, 'Sevens Cheers', null,
        ARRAY['Players take turns saying numbers in ascending order. However, if the number is divisible by 7 or contains 7, the player must say "Cheers" instead of the number. If they fail to do so within a 3-second window, they must drink. The player that reaches 50 ends the game.'],
        3, null, 0, 2, 5, 1, null, null),

       (3, 'Fast Friend Facts', null,
        ARRAY['All players sit in a circle, the game host will call a player''s name followed by a question like "What''s their favourite movie?". The first person who answers correctly doesn''t have to drink, everyone else drinks.'],
        4, null, 0, 1, 2, 1, null, 1),

       (4, 'Blindfold Draw', null,
        ARRAY['One player is blindfolded and given a word. They must draw it while others guess. If no one guesses correctly after 10 seconds, everybody drinks, and the game goes on. If guessed correctly, the guesser and the artist both can give out sips. Then a new person becomes the artist, and you continue.'],
        4, null, 1, 1, 4, 2, null, null),

       (5, 'Skill Shot', null,
        ARRAY['Each player is given a shot glass filled with water, and a ping pong ball. Taking turns, players are required to bounce the ping pong ball off the table and into the shot glass. If a player successfully lands the ball in their shot, everyone else drinks. If the player fails, they drink. The game is played in quick rounds, so everyone gets a lot of turns in a short amount of time.'],
        3, null, 2, 2, 3, 2, null, null),

       (6, 'Spin the Shot', null,
        ARRAY['Each player takes turns in spinning a shot glass, and whoever it points to has to fill it with alcohol, take the shot and then spin it next.'],
        3, null, 1, 2, 2, 3, null, null),

       (7, 'What the Fuck', 'Shout out funny nicknames and keep the chants going. Mess up? You drink!',
        ARRAY['To start with, each player chooses their name. Something like "Shit Fuck", "Dirty Fuck", or "Cheeky Fuck". Then, when a new round starts, everybody chants "What''s the name of the fucking game, say what the fuck" in rhythm.',
        'Next, somebody starts by chanting his or her own name, followed by "what the fuck", followed by a call to someone else.',
        'For example, a player may chant: "Dirty Fuck, what the fuck, how about a Cheeky Fuck". In this instance, the player named Cheeky Fuck would now chant: "Cheeky Fuck, what the fuck, how about a Shit Fuck", etc. If a player hesitates for too long, or says the wrong thing, they must drink!'],
        3, null, 0, 1, 5, 3, null, null),

       (8, 'Spirit or Water', null,
        ARRAY['All players are given a drink, most have water, but a few have spirits. Players sip their drinks and try to act natural. The group then discusses and tries to deduce who has the spirits. If they guess wrong, the accusers drink. If they guess right, the one with the spirit drinks. The game is over when the impostors are caught.'],
        4, null, 0, 1, 3, 3, null, null),

       (9, 'Charades Revamp', null,
        ARRAY['Players take turns drawing a card with a task written on it. The task must be acted out without using any words or sounds, while all other players guess what it is. Hit the "buzzer" to answer. If a player guesses wrong, both that player and the actor take a drink. If it’s correct, everybody else drinks. The game continues until all cards have been drawn.'],
        3, null, 0, 2, 4, 3, null, null),

       (10, 'Booze Tower', null,
        ARRAY['Two teams compete to build the highest tower from random items within 3 minutes. The twist? All players must be holding a drink in one hand! The team who builds the highest tower wins and the losing team must take a shot!'],
        4, null, 2, 2, 3, 4, 1, 1),

       (11, 'Number of Sips', null,
        ARRAY['Each player will have five cards with numbers from 1 to 5. Simultaneously, all players will reveal a card from their hand. The player with the highest card must take as many drinks as the number on their card. If there''s a tie, those players must "battle" by revealing another card. The higher card in the battle will take the sum total of drinks from both the previous and current cards. Then that card is used and a new round starts. The game is over when no one has anymore cards.'],
        3, null, 0, 2, 3, 4, null, null),

       (12, 'Duo Charades', null,
        ARRAY['Players team up in pairs. Act out a word or phrase without speaking while others guess. The twist: one person can only use their voice, the other only their body. If a team can''t get others to guess in time, they both drink. The game is over when the time is up.'],
        6, null, 2, 2, 8, 1, 1, null),

       (13, 'Trust Your Teammate', null,
        ARRAY['Players team up in pairs. One player is blindfolded, and the other player guides them using only verbal instructions. Each team has a different item they must find in the room (assigned by another team). The blindfolded player must find the item and bring it back to the start. The first team to do it wins, and the other teams must chug.'],
        4, null, 2, 1, 4, 1, 1, null),

       (14, 'Seven Wonders of the World', null,
        ARRAY['The host gets a list of the seven wonders of the world. Then a player tries to name a wonder, before passing it on to the next. This continues in rapid succession. If a player repeats a wonder, names something that isn''t one of the seven wonders, or fails to name anything, they must take a drink. The game continues until all seven wonders of the world is named.'],
        8, 8, 1, 0, 5, 5, null, null),

       (15, 'Puzzled Pints', null,
        ARRAY['Players must answer trivia questions with a setup similar to musical chairs. The player who cannot find a seat when the music stops must drink and then answer a trivia question. If they answer correctly, they can rejoin the game. If they answer incorrectly, they are out. The game is over when one player remains.'],
        4, null, 2, 2, 5, 5, null, null);

insert into game_has_accessory (game_id, accessory_id)
values (4, 1),
       (4, 2),
       (4, 3),
       (5, 4),
       (5, 5),
       (6, 4),
       (8, 6),
       (10, 7),
       (13, 3),
       (15, 8),
       (15, 9);

insert into game_has_game_type (game_id, game_type_id)
values (1, 1),
       (3, 1),
       (4, 1),
       (9, 1),
       (10, 2),
       (11, 1),
       (12, 2),
       (13, 1),
       (15, 1);


-- Insert dummy games

insert into game (id, name,
                  descriptions,
                  min_players, activity_level, drunk_level, minutes, game_category_id)
values (20, 'Test Game 20',
        ARRAY['This is a test'],
        3, 0, 0, 3, 1),

       (21, 'Test Game 21',
        ARRAY['This is a test'],
        4, 0, 0, 2, 1),

       (22, 'Test Game 22',
        ARRAY['This is a test'],
        null, 0, 1, 3, 1),

       (23, 'Test Game 23',
        ARRAY['This is a test'],
        null, 0, 1, 5, 1),

       (24, 'Test Game 24',
        ARRAY['This is a test'],
        null, 1, 0, 6, 1),

       (25, 'Test Game 25',
        ARRAY['This is a test'],
        null, 0, 1, 3, 1),

       (26, 'Test Game 26',
        ARRAY['This is a test'],
        null, 1, 2, 3, 1),

       (27, 'Test Game 27',
        ARRAY['This is a test'],
        null, 2, 0, 5, 1),

       (28, 'Test Game 28',
        ARRAY['This is a test'],
        null, 2, 1, 3, 1),

       (29, 'Test Game 29',
        ARRAY['This is a test'],
        null, 2, 2, 3, 1),

       (30, 'Test Game 30',
        ARRAY['This is a test'],
        3, 0, 0, 3, 2),

       (31, 'Test Game 31',
        ARRAY['This is a test'],
        4, 0, 0, 5, 2),

       (32, 'Test Game 32',
        ARRAY['This is a test'],
        null, 0, 1, 3, 2),

       (33, 'Test Game 33',
        ARRAY['This is a test'],
        null, 0, 1, 3, 2),

       (34, 'Test Game 34',
        ARRAY['This is a test'],
        null, 1, 0, 7, 2),

       (35, 'Test Game 35',
        ARRAY['This is a test'],
        null, 0, 1, 3, 2),

       (36, 'Test Game 36',
        ARRAY['This is a test'],
        null, 1, 2, 3, 2),

       (37, 'Test Game 37',
        ARRAY['This is a test'],
        null, 2, 0, 6, 2),

       (38, 'Test Game 38',
        ARRAY['This is a test'],
        null, 2, 1, 3, 2),

       (39, 'Test Game 39',
        ARRAY['This is a test'],
        null, 2, 2, 3, 2),

       (40, 'Test Game 40',
        ARRAY['This is a test'],
        3, 0, 0, 6, 3),

       (41, 'Test Game 41',
        ARRAY['This is a test'],
        4, 0, 0, 3, 3),

       (42, 'Test Game 42',
        ARRAY['This is a test'],
        null, 0, 1, 3, 3),

       (43, 'Test Game 43',
        ARRAY['This is a test'],
        null, 0, 1, 4, 3),

       (44, 'Test Game 44',
        ARRAY['This is a test'],
        null, 1, 0, 3, 3),

       (45, 'Test Game 45',
        ARRAY['This is a test'],
        null, 0, 1, 3, 3),

       (46, 'Test Game 46',
        ARRAY['This is a test'],
        null, 1, 2, 2, 3),

       (47, 'Test Game 47',
        ARRAY['This is a test'],
        null, 2, 0, 1, 3),

       (48, 'Test Game 48',
        ARRAY['This is a test'],
        null, 2, 1, 3, 3),

       (49, 'Test Game 49',
        ARRAY['This is a test'],
        null, 2, 2, 3, 3),

       (50, 'Test Game 50',
        ARRAY['This is a test'],
        3, 0, 0, 2, 4),

       (51, 'Test Game 51',
        ARRAY['This is a test'],
        4, 0, 0, 4, 4),

       (52, 'Test Game 52',
        ARRAY['This is a test'],
        null, 0, 1, 5, 4),

       (53, 'Test Game 53',
        ARRAY['This is a test'],
        null, 0, 1, 6, 4),

       (54, 'Test Game 54',
        ARRAY['This is a test'],
        null, 1, 0, 3, 4),

       (55, 'Test Game 55',
        ARRAY['This is a test'],
        null, 0, 1, 3, 4),

       (56, 'Test Game 56',
        ARRAY['This is a test'],
        null, 1, 2, 5, 4),

       (57, 'Test Game 57',
        ARRAY['This is a test'],
        null, 2, 0, 3, 4),

       (58, 'Test Game 58',
        ARRAY['This is a test'],
        null, 2, 1, 5, 4),

       (59, 'Test Game 59',
        ARRAY['This is a test'],
        null, 2, 2, 3, 4),

       (60, 'Test Game 60',
        ARRAY['This is a test'],
        3, 0, 0, 2, 5),

       (61, 'Test Game 61',
        ARRAY['This is a test'],
        4, 0, 0, 5, 5),

       (62, 'Test Game 62',
        ARRAY['This is a test'],
        null, 0, 1, 3, 5),

       (63, 'Test Game 63',
        ARRAY['This is a test'],
        null, 0, 1, 5, 5),

       (64, 'Test Game 64',
        ARRAY['This is a test'],
        null, 1, 0, 3, 5),

       (65, 'Test Game 65',
        ARRAY['This is a test'],
        null, 0, 1, 3, 5),

       (66, 'Test Game 66',
        ARRAY['This is a test'],
        null, 1, 2, 8, 5),

       (67, 'Test Game 67',
        ARRAY['This is a test'],
        null, 2, 0, 3, 5),

       (68, 'Test Game 68',
        ARRAY['This is a test'],
        null, 2, 1, 3, 5),

       (69, 'Test Game 69',
        ARRAY['This is a test'],
        null, 2, 2, 1, 5),

       (70, 'Test Game 70',
        ARRAY['This is a test'],
        3, 0, 0, 2, 1),

       (71, 'Test Game 71',
        ARRAY['This is a test'],
        4, 0, 0, 3, 2),

       (72, 'Test Game 72',
        ARRAY['This is a test'],
        null, 0, 1, 4, 3),

       (73, 'Test Game 73',
        ARRAY['This is a test'],
        null, 0, 1, 4, 4),

       (74, 'Test Game 74',
        ARRAY['This is a test'],
        null, 1, 0, 6, 5),

       (75, 'Test Game 75',
        ARRAY['This is a test'],
        null, 0, 1, 3, 1),

       (76, 'Test Game 76',
        ARRAY['This is a test'],
        null, 1, 2, 3, 2),

       (77, 'Test Game 77',
        ARRAY['This is a test'],
        null, 2, 0, 2, 3),

       (78, 'Test Game 78',
        ARRAY['This is a test'],
        null, 2, 1, 3, 4),

       (79, 'Test Game 79',
        ARRAY['This is a test'],
        null, 2, 2, 2, 5);

SELECT setval('game_id_seq', (SELECT MAX(id) FROM game));

insert into game_has_accessory (game_id, accessory_id)
values (20, 1),
       (53, 2),
       (42, 3),
       (53, 4),
       (74, 5),
       (75, 4),
       (25, 6);

insert into game_has_game_type (game_id, game_type_id)
values (22, 1),
       (23, 2),
       (24, 3),
       (26, 3),
       (27, 3),
       (29, 3),
       (32, 1),
       (33, 2),
       (34, 3),
       (36, 3),
       (37, 3),
       (39, 3),
       (42, 1),
       (43, 2),
       (44, 3),
       (46, 3),
       (47, 3),
       (49, 3),
       (52, 1),
       (53, 2),
       (54, 3),
       (56, 3),
       (57, 3),
       (59, 3),
       (62, 1),
       (63, 2),
       (64, 3),
       (66, 3),
       (67, 3),
       (69, 3),
       (72, 1),
       (73, 2),
       (74, 3),
       (76, 3),
       (77, 3),
       (79, 3);