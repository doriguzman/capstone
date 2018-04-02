var db = require("../db/queries");
var express = require("express");
var router = express.Router();
const { loginRequired } = require("../auth/helpers");
const passport = require("../auth/local");

// GET routes -- need to refactor some of the names
router.get("/", db.getAllUsers);
router.get("/getUser", loginRequired, db.getUser);
router.get("/userAttributes/:username", loginRequired, db.getUserAttributes);
router.get("/allUsersAttributes", loginRequired, db.getAllUsersAttributes)
router.get("/getPics", loginRequired, db.getPics); // gets some user info for feed
router.get("/getAllTrips", loginRequired, db.getAllTrips) // gets ALL the trips
router.get("/allTrips/:username", loginRequired, db.getTripsByUsername) // gets trip by username
router.get('/bucketlist/:username', loginRequired, db.getBucketListByUsername)
router.get("/allBffs", loginRequired, db.getAllBffs)
router.get("/addBff/:username", loginRequired, db.addBff) // adds a BFF by username
router.get("/getAllThreads", loginRequired, db.getAllThreads)
router.get("/addThread/:username", loginRequired, db.addThread)
router.get("/getMessages/:threadId", loginRequired, db.getMessages)
router.get('/getFlagged', loginRequired, db.getAllFlaggedUsers)
router.get('/addFlag/:username', loginRequired, db.addFlag)

// POST routes
router.post("/survey", db.userSurvey); // sets user attributes after user survey is submitted
router.post("/addTrip", loginRequired, db.addTrip);
router.post("/addMessage", loginRequired, db.addMessage);
router.post('/addBucketList', loginRequired, db.AddBucketList)

// DELETE routes
router.delete("/removeBucket/:username/:id", loginRequired, db.removeBucket); // removes a trip by trip ID
router.delete("/removeTrip/:username/:id", loginRequired, db.removeTrip); // removes a trip by trip ID
router.delete("/removeBff/:username", loginRequired, db.removeBff) // removes a BFF by username
router.delete('/removeFlag/:username', loginRequired, db.removeFlag )
// PUT routes
router.put("/edit/attributes", loginRequired, db.editAttributes)
router.put("/edit/trip", loginRequired, db.editTrip)

// User authentication routes
router.post("/register", db.registerUser, passport.authenticate("local"), (req, res) => {
  delete req.user.password_digest;
  res.json({
    id: req.user.id,
    username: req.user.username
  })
});
router.post("/login", passport.authenticate("local"), (req, res) => {
  delete req.user.password_digest;
  res.json({
    id: req.user.id,
    username: req.user.username
  })}
);
router.get("/logout", loginRequired, db.logoutUser);

module.exports = router;
