const pgp = require("pg-promise")({});
const db = pgp("postgres://localhost/feathers");
const authHelpers = require("../auth/helpers");
const passport = require("../auth/local");

// Add a new user to the database
function registerUser(req, res, next) {
  const hash = authHelpers.createHash(req.body.password);
  db
    .none(
      "INSERT INTO users (username, email, password_digest) VALUES (${username}, ${email}, ${password})",
      {
        username: req.body.username,
        email: req.body.email,
        password: hash
      }
    )
    .then(() => {
      return next();
    })
    .catch(err => {
      res.status(500).send("Error registering new user!");
    });
}

// Set user attributes from registration survey
function userSurvey(req, res, next) {
  db
    .none(
      "INSERT INTO attributes VALUES (DEFAULT, ${user_id}, ${firstName}, ${age}, ${location}, ${bio}, ${pic}, ${ethnicity}, ${earlyBird}, ${nightOwl}, ${clubbing}, ${spontaneous}, ${active}, ${sightseeing}, ${foodie}, ${relax}, ${nature}, ${extroverted}, ${smokes}, ${drinks});",
      {
        user_id: req.user.id,
        firstName: req.body.firstName,
        age: req.body.age,
        location: req.body.location,
        bio: req.body.bio,
        pic: req.body.pic,
        ethnicity: req.body.ethnicity,
        earlyBird: req.body.earlyBird,
        nightOwl: req.body.nightOwl,
        clubbing: req.body.clubbing,
        spontaneous: req.body.spontaneous,
        active: req.body.active,
        sightseeing: req.body.sightseeing,
        foodie: req.body.foodie,
        relax: req.body.relax,
        nature: req.body.nature,
        extroverted: req.body.extroverted,
        smokes: req.body.smokes,
        drinks: req.body.drinks
      }
    )
    .then(() => {
      res.status(200).send("added user attributes into database");
    })
    .catch(err => {
      console.log(`error adding user attributes: `, err);
      // res.status(500).send("error adding user attributes: ", err);
    });
}

function getUser(req, res, next) {
  db
    .one("SELECT * FROM users WHERE username=${username}", {
      username: req.user.username
    })
    .then(data => {
      res.status(200).json({ user: data });
    });
}
// Information on all users
function getAllUsers(req, res, next) {
  db
    .any("SELECT * FROM users")
    .then(data => {
      console.log("data:", data);
      res.status(200).json({
        status: "success",
        data: data,
        message: "Retrieved all users"
      });
    })
    .catch(err => {
      return next(err);
    });
}

// // Get a user's basic id
// function getUserId(req, res, next) {
//   db.any("SELECT id FROM users").then(data => {
//     res.status(200).send(data);
//   });
// }

// Get a user's attributes
function getUserAttributes(req, res, next) {
  db
    //     .any(
    //       `SELECT first_name, age, my_location, bio, pic, ethnicity, early_bird, night_owl, clubbing, spontaneous, active, sightseeing, foodie, relax, nature, extroverted, smokes, drinks
    //       FROM users
    //       JOIN attributes ON users.id=attributes.user_id
    //       WHERE users.username=${username};`,

    .one(
      "SELECT first_name, age, my_location, bio, pic, ethnicity, early_bird, night_owl, clubbing, spontaneous, active, sightseeing, foodie, relax, nature, extroverted, smokes, drinks FROM users JOIN attributes ON users.id=attributes.user_id WHERE users.username=${username};",

      { username: req.params.username }
    )
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(500).json({
        status: "Error getting user attributes. Make sure you're logged in.",
        error: err
      });
    });
}

// Get matches by attributes
function getMatches(req, res, next) {
  db.any();
}

// Add a trip to the trips table
function addTrip(req, res, next) {
  // startDate and endDate have to be in the following format: 'YYYY-MM-DD'
  console.log(`res.user: `, req.user);
  db
    .none(
      "INSERT INTO trips VALUES (DEFAULT, ${id}, ${username}, ${destination}, ${startDate}, ${endDate})",
      {
        id: req.user.id,
        username: req.user.username,
        destination: req.body.destination,
        startDate: req.body.startDate,
        endDate: req.body.endDate
      }
    )
    .then(() => {
      res
        .status(200)
        .send(
          `added a new trip for user_id: ${req.user.id}, username: ${
            req.user.username
          }`
        );
    })
    .catch(err => {
      res.status(500).send(`error adding new trip!`);
    });
}

// Get all trips for a user
function getAllTrips(req, res, next) {
  db
    .any("SELECT * FROM trips WHERE username=${username}", {
      username: req.params.username
    })
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(500).send("error retrieving all trips: ", err);
    });
}

// Deletes one trip
function removeTrip(req, res, next) {
  // *** Need to figure out if we're using req.body or req.params for the trip id ***
  console.log("attempting to remove trip...");
  db
    .none("DELETE FROM trips WHERE username=${username} AND id=${id}", {
      username: req.user.username,
      id: req.params.id
    })
    .then(() => {
      res.status(200).send("removed trip");
    })
    .catch(err => res.status(500).send("error retrieving one trip"));
}

// Log out user
function logoutUser(req, res, next) {
  req.logout();
  res.status(200).json("log out success");
}

module.exports = {
  registerUser: registerUser,
  userSurvey: userSurvey,
  getAllUsers: getAllUsers,
  getUser: getUser,
  getUserAttributes: getUserAttributes,
  addTrip: addTrip,
  getAllTrips: getAllTrips,
  removeTrip: removeTrip,
  logoutUser: logoutUser
};
