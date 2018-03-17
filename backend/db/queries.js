const pgp = require('pg-promise')({})
const db = pgp('postgres://localhost/feathers')
const authHelpers = require('../auth/helpers')
const passport = require('../auth/local')

// Information on all users
function getAllUsers(req, res, next) {
    db.any('SELECT * FROM users')
        .then((data) => {
            console.log("data:", data)
            res.status(200).json({
                status: 'success',
                data: data,
                message: 'Retrieved all users'
            })
        })
        .catch((err) => {
            return next(err)
        })
}

// Registers user using email, username, password, fullname
// function registerUser(req, res, next) {
//   let hash = authHelpers.createHash(req.body.password);
//   db
//     .none(
//       "INSERT INTO users (username, password_digest, email_add, fullname) VALUES ($1, $2, $3, $4)",
//       [req.body.username, hash, req.body.email, req.body.fullname]
//     )
//     .then(() => {
//       res.status(200).json({
//         message: "Registration successful"
//       });
//     })
//     .catch(err => {
//       res.status(500).json({
//         status: "Error",
//         error: err
//       });
//     });
// }

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
function getMatches(req, res, next) {}


// Log out user
function logout() {
	
}

module.exports = {
    getAllUsers: getAllUsers,
    // getSingleUser: getSingleUser,
    getUserAttributes:getUserAttributes,
    // registerUser: registerUser,
    // logoutUser: logoutUser
}