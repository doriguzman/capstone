DROP DATABASE IF EXISTS feathers;
CREATE DATABASE feathers;

\c feathers;


DROP TABLE IF EXISTS users, bffs, flagged, trips, attributes, threads, messages, bucketlist;


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

	
CREATE TABLE flagged (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    flagged_user VARCHAR REFERENCES users(username)
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

CREATE TABLE bucketlist (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    username VARCHAR REFERENCES users(username),
    destination VARCHAR,
    todos VARCHAR
);

INSERT INTO users (username, password_digest, email)
    VALUES ('janedoe', '$2a$10$f17jjX0NASQWYOln23Ogk.ePXm0TpAs2oq.k4.YOGQGTnkOvZlD/O', 'jan@jan.com'),
           ('meganfox', '$2a$10$f17jjX0NASQWYOln23Ogk.ePXm0TpAs2oq.k4.YOGQGTnkOvZlD/O', 'megan@megan.com'),
           ('dorian', '$2a$10$f17jjX0NASQWYOln23Ogk.ePXm0TpAs2oq.k4.YOGQGTnkOvZlD/O', 'dorian@dorian.com'),
           ('michelle', '$2a$10$f17jjX0NASQWYOln23Ogk.ePXm0TpAs2oq.k4.YOGQGTnkOvZlD/O', 'michelle@michelle.com'),
           ('princess', '$2a$10$f17jjX0NASQWYOln23Ogk.ePXm0TpAs2oq.k4.YOGQGTnkOvZlD/O', 'princess@princess.com'),
           ('sergina', '$2a$10$f17jjX0NASQWYOln23Ogk.ePXm0TpAs2oq.k4.YOGQGTnkOvZlD/O', 'serge@serge.com'),
           ('elonje', '$2a$10$f17jjX0NASQWYOln23Ogk.ePXm0TpAs2oq.k4.YOGQGTnkOvZlD/O', 'elonje@elonje.com'),
           ('simone', '$2a$10$f17jjX0NASQWYOln23Ogk.ePXm0TpAs2oq.k4.YOGQGTnkOvZlD/O', 'simone@simone.com'), 
           ('davida', '$2a$10$f17jjX0NASQWYOln23Ogk.ePXm0TpAs2oq.k4.YOGQGTnkOvZlD/O', 'davida@davida.com'),
           ('helena', '$2a$10$f17jjX0NASQWYOln23Ogk.ePXm0TpAs2oq.k4.YOGQGTnkOdovZlD/O', 'helenc@helenc.com'), 
           ('selena', '$2a$10$f17jjX0NASQWYOln23Ogk.ePXm0TpAs2oq.k4.YOGQGTnkOvZlD/O', 'selena@selena.com'),
           ('erical', '$2a$10$f17jjX0NASQWYOln23Ogk.ePXm0TpAs2oq.k4.YOGQGTnkOvZlD/O', 'erical@erical.com'), 
           ('tereza', '$2a$10$f17jjX0NASQWYOln23Ogk.ePXm0TpAs2oq.k4.YOGQGTnkOvZlD/O', 'tereza@tereza.com'),
           ('ninaxo', '$2a$10$f17jjX0NASQWYOln23Ogk.ePXm0TpAs2oq.k4.YOGQGTnkOvZlD/O', 'nina@nina.com'),
           ('taliax', '$2a$10$f17jjX0NASQWYOln23Ogk.ePXm0TpAs2oq.k4.YOGQGTnkOvZlD/O', 'talia@talia.com');

INSERT INTO attributes (user_id, first_name, age, my_location, bio, pic, ethnicity, religion, early_bird, night_owl, clubbing, spontaneous, active, sightseeing, foodie, relax, nature, extroverted, smokes, drinks)   
    VALUES (1, 'Jane', 21, 'New York, NY, USA', 'What is life without the beauty of nature?', 'https://preview.ibb.co/jghFRc/jan.jpg', 'White / Caucasian', 'Christian', TRUE, FALSE, FALSE, TRUE, TRUE, TRUE, TRUE, FALSE, FALSE, FALSE, TRUE, FALSE),
           (2, 'Megan', 21, 'San Diego, CA, USA', 'There is nothing like the serenity that being out in nature brings.', 'https://image.ibb.co/mQggjx/megan.jpg', 'White / Caucasian', 'Christian', TRUE, FALSE, FALSE, TRUE, TRUE, TRUE, FALSE, TRUE, FALSE, FALSE, FALSE, TRUE),
           (3, 'Dori', 22, 'New York, NY, USA', 'Yaaaaaaas, coffeeeeee.', 'https://image.ibb.co/eBQKmc/dori.jpg','Black / African', 'Christian', FALSE, FALSE, TRUE, FALSE, TRUE, TRUE, FALSE, TRUE, TRUE, FALSE, FALSE, TRUE),
           (4, 'Michelle', 30, 'Kailua-Kona, HI', 'I like dogs.', 'https://image.ibb.co/dQDfRc/michelle.jpg', 'Pacific Islander', 'Agnostic / Non-religious', TRUE, FALSE, FALSE, TRUE, TRUE, TRUE, FALSE, TRUE, FALSE, FALSE, FALSE, TRUE),
           (5, 'Princess', 30, 'San Diego, CA, USA', 'Hiiii my name is Princessssss.', 'https://image.ibb.co/d8Fc6c/princess.jpg', 'Asian', 'Christian', TRUE, FALSE, FALSE, FALSE, FALSE, TRUE, TRUE, TRUE, TRUE, FALSE, FALSE, FALSE),
           (6, 'Sergina', 30, 'Dallas, TX, USA', 'heyyyyyyyyyy im Sergina.', 'https://image.ibb.co/fDBvsH/sergina.jpg', 'Latin / Hispanic', 'Buddhist', FALSE, FALSE, FALSE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, TRUE),
           (7, 'Elon', 19, 'Newark, NJ, USA', 'Hiiiii, im Elon.', 'https://image.ibb.co/g9CUKx/elon.jpg', 'Black / African', 'Christian', TRUE, FALSE, FALSE, TRUE, TRUE, TRUE, FALSE, TRUE, FALSE, FALSE, FALSE, FALSE),
           (8, 'Simone', 22, 'New York, NY, USA', 'Yo, eskedit.' , 'https://image.ibb.co/nQ6Rpx/simone.jpg', 'Latin / Hispanic', 'Christian', FALSE, TRUE, TRUE, TRUE, TRUE, FALSE, FALSE, TRUE, FALSE, TRUE, TRUE, TRUE),
           (9, 'Davida', 24, 'Seattle, WA, USA', 'Coffee, yaaaaassss.', 'https://image.ibb.co/m3GTCH/davida.jpg', 'Asian', 'Christian', TRUE, TRUE, FALSE, TRUE, FALSE, TRUE, TRUE, TRUE, FALSE, TRUE, TRUE, TRUE),
           (10, 'Helen', 27, 'Raleigh, NC,USA', 'I like beer.', 'https://image.ibb.co/enT32H/helen.jpg', 'Asian', 'Christian', TRUE, FALSE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, TRUE, TRUE),
           (11, 'Selena', 26, 'Fort Lee, NJ, USA', 'What up fam, you can call me Selenaaaaa.', 'https://image.ibb.co/b3jWXH/selena.jpg', 'Native American', 'New Age (Spiritual, but not religious)', FALSE, TRUE, TRUE, FALSE, TRUE, FALSE, TRUE, TRUE, TRUE, FALSE, FALSE, TRUE),
           (12, 'Erica', 25, 'Anaheim, CA, USA', 'Sup, Erica here.', 'https://image.ibb.co/iDq5sH/erica.jpg', 'White / Caucasian', 'Jewish', FALSE, TRUE, FALSE, FALSE, FALSE, FALSE, FALSE, TRUE, FALSE, FALSE, TRUE, TRUE),
           (13, 'Tereza', 22, 'Concord, CA, USA', 'Going going back back to cali cali', 'https://image.ibb.co/ffiNrc/tereza.jpg','Latin / Hispanic', 'Christian', FALSE, TRUE, TRUE, FALSE, FALSE, TRUE, FALSE, TRUE, TRUE, FALSE, FALSE, TRUE),
           (14, 'Nina', 28, 'Brooklyn, NY, USA', 'Feeeling Good.', 'https://image.ibb.co/fFgWjx/nina.jpg', 'Black / African', 'Christian', TRUE, FALSE, FALSE, TRUE, TRUE, TRUE, FALSE, TRUE, FALSE, FALSE, FALSE, FALSE),
           (15, 'Talia', 24, 'New York, NY, USA', 'I love traveling', 'https://image.ibb.co/mkdGHH/Talia.jpg', 'Pacific Islander', 'Agnostic / Non-religious', TRUE, FALSE, FALSE, TRUE, TRUE, TRUE, FALSE, TRUE, FALSE, FALSE, FALSE, TRUE);

INSERT INTO threads (id, user_a, user_b)
    VALUES (1, 'janedoe', 'meganfox'),
           (2, 'janedoe', 'dorian'),
           (3, 'janedoe', 'michelle'),
           (4, 'janedoe', 'princess'),
           (5, 'janedoe', 'sergina'),
           (6, 'janedoe', 'elonje'),
           (7, 'janedoe', 'simone'),
           (8, 'janedoe', 'davida'),
           (9, 'janedoe', 'helena'),
           (10, 'janedoe', 'selena'),
           (11, 'janedoe', 'erical'),
           (12, 'janedoe', 'tereza'),
           (13, 'janedoe', 'ninaxo'),
           (14, 'janedoe', 'taliax'),
           (15, 'meganfox', 'dorian'),
           (16, 'meganfox', 'michelle'),
           (17, 'meganfox', 'princess'),
           (18, 'meganfox', 'sergina'),
           (19, 'meganfox', 'elonje'),
           (20, 'meganfox', 'simone'),
           (21, 'meganfox', 'davida'),
           (22, 'meganfox', 'helena'),
           (23, 'meganfox', 'selena'),
           (24, 'meganfox', 'erical'),
           (25, 'meganfox', 'tereza'),
           (26, 'meganfox', 'ninaxo'),
           (27, 'meganfox', 'taliax');

INSERT INTO messages (id, username, thread_id, body, timestamp)
    VALUES (1, 'janedoe', 1, 'Hi Megan, how are you?', 'Fri Apr 06 2018 09:52:13 GMT-0400 (EDT)'),
           (2, 'janedoe', 1, 'I see you are a nature lover... me too!', 'Fri Apr 06 2018 09:53:20 GMT-0400 (EDT)'),
           (3, 'meganfox', 1, 'Hello Jane, thats awesome!', 'Fri Apr 06 2018 10:06:39 GMT-0400 (EDT)'),
           (4, 'meganfox', 1, 'Yeah I see we have overlapping trip dates... we should meet up.', 'Fri Apr 06 2018 10:08:20 GMT-0400 (EDT)');