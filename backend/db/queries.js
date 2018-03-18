const pgp = require("pg-promise")({});
const db = pgp("postgres://localhost/feathers");
const authHelpers = require("../auth/helpers");
const passport = require("../auth/local");

// Create a new user
function createUser(req, res, next) {
  const hash = authHelpers.createHash(req.body.password);
  // console.log("create user hash: ", hash);
  db
    .none(
      "INSERT INTO users (username, first_name, password_digest, age, email, my_location, bio, pic, ethnicity) VALUES (${username}, ${firstName}, ${password} ${age}, ${email}, ${location}, ${bio}, ${pic}, ${ethnicity})",
      {
        username: req.body.username,
        firstName: req.body.firstName,
        password: hash,
        age: req.body.age,
        email: req.body.email,
        location: req.body.location,
        bio: req.body.bio,
        pic: req.body.pic,
        ethnicity: req.body.ethnicity
      }
    )
    .then(() => {
      res.send(`created user: ${req.body.username}`);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send("error creating user");
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

// Get a user's attributes
function getUserAttributes(req, res, next) {
  db
    .any("SELECT * FROM attributes")
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(500).json({
        status: "Error getting user attributes",
        error: err
      });
    });
}

// get matches by attributes
function getMatches(req, res, next) {
  db.any();
}

// Log out user
function logoutUser(req, res, next) {
  req.logout();
  res.status(200).send("log out success");
}

// Set user attributes
function setAttributes(req, res, next) {
  db.none(
    "INSERT INTO attributes VALUES (DEFAULT, ${user_id}, ${earlyBird}, ${nightOwl}, ${clubbing}, ${spontaneous}, ${active}, ${sightseeing}, ${foodie}, ${relax}, ${nature}, ${extroverted}, ${smokes}, ${drinks});",
    {
      user_id: req.body.user_id,
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
		})
		.then(() => {
			res.status(200).send("added user attributes into database")
		})
		.catch(err => {
			console.log(err)
			res.status(500).send("error adding user attributes: ", err)
		})
}

module.exports = {
  createUser: createUser,
  getAllUsers: getAllUsers,
  // getSingleUser: getSingleUser,
  getUserAttributes: getUserAttributes,
  // registerUser: registerUser,
	logoutUser: logoutUser,
	setAttributes: setAttributes
};
