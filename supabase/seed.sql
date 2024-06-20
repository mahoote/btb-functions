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
       (5, 'Ping pong'),
       (6, 'Ball'),
       (7, 'Cups'),
       (8, 'Random items'),
       (9, 'Chairs'),
       (10, 'Music');

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

insert into game (id, name, intro_description, descriptions,
                  min_players, max_players, activity_level,
                  alcohol_level, minutes, game_type_id,
                  game_category_id, player_group_type_id)
values (1, 'Fast Word', null,
        ARRAY['Each player must quickly say a word related to the previous. For example, if the first word is "beach", the next player could say "sand". No repeating words. If a player hesitates for more than 5 seconds, or repeats a word, they must take a drink.'],
        3, null, 1, 2, 3, 7, 1, null);
