DROP DATABASE IF EXISTS feathers;
CREATE DATABASE feathers;

\c feathers;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR,
  email VARCHAR,
  password_digest VARCHAR
);

CREATE TABLE likes (
    id SERIAL PRIMARY KEY,
    liker_id INT REFERENCES users(id),
    liked_id INT REFERENCES users(id)
);

CREATE TABLE destination (
    id SERIAL PRIMARY KEY,
    destination VARCHAR,
    user_id INT REFERENCES users(id)
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
    early_bird VARCHAR,
    night_owl VARCHAR,
    clubbing VARCHAR,
    spontaneous VARCHAR,
    active VARCHAR,
    sightseeing VARCHAR,
    foodie VARCHAR,
    relax VARCHAR,
    nature VARCHAR,
    extroverted VARCHAR,
    smokes VARCHAR,
    drinks VARCHAR
);

CREATE TABLE preferences (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    early_bird VARCHAR,
    night_owl VARCHAR,
    clubbing VARCHAR,
    spontaneous VARCHAR,
    active VARCHAR,
    sightseeing VARCHAR,
    foodie VARCHAR,
    relax VARCHAR,
    nature VARCHAR,
    extroverted VARCHAR,
    smokes VARCHAR,
    drinks VARCHAR
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

INSERT INTO users (username, email, password_digest)
    VALUES ('janedoe', 'password', 'jane@jane.com'),
           ('meganfox', 'password', 'megan@megan.com');

INSERT INTO attributes (user_id, first_name, age, my_location, bio, pic, ethnicity, early_bird, night_owl, clubbing, spontaneous, active, sightseeing, foodie, relax, nature, extroverted, smokes, drinks)
    VALUES (1, 'jane', 21, 'nyc', 'i am jane', 'pictureofjane', 'white', TRUE, FALSE, FALSE, TRUE, TRUE, TRUE, TRUE, FALSE, FALSE, FALSE, TRUE, FALSE),
           (2, 'megan', 21, 'san diego', 'i am megan', 'pictureofmegan', 'asian', TRUE, FALSE, FALSE, TRUE, TRUE, TRUE, FALSE, TRUE, FALSE, FALSE, FALSE, TRUE);