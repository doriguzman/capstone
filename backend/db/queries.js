const pgp = require("pg-promise")({});
const db = pgp("postgres://localhost/feathers");
const authHelpers = require("../auth/helpers");
const passport = require("../auth/local");

// ------------------ Add a new user to the database ------------------ //
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
      // ***** ADD if/else statements for different errors *****
      res.status(500).send("Error registering new user!");
    });
}

// ------------------ Set user attributes from registration survey ------------------ //
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
        religion: req.body.religion,
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
// ------------------ Information on all users ------------------ //
function getAllUsers(req, res, next) {
  db
    .any("SELECT id, username, email FROM users")
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

// ------------------ GET a user's attributes ------------------ //
function getUserAttributes(req, res, next) {
  db
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

// ------------------ GET all photo URLs ------------------ //
function getPics(req, res, next) {
  db
    .any(
      "SELECT users.username, first_name, age, my_location, pic, destination, start_date, end_date FROM attributes JOIN users ON attributes.user_id=users.id FULL OUTER JOIN trips ON trips.user_id=users.id"
    )
    .then(data => { res.status(200).send(data) })
    .catch(err => res.status(500).send("error fetching pictures for all users"))
}

// Get matches by attributes
// function getMatches(req, res, next) {
//   db.any();
// }

// ------------------ ADD A TRIP TO trips TABLE ------------------ //
function addTrip(req, res, next) {
  // startDate and endDate have to be in the following format: 'YYYY-MM-DD'
  db
    .none(
      "INSERT INTO trips VALUES (DEFAULT, ${id}, ${username}, ${destination}, ${startDate}, ${endDate}, ${earlyBird}, ${nightOwl}, ${clubbing}, ${spontaneous}, ${active}, ${sightseeing}, ${foodie}, ${relax}, ${nature}, ${extroverted}, ${smokes}, ${drinks}, ${todos})",
      {
        id: req.user.id,
        username: req.user.username,
        destination: req.body.destination,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
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
        drinks: req.body.drinks,
        todos: req.body.todos // should be a string
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

// ------------------ Get all trips for a user ------------------ //
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

// ------------------ REMOVES ONE TRIP ------------------ //
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

// ------------------ EDIT FUNCTIONS ------------------ //
function editAttributes(req, res, next) {
  console.log(`attempting to edit attributes. user id: `, req.user.id);
  db
    .none(
      "UPDATE attributes SET first_name=${firstName}, age=${age}, my_location=${location}, bio=${bio}, pic=${pic}, ethnicity=${ethnicity}, early_bird=${earlyBird}, night_owl=${nightOwl}, clubbing=${clubbing}, spontaneous=${spontaneous}, active=${active}, sightseeing=${sightseeing}, foodie=${foodie}, relax=${relax}, nature=${nature}, extroverted=${extroverted}, smokes=${smokes}, drinks=${drinks} WHERE user_id=${id}",
      {
        firstName: req.body.firstName,
        age: req.body.age,
        location: req.body.location,
        bio: req.body.bio,
        pic: req.body.pic,
        ethnicity: req.body.ethnicity,
        religion: req.body.religion,
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
        drinks: req.body.drinks,
        id: req.user.id
      }
    )
    .then(() =>
      res
        .status(200)
        .send(`Successfully edited ATTRIBUTES for ${req.user.username}`)
    )
    .catch(err =>
      res
        .status(500)
        .send(`Error editing ATTRIBUTES for ${req.user.username}. ${err}`)
    );
}

function editTrip(req, res, next) {
  db
    .none(
      "UPDATE trips SET destination=${destination}, start_date=${startDate}, end_date=${endDate}, early_bird=${earlyBird}, night_owl=${nightOwl}, clubbing=${clubbing}, spontaneous=${spontaneous}, active=${active}, sightseeing=${sightseeing}, foodie=${foodie}, relax=${relax}, nature=${nature}, extroverted=${extroverted}, smokes=${smokes}, drinks=${drinks}, todos=${todos} WHERE user_id=${id} AND id=${tripId}",
      {
        destination: req.body.destination,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
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
        drinks: req.body.drinks,
        todos: req.body.todos,
        id: req.user.id,
        tripId: req.body.tripId
      }
    )
    .then(() =>
      res.status(200).send(`Successfully edited TRIP for ${req.user.username}`)
    )
    .catch(err =>
      res
        .status(500)
        .send(`Error editing TRIP for ${req.user.username}. ${err}`)
    );
}

// ------------------ BFF functions ------------------ //
function getAllBffs(req, res, next) {
  db
    .any("SELECT bff FROM bffs WHERE user_id=$1", [req.user.id])
    .then(data => {
      if (data === []) {
        res.status(200).send("You haven't added any BFFs yet :(");
      } else res.status(200).send(data);
    })
    .catch(err => {
      res.status(500).send("There's an error getting your BFFs. ", err);
    });
}

function addBff(req, res, next) {
  if (req.params.username === req.user.username) {
    res.status(500).send("Sorry, you can't add yourself as a BFF...");
    return;
  }
  db
    .none("INSERT INTO bffs VALUES (DEFAULT, ${id}, ${bff})", {
      id: req.user.id,
      bff: req.params.username
    })
    .then(() => res.status(200).send("Successfully added new BFF!"))
    .catch(err =>
      res.status(500).send("Sorry, we couldn't add a new BFF. ", err)
    );
}

function removeBff(req, res, next) {
  db
    .none("DELETE FROM bffs WHERE user_id=${id} AND bff=${bff}", {
      id: req.user.id,
      bff: req.params.username
    })
    .then(() => res.status(200).send("Successfully removed BFF."))
    .catch(err =>
      res.status(500).send("Sorry, we couldn't remove this BFF. ", err)
    );
}

// ------------------ THREAD functions ------------------ //
function getAllThreads(req, res, next) {
  db
    .any(
      "SELECT threads.id, user_a, user_b FROM threads JOIN users ON threads.user_a=users.username OR threads.user_b=users.username WHERE users.id=${id};",
      { id: req.user.id }
    )
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(500).send("no threads to retrieve");
    });
}

function addThread(req, res, next) {
  db
    .none("INSERT INTO threads VALUES (DEFAULT, ${user}, ${username})", {
      user: req.user.username,
      username: req.params.username
    })
    .then(() =>
      res
        .status(200)
        .send(`successfully added a new thread for ${req.user.username} and ${req.params.username}`)
    )
    .catch(err => res.status(500).send(`could not add new thread`));
}

// ---- I'm commenting out this removeThread function because if I remove the thread, it will
// ---- be removed from the entire database for both parties
// function removeThread(req, res, next) {
// 	db
// 		.none(
// 			"DELETE FROM threads WHERE (user_a=${user} AND user_b={username}) OR (user_a={username} AND user_b={user})",
// 			{
// 				user: req.user.username,
// 				username: req.params.username
// 			}
// 		)
// 		.then(() => res.status(200).send(`successfully deleted thread for ${req.user.username} and ${req.params.username}`))
// }

// ------------------ MESSAGE functions ------------------ //
function addMessage(req, res, next) {
  const date = new Date();
  db
    .none(
      "INSERT INTO messages VALUES (DEFAULT, ${user}, ${threadId}, ${body}, ${timestamp})",
      {
        user: req.user.username,
        threadId: req.body.threadId,
        body: req.body.body,
        timestamp: date
      }
    )
    .then(() =>
      res.status(200).send(`Added a message for ${req.user.username}`)
    )
    .catch(err => res.status(500).send(`error adding message: `, err));
}

function getMessages(req, res, next) {
  db
    .any("SELECT username, body, timestamp FROM messages WHERE thread_id=${threadId}", {
      threadId: req.params.threadId
    })
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send("error fetching messages: ", err));
}

module.exports = {
  registerUser,
  userSurvey, 
  getAllUsers,
  getUserAttributes,
  getPics,
  addTrip,
  getAllTrips,
  removeTrip,
  logoutUser,
  getUser,
  editAttributes,
  editTrip,
  getAllBffs,
  addBff,
  removeBff,
  getAllThreads,
	addThread,
	// removeThread,
	addMessage,
	getMessages
};
