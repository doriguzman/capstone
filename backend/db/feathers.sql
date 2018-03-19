DROP DATABASE IF EXISTS feathers;
CREATE DATABASE feathers;

\c feathers;

DROP TABLE IF EXISTS users, likes, trips, attributes, preferences, thread, messages;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR NOT NULL UNIQUE,
  password_digest VARCHAR NOT NULL,
  email VARCHAR NOT NULL UNIQUE
);

CREATE TABLE likes (
    id SERIAL PRIMARY KEY,
    liker_id INT REFERENCES users(id),
    liked_id INT REFERENCES users(id)
);

CREATE TABLE trips (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    username VARCHAR REFERENCES users(username),
    destination VARCHAR,
    start_date DATE,
    end_date DATE
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

CREATE TABLE preferences (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
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

CREATE TABLE thread (
    id SERIAL PRIMARY KEY,
    receiver INT REFERENCES users(id),
    sender INT REFERENCES users(id)
);

CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    thread_id INT REFERENCES thread(id),
    body VARCHAR
);

-- INSERT INTO users (username, password_digest, hobbies)
--   VALUES ('Tyler', '$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq', 'swimming')

INSERT INTO users (username, password_digest, email)
    VALUES ('janedoe', '$2a$10$f17jjX0NASQWYOln23Ogk.ePXm0TpAs2oq.k4.YOGQGTnkOvZlD/O', 'jane@jane.com'),
           ('meganfox', '$2a$10$f17jjX0NASQWYOln23Ogk.ePXm0TpAs2oq.k4.YOGQGTnkOvZlD/O', 'megan@megan.com'),
           ('DoriG', '$2a$10$f17jjX0NASQWYOln23Ogk.ePXm0TpAs2oq.k4.YOGQGTnkOvZlD/O', 'dori@dorian.com'),
           ('michelleS', '$2a$10$f17jjX0NASQWYOln23Ogk.ePXm0TpAs2oq.k4.YOGQGTnkOvZlD/O', 'michelle@michelle.com'),
           ('Princess', '$2a$10$f17jjX0NASQWYOln23Ogk.ePXm0TpAs2oq.k4.YOGQGTnkOvZlD/O', 'princess@princess.com'),
           ('ElonJ', '$2a$10$f17jjX0NASQWYOln23Ogk.ePXm0TpAs2oq.k4.YOGQGTnkOvZlD/O', 'elon@elon.com'),
           ('Sergina', '$2a$10$f17jjX0NASQWYOln23Ogk.ePXm0TpAs2oq.k4.YOGQGTnkOvZlD/O', 'serge@serge.com');

INSERT INTO attributes (user_id, first_name, age, my_location, bio, pic, ethnicity, early_bird, night_owl, clubbing, spontaneous, active, sightseeing, foodie, relax, nature, extroverted, smokes, drinks)
    VALUES (1, 'jane', 21, 'nyc', 'i am jane', 'pictureofjane', 'white', TRUE, FALSE, FALSE, TRUE, TRUE, TRUE, TRUE, FALSE, FALSE, FALSE, TRUE, FALSE),
           (2, 'megan', 21, 'san diego', 'i am megan', 'pictureofmegan', 'asian', TRUE, FALSE, FALSE, TRUE, TRUE, TRUE, FALSE, TRUE, FALSE, FALSE, FALSE, TRUE),
           (3, 'Dori', 22, 'nyc', 'i am Dori', 'pictureofdori', 'latin/hispanic', FALSE, FALSE, TRUE, FALSE, TRUE, TRUE, FALSE, TRUE, TRUE, FALSE, FALSE, TRUE),
           (4, 'michelle', 25, 'nyc', 'i am michelle', 'pictureofmichelle', 'asian', TRUE, FALSE, FALSE, TRUE, TRUE, TRUE, FALSE, TRUE, FALSE, FALSE, FALSE, TRUE),
           (5, 'princess', 25, 'san diego', 'i am princess', 'pictureofprincess', 'asian', FALSE, FALSE, FALSE, TRUE, TRUE, TRUE, FALSE, TRUE, FALSE, FALSE, FALSE, TRUE),
           (6, 'elon', 19, 'new jersey', 'i am elon', 'pictureofelon', 'black/african', TRUE, FALSE, FALSE, TRUE, TRUE, TRUE, FALSE, TRUE, FALSE, FALSE, FALSE, TRUE),
           (7, 'sergina', 30, 'texas', 'i am sergina', 'pictureofsergina', 'latin/hispanic', FALSE, FALSE, FALSE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, TRUE);

