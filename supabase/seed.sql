insert into player (username)
values ('best_player'),
       ('player_one'),
       ('player_123');

insert into challenge (message)
values ('Hver gang noen skåler, må du rope "Skål!" høyere enn alle andre.'),
       ('Gi subtile komplimenter til tre forskjellige personer i løpet av kvelden uten at de legger merke til det.'),
       ('Ta et snikbilde med telefonen av fem forskjellige personer uten at noen oppdager deg.'),
       ('I løpet av kvelden må du gi en kort, improvisert tale på et passende tidspunkt uten at det virker planlagt.'),
       ('Bruk et tilfeldig fremmedord i samtalene dine minst tre ganger i løpet av kvelden.');

insert into game_type (name)
values ('Finish'),
       ('Forfeit'),
       ('Timed'),
       ('Vote'),
       ('Buzzer'),
       ('Action Card'),
       ('Word Prompt'),
       ('Teams'),
       ('Writing');

insert into accessory (name)
values ('Paper'),
       ('Pen'),
       ('Blindfold'),
       ('Shot glass'),
       ('Ping pong'),
       ('Ball'),
       ('Cups'),
       ('Random items'),
       ('Chairs'),
       ('Music');

insert into player_type (name)
values ('Even'),
       ('Odd'),
       ('Pairs');
