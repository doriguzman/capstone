DROP DATABASE IF EXISTS feathers;
CREATE DATABASE feathers;

\c feathers;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR,
  first_name VARCHAR,
  password_digest VARCHAR,
  age INT,
  email VARCHAR,
  my_location VARCHAR,
  bio VARCHAR,
  pic VARCHAR,
  ethnicity VARCHAR
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
    attr VARCHAR,
    user_id INT REFERENCES users(id)
);

CREATE TABLE preferences (
    id SERIAL PRIMARY KEY,
    pref VARCHAR,
    user_id INT REFERENCES users(id)
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

INSERT INTO users (username, first_name, password_digest, age, email, my_location, bio, pic, ethnicity)
    VALUES ('janedoe', 'jane', 'password', '21', 'janedoe@janedoe.com', 'new york', 'blah', 'pic', 'white'),
           ('meganfox', 'megan', 'password', '21', 'meganfox@meganfox.com', 'new york', 'blah', 'pic', 'white');