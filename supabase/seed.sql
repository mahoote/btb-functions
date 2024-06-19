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
