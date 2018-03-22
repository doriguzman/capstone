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
    timestamp TIMESTAMP NOT NULL
);

-- INSERT INTO users (username, password_digest, hobbies)
--   VALUES ('Tyler', '$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq', 'swimming')

INSERT INTO users (username, password_digest, email)
    VALUES ('janedoe', '$2a$10$f17jjX0NASQWYOln23Ogk.ePXm0TpAs2oq.k4.YOGQGTnkOvZlD/O', 'jane@jane.com'),
           ('meganfox', '$2a$10$f17jjX0NASQWYOln23Ogk.ePXm0TpAs2oq.k4.YOGQGTnkOvZlD/O', 'megan@megan.com'),
           ('dori', '$2a$10$f17jjX0NASQWYOln23Ogk.ePXm0TpAs2oq.k4.YOGQGTnkOvZlD/O', 'dori@dorian.com'),
           ('michelle', '$2a$10$f17jjX0NASQWYOln23Ogk.ePXm0TpAs2oq.k4.YOGQGTnkOvZlD/O', 'michelle@michelle.com'),
           ('princess', '$2a$10$f17jjX0NASQWYOln23Ogk.ePXm0TpAs2oq.k4.YOGQGTnkOvZlD/O', 'princess@princess.com'),
           ('elon', '$2a$10$f17jjX0NASQWYOln23Ogk.ePXm0TpAs2oq.k4.YOGQGTnkOvZlD/O', 'elon@elon.com'),
           ('sergina', '$2a$10$f17jjX0NASQWYOln23Ogk.ePXm0TpAs2oq.k4.YOGQGTnkOvZlD/O', 'serge@serge.com');

INSERT INTO attributes (user_id, first_name, age, my_location, bio, pic, ethnicity, religion, early_bird, night_owl, clubbing, spontaneous, active, sightseeing, foodie, relax, nature, extroverted, smokes, drinks)
    VALUES (1, 'jane', 21, 'nyc', 'i am jane', 'https://cmkt-image-prd.global.ssl.fastly.net/0.1.0/ps/2393540/300/200/m1/fpc/wm0/joerxftwygqsixsq3uvdfb1au6cr1xfz0mptpmenngdh139iukptic7kcn4gwjye-.jpg?1489264056&s=2007613a8e87451091d23572b0f9225d', 'white/caucasian', 'christian', TRUE, FALSE, FALSE, TRUE, TRUE, TRUE, TRUE, FALSE, FALSE, FALSE, TRUE, FALSE),
           (2, 'megan', 21, 'san diego', 'i am megan', 'https://media1.britannica.com/eb-media/82/73182-004-B826BA69.jpg', 'white/caucasian', 'jewish', TRUE, FALSE, FALSE, TRUE, TRUE, TRUE, FALSE, TRUE, FALSE, FALSE, FALSE, TRUE),
           (3, 'dori', 22, 'nyc', 'i am Dori', 'https://sissinghurstcastle.files.wordpress.com/2015/05/tulip-clara-butt.jpg', 'latin/hispanic', 'christian', FALSE, FALSE, TRUE, FALSE, TRUE, TRUE, FALSE, TRUE, TRUE, FALSE, FALSE, TRUE),
           (4, 'michelle', 25, 'nyc', 'i am michelle', 'https://secure.img1-fg.wfcdn.com/im/25504920/resize-h800%5Ecompr-r85/3163/31635838/Faux+Blue+Hydrangea+Bloom.jpg', 'asian', 'agnostic', TRUE, FALSE, FALSE, TRUE, TRUE, TRUE, FALSE, TRUE, FALSE, FALSE, FALSE, TRUE),
           (5, 'princess', 25, 'san diego', 'i am princess', 'http://www.aos.org/AOS/media/Content-Images/Orchids/orchid-care-phal.jpg', 'asian', 'christian', FALSE, FALSE, FALSE, TRUE, TRUE, TRUE, FALSE, TRUE, FALSE, FALSE, FALSE, TRUE),
           (6, 'elon', 19, 'new jersey', 'i am elon', 'https://cdn.pixabay.com/photo/2017/06/02/15/58/lotus-2366698_960_720.jpg', 'black/african', 'christian', TRUE, FALSE, FALSE, TRUE, TRUE, TRUE, FALSE, TRUE, FALSE, FALSE, FALSE, TRUE),
           (7, 'sergina', 30, 'texas', 'i am sergina', 'https://draxe.com/wp-content/uploads/2015/05/bigstock-Green-grass-and-chamomiles-in-87444815.jpg', 'latin/hispanic', 'buddhist', FALSE, FALSE, FALSE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, TRUE);