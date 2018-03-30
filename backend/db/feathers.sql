DROP DATABASE IF EXISTS feathers;
CREATE DATABASE feathers;

\c feathers;

DROP TABLE IF EXISTS users, bffs, trips, attributes, threads, messages;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR NOT NULL UNIQUE,
  password_digest VARCHAR NOT NULL,
  email VARCHAR NOT NULL UNIQUE
);

CREATE TABLE bffs (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    bff VARCHAR REFERENCES users(username)
);

CREATE TABLE trips (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    username VARCHAR REFERENCES users(username),
    destination VARCHAR,
    start_date VARCHAR,
    end_date VARCHAR,
    early_bird BOOLEAN,
    night_owl BOOLEAN,
    clubbing BOOLEAN,
    spontaneous BOOLEAN,
    active BOOLEAN,
    sightseeing BOOLEAN,
    foodie BOOLEAN,
    relax BOOLEAN,
    nature BOOLEAN,
    extroverted BOOLEAN,
    smokes BOOLEAN,
    drinks BOOLEAN,
    todos VARCHAR
);

CREATE TABLE attributes (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    first_name VARCHAR,
    age INT,
    my_location VARCHAR,
    bio VARCHAR,
    pic VARCHAR,
    ethnicity VARCHAR,
    religion VARCHAR,
    early_bird BOOLEAN,
    night_owl BOOLEAN,
    clubbing BOOLEAN,
    spontaneous BOOLEAN,
    active BOOLEAN,
    sightseeing BOOLEAN,
    foodie BOOLEAN,
    relax BOOLEAN,
    nature BOOLEAN,
    extroverted BOOLEAN,
    smokes BOOLEAN,
    drinks BOOLEAN
);

CREATE TABLE threads (
    id SERIAL PRIMARY KEY,
    user_a VARCHAR REFERENCES users(username),
    user_b VARCHAR REFERENCES users(username)
);

CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    username VARCHAR REFERENCES users(username),
    thread_id INT NOT NULL REFERENCES threads(id),
    body VARCHAR NOT NULL,
    timestamp VARCHAR NOT NULL
);


INSERT INTO users (username, password_digest, email)
    VALUES ('jandoe', '$2a$10$f17jjX0NASQWYOln23Ogk.ePXm0TpAs2oq.k4.YOGQGTnkOvZlD/O', 'jan@jan.com'),
           ('meganfox', '$2a$10$f17jjX0NASQWYOln23Ogk.ePXm0TpAs2oq.k4.YOGQGTnkOvZlD/O', 'megan@megan.com'),
           ('dorian', '$2a$10$f17jjX0NASQWYOln23Ogk.ePXm0TpAs2oq.k4.YOGQGTnkOvZlD/O', 'dorian@dorian.com'),
           ('michelle', '$2a$10$f17jjX0NASQWYOln23Ogk.ePXm0TpAs2oq.k4.YOGQGTnkOvZlD/O', 'michelle@michelle.com'),
           ('princess', '$2a$10$f17jjX0NASQWYOln23Ogk.ePXm0TpAs2oq.k4.YOGQGTnkOvZlD/O', 'princess@princess.com'),
           ('sergina', '$2a$10$f17jjX0NASQWYOln23Ogk.ePXm0TpAs2oq.k4.YOGQGTnkOvZlD/O', 'serge@serge.com'),
           ('elonje', '$2a$10$f17jjX0NASQWYOln23Ogk.ePXm0TpAs2oq.k4.YOGQGTnkOvZlD/O', 'elonje@elonje.com'),
           ('simone', '$2a$10$f17jjX0NASQWYOln23Ogk.ePXm0TpAs2oq.k4.YOGQGTnkOvZlD/O', 'simone@simone.com'), -- pw: chicken
           ('davida', '$2a$10$f17jjX0NASQWYOln23Ogk.ePXm0TpAs2oq.k4.YOGQGTnkOvZlD/O', 'davida@davida.com'), -- pw: ricecake
           ('helena', '$2a$10$f17jjX0NASQWYOln23Ogk.ePXm0TpAs2oq.k4.YOGQGTnkOdovZlD/O', 'helenc@helenc.com'), -- pw: quinoa
           ('selena', '$2a$10$f17jjX0NASQWYOln23Ogk.ePXm0TpAs2oq.k4.YOGQGTnkOvZlD/O', 'selena@selena.com'), -- pw: chocolate
           ('erical', '$2a$10$f17jjX0NASQWYOln23Ogk.ePXm0TpAs2oq.k4.YOGQGTnkOvZlD/O', 'erical@erical.com'); -- pw: unicorn

