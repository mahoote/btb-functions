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
values (1, 'Finish'),
       (2, 'Forfeit'),
       (3, 'Timed'),
       (4, 'Vote'),
       (5, 'Buzzer'),
       (6, 'Action Card'),
       (7, 'Word Prompt'),
       (8, 'Teams'),
       (9, 'Writing');

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

insert into player_group_type (id, name)
values (1, 'Even'),
       (2, 'Odd'),
       (3, 'Pairs');

insert into game_category (id, name)
values (1, 'Quick Thinking'),
       (2, 'Skills'),
       (3, 'Social Interactive'),
       (4, 'Strategy'),
       (5, 'Teams'),
       (6, 'Trivia and Knowledge');

insert into game (id, name, intro_description,
                  descriptions,
                  min_players, max_players, activity_level, alcohol_level, minutes, game_type_id, game_category_id, player_group_type_id)
values (1, 'Fast Word', null,
        ARRAY['Each player must quickly say a word related to the previous. For example, if the first word is "beach", the next player could say "sand". No repeating words. If a player hesitates for more than 5 seconds, or repeats a word, they must take a drink.'],
        3, null, 1, 2, 3, 7, 1, null),

       (2, 'Sevens Cheers', null,
        ARRAY['Players take turns saying numbers in ascending order. However, if the number is divisible by 7 or contains 7, the player must say "Cheers" instead of the number. If they fail to do so within a 3-second window, they must drink. The player that reaches 50 ends the game.'],
        3, null, 1, 3, 5, 2, 1, null),

       (3, 'Fast Friend Facts', null,
        ARRAY['All players sit in a circle, the game host will call a player''s name followed by a question like "What''s their favourite movie?". The first person who answers correctly doesn''t have to drink, everyone else drinks.'],
        4, null, 1, 2, 2, 6, 1, null),

       (4, 'Blindfold Draw', null,
        ARRAY['One player is blindfolded and given a word. They must draw it while others guess. If no one guesses correctly after 10 seconds, everybody drinks, and the game goes on. If guessed correctly, the guesser and the artist both can give out sips. Then a new person becomes the artist, and you continue.'],
        4, null, 2, 2, 4, 6, 2, null),

       (5, 'Skill Shot', null,
        ARRAY['Each player is given a shot glass filled with water, and a ping pong ball. Taking turns, players are required to bounce the ping pong ball off the table and into the shot glass. If a player successfully lands the ball in their shot, everyone else drinks. If the player fails, they drink. The game is played in quick rounds, so everyone gets a lot of turns in a short amount of time.'],
        3, null, 3, 3, 3, 3, 2, null),

       (6, 'Spin the Shot', null,
        ARRAY['Each player takes turns in spinning a shot glass, and whoever it points to has to fill it with alcohol, take the shot and then spin it next.'],
        3, null, 2, 3, 2, 3, 3, null),

       (7, 'What the Fuck', 'Shout out funny nicknames and keep the chants going. Mess up? You drink!',
        ARRAY['To start with, each player chooses their name. Something like "Shit Fuck", "Dirty Fuck", or "Cheeky Fuck". Then, when a new round starts, everybody chants "What''s the name of the fucking game, say what the fuck" in rhythm.',
              'Next, somebody starts by chanting his or her own name, followed by "what the fuck", followed by a call to someone else.',
              'For example, a player may chant: "Dirty Fuck, what the fuck, how about a Cheeky Fuck". In this instance, the player named Cheeky Fuck would now chant: "Cheeky Fuck, what the fuck, how about a Shit Fuck", etc. If a player hesitates for too long, or says the wrong thing, they must drink!'],
        3, null, 1, 2, 5, 3, 3, null),

       (8, 'Spirit or Water', null,
        ARRAY['All players are given a drink, most have water, but a few have spirits. Players sip their drinks and try to act natural. The group then discusses and tries to deduce who has the spirits. If they guess wrong, the accusers drink. If they guess right, the one with the spirit drinks. The game is over when the impostors are caught.'],
        4, null, 1, 2, 3, 4, 3, null),

       (9, 'Charades Revamp', null,
        ARRAY['Players take turns drawing a card with a task written on it. The task must be acted out without using any words or sounds, while all other players guess what it is. Hit the "buzzer" to answer. If a player guesses wrong, both that player and the actor take a drink. If it’s correct, everybody else drinks. The game continues until all cards have been drawn.'],
        3, null, 1, 3, 4, 5, 3, null),

       (10, 'Booze Tower', null,
        ARRAY['Two teams compete to build the highest tower from random items within 3 minutes. The twist? All players must be holding a drink in one hand! The team who builds the highest tower wins and the losing team must take a shot!'],
        4, null, 3, 3, 3, 3, 4, 1),

       (11, 'Number of Sips', null,
        ARRAY['Each player will have five cards with numbers from 1 to 5. Simultaneously, all players will reveal a card from their hand. The player with the highest card must take as many drinks as the number on their card. If there''s a tie, those players must "battle" by revealing another card. The higher card in the battle will take the sum total of drinks from both the previous and current cards. Then that card is used and a new round starts. The game is over when no one has anymore cards.'],
        3, null, 1, 3, 3, 6, 4, null),

       (12, 'Duo Charades', null,
        ARRAY['Players team up in pairs. Act out a word or phrase without speaking while others guess. The twist: one person can only use their voice, the other only their body. If a team can''t get others to guess in time, they both drink. The game is over when the time is up.'],
        6, null, 3, 3, 8, 6, 5, 1),

       (13, 'Trust Your Teammate', null,
        ARRAY['Players team up in pairs. One player is blindfolded, and the other player guides them using only verbal instructions. Each team has a different item they must find in the room (assigned by another team). The blindfolded player must find the item and bring it back to the start. The first team to do it wins, and the other teams must chug.'],
        4, null, 3, 2, 4, 3, 5, 1),

       (14, 'Seven Wonders of the World', null,
        ARRAY['The host gets a list of the seven wonders of the world. Then a player tries to name a wonder, before passing it on to the next. This continues in rapid succession. If a player repeats a wonder, names something that isn''t one of the seven wonders, or fails to name anything, they must take a drink. The game continues until all seven wonders of the world is named.'],
        8, 8, 1, 2, 5, 7, 6, null),

       (15, 'Puzzled Pints', null,
        ARRAY['Players must answer trivia questions with a setup similar to musical chairs. The player who cannot find a seat when the music stops must drink and then answer a trivia question. If they answer correctly, they can rejoin the game. If they answer incorrectly, they are out. The game is over when one player remains.'],
        4, null, 3, 3, 5, 6, 6, null);

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
