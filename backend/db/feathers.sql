DROP DATABASE IF EXISTS feathers;
CREATE DATABASE feathers;

\c feathers;


DROP TABLE IF EXISTS users, bffs, flagged, trips, attributes, threads, messages;


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
  VALUES (1, 'Jan', 21, 'New York, NY, USA', 'What is life without the beauty of nature?', 'https://preview.ibb.co/jghFRc/jan.jpg', 'White / Caucasian', 'Christian', TRUE, FALSE, FALSE, TRUE, TRUE, TRUE, TRUE, FALSE, FALSE, FALSE, TRUE, FALSE),
           (2, 'Megan', 21, 'San Diego, CA, USA', 'There is nothing like the serenity that being out in nature brings.', 'https://image.ibb.co/gAsJCH/megan.jpg', 'White / Caucasian', 'Christian', TRUE, FALSE, FALSE, TRUE, TRUE, TRUE, FALSE, TRUE, FALSE, FALSE, FALSE, TRUE),
           (3, 'Dori', 22, 'New York, NY, USA', 'Yaaaaaaas, coffeeeeee.', 'https://image.ibb.co/eBQKmc/dori.jpg', 'Latin / Hispanic', 'Christian', FALSE, FALSE, TRUE, FALSE, TRUE, TRUE, FALSE, TRUE, TRUE, FALSE, FALSE, TRUE),
           (4, 'Michelle', 30, 'Kailua-Kona, HI', 'I like dogs.', 'https://image.ibb.co/dQDfRc/michelle.jpg', 'Pacific Islander', 'Agnostic / Non-religious', TRUE, FALSE, FALSE, TRUE, TRUE, TRUE, FALSE, TRUE, FALSE, FALSE, FALSE, TRUE),
           (5, 'Princess', 30, 'San Diego, CA, USA', 'Hiiii my name is Princessssss.', 'https://image.ibb.co/d8Fc6c/princess.jpg', 'Asian', 'Christian', TRUE, FALSE, FALSE, FALSE, FALSE, TRUE, TRUE, TRUE, TRUE, FALSE, FALSE, FALSE),
           (6, 'Sergina', 30, 'Dallas, TX, USA', 'heyyyyyyyyyy im Sergina.', 'https://image.ibb.co/fDBvsH/sergina.jpg', 'Latin / Hispanic', 'Buddhist', FALSE, FALSE, FALSE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, TRUE),
           (7, 'Elon', 19, 'Newark, NJ, USA', 'Hiiiii, im Elon.', 'https://image.ibb.co/g9CUKx/elon.jpg', 'Black / African', 'Christian', TRUE, FALSE, FALSE, TRUE, TRUE, TRUE, FALSE, TRUE, FALSE, FALSE, FALSE, FALSE),
           (8, 'Simone', 22, 'New York, NY, USA', 'Yo, eskedit.' , 'https://image.ibb.co/jKLumc/simone.jpg', 'Latin / Hispanic', 'Christian', FALSE, TRUE, TRUE, TRUE, TRUE, FALSE, FALSE, TRUE, FALSE, TRUE, TRUE, TRUE),
           (9, 'Davida', 24, 'Seattle, WA, USA', 'Coffee, yaaaaassss.', 'https://image.ibb.co/m3GTCH/davida.jpg', 'Asian', 'Christian', TRUE, TRUE, FALSE, TRUE, FALSE, TRUE, TRUE, TRUE, FALSE, TRUE, TRUE, TRUE),
           (10, 'Helen', 27, 'Raleigh, NC,USA', 'I like beer.', 'https://image.ibb.co/fopgXH/helen.jpg', 'Asian', 'Christian', TRUE, FALSE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, TRUE, TRUE),
           (11, 'Selena', 26, 'Fort Lee, NJ, USA', 'What up fam, you can call me Selenaaaaa.', 'https://image.ibb.co/b3jWXH/selena.jpg', 'Native American', 'New Age (Spiritual, but not religious)', FALSE, TRUE, TRUE, FALSE, TRUE, FALSE, TRUE, TRUE, TRUE, FALSE, FALSE, TRUE),
           (12, 'Erica', 25, 'new jersey', 'Sup, Erica here.', 'https://image.ibb.co/iDq5sH/erica.jpg', 'White / Caucasian', 'Jewish', FALSE, TRUE, FALSE, FALSE, FALSE, FALSE, FALSE, TRUE, FALSE, FALSE, TRUE, TRUE);