INSERT INTO attributes (user_id, first_name, age, my_location, bio, pic, ethnicity, religion, early_bird, night_owl, clubbing, spontaneous, active, sightseeing, foodie, relax, nature, extroverted, smokes, drinks)
    VALUES (1, 'Jan', 21, 'New York, NY', 'What is life without the beauty of nature?', 'https://3.bp.blogspot.com/-g2AuvgYiOLg/WScTQ8L_wDI/AAAAAAAAIaE/8d-iYFx_Law6fwTvmHxSmqqXHFzOjERywCLcB/s640/unnamed.jpg', 'White / Caucasian', 'Christian', TRUE, FALSE, FALSE, TRUE, TRUE, TRUE, TRUE, FALSE, FALSE, FALSE, TRUE, FALSE),
           (2, 'Megan', 21, 'San Diego, CA', 'There is nothing like the serenity that being out in nature brings.', 'https://media.glamour.com/photos/57741970db58a48d3ac6fa5c/1:1/w_352/spl1303559_001_720.jpg', 'White / Caucasian', 'Christian', TRUE, FALSE, FALSE, TRUE, TRUE, TRUE, FALSE, TRUE, FALSE, FALSE, FALSE, TRUE),
           (3, 'Dori', 22, 'New York, NY', 'Yaaaaaaas, coffeeeeee.', 'https://previews.123rf.com/images/tverdohlib/tverdohlib1706/tverdohlib170601832/80920850-woman-in-garden-pretty-girl-with-fashionable-makeup-and-red-lips-has-rose-flower-in-hair-hispanic-or.jpg', 'Latin / Hispanic', 'Christian', FALSE, FALSE, TRUE, FALSE, TRUE, TRUE, FALSE, TRUE, TRUE, FALSE, FALSE, TRUE),
           (4, 'Michelle', 30, 'Kailua-Kona, HI', 'I like dogs.', 'http://petspictures.ru/images/cms/data/news/zvezdi/10358337_640864182661519_1085473283_n.jpg', 'Pacific Islander', 'Agnostic / Non-religious', TRUE, FALSE, FALSE, TRUE, TRUE, TRUE, FALSE, TRUE, FALSE, FALSE, FALSE, TRUE),
           (5, 'Princess', 30, 'San Diego, CA', 'Hiiii my name is Princessssss.', 'https://image1.masterfile.com/getImage/NzAwLTAwNzgxOTIyZW4uMDAwMDAwMDA=AAiv8Z/700-00781922en_Masterfile.jpg', 'Asian', 'Christian', TRUE, FALSE, FALSE, FALSE, FALSE, TRUE, TRUE, TRUE, TRUE, FALSE, FALSE, FALSE),
           (6, 'Sergina', 30, 'Dallas, TX', 'heyyyyyyyyyy im Sergina.', 'https://i.pinimg.com/736x/3c/f5/58/3cf558b97d28c6e87e0222a764a357e3--ashley-benzo-pretty-little-liars.jpg', 'Latin / Hispanic', 'Buddhist', FALSE, FALSE, FALSE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, TRUE),
           (7, 'Elon', 19, 'Newark, NJ', 'Hiiiii, im Elon.', 'https://i.pinimg.com/originals/21/55/16/2155161daccded2685243c2d3028ef91.jpg', 'Black / African', 'Christian', TRUE, FALSE, FALSE, TRUE, TRUE, TRUE, FALSE, TRUE, FALSE, FALSE, FALSE, FALSE),
           (8, 'Simone', 22, 'New York, NY', 'Yo, eskedit.' , 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb_0gFFsEELpUaV2A4sv54cMQDZVIyc35KbdSPHvs_CkUwBFKu', 'Latin / Hispanic', 'Christian', FALSE, TRUE, TRUE, TRUE, TRUE, FALSE, FALSE, TRUE, FALSE, TRUE, TRUE, TRUE),
           (9, 'Davida', 24, 'Seattle, WA', 'Coffee, yaaaaassss.', 'http://www.allygong.com/wp-content/uploads/2016/01/Ally-Gong-SF-0928.jpg', 'Asian', 'Christian', TRUE, TRUE, FALSE, TRUE, FALSE, TRUE, TRUE, TRUE, FALSE, TRUE, TRUE, TRUE),
           (10, 'Helen', 27, 'Raleigh, NC', 'I like beer.', 'http://res.heraldm.com/phpwas/restmb_jhidxmake.php?idx=5&simg=201504131730143170190_20150413173942_01.jpg', 'Asian', 'Christian', TRUE, FALSE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, TRUE, TRUE),
           (11, 'Selena', 26, 'Fort Lee, NJ', 'What up fam, you can call me Selenaaaaa.', 'https://www.usmagazine.com/wp-content/uploads/2018/02/selena-gomez-lunch.jpg', 'Native American', 'New Age (Spiritual, but not religious)', FALSE, TRUE, TRUE, FALSE, TRUE, FALSE, TRUE, TRUE, TRUE, FALSE, FALSE, TRUE),
           (12, 'Erica', 25, 'new jersey', 'Sup, Erica here.', 'https://www.internationalteflacademy.com/hubfs/Erica-Overbeek-3.jpg?t=1521859281281', 'White / Caucasian', 'Jewish', FALSE, TRUE, FALSE, FALSE, FALSE, FALSE, FALSE, TRUE, FALSE, FALSE, TRUE, TRUE);